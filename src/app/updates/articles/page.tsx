import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'

export function generateMetadata(): Metadata {
  return {
    title: '記事更新情報 - Game Study Academy',
    description: 'Game Study Academyの記事更新情報。新規攻略記事の追加、既存記事の更新、カテゴリ追加情報をお届け。エルデンリング・ナイトレイン攻略記事の最新情報をチェック。',
    keywords: [
      '記事更新',
      '攻略記事',
      '新規記事',
      'コンテンツ更新',
      'エルデンリング',
      'ナイトレイン',
      'YouTube攻略',
      '記事追加'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/updates/articles',
      siteName: 'Game Study Academy',
      title: '記事更新情報 - Game Study Academy',
      description: 'Game Study Academyの記事更新情報。新規攻略記事の追加、既存記事の更新、カテゴリ追加情報をお届け。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - 記事更新情報',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: '記事更新情報 - Game Study Academy',
      description: 'Game Study Academyの記事更新情報。新規攻略記事の追加、既存記事の更新、カテゴリ追加情報をお届け。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://game-study-academy.com/updates/articles',
    },
  }
}

const articleUpdates = [
  {
    id: 1,
    date: '2025-07-22',
    title: 'エルデンリング: DLC「影の地」ボス攻略記事 5本追加',
    description: 'DLC「影の地」の新ボス「メスメル」「バイル」「ロミナ」などの攻略記事を5本追加しました。弱点攻撃、推奨装備、戦術解説を詳細に掲載。',
    type: 'new-articles',
    game: 'elden-ring',
    count: 5,
    link: '/games/elden-ring/category13',
    featured: true
  },
  {
    id: 2,
    date: '2025-07-21',
    title: 'エルデンリング: エリア攻略記事 24本大量追加',
    description: '全エリアの完全攻略ガイドが完成。リムグレイブからファルム・アズラまで、各エリアの隠し要素、NPCイベント、アイテム取得方法を網羅した24本の記事を追加。',
    type: 'new-articles',
    game: 'elden-ring',
    count: 24,
    link: '/games/elden-ring/category10',
    featured: true
  },
  {
    id: 3,
    date: '2025-07-20',
    title: 'ナイトレイン: キャラ別解説記事 8本追加',
    description: '新キャラクター「アストレア」を含む全8キャラクターの詳細解説記事を追加。各キャラクターの特性、推奨戦術、協力プレイでの役割を詳しく解説。',
    type: 'new-articles',
    game: 'nightreign',
    count: 8,
    link: '/categories/2',
    featured: false
  },
  {
    id: 4,
    date: '2025-07-18',
    title: 'エルデンリング: 武器・防具関連記事を12本更新',
    description: '最新のバランス調整に対応して、武器・防具関連の記事12本を更新。DLC武器の新情報や既存武器の性能変更点も反映。',
    type: 'updated-articles',
    game: 'elden-ring',
    count: 12,
    link: '/games/elden-ring/category18',
    featured: false
  },
  {
    id: 5,
    date: '2025-07-15',
    title: 'ナイトレイン: 夜の王攻略記事を全面リニューアル',
    description: '「エデレ」「グラディウス」など主要な夜の王の攻略記事を全面的にリニューアル。新戦術パターンや協力プレイでの連携方法を追加。',
    type: 'updated-articles',
    game: 'nightreign',
    count: 6,
    link: '/categories/1',
    featured: false
  },
  {
    id: 6,
    date: '2025-07-12',
    title: '新カテゴリ「スーパープレイ」を追加',
    description: 'エルデンリングの高難度プレイ、RTA、縛りプレイなどの記事をまとめた新カテゴリ「スーパープレイ」を追加。上級者向けコンテンツが充実。',
    type: 'category',
    game: 'elden-ring',
    count: 3,
    link: '/games/elden-ring/category21',
    featured: false
  },
  {
    id: 7,
    date: '2025-07-10',
    title: 'エルデンリング: 初心者ガイド記事を5本追加',
    description: '初心者向けの基本解説記事を5本追加。ゲームの始め方、基本操作、序盤攻略のコツなど、これからエルデンリングを始める方に最適な内容。',
    type: 'new-articles',
    game: 'elden-ring',
    count: 5,
    link: '/games/elden-ring/category9',
    featured: false
  }
]

