import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'

// メタデータ生成
export function generateMetadata(): Metadata {
  return {
    title: 'アプデ情報・最新情報 - Game Study Academy',
    description: 'エルデンリング・ナイトレインの最新アップデート情報、DLC情報、メンテナンス情報をお届け。ゲームの最新動向をいち早くチェックしましょう。',
    keywords: [
      'アプデ情報',
      'アップデート',
      '最新情報',
      'エルデンリング',
      'ナイトレイン',
      'DLC',
      'メンテナンス',
      'パッチノート',
      'ゲーム情報'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/updates',
      siteName: 'Game Study Academy',
      title: 'アプデ情報・最新情報 - Game Study Academy',
      description: 'エルデンリング・ナイトレインの最新アップデート情報、DLC情報、メンテナンス情報をお届け。ゲームの最新動向をいち早くチェックしましょう。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - アプデ情報・最新情報',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'アプデ情報・最新情報 - Game Study Academy',
      description: 'エルデンリング・ナイトレインの最新アップデート情報、DLC情報、メンテナンス情報をお届け。ゲームの最新動向をいち早くチェックしましょう。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://game-study-academy.com/updates',
    },
  }
}

// 更新情報データ
const updateNews = [
  {
    id: 1,
    date: '2025-07-22',
    title: 'エルデンリング: DLC「影の地」追加コンテンツ情報',
    description: '新たなボス「メスメル」の攻略記事を追加。弱点攻撃の詳細解説や推奨装備について詳しく解説しています。',
    type: 'dlc',
    game: 'elden-ring',
    link: '/games/elden-ring',
    featured: true,
    image: 'https://img.youtube.com/vi/placeholder/maxresdefault.jpg'
  },
  {
    id: 2,
    date: '2025-07-22',
    title: 'ナイトレイン: 新キャラクター追加情報',
    description: '協力プレイ専用の新キャラクターが追加されました。各キャラクターの特性と使い方ガイドを更新中です。',
    type: 'update',
    game: 'nightreign',
    link: '/games/nightreign',
    featured: true,
    image: 'https://img.youtube.com/vi/placeholder2/maxresdefault.jpg'
  },
  {
    id: 3,
    date: '2025-07-21',
    title: 'サイト機能アップデート: 検索機能強化',
    description: '複数ワード検索に対応し、検索結果数を増加しました。より効率的に記事を見つけられるようになりました。',
    type: 'site',
    game: null,
    link: '/articles',
    featured: false
  },
  {
    id: 4,
    date: '2025-07-21',
    title: 'エルデンリング: エリア攻略記事大幅追加',
    description: '24本の新しいエリア攻略記事を追加。全エリアの完全攻略ガイドが完成しました。',
    type: 'content',
    game: 'elden-ring',
    link: '/games/elden-ring/category10',
    featured: false
  }
]

