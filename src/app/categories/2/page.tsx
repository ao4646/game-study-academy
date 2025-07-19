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

interface CharacterClass {
  id: number
  name: string
  slug: string
  description: string
  game_id: number
  created_at: string
  image_url: string | null
  icon_url: string | null
}

interface ArticleWithRelations {
  article: Article
  video: Video
  character_class: CharacterClass | null
}

// キャラ別解説記事取得関数
async function getCharacterGuideArticles(): Promise<ArticleWithRelations[]> {
  try {
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('game_id', 1) // ナイトレイン
      .not('related_classes_id', 'is', null)
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

      let character_class = null
      if (article.related_classes_id) {
        const { data: classData, error: classError } = await supabase
          .from('classes')
          .select('*')
          .eq('id', article.related_classes_id)
          .single()

        if (!classError) {
          character_class = classData
        }
      }

      if (video && !videoError) {
        articlesWithRelations.push({
          article,
          video,
          character_class
        })
      }
    }

    return articlesWithRelations
  } catch (error) {
    console.error('記事取得に失敗しました:', error)
    return []
  }
}

// ナイトレインクラス取得
async function getNightreignClasses(): Promise<CharacterClass[]> {
  try {
    const { data: classes, error } = await supabase
      .from('classes')
      .select('*')
      .eq('game_id', 1) // ナイトレイン
      .order('id')

    if (error || !classes) {
      console.error('クラス取得エラー:', error)
      return []
    }

    return classes
  } catch (error) {
    console.error('クラス取得に失敗しました:', error)
    return []
  }
}

// 無頼漢（ID:1）取得
async function getScoundrel(): Promise<CharacterClass | null> {
  try {
    const { data: character, error } = await supabase
      .from('classes')
      .select('*')
      .eq('id', 1)
      .single()

    if (error || !character) {
      console.error('無頼漢取得エラー:', error)
      return null
    }

    return character
  } catch (error) {
    console.error('無頼漢取得に失敗しました:', error)
    return null
  }
}

// メタデータ生成
export function generateMetadata(): Metadata {
  return {
    title: 'ナイトレイン キャラ別解説記事一覧 - Game Study Academy',
    description: 'エルデンリング：ナイトレイン（Elden Ring: Nightreign）のキャラ別解説記事一覧。無頼漢、追跡者、復讐者など各夜渡りキャラクターの詳細解説をYouTube動画から学習できます。',
    keywords: [
      'ナイトレイン',
      'Nightreign',
      'キャラ別解説',
      '夜渡り',
      '無頼漢',
      '追跡者',
      '復讐者',
      '鉄の目',
      'YouTube',
      '動画学習'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/categories/2',
      siteName: 'Game Study Academy',
      title: 'ナイトレイン キャラ別解説記事一覧 - Game Study Academy',
      description: 'エルデンリング：ナイトレイン（Elden Ring: Nightreign）のキャラ別解説記事一覧。各夜渡りキャラクターの詳細解説をYouTube動画から学習できます。',
    },
    alternates: {
      canonical: 'https://game-study-academy.com/categories/2',
    },
  }
}

// YouTubeサムネイル取得関数
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// 記事カードコンポーネント
function ArticleCard({ data }: { data: ArticleWithRelations }) {
  const { article, video, character_class } = data
  const thumbnailUrl = getYouTubeThumbnail(video.video_id)
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
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              キャラ別解説
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
          {character_class && (
            <div className="flex items-center mb-3">
              {character_class.image_url ? (
                <img
                  src={character_class.image_url}
                  alt={character_class.name}
                  className="w-8 h-8 object-cover rounded mr-2"
                />
              ) : (
                <span className="text-2xl mr-2">👤</span>
              )}
              <span className="text-lg font-bold text-blue-600">{character_class.name}</span>
            </div>
          )}
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
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

// キャラクタークラスカードコンポーネント
function CharacterCard({ character_class, articleCount }: { character_class: CharacterClass, articleCount: number }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {character_class.image_url ? (
            <img
              src={character_class.image_url}
              alt={character_class.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-bold text-gray-900 truncate">{character_class.name}</h4>
          <span className="text-sm text-gray-500">
            {articleCount}件の記事
          </span>
        </div>
      </div>
    </div>
  )
}

// メインコンポーネント
export default async function CharacterGuidePage() {
  const [articles, classes, scoundrel] = await Promise.all([
    getCharacterGuideArticles(),
    getNightreignClasses(),
    getScoundrel()
  ])

  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '記事一覧', url: 'https://game-study-academy.com/articles' },
    { name: 'ナイトレイン', url: 'https://game-study-academy.com/games/nightreign' },
    { name: 'キャラ別解説', url: 'https://game-study-academy.com/categories/2' }
  ]

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                {scoundrel?.image_url ? (
                  <img
                    src={scoundrel.image_url}
                    alt="無頼漢"
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border-2 border-white shadow-lg mr-4"
                  />
                ) : (
                  <span className="text-6xl mr-4">👤</span>
                )}
                <h1 className="text-4xl md:text-5xl font-bold">
                  キャラ別解説
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                ナイトレインの夜渡り（キャラクター）について詳しく解説。<br />
                各キャラの特性と効果的な使い方をYouTube動画から学習しましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/beginner/nightreign"
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  🌙 初心者ガイド
                </Link>
                <Link
                  href="/games/nightreign"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600"
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
                <span className="text-gray-900 font-medium">キャラ別解説</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* キャラクター一覧セクション */}
          {classes.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">👤 夜渡り（キャラクター）一覧</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {classes.map((character_class) => {
                  const articleCount = articles.filter(article => 
                    article.character_class?.id === character_class.id
                  ).length
                  return (
                    <CharacterCard 
                      key={character_class.id} 
                      character_class={character_class} 
                      articleCount={articleCount}
                    />
                  )
                })}
              </div>
            </section>
          )}

          {/* 解説記事一覧 */}
          {articles.length > 0 ? (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📖 キャラ別解説記事 ({articles.length}件)
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
                {scoundrel?.image_url ? (
                  <img
                    src={scoundrel.image_url}
                    alt="無頼漢"
                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 shadow-lg mx-auto"
                  />
                ) : (
                  <div className="text-6xl">👤</div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">キャラ別解説記事準備中</h2>
              <p className="text-gray-600 mb-8">
                キャラクター別の解説記事は現在準備中です。<br />
                リリース後に順次追加予定ですので、お楽しみに！
              </p>
              <Link
                href="/beginner/nightreign"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🌙 初心者ガイドを見る
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </Link>
            </section>
          )}
        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="flex items-center justify-center mb-4">
              {scoundrel?.image_url ? (
                <img
                  src={scoundrel.image_url}
                  alt="無頼漢"
                  className="w-12 h-12 object-cover rounded-lg border-2 border-white shadow-lg mr-3"
                />
              ) : (
                <span className="text-3xl mr-3">👤</span>
              )}
              <h2 className="text-3xl font-bold">
                あなたに最適なキャラを見つけよう！
              </h2>
            </div>
            <p className="text-xl mb-8 leading-relaxed">
              各キャラクターには独特のプレイスタイルと特殊能力があります。<br />
              YouTube動画で詳しい使い方を学んで、自分に合ったキャラを見つけましょう！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/beginner/nightreign"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                🌙 初心者ガイド
              </Link>
              <Link
                href="/games/nightreign"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600"
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