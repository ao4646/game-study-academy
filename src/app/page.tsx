import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { generateHomeMetadata } from '@/lib/metadata'
import AdminFloatingButton from '@/components/AdminFloatingButton'

// Supabaseクライアント設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// 型定義（記事一覧ページと同じ）
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

interface ArticleWithRelations {
  article: Article
  video: Video
  game: Game
}

// メタデータ生成（SEO最適化）
export function generateMetadata(): Metadata {
  return generateHomeMetadata()
}

// ゲーム別最新記事取得関数
async function getFeaturedArticlesByGame(gameId: number, limit: number = 3): Promise<ArticleWithRelations[]> {
  try {
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('game_id', gameId)
      .order('created_at', { ascending: false })
      .limit(limit)

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
        .select('category_id, categories(name)')
        .eq('article_id', article.id)

      let categoryName = 'カテゴリ未設定'
      if (articleCategories && articleCategories.length > 0) {
        const firstCategory = articleCategories[0] as any
        if (firstCategory.categories && firstCategory.categories.name) {
          categoryName = firstCategory.categories.name
        } else {
          // フォールバック: カテゴリIDから名前を取得
          categoryName = getCategoryName(firstCategory.category_id)
        }
      }

      if (video && game && !videoError && !gameError) {
        articlesWithRelations.push({
          article: { ...article, categoryName },
          video,
          game
        })
      }
    }

    return articlesWithRelations
  } catch (error) {
    console.error('注目記事取得に失敗しました:', error)
    return []
  }
}

// 全ゲームの最新記事取得関数（混合表示用）
async function getAllFeaturedArticles(limit: number = 4): Promise<ArticleWithRelations[]> {
  try {
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit)

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
        .select('category_id, categories(name)')
        .eq('article_id', article.id)

      let categoryName = 'カテゴリ未設定'
      if (articleCategories && articleCategories.length > 0) {
        const firstCategory = articleCategories[0] as any
        if (firstCategory.categories && firstCategory.categories.name) {
          categoryName = firstCategory.categories.name
        } else {
          // フォールバック: カテゴリIDから名前を取得
          categoryName = getCategoryName(firstCategory.category_id)
        }
      }

      if (video && game && !videoError && !gameError) {
        articlesWithRelations.push({
          article: { ...article, categoryName },
          video,
          game
        })
      }
    }

    return articlesWithRelations
  } catch (error) {
    console.error('注目記事取得に失敗しました:', error)
    return []
  }
}

// YouTubeサムネイル取得関数
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// カテゴリ名変換関数
function getCategoryName(categoryId: number): string {
  const categoryNames: { [key: number]: string } = {
    1: '夜の王攻略',
    2: 'キャラ別解説', 
    3: '戦術',
    4: '地変攻略',
    5: '小ネタ・裏技',
    6: 'ストーリー(追憶)',
    7: '考察系',
    8: '初心者ガイド'
  }
  return categoryNames[categoryId] || `カテゴリ${categoryId}`
}

// ゲーム別カテゴリデータ
const nightreignCategories = [
  { id: 1, name: '夜の王攻略', icon: '⚔️', description: 'ボス攻略の必勝法', gameId: 1 },
  { id: 2, name: 'キャラ別解説', icon: '👤', description: 'キャラ性能と使い方', gameId: 1 },
  { id: 3, name: '戦術', icon: '🛡️', description: '戦闘テクニック', gameId: 1 },
  { id: 4, name: '地変攻略', icon: '🏔️', description: 'ダンジョン攻略法', gameId: 1 },
  { id: 5, name: '小ネタ・裏技', icon: '💡', description: '知って得する情報', gameId: 1 },
  { id: 6, name: 'ストーリー(追憶)', icon: '📖', description: 'ストーリー解説', gameId: 1 },
  { id: 7, name: '考察系', icon: '🤔', description: '深い分析と考察', gameId: 1 },
  { id: 8, name: '初心者ガイド', icon: '📚', description: '初心者向け解説', gameId: 1 }
]

