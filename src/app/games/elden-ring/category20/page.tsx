import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'

// Supabaseクライアント設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// 型定義
interface Article {
  id: number
  title: string
  content: string
  summary: string
  video_id: number
  game_id: number
  published: boolean
  created_at: string
  updated_at: string
  seo_title: string | null
  meta_description: string | null
  seo_keywords: string | null
  slug: string | null
  featured_image_url: string | null
  read_time: number
}

interface Video {
  id: number
  video_id: string
  title: string
  description: string
  channel_title: string
  published_at: string
  thumbnail_url: string
  search_query: string
  game_id: number
}

interface Game {
  id: number
  name: string
  slug: string
  description: string
}

interface Category {
  id: number
  name: string
  slug: string
  game_id: number
}

interface ArticleWithRelations {
  article: Article
  video: Video
  game: Game
  categories: Category[]
}

// カテゴリ記事取得関数
async function getCategoryArticles(): Promise<ArticleWithRelations[]> {
  try {
    const { data: articleCategoryRelations, error: articlesError } = await supabase
      .from('article_categories')
      .select(`
        articles!inner (
          id, title, content, summary, video_id, game_id, published, 
          created_at, updated_at, seo_title, meta_description, seo_keywords, 
          slug, featured_image_url, read_time
        )
      `)
      .eq('category_id', 20) // オンライン関連カテゴリ
      .eq('articles.published', true)
      .eq('articles.game_id', 2) // エルデンリングの記事のみ
    
    if (articlesError || !articleCategoryRelations) {
      console.error('記事取得エラー:', articlesError)
      return []
    }

    const articles = articleCategoryRelations
      .map((relation: any) => relation.articles)
      .filter(article => article)
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    const articlesWithRelations: ArticleWithRelations[] = []
    
    for (const article of articles) {
      if (!article) continue

      const { data: video, error: videoError } = await supabase
        .from('videos')
        .select('*')
        .eq('id', article.video_id)
        .single()

      const { data: game, error: gameError } = await supabase
        .from('games')
        .select('*')
        .eq('id', article.game_id)
        .single()

      const { data: articleCategories } = await supabase
        .from('article_categories')
        .select('category_id, categories(*)')
        .eq('article_id', article.id)

      let categories: Category[] = []
      if (articleCategories && articleCategories.length > 0) {
        categories = articleCategories.map((ac: any) => ac.categories).filter(Boolean)
      }

      if (video && game && !videoError && !gameError) {
        articlesWithRelations.push({
          article,
          video,
          game,
          categories
        })
      }
    }

    return articlesWithRelations
  } catch (error) {
    console.error('記事取得に失敗しました:', error)
    return []
  }
}

// メタデータ生成
export function generateMetadata(): Metadata {
  return {
    title: 'エルデンリング オンライン関連記事一覧 - Game Study Academy',
    description: 'エルデンリング（Elden Ring）のオンライン関連記事一覧。協力プレイ、対戦（PvP）、侵入、召喚、マルチプレイのコツやルールなどの情報を網羅。',
    keywords: [
      'エルデンリング',
      'Elden Ring',
      'オンライン',
      'マルチプレイ',
      '協力プレイ',
      'PvP',
      '対戦',
      '侵入',
      '召喚',
      'YouTube',
      '動画学習'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/games/elden-ring/category20',
      siteName: 'Game Study Academy',
      title: 'エルデンリング オンライン関連記事一覧 - Game Study Academy',
      description: 'エルデンリング（Elden Ring）のオンライン関連記事一覧。協力プレイ、対戦（PvP）、侵入、召喚、マルチプレイのコツやルールなどの情報を網羅。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - エルデンリング オンライン関連',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'エルデンリング オンライン関連記事一覧 - Game Study Academy',
      description: 'エルデンリング（Elden Ring）のオンライン関連記事一覧。協力プレイ、対戦（PvP）、侵入、召喚、マルチプレイのコツやルールなどの情報を網羅。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://game-study-academy.com/games/elden-ring/category20',
    },
  }
}

// 記事カードコンポーネント
function ArticleCard({ data }: { data: ArticleWithRelations }) {
  const { article, video, categories } = data
  const thumbnailUrl = video.thumbnail_url
  const categoryName = categories.length > 0 ? categories[0].name : 'オンライン関連'
  const createdDate = new Date(article.created_at).toLocaleDateString('ja-JP')

  return (
    <Link href={`/articles/${article.id}`} className="block group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {categoryName}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-70 rounded-full p-3 transition-all duration-300 group-hover:bg-opacity-80">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
            {article.seo_title || article.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.meta_description || article.summary?.substring(0, 120) + '...' || 
             article.content.replace(/[#*\\[\\]]/g, '').substring(0, 120) + '...'}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{createdDate}</span>
              <span>{article.read_time}分</span>
            </div>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {video.channel_title}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// メインコンポーネント
export default async function OnlineRelatedPage() {
  const articles = await getCategoryArticles()

  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '記事一覧', url: 'https://game-study-academy.com/articles' },
    { name: 'エルデンリング', url: 'https://game-study-academy.com/games/elden-ring' },
    { name: 'オンライン関連', url: 'https://game-study-academy.com/games/elden-ring/category20' }
  ]

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🌍</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  オンライン関連
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                エルデンリング（Elden Ring）のオンライン関連記事一覧。<br />
                協力プレイ、対戦（PvP）、侵入、召喚など、マルチプレイに関する詳細な情報を提供しています。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/games/elden-ring"
                  className="bg-white text-cyan-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  🔰 エルデンリング記事一覧
                </Link>
                <Link
                  href="/articles"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-cyan-600"
                >
                  📚 全記事一覧
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* パンくずナビ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  ホーム
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/articles" className="text-gray-500 hover:text-gray-700">
                  記事一覧
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/games/elden-ring" className="text-gray-500 hover:text-gray-700">
                  エルデンリング
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">オンライン関連</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 記事一覧 */}
          {articles.length > 0 ? (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🌍 オンライン関連記事 ({articles.length}件)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((data) => (
                  <ArticleCard key={data.article.id} data={data} />
                ))}
              </div>
            </section>
          ) : (
            <section className="text-center py-16">
              <div className="text-6xl mb-4">🌍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">オンライン関連記事準備中</h2>
              <p className="text-gray-600 mb-8">
                オンライン関連記事は現在準備中です。<br />
                順次追加予定ですので、お楽しみに！
              </p>
              <Link
                href="/games/elden-ring"
                className="inline-flex items-center px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                🔰 エルデンリング記事一覧を見る
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </Link>
            </section>
          )}
        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              🌍 マルチプレイを楽しもう！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              オンライン関連記事で他のプレイヤーとの協力や対戦を楽しみましょう。<br />
              気になる記事があったら、ぜひ元動画も視聴してクリエイターを応援しましょう！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games/elden-ring"
                className="bg-white text-cyan-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                🔰 エルデンリング記事一覧
              </Link>
              <Link
                href="/articles"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-cyan-600"
              >
                📚 全記事一覧
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}