import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'
import { generateCategoryMetadata } from '@/lib/metadata'

// Supabaseクライアント設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// 記事データの型定義
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

interface ArticleWithRelations {
  article: Article
  video: Video
  game: Game
}

// カテゴリ情報
const categories = [
  { id: 1, name: '夜の王攻略', icon: '⚔️', description: 'ボス攻略の必勝法', slug: 'boss-strategy' },
  { id: 2, name: 'キャラ別解説', icon: '👤', description: 'キャラ性能と使い方', slug: 'character-guide' },
  { id: 3, name: '戦術', icon: '🛡️', description: '戦闘テクニック', slug: 'tactics' },
  { id: 4, name: '地変攻略', icon: '🏔️', description: 'ダンジョン攻略法', slug: 'dungeon-guide' },
  { id: 5, name: '小ネタ・裏技', icon: '💡', description: '知って得する情報', slug: 'tips-tricks' },
  { id: 6, name: 'ストーリー(追憶)', icon: '📖', description: 'ストーリー解説', slug: 'story-guide' },
  { id: 7, name: '考察系', icon: '🤔', description: '深い分析と考察', slug: 'analysis' },
  { id: 8, name: '初心者ガイド', icon: '📚', description: '初心者向け解説', slug: 'beginner-guide' }
]

// カテゴリ情報取得
function getCategoryInfo(categoryId: number) {
  return categories.find(cat => cat.id === categoryId)
}

// カテゴリ別記事取得関数
async function getArticlesByCategory(categoryId: number): Promise<ArticleWithRelations[]> {
  try {
    // article_categoriesテーブルを使用してカテゴリに関連付けられた記事を取得
    const { data: articleCategories, error: articleCategoriesError } = await supabase
      .from('article_categories')
      .select('article_id')
      .eq('category_id', categoryId)

    if (articleCategoriesError || !articleCategories) {
      console.error('記事カテゴリ取得エラー:', articleCategoriesError)
      return []
    }

    // 記事IDsを取得
    const articleIds = articleCategories.map(ac => ac.article_id)
    
    if (articleIds.length === 0) {
      return []
    }

    // 指定カテゴリの記事を取得
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .in('id', articleIds)
      .order('created_at', { ascending: false })

    if (articlesError || !articles) {
      console.error('記事取得エラー:', articlesError)
      return []
    }

    // 各記事に対して関連する動画とゲーム情報を取得
    const articlesWithRelations: ArticleWithRelations[] = []
    
    for (const article of articles) {
      // 関連動画データ取得
      const { data: video, error: videoError } = await supabase
        .from('videos')
        .select('*')
        .eq('id', article.video_id)
        .single()

      // ゲームデータ取得
      const { data: game, error: gameError } = await supabase
        .from('games')
        .select('*')
        .eq('id', article.game_id)
        .single()

      // 全データが正常に取得できた場合のみ追加
      if (video && game && !videoError && !gameError) {
        articlesWithRelations.push({
          article,
          video,
          game
        })
      }
    }

    return articlesWithRelations
  } catch (error) {
    console.error('カテゴリ別記事取得に失敗しました:', error)
    return []
  }
}

// メタデータ生成（SEO最適化）
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const categoryId = parseInt(id)
  const categoryInfo = getCategoryInfo(categoryId)
  
  if (!categoryInfo) {
    return {
      title: 'カテゴリが見つかりません',
      description: '指定されたカテゴリは存在しません。'
    }
  }

  return generateCategoryMetadata(
    categoryInfo.name,
    categoryInfo.description,
    categoryInfo.slug
  )
}

// YouTubeサムネイル取得関数
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// 記事カードコンポーネント
function ArticleCard({ data }: { data: ArticleWithRelations }) {
  const { article, video, game } = data
  const thumbnailUrl = video.thumbnail_url
  const createdDate = new Date(article.created_at).toLocaleDateString('ja-JP')

  return (
    <Link href={`/articles/${article.id}`} className="block group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* サムネイル画像 */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* ゲームバッジ */}
          <div className="absolute top-3 right-3">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {game.name}
            </span>
          </div>
          {/* 再生ボタンアイコン */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-70 rounded-full p-3 transition-all duration-300 group-hover:bg-opacity-80">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* 記事情報 */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
            {article.seo_title || article.title}
          </h2>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.meta_description || article.summary?.substring(0, 120) + '...' || 
             article.content.replace(/[#*\[\]]/g, '').substring(0, 120) + '...'}
          </p>

          {/* メタ情報 */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {createdDate}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {article.read_time}分
              </span>
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

// 関連カテゴリ表示コンポーネント
function RelatedCategories({ currentCategoryId }: { currentCategoryId: number }) {
  const relatedCategories = categories.filter(cat => cat.id !== currentCategoryId).slice(0, 3)

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">他のカテゴリも見る</h3>
      <div className="grid grid-cols-1 gap-3">
        {relatedCategories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
          >
            <span className="text-xl mr-3">{category.icon}</span>
            <div>
              <h4 className="font-medium text-gray-900">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// メインコンポーネント
export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const categoryId = parseInt(id)
  const categoryInfo = getCategoryInfo(categoryId)

  // カテゴリが存在しない場合は404
  if (!categoryInfo) {
    notFound()
  }

  const articlesData = await getArticlesByCategory(categoryId)

  // パンくずリストデータ
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: 'カテゴリ一覧', url: 'https://game-study-academy.com/#categories' },
    { name: categoryInfo.name, url: `https://game-study-academy.com/categories/${categoryId}` }
  ]

  return (
    <>
      {/* 構造化データ */}
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl mr-4">{categoryInfo.icon}</span>
                <h1 className="text-4xl font-bold text-gray-900">
                  {categoryInfo.name}
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {categoryInfo.description}の攻略記事一覧。<br />
                YouTube動画から学ぶ専門的な解説記事をまとめています。
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
                <Link href="/#categories" className="text-gray-500 hover:text-gray-700">
                  カテゴリ一覧
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">{categoryInfo.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 記事一覧 */}
            <div className="lg:col-span-3">
              {articlesData.length > 0 ? (
                <>
                  {/* 記事統計 */}
                  <div className="mb-8">
                    <p className="text-gray-600">
                      <span className="font-semibold text-red-600">{articlesData.length}</span>
                      件の{categoryInfo.name}記事が見つかりました
                    </p>
                  </div>

                  {/* 記事グリッド */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articlesData.map((data) => (
                      <ArticleCard key={data.article.id} data={data} />
                    ))}
                  </div>
                </>
              ) : (
                /* 記事がない場合 */
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">{categoryInfo.icon}</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {categoryInfo.name}の記事はまだありません
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {categoryInfo.description}の攻略記事を準備中です。<br />
                      しばらくお待ちください。
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/articles"
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        全記事を見る
                      </Link>
                      <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        ホームに戻る
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* 関連カテゴリ */}
                <RelatedCategories currentCategoryId={categoryId} />

                {/* カテゴリ情報 */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    このカテゴリについて
                  </h3>
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{categoryInfo.icon}</span>
                    <h4 className="font-medium text-gray-900">{categoryInfo.name}</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {categoryInfo.description}に関する攻略記事をまとめています。
                    YouTube動画から学んだ専門的な解説を文字で効率的に学習できます。
                  </p>
                </div>

                {/* 全カテゴリリンク */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    すべてのカテゴリ
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                          category.id === categoryId
                            ? 'bg-red-100 text-red-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* フッター情報 */}
        <div className="bg-white border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                📹 YouTube動画を見ながら学習することで、より効果的に{categoryInfo.name}を身につけることができます
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