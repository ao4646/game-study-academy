import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'

// Supabaseクライアント設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// メタデータ生成
export function generateMetadata(): Metadata {
  return {
    title: '星のカービィ ディスカバリー攻略 | Game Study Academy',
    description: '星のカービィ ディスカバリーの攻略情報をYouTube動画から学習。ワープスターと立体アクションを使った冒険の攻略法、ボス戦、隠し要素まで詳しく解説。',
    keywords: '星のカービィ ディスカバリー,攻略,YouTube,動画解説,任天堂,Nintendo Switch',
    openGraph: {
      title: '星のカービィ ディスカバリー攻略 | Game Study Academy',
      description: '星のカービィ ディスカバリーの攻略情報をYouTube動画から学習',
      type: 'website',
      url: 'https://game-study-academy.com/games/kirby-discovery'
    }
  }
}

// 型定義
interface Article {
  id: number
  title: string
  summary: string
  created_at: string
  read_time: number
  seo_title: string | null
  meta_description: string | null
  categoryName?: string
}

interface Video {
  id: number
  video_id: string
  title: string
  channel_title: string
  thumbnail_url: string
}

interface ArticleWithRelations {
  article: Article
  video: Video
}

// カテゴリ定義
const kirbyCategories = [
  { id: 22, name: '基本操作・システム', icon: '🎮', description: 'ゲーム基本操作とシステム解説', slug: 'basics' },
  { id: 23, name: 'エリア攻略', icon: '🗺️', description: '各エリアの攻略法とルート', slug: 'areas' },
  { id: 24, name: 'ボス攻略', icon: '👹', description: 'ボス戦の攻略テクニック', slug: 'bosses' },
  { id: 25, name: 'ほおばりヘンケイ', icon: '🚗', description: 'ほおばりヘンケイの使い方', slug: 'copy-abilities' },
  { id: 26, name: 'コピー能力', icon: '⭐', description: 'コピー能力の詳細解説', slug: 'abilities' },
  { id: 27, name: '隠し要素・収集', icon: '💎', description: '隠しアイテムと収集要素', slug: 'secrets' },
  { id: 28, name: '完全攻略', icon: '🏆', description: '100%クリアを目指す攻略', slug: 'completion' },
  { id: 29, name: '小ネタ・裏技', icon: '💡', description: '知って得する小技集', slug: 'tips' }
]

// 最新記事取得関数
async function getLatestArticles(limit: number = 6): Promise<ArticleWithRelations[]> {
  try {
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('game_id', 3) // 星のカービィ ディスカバリーのID
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

      if (video && !videoError) {
        articlesWithRelations.push({
          article,
          video
        })
      }
    }

    return articlesWithRelations
  } catch (error) {
    console.error('記事取得に失敗しました:', error)
    return []
  }
}

// 記事カードコンポーネント
function ArticleCard({ data }: { data: ArticleWithRelations }) {
  const { article, video } = data
  const createdDate = new Date(article.created_at).toLocaleDateString('ja-JP')

  return (
    <Link href={`/articles/${article.id}`} className="block group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnail_url}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              {article.categoryName || 'カテゴリ未設定'}
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
          <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {article.seo_title || article.title}
          </h4>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {article.meta_description || article.summary}
          </p>
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
    <Link href={`/games/kirby-discovery/${category.slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-l-4 border-pink-500">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-3">{category.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
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
export default async function KirbyDiscoveryPage() {
  const latestArticles = await getLatestArticles(6)

  return (
    <>
      {/* 構造化データ */}
      <StructuredData type="website" />
      
      <div className="min-h-screen bg-gray-50">
        {/* ヒーローセクション */}
        <section className="bg-gradient-to-br from-pink-500 via-pink-600 to-pink-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="block">星のカービィ</span>
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  ディスカバリー
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                <span className="block mb-2">🌟 YouTube動画から学ぶカービィ完全攻略</span>
                <span className="block text-pink-200">ほおばりヘンケイと立体アクションで新世界を冒険</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/articles?game=kirby-discovery"
                  className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-lg"
                >
                  📚 攻略記事を見る
                </Link>
                <Link
                  href="/games/kirby-discovery/basics"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-pink-600"
                >
                  🎮 基本操作ガイド
                </Link>
                <Link
                  href="/games/kirby-discovery/completion"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-pink-600"
                >
                  🏆 100%攻略
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 最新記事セクション */}
        {latestArticles.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">🌟 最新攻略記事</h2>
                <p className="text-xl text-gray-600">
                  実況者から学ぶ、カービィディスカバリーの最新攻略テクニック
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {latestArticles.map((data) => (
                  <ArticleCard key={data.article.id} data={data} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/articles?game=kirby-discovery"
                  className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors"
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

        {/* カテゴリナビゲーション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">📖 攻略カテゴリ</h2>
              <p className="text-xl text-gray-600">
                あなたの学びたい分野を選んでください
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kirbyCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* ゲーム特徴セクション */}
        <section className="py-16 bg-gradient-to-r from-pink-600 to-pink-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              🌟 カービィディスカバリーの魅力
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              3Dアクションになったカービィの新たな冒険！<br />
              ほおばりヘンケイや立体的なアクションを使って、<br />
              謎に満ちた「新世界」を探索しよう。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl mb-2">🚗</div>
                <h3 className="text-lg font-semibold mb-2">ほおばりヘンケイ</h3>
                <p className="text-pink-200 text-sm">車や階段などをほおばって変身</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌍</div>
                <h3 className="text-lg font-semibold mb-2">3D世界探索</h3>
                <p className="text-pink-200 text-sm">立体的なステージでの冒険</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <h3 className="text-lg font-semibold mb-2">新コピー能力</h3>
                <p className="text-pink-200 text-sm">ドリルやレンジャーなど新能力</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
              <Link
                href="/articles?game=kirby-discovery"
                className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 whitespace-nowrap"
              >
                📚 記事一覧を見る
              </Link>
              <Link
                href="/games/kirby-discovery/basics"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-pink-600 whitespace-nowrap"
              >
                🎮 基本操作ガイド
              </Link>
              <Link
                href="/games/kirby-discovery/secrets"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-pink-600 whitespace-nowrap"
              >
                💎 隠し要素ガイド
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}