const getUpdateTypeStyle = (type: string) => {
  switch (type) {
    case 'new-articles':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'updated-articles':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'category':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getUpdateTypeLabel = (type: string) => {
  switch (type) {
    case 'new-articles':
      return '📝 新規記事'
    case 'updated-articles':
      return '🔄 記事更新'
    case 'category':
      return '🗂️ カテゴリ追加'
    default:
      return '📢 お知らせ'
  }
}

const getGameStyle = (game: string) => {
  switch (game) {
    case 'elden-ring':
      return 'bg-blue-100 text-blue-800'
    case 'nightreign':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getGameLabel = (game: string) => {
  switch (game) {
    case 'elden-ring':
      return '🔰 エルデンリング'
    case 'nightreign':
      return '🌙 ナイトレイン'
    default:
      return '🎮 全般'
  }
}

function UpdateCard({ update }: { update: any }) {
  const typeStyle = getUpdateTypeStyle(update.type)
  const typeLabel = getUpdateTypeLabel(update.type)
  const gameStyle = getGameStyle(update.game)
  const gameLabel = getGameLabel(update.game)

  if (update.featured) {
    return (
      <Link href={update.link} className="block group">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
          <div className="relative aspect-video overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-r ${update.game === 'elden-ring' ? 'from-blue-600 to-blue-700' : 'from-green-600 to-green-700'} flex items-center justify-center`}>
              <div className="text-center text-white">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold mb-2">攻略記事更新</h3>
                <p className="text-lg opacity-90">{update.count}本の記事を追加</p>
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                🔥 大型更新
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium border text-white bg-black bg-opacity-50">
                {typeLabel}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${gameStyle}`}>
                {gameLabel}
              </span>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {update.count}本
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(update.date).toLocaleDateString('ja-JP')}
                </span>
              </div>
            </div>
            <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:${update.game === 'elden-ring' ? 'text-blue-600' : 'text-green-600'} transition-colors`}>
              {update.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {update.description}
            </p>
            <div className={`inline-flex items-center ${update.game === 'elden-ring' ? 'text-blue-600 hover:text-blue-700' : 'text-green-600 hover:text-green-700'} font-medium transition-colors`}>
              記事を見る
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">📝</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${typeStyle}`}>
            {typeLabel}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-right">
          <span className={`px-2 py-1 rounded text-sm font-medium ${gameStyle}`}>
            {gameLabel}
          </span>
          {update.count && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              {update.count}本
            </span>
          )}
          <span className="text-sm text-gray-500">
            {new Date(update.date).toLocaleDateString('ja-JP')}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {update.title}
      </h3>
      
      <p className="text-gray-600 mb-4 leading-relaxed">
        {update.description}
      </p>
      
      {update.link && (
        <Link
          href={update.link}
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
        >
          記事を見る
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </Link>
      )}
    </div>
  )
}

export default async function ArticleUpdatesPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: 'アプデ情報', url: 'https://game-study-academy.com/updates' },
    { name: '記事更新', url: 'https://game-study-academy.com/updates/articles' }
  ]

  const featuredUpdates = articleUpdates.filter(update => update.featured)
  const otherUpdates = articleUpdates.filter(update => !update.featured)

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">📝</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  記事更新情報
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Game Study Academyの記事更新情報。<br />
                新規攻略記事の追加、既存記事の更新、新カテゴリ追加情報をお届けします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/articles"
                  className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  📚 全記事一覧
                </Link>
                <Link
                  href="/updates"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-green-600"
                >
                  🔔 全アプデ情報
                </Link>
              </div>
            </div>
          </div>
        </div>

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
                <Link href="/updates" className="text-gray-500 hover:text-gray-700">
                  アプデ情報
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-medium">記事更新</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {featuredUpdates.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                🔥 大型記事更新
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredUpdates.map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📢 その他の記事更新情報 ({otherUpdates.length}件)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
          </section>
        </div>

        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              📚 充実の攻略記事をチェック！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              YouTube動画から学ぶ攻略記事が続々追加中。<br />
              エルデンリング・ナイトレイン両方の最新攻略情報をお楽しみください！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 全記事一覧
              </Link>
              <Link
                href="/games/elden-ring"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-green-600"
              >
                🔰 エルデンリング記事
              </Link>
              <Link
                href="/games/nightreign"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-green-600"
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