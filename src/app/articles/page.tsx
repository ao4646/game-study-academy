import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'
import { generateArticleListMetadata } from '@/lib/metadata'

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
  category_id: number
  published: boolean
  created_at: string
  updated_at: string
  seo_title: string | null
  meta_description: string | null
  seo_keywords: string | null
  slug: string | null
  featured_image_url: string | null
  read_time: number
  categoryName?: string
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

// ゲーム別記事取得関数
async function getArticlesByGame(gameId: number): Promise<ArticleWithRelations[]> {
  try {
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('game_id', gameId)
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

      const { data: game, error: gameError } = await supabase
        .from('games')
        .select('*')
        .eq('id', article.game_id)
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

// カテゴリ別記事取得
async function getCategoriesByGame(gameId: number): Promise<Category[]> {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('game_id', gameId)
      .order('id')

    if (error || !categories) {
      console.error('カテゴリ取得エラー:', error)
      return []
    }

    return categories
  } catch (error) {
    console.error('カテゴリ取得に失敗しました:', error)
    return []
  }
}

// メタデータ生成
export function generateMetadata(): Metadata {
  return generateArticleListMetadata()
}

// YouTubeサムネイル取得関数（フォールバック対応）
function getYouTubeThumbnail(videoId: string): string {
  // フォールバックとして中解像度サムネイルを使用（maxresdefaultは一部の動画で利用不可）
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}

// 記事カードコンポーネント
function ArticleCard({ data }: { data: ArticleWithRelations }) {
  const { article, video, game, categories } = data
  // データベースのサムネイルURLを最優先で使用
  const thumbnailUrl = video.thumbnail_url
  const categoryName = categories.length > 0 ? categories[0].name : 'カテゴリ未設定'
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
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
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

// カテゴリカードコンポーネント
function CategoryCard({ category, gameSlug, articleCount }: { category: Category, gameSlug: string, articleCount: number }) {
  return (
    <Link href={`/categories/${category.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
          {category.name}
        </h4>
        <p className="text-sm text-gray-600">
          {articleCount}件の記事
        </p>
      </div>
    </Link>
  )
}

// ゲームセクションコンポーネント
function GameSection({ 
  gameId, 
  gameName, 
  gameSlug, 
  articles, 
  categories 
}: { 
  gameId: number
  gameName: string
  gameSlug: string
  articles: ArticleWithRelations[]
  categories: Category[]
}) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{gameName}の記事一覧</h2>
        <p className="text-gray-600">
          {gameName}に関する攻略記事とカテゴリ一覧です
        </p>
      </div>

      {/* カテゴリ一覧 */}
      {categories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">カテゴリ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const articleCount = articles.filter(article => 
                article.categories.some(cat => cat.id === category.id)
              ).length
              return (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  gameSlug={gameSlug}
                  articleCount={articleCount}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* 記事一覧 */}
      {articles.length > 0 ? (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            最新記事 ({articles.length}件)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((data) => (
              <ArticleCard key={data.article.id} data={data} />
            ))}
          </div>
          {articles.length > 6 && (
            <div className="text-center mt-6">
              <Link
                href={`/games/${gameSlug}`}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {gameName}の記事をすべて見る
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">まだ{gameName}の記事がありません</p>
        </div>
      )}
    </section>
  )
}

// メインコンポーネント
export default async function ArticlesPage() {
  // エルデンリング (ID: 2) とナイトレイン (ID: 1) の記事を取得
  const [eldenRingArticles, nightreignArticles, eldenRingCategories, nightreignCategories] = await Promise.all([
    getArticlesByGame(2), // エルデンリング
    getArticlesByGame(1), // ナイトレイン
    getCategoriesByGame(2), // エルデンリングのカテゴリ
    getCategoriesByGame(1)  // ナイトレインのカテゴリ
  ])

  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '記事一覧', url: 'https://game-study-academy.com/articles' }
  ]

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                ゲーム攻略記事一覧
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                YouTube動画から学ぶ、厳選された攻略解説記事。<br />
                プロの実況者たちの知識とテクニックを文字で学習できます。
              </p>
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
                <span className="text-gray-900 font-medium">攻略記事一覧</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* エルデンリングセクション */}
          <GameSection
            gameId={2}
            gameName="エルデンリング (ELDEN RING)"
            gameSlug="elden-ring"
            articles={eldenRingArticles}
            categories={eldenRingCategories}
          />

          {/* ナイトレインセクション */}
          <GameSection
            gameId={1}
            gameName="ナイトレイン (NIGHT REIGN)"
            gameSlug="nightreign"
            articles={nightreignArticles}
            categories={nightreignCategories}
          />
        </div>

        {/* フッター情報 */}
        <div className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                📹 YouTube動画を見ながら学習することで、より効果的に攻略法を身につけることができます
              </p>
              <p className="text-sm">
                記事で気になる内容があったら、ぜひ元動画も視聴してYouTuberさんを応援しましょう！
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}