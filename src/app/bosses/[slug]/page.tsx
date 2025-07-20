import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
  related_boss_id: number | null
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

interface Boss {
  id: number
  name: string
  slug: string
  description: string
  weekpoints: string[] | null
  game_id: number
  created_at: string
  image_url: string | null
  thumbnail_url: string | null
}

interface ArticleWithRelations {
  article: Article
  video: Video
}

// ボス取得関数
async function getBossBySlug(slug: string): Promise<Boss | null> {
  try {
    const { data: boss, error } = await supabase
      .from('bosses')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !boss) {
      return null
    }

    return boss
  } catch (error) {
    console.error('ボス取得に失敗しました:', error)
    return null
  }
}

// ボス攻略記事取得関数
async function getBossArticles(bossId: number): Promise<ArticleWithRelations[]> {
  try {
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .eq('published', true)
      .eq('related_boss_id', bossId)
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

// メタデータ生成
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const boss = await getBossBySlug(slug)
  
  if (!boss) {
    return {
      title: 'ボスが見つかりません - Game Study Academy'
    }
  }

  return {
    title: `${boss.name}攻略記事一覧 - Game Study Academy`,
    description: `エルデンリング：ナイトレイン（Elden Ring: Nightreign）の${boss.name}攻略記事一覧。${boss.name}の詳細攻略法をYouTube動画から学習できます。`,
    keywords: [
      'ナイトレイン',
      'Nightreign',
      boss.name,
      'ボス攻略',
      '夜の王',
      'YouTube',
      '動画学習'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: `https://game-study-academy.com/bosses/${boss.slug}`,
      siteName: 'Game Study Academy',
      title: `${boss.name}攻略記事一覧 - Game Study Academy`,
      description: `エルデンリング：ナイトレイン（Elden Ring: Nightreign）の${boss.name}攻略記事一覧。詳細攻略法をYouTube動画から学習できます。`,
      images: boss.image_url ? [{ url: boss.image_url }] : undefined,
    },
    alternates: {
      canonical: `https://game-study-academy.com/bosses/${boss.slug}`,
    },
  }
}

// 記事カードコンポーネント
function ArticleCard({ data }: { data: ArticleWithRelations }) {
  const { article, video } = data
  const thumbnailUrl = video.thumbnail_url
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
              ボス攻略
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

// メインコンポーネント
export default async function BossDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const boss = await getBossBySlug(slug)
  
  if (!boss) {
    notFound()
  }

  const articles = await getBossArticles(boss.id)

  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '記事一覧', url: 'https://game-study-academy.com/articles' },
    { name: 'ナイトレイン', url: 'https://game-study-academy.com/games/nightreign' },
    { name: '夜の王攻略', url: 'https://game-study-academy.com/categories/1' },
    { name: boss.name, url: `https://game-study-academy.com/bosses/${boss.slug}` }
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
                {boss.image_url ? (
                  <img
                    src={boss.image_url}
                    alt={boss.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border-2 border-white shadow-lg mr-4"
                  />
                ) : (
                  <span className="text-6xl mr-4">👑</span>
                )}
                <h1 className="text-4xl md:text-5xl font-bold">
                  {boss.name}攻略
                </h1>
              </div>
              {boss.description && (
                <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto leading-relaxed">
                  {boss.description}
                </p>
              )}
              {boss.weekpoints && boss.weekpoints.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <span className="text-lg font-medium text-white mb-2">弱点:</span>
                  {boss.weekpoints.map((point, index) => (
                    <span
                      key={index}
                      className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/categories/1"
                  className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  👑 夜の王攻略一覧
                </Link>
                <Link
                  href="/beginner/nightreign"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
                >
                  🌙 初心者ガイド
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
                <Link href="/categories/1" className="text-gray-500 hover:text-gray-700">
                  夜の王攻略
                </Link>
              </li>
              <li><span className="text-gray-400">/</span></li>
              <li>
                <span className="text-gray-900 font-medium">{boss.name}</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 攻略記事一覧 */}
          {articles.length > 0 ? (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                ⚔️ {boss.name}攻略記事 ({articles.length}件)
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
                {boss.image_url ? (
                  <img
                    src={boss.image_url}
                    alt={boss.name}
                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 shadow-lg mx-auto"
                  />
                ) : (
                  <div className="text-6xl">👑</div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{boss.name}攻略記事準備中</h2>
              <p className="text-gray-600 mb-8">
                {boss.name}の攻略記事は現在準備中です。<br />
                リリース後に順次追加予定ですので、お楽しみに！
              </p>
              <Link
                href="/categories/1"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                👑 他の夜の王攻略を見る
                <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </Link>
            </section>
          )}
        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="flex items-center justify-center mb-4">
              {boss.image_url ? (
                <img
                  src={boss.image_url}
                  alt={boss.name}
                  className="w-12 h-12 object-cover rounded-lg border-2 border-white shadow-lg mr-3"
                />
              ) : (
                <span className="text-3xl mr-3">👑</span>
              )}
              <h2 className="text-3xl font-bold">
                {boss.name}を攻略しよう！
              </h2>
            </div>
            <p className="text-xl mb-8 leading-relaxed">
              YouTube動画で戦術を学んでから挑戦することで、勝率が大幅に向上します！<br />
              他の夜の王攻略も併せてチェックしてみてください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/categories/1"
                className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                👑 夜の王攻略一覧
              </Link>
              <Link
                href="/beginner/nightreign"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
              >
                🌙 初心者ガイド
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}