const eldenRingCategories = [
  { id: 9, name: '初心者ガイド', icon: '🔰', description: '初心者向け基本解説', gameId: 2 },
  { id: 10, name: 'エリア攻略', icon: '🗺️', description: 'マップエリア攻略', gameId: 2 },
  { id: 11, name: 'エリア攻略(DLC)', icon: '✨', description: 'DLCエリア攻略', gameId: 2 },
  { id: 12, name: 'ボス攻略', icon: '⚔️', description: 'ボス戦攻略法', gameId: 2 },
  { id: 13, name: 'ボス攻略(DLC)', icon: '👑', description: 'DLCボス攻略', gameId: 2 },
  { id: 14, name: 'イベント攻略', icon: '📅', description: 'イベント攻略法', gameId: 2 },
  { id: 15, name: 'イベント攻略(DLC)', icon: '🎭', description: 'DLCイベント攻略', gameId: 2 },
  { id: 16, name: '小ネタ・裏技', icon: '💡', description: '知って得する情報', gameId: 2 },
  { id: 17, name: '戦技・遺灰関連', icon: '🌟', description: '戦技と遺灰解説', gameId: 2 },
  { id: 18, name: '武器・防具関連', icon: '⚔️', description: '装備品解説', gameId: 2 },
  { id: 19, name: '考察系動画', icon: '🤔', description: '深い分析と考察', gameId: 2 },
  { id: 20, name: 'オンライン関連', icon: '🌐', description: 'マルチプレイ解説', gameId: 2 },
  { id: 21, name: 'スーパープレイ', icon: '🏃', description: 'RTAなど高難度プレイ', gameId: 2 }
]

