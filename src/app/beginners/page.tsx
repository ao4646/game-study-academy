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

interface Category {
  id: number
  name: string
  slug: string
  jp_name: string
  parent_id: number | null
  icon: string | null
  description: string | null
  url_path: string
  sort_order: number | null
  is_active: boolean | null
  created_at: string
  image_url: string | null
  icon_url: string | null
}

interface ArticleWithRelations {
  article: Article
  video: Video
  categories: Category[]
}

// 初心者向け記事取得関数
async function getBeginnerArticles(): Promise<ArticleWithRelations[]> {
  try {
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('game_id', 1) // ナイトレイン
      .order('created_at', { ascending: false })

    if (articlesError || !articles) {
      console.error('記事取得エラー:', articlesError)
      return []
    }

    const articlesWithRelations: ArticleWithRelations[] = []
    
    for (const article of articles) {
      const { data: video, error: videoError } = await supabase
        .from('videos')
        .select('*')
        .eq('id', article.video_id)
        .single()

      // カテゴリ情報を取得
      const { data: articleCategories, error: categoryError } = await supabase
        .from('article_categories')
        .select('category_id, categories(*)')
        .eq('article_id', article.id)

      let categories: Category[] = []
      if (articleCategories && articleCategories.length > 0) {
        categories = articleCategories.map((ac: any) => ac.categories).filter(Boolean)
      }

      // 初心者向けカテゴリを含む記事のみフィルタ
      const hasBeginnerCategory = categories.some(cat => 
        cat.name.includes('初心者') || cat.jp_name?.includes('初心者') ||
        article.title.includes('初心者') || article.title.includes('基本') ||
        article.title.includes('始め方') || article.title.includes('入門')
      )

      if (video && !videoError && hasBeginnerCategory) {
        articlesWithRelations.push({
          article,
          video,
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
    title: 'ナイトレイン 初心者向け記事一覧 - Game Study Academy',
    description: 'エルデンリング：ナイトレイン（Elden Ring: Nightreign）の初心者向け記事一覧。基本的な攻略法とコツをYouTube動画から学習できます。',
    keywords: [
      'ナイトレイン',
      'Nightreign',
      '初心者向け',
      '基本攻略',
      '始め方',
      '入門',
      'コツ',
      'YouTube',
      '動画学習'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/beginners',
      siteName: 'Game Study Academy',
      title: 'ナイトレイン 初心者向け記事一覧 - Game Study Academy',
      description: 'エルデンリング：ナイトレイン（Elden Ring: Nightreign）の初心者向け記事一覧。基本的な攻略法とコツをYouTube動画から学習できます。',
    },
    alternates: {
      canonical: 'https://game-study-academy.com/beginners',
    },
  }
}

// 記事カードコンポーネント
function ArticleCard({ data }: { data: ArticleWithRelations }) {
  const { article, video, categories } = data
  const thumbnailUrl = video.thumbnail_url
  const categoryName = categories.length > 0 ? categories[0].name : '初心者向け'
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
            <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              初心者向け
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
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-2">🔰</span>
            <span className="text-lg font-bold text-emerald-600">{categoryName}</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {article.seo_title || article.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.meta_description || article.summary?.substring(0, 120) + '...' || 
             article.content.replace(/[#*\[\]]/g, '').substring(0, 120) + '...'}
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
export default async function BeginnersPage() {
  const articles = await getBeginnerArticles()

  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '記事一覧', url: 'https://game-study-academy.com/articles' },
    { name: 'ナイトレイン', url: 'https://game-study-academy.com/games/nightreign' },
    { name: '初心者向け', url: 'https://game-study-academy.com/beginners' }
  ]

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🔰</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  初心者向け
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                ナイトレインを始めたばかりの方向けの基本的な攻略法とコツ。<br />
                基礎から学んでナイトレインの世界を楽しみましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/beginner/nightreign"
                  className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  🌙 詳細な初心者ガイド
                </Link>
                <Link
                  href="/games/nightreign"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-emerald-600"
                >
                  📚 ナイトレイン記事一覧
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
              <li><span className="text-gray-400">/</span></li>
              <li>
                <Link href="/articles" className="text-gray-500 hover:text-gray-700">
                  記事一覧
                </Link>
              </li>
              <li><span className="text-gray-400">/</span></li>
              <li>
                <Link href="/games/nightreign" className="text-gray-500 hover:text-gray-700">
                  ナイトレイン
                </Link>
              </li>
              <li><span className="text-gray-400">/</span></li>
              <li>
                <span className="text-gray-900 font-medium">初心者向け</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 初心者ガイドセクション */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg p-8 border border-emerald-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl mr-3">🌙</span>
                  <h2 className="text-2xl font-bold text-emerald-800">ナイトレイン初心者ガイド</h2>
                </div>
                <p className="text-emerald-700 mb-6 leading-relaxed">
                  ナイトレインの基本的な操作方法、システム、おすすめの進め方を詳しく解説。<br />
                  まずはこちらのガイドを読んでゲームの基礎を理解しましょう。
                </p>
                <Link
                  href="/beginner/nightreign"
                  className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  🔰 詳細な初心者ガイドを読む
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* 初心者向け記事一覧 */}
          {articles.length > 0 ? (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📖 初心者向け記事 ({articles.length}件)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((data) => (
                  <ArticleCard key={data.article.id} data={data} />
                ))}
              </div>
            </section>
          ) : (
            <section className="text-center py-16">
              <div className="mb-4">
                <div className="text-6xl">🔰</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">初心者向け記事準備中</h2>
              <p className="text-gray-600 mb-8">
                初心者向けの記事は現在準備中です。<br />
                リリース後に順次追加予定ですので、お楽しみに！
              </p>
              <Link
                href="/beginner/nightreign"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                🌙 詳細な初心者ガイドを見る
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </Link>
            </section>
          )}

          {/* 関連リンクセクション */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🚀 ステップアップ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/categories/1"
                className="block group bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">👑</span>
                  <h3 className="text-xl font-bold text-red-800 group-hover:text-red-600">夜の王攻略</h3>
                </div>
                <p className="text-red-700 text-sm">
                  基本を覚えたら強大なボスに挑戦しましょう。各ボスの弱点と攻略法を詳しく解説。
                </p>
              </Link>

              <Link
                href="/categories/2"
                className="block group bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">👤</span>
                  <h3 className="text-xl font-bold text-blue-800 group-hover:text-blue-600">キャラ別解説</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  各夜渡りキャラクターの特性を理解して、自分に合ったプレイスタイルを見つけましょう。
                </p>
              </Link>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl mr-3">🔰</span>
              <h2 className="text-3xl font-bold">
                ナイトレインの冒険を始めよう！
              </h2>
            </div>
            <p className="text-xl mb-8 leading-relaxed">
              初心者向けの情報をしっかり学んで、ナイトレインの世界を存分に楽しみましょう。<br />
              YouTube動画で実際のプレイを見ながら学習すると、より効果的です！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/beginner/nightreign"
                className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                🌙 詳細な初心者ガイド
              </Link>
              <Link
                href="/games/nightreign"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-emerald-600"
              >
                📚 ナイトレイン記事一覧
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}