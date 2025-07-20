import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'
import { notFound } from 'next/navigation'

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
  related_boss_id: number | null
  related_classes_id: number | null
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
  created_at: string
}

interface Boss {
  id: number
  name: string
  slug: string
  description: string
  difficulty: number
  game_id: number
  image_url: string | null
  thumbnail_url: string | null
}

interface CharacterClass {
  id: number
  name: string
  slug: string
  description: string
  game_id: number
  image_url: string | null
  icon_url: string | null
}

interface ArticleWithRelations {
  article: Article
  video: Video
  game: Game
  boss: Boss | null
  character_class: CharacterClass | null
}

// 指定日の記事取得
async function getArticlesByDate(date: string): Promise<ArticleWithRelations[]> {
  try {
    // 日付の形式をチェック
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) {
      return []
    }

    const startOfDay = `${date} 00:00:00`
    const endOfDay = `${date} 23:59:59`

    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .gte('created_at', startOfDay)
      .lte('created_at', endOfDay)
      .order('created_at', { ascending: false })

    if (articlesError || !articles) {
      console.error('記事取得エラー:', articlesError)
      return []
    }

    const articlesWithRelations: ArticleWithRelations[] = []
    
    for (const article of articles) {
      // ビデオ情報を取得
      const { data: video, error: videoError } = await supabase
        .from('videos')
        .select('*')
        .eq('id', article.video_id)
        .single()

      if (videoError || !video) {
        console.error('ビデオ取得エラー:', videoError)
        continue
      }

      // ゲーム情報を取得
      const { data: game, error: gameError } = await supabase
        .from('games')
        .select('*')
        .eq('id', article.game_id)
        .single()

      if (gameError || !game) {
        console.error('ゲーム取得エラー:', gameError)
        continue
      }

      // ボス情報を取得（もしあれば）
      let boss = null
      if (article.related_boss_id) {
        const { data: bossData, error: bossError } = await supabase
          .from('bosses')
          .select('*')
          .eq('id', article.related_boss_id)
          .single()

        if (!bossError && bossData) {
          boss = bossData
        }
      }

      // キャラクター情報を取得（もしあれば）
      let character_class = null
      if (article.related_classes_id) {
        const { data: classData, error: classError } = await supabase
          .from('classes')
          .select('*')
          .eq('id', article.related_classes_id)
          .single()

        if (!classError && classData) {
          character_class = classData
        }
      }

      articlesWithRelations.push({
        article,
        video,
        game,
        boss,
        character_class
      })
    }

    return articlesWithRelations
  } catch (error) {
    console.error('記事取得に失敗しました:', error)
    return []
  }
}

// メタデータ生成
export function generateMetadata({ params }: { params: { date: string } }): Metadata {
  const formattedDate = formatDateForDisplay(params.date)
  
  return {
    title: `${formattedDate}の記事一覧 - Game Study Academy`,
    description: `${formattedDate}に投稿されたゲーム攻略記事の一覧。エルデンリング：ナイトレインを中心とした攻略情報をYouTube動画から学習できます。`,
    keywords: [
      'ゲーム攻略',
      'ナイトレイン',
      'Nightreign',
      '記事一覧',
      formattedDate,
      'YouTube',
      '動画学習'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: `https://game-study-academy.com/articles/date/${params.date}`,
      siteName: 'Game Study Academy',
      title: `${formattedDate}の記事一覧 - Game Study Academy`,
      description: `${formattedDate}に投稿されたゲーム攻略記事の一覧。`,
    },
    alternates: {
      canonical: `https://game-study-academy.com/articles/date/${params.date}`,
    },
  }
}

// 日付フォーマット関数
function formatDateForDisplay(date: string): string {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// YouTubeサムネイル取得関数
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}

// 記事カードコンポーネント
function ArticleCard({ data }: { data: ArticleWithRelations }) {
  const { article, video, game, boss, character_class } = data
  const thumbnailUrl = video.thumbnail_url
  const createdDate = new Date(article.created_at).toLocaleDateString('ja-JP')

  // カテゴリーとカラーを決定
  let categoryName = 'ゲーム攻略'
  let categoryColor = 'bg-gray-600'
  
  if (boss) {
    categoryName = '夜の王攻略'
    categoryColor = 'bg-red-600'
  } else if (character_class) {
    categoryName = 'キャラ別解説'
    categoryColor = 'bg-blue-600'
  }

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
            <span className={`${categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
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
          {(boss || character_class) && (
            <div className="flex items-center mb-3">
              {boss?.image_url ? (
                <img
                  src={boss.image_url}
                  alt={boss.name}
                  className="w-8 h-8 object-cover rounded mr-2"
                />
              ) : character_class?.image_url ? (
                <img
                  src={character_class.image_url}
                  alt={character_class.name}
                  className="w-8 h-8 object-cover rounded mr-2"
                />
              ) : (
                <span className="text-2xl mr-2">{boss ? '👑' : '👤'}</span>
              )}
              <span className={`text-lg font-bold ${boss ? 'text-red-600' : 'text-blue-600'}`}>
                {boss?.name || character_class?.name}
              </span>
            </div>
          )}
          
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
              <span className="text-orange-600 font-medium">{game.name}</span>
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
export default async function DateArticlesPage({ params }: { params: { date: string } }) {
  const articles = await getArticlesByDate(params.date)
  const formattedDate = formatDateForDisplay(params.date)

  // 記事がない場合は404
  if (articles.length === 0) {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '記事一覧', url: 'https://game-study-academy.com/articles' },
    { name: formattedDate, url: `https://game-study-academy.com/articles/date/${params.date}` }
  ]

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">📅</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  {formattedDate}の記事
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                {formattedDate}に投稿された{articles.length}件の記事一覧<br />
                ゲーム攻略情報をYouTube動画から効率的に学習しましょう
              </p>
              <Link
                href="/articles"
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 全記事一覧を見る
              </Link>
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
                <span className="text-gray-900 font-medium">{formattedDate}</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* 記事一覧 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              📖 {formattedDate}の記事 ({articles.length}件)
            </h2>
            <p className="text-gray-600">
              この日に投稿されたゲーム攻略記事をすべて表示しています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((data) => (
              <ArticleCard key={data.article.id} data={data} />
            ))}
          </div>
        </div>

        {/* 関連リンク */}
        <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              📚 他の記事も探してみよう
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              Game Study Academyには他にも多くの攻略記事があります。<br />
              あなたのゲームライフをさらに充実させる情報を見つけてください！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 全記事一覧
              </Link>
              <Link
                href="/games/nightreign"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-orange-600"
              >
                🌙 ナイトレイン記事
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}