// 注目記事カードコンポーネント
function FeaturedArticleCard({ data, featured = false }: { data: ArticleWithRelations, featured?: boolean }) {
  const { article, video, game } = data
  const thumbnailUrl = getYouTubeThumbnail(video.video_id)
  const categoryName = article.categoryName || getCategoryName(article.category_id)
  const createdDate = new Date(article.created_at).toLocaleDateString('ja-JP')

  if (featured) {
    return (
      <Link href={`/articles/${article.id}`} className="block group">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={thumbnailUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                🔥 注目記事
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black bg-opacity-70 rounded-full p-4 transition-all duration-300 group-hover:bg-opacity-80 group-hover:scale-110">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {categoryName}
              </span>
              <span className="text-sm text-gray-500">{article.read_time}分</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
              {article.seo_title || article.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {article.meta_description || article.summary?.substring(0, 100) + '...' || ''}
            </p>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/articles/${article.id}`} className="block group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {categoryName}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-60 rounded-full p-3 transition-all duration-300 group-hover:bg-opacity-75">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
            {article.seo_title || article.title}
          </h4>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{createdDate}</span>
            <span>{article.read_time}分</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// カテゴリカードコンポーネント
function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/categories/${category.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-red-500">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-3">{category.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
            {category.name}
          </h3>
        </div>
        <p className="text-gray-600 text-sm">
          {category.description}
        </p>
      </div>
    </Link>
  )
}

// メインコンポーネント
export default async function HomePage() {
  // 両ゲームの記事を取得
  const [eldenRingArticles, nightreignArticles, allFeaturedArticles] = await Promise.all([
    getFeaturedArticlesByGame(2, 3), // エルデンリング
    getFeaturedArticlesByGame(1, 3), // ナイトレイン
    getAllFeaturedArticles(3) // 全体の注目記事（3列表示用）
  ])

  return (
    <>
      {/* 構造化データ */}
      <StructuredData type="website" />
      
      <div className="min-h-screen bg-gray-50">
        {/* ヒーローセクション */}
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="block">Game Study</span>
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Academy
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                <span className="block mb-2">🎮 YouTube動画から学ぶゲーム徹底攻略</span>
                <span className="block text-red-200">エルデンリング・ナイトレインの攻略情報を文字&動画で学習</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/articles"
                  className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-lg"
                >
                  📚 攻略記事を見る
                </Link>
                <Link
                  href="/beginner"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
                >
                  🔰 エルデンリング初心者ガイド
                </Link>
                <Link
                  href="/beginner/nightreign"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
                >
                  🌙 ナイトレイン初心者ガイド
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* サイトの特徴 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              なぜGame Study Academyが選ばれるのか
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">厳選された高品質コンテンツ</h3>
                <p className="text-gray-600">
                  実況者の動画から学べる、本当に役立つ攻略法だけを厳選してお届け
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">スキマ時間で効率学習</h3>
                <p className="text-gray-600">
                  記事を読んでから学習することで、動画の理解度UP！一回見れば全部わかる！
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">YouTuber応援型サイト</h3>
                <p className="text-gray-600">
                  元動画の理解促進を促す記事で、クリエイターの利益も守る。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 注目記事セクション */}
        {allFeaturedArticles.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🔥 注目の攻略記事</h2>
                <p className="text-xl text-gray-600">
                  プロ実況者から学ぶ、最新の攻略テクニック
                </p>
              </div>
              
              {/* 3列1行レイアウト */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {allFeaturedArticles.map((data) => (
                  <FeaturedArticleCard key={data.article.id} data={data} featured={false} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/articles"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  すべての記事を見る
                  <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ゲーム別記事セクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">📚 ゲーム別最新記事</h2>
              <p className="text-xl text-gray-600">
                各ゲームの最新攻略情報をチェック
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* エルデンリングセクション */}
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">エルデンリング (ELDEN RING)</h3>
                  <p className="text-gray-600">FromSoftwareのアクションRPG傑作</p>
                </div>
                
                {eldenRingArticles.length > 0 ? (
                  <div className="space-y-4">
                    {eldenRingArticles.map((data) => (
                      <FeaturedArticleCard key={data.article.id} data={data} />
                    ))}
                    <div className="text-center">
                      <Link
                        href="/articles?game=elden-ring"
                        className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                      >
                        エルデンリングの記事をもっと見る
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">エルデンリングの記事は準備中です</p>
                  </div>
                )}
              </div>

              {/* ナイトレインセクション */}
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">ナイトレイン (NIGHT REIGN)</h3>
                  <p className="text-gray-600">FromSoftware最新協力型アクションRPG</p>
                </div>
                
                {nightreignArticles.length > 0 ? (
                  <div className="space-y-4">
                    {nightreignArticles.map((data) => (
                      <FeaturedArticleCard key={data.article.id} data={data} />
                    ))}
                    <div className="text-center">
                      <Link
                        href="/articles?game=nightreign"
                        className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                      >
                        ナイトレインの記事をもっと見る
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">ナイトレインの記事は準備中です</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* カテゴリナビゲーション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">📖 攻略カテゴリ</h2>
              <p className="text-xl text-gray-600">
                あなたの学びたい分野を選んでください
              </p>
            </div>
            
            {/* ナイトレインカテゴリ */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">ナイトレイン (NIGHT REIGN)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nightreignCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* エルデンリングカテゴリ */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">エルデンリング (ELDEN RING)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {eldenRingCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              🎮 今すぐゲーム攻略を始めよう！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              エルデンリング・ナイトレイン両方の攻略情報が満載。<br />
              実況者たちの技術を学んで、あなたのゲームスキルを次のレベルへ。<br />
              記事と動画を両方見ることで、クリエイターの皆さんも応援しよう！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 記事一覧を見る
              </Link>
              <Link
                href="/beginner"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
              >
                🔰 エルデンリング初心者ガイド
              </Link>
              <Link
                href="/beginner/nightreign"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
              >
                🌙 ナイトレイン初心者ガイド
              </Link>
            </div>
          </div>
        </section>

        {/* フッター */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Game Study Academy</h3>
                <p className="text-gray-400 leading-relaxed">
                  YouTube動画から学ぶゲーム徹底攻略サイト。<br />
                  実況者の知識とテクニックを文字で学習できます。
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">攻略カテゴリ</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="#" className="hover:text-white transition-colors">夜の王攻略</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">キャラ別解説</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">戦術</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">地変攻略</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">サイト情報</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/articles" className="hover:text-white transition-colors">記事一覧</Link></li>
                  <li><Link href="/beginner" className="hover:text-white transition-colors">エルデンリング初心者ガイド</Link></li>
                  <li><Link href="/beginner/nightreign" className="hover:text-white transition-colors">ナイトレイン初心者ガイド</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">サイトについて</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">お問い合わせ</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Game Study Academy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      
      {/* 管理人アクセスボタン */}
      <AdminFloatingButton />
    </>
  )
}