// 更新タイプ別のスタイル
const getUpdateTypeStyle = (type: string) => {
  switch (type) {
    case 'dlc':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'update':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'site':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'content':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getUpdateTypeLabel = (type: string) => {
  switch (type) {
    case 'dlc':
      return '🔥 DLC情報'
    case 'update':
      return '⚡ アップデート'
    case 'site':
      return '🔧 サイト更新'
    case 'content':
      return '📝 記事追加'
    default:
      return '📢 お知らせ'
  }
}

const getGameIcon = (game: string | null) => {
  switch (game) {
    case 'elden-ring':
      return '🔰'
    case 'nightreign':
      return '🌙'
    default:
      return '🎮'
  }
}

// 更新情報カードコンポーネント
function UpdateCard({ update }: { update: any }) {
  const typeStyle = getUpdateTypeStyle(update.type)
  const typeLabel = getUpdateTypeLabel(update.type)
  const gameIcon = getGameIcon(update.game)

  // 注目記事（ゲーム関連）のスタイル
  if (update.featured && (update.game === 'elden-ring' || update.game === 'nightreign')) {
    const isEldenRing = update.game === 'elden-ring'
    
    return (
      <Link href={update.link} className="block group">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
          <div className="relative aspect-video overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-r ${isEldenRing ? 'from-blue-600 to-blue-700' : 'from-purple-600 to-purple-700'} flex items-center justify-center`}>
              <div className="text-center text-white">
                <div className="text-6xl mb-4">{gameIcon}</div>
                <h3 className="text-2xl font-bold mb-2">{isEldenRing ? 'エルデンリング' : 'ナイトレイン'}</h3>
                <p className="text-lg opacity-90">最新アップデート情報</p>
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                🔥 重要情報
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${isEldenRing ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                {isEldenRing ? 'エルデンリング' : 'ナイトレイン'}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(update.date).toLocaleDateString('ja-JP')}
              </span>
            </div>
            <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:${isEldenRing ? 'text-blue-600' : 'text-purple-600'} transition-colors`}>
              {update.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {update.description}
            </p>
            <div className={`inline-flex items-center ${isEldenRing ? 'text-blue-600 hover:text-blue-700' : 'text-purple-600 hover:text-purple-700'} font-medium transition-colors`}>
              詳細を見る
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // 通常の更新情報
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{gameIcon}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${typeStyle}`}>
            {typeLabel}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(update.date).toLocaleDateString('ja-JP')}
        </span>
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
          className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
        >
          詳細を見る
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </Link>
      )}
    </div>
  )
}

// メインコンポーネント
export default async function UpdatesPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: 'アプデ情報', url: 'https://game-study-academy.com/updates' }
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
                <span className="text-6xl mr-4">🔔</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  アプデ情報・最新情報
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                エルデンリング・ナイトレインの最新アップデート情報から<br />
                サイトの新機能まで、ゲームの最新動向をお届けします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/games/elden-ring"
                  className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  🔰 エルデンリング
                </Link>
                <Link
                  href="/games/nightreign"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
                >
                  🌙 ナイトレイン
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
                <span className="text-gray-900 font-medium">アプデ情報</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 注目ゲーム情報 */}
          {updateNews.some(update => update.featured) && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                🔥 重要なゲーム情報
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {updateNews
                  .filter(update => update.featured && (update.game === 'elden-ring' || update.game === 'nightreign'))
                  .map((update) => (
                    <UpdateCard key={update.id} update={update} />
                  ))}
              </div>
            </section>
          )}

          {/* その他の更新情報 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📢 その他の更新情報 ({updateNews.filter(update => !update.featured).length}件)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {updateNews
                .filter(update => !update.featured)
                .map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
            </div>
          </section>

          {/* 情報カテゴリ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🏷️ 情報カテゴリ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/games/elden-ring"
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300"
              >
                <div className="text-3xl mb-3">🔰</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">エルデンリング</h3>
                <p className="text-sm text-gray-600">DLC・アップデート情報</p>
              </Link>
              
              <Link
                href="/games/nightreign"
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300"
              >
                <div className="text-3xl mb-3">🌙</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ナイトレイン</h3>
                <p className="text-sm text-gray-600">新キャラ・システム情報</p>
              </Link>
              
              <Link
                href="/articles"
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300"
              >
                <div className="text-3xl mb-3">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">記事更新</h3>
                <p className="text-sm text-gray-600">新規記事・記事追加</p>
              </Link>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
                <div className="text-3xl mb-3">🔧</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">サイト機能</h3>
                <p className="text-sm text-gray-600">新機能・改善情報</p>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              🔔 最新情報をチェック！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              攻略記事と合わせて最新情報もチェックして、ゲームライフをより充実させましょう。<br />
              気になる情報があったら、ぜひ詳細をご確認ください！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 攻略記事一覧
              </Link>
              <Link
                href="/"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-red-600"
              >
                🏠 トップページ
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}