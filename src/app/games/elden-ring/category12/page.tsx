import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'
import BossArticlesClient from './BossArticlesClient'

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
      .eq('category_id', 12) // ボス攻略カテゴリ
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
    title: 'エルデンリング ボス攻略記事一覧 - Game Study Academy',
    description: 'エルデンリング（Elden Ring）のボス攻略記事一覧。マルギット、ゴドリック、ラダーン、マリケスなど全ボスの攻略法、弱点、対策を網羅。',
    keywords: [
      'エルデンリング',
      'Elden Ring',
      'ボス攻略',
      'マルギット',
      'ゴドリック',
      'ラダーン',
      'マリケス',
      'ボス戦',
      '攻略法',
      'YouTube',
      '動画学習'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/games/elden-ring/category12',
      siteName: 'Game Study Academy',
      title: 'エルデンリング ボス攻略記事一覧 - Game Study Academy',
      description: 'エルデンリング（Elden Ring）のボス攻略記事一覧。マルギット、ゴドリック、ラダーン、マリケスなど全ボスの攻略法、弱点、対策を網羅。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - エルデンリング ボス攻略',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'エルデンリング ボス攻略記事一覧 - Game Study Academy',
      description: 'エルデンリング（Elden Ring）のボス攻略記事一覧。マルギット、ゴドリック、ラダーン、マリケスなど全ボスの攻略法、弱点、対策を網羅。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://game-study-academy.com/games/elden-ring/category12',
    },
  }
}


// メインコンポーネント
export default async function BossGuidePage() {
  const articles = await getCategoryArticles()

  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '記事一覧', url: 'https://game-study-academy.com/articles' },
    { name: 'エルデンリング', url: 'https://game-study-academy.com/games/elden-ring' },
    { name: 'ボス攻略', url: 'https://game-study-academy.com/games/elden-ring/category12' }
  ]

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">⚔️</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  ボス攻略
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                エルデンリング（Elden Ring）のボス攻略記事一覧。<br />
                各ボスの弱点、攻略法、おすすめ戦術など、詳細な攻略情報を提供しています。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/games/elden-ring"
                  className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  🔰 エルデンリング記事一覧
                </Link>
                <Link
                  href="/articles"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
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
                <span className="text-gray-900 font-medium">ボス攻略</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BossArticlesClient articles={articles} />
        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ⚔️ 全ボスを攻略しよう！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              ボス攻略記事で効率的に強敵を倒しましょう。<br />
              気になる記事があったら、ぜひ元動画も視聴してクリエイターを応援しましょう！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games/elden-ring"
                className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                🔰 エルデンリング記事一覧
              </Link>
              <Link
                href="/articles"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
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