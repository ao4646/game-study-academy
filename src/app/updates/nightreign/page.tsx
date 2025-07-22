import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'

export function generateMetadata(): Metadata {
  return {
    title: 'ナイトレイン アップデート情報 - Game Study Academy',
    description: 'エルデンリング: ナイトレインの最新アップデート情報、新キャラクター追加情報、協力プレイ機能更新、バランス調整情報をお届け。最新の変更点をチェック。',
    keywords: [
      'ナイトレイン',
      'Night Reign',
      'エルデンリング',
      'アップデート',
      '新キャラクター',
      '協力プレイ',
      'バランス調整',
      '最新情報',
      'パッチノート'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/updates/nightreign',
      siteName: 'Game Study Academy',
      title: 'ナイトレイン アップデート情報 - Game Study Academy',
      description: 'エルデンリング: ナイトレインの最新アップデート情報、新キャラクター追加情報、協力プレイ機能更新をお届け。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - ナイトレイン アップデート情報',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ナイトレイン アップデート情報 - Game Study Academy',
      description: 'エルデンリング: ナイトレインの最新アップデート情報、新キャラクター追加情報、協力プレイ機能更新をお届け。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://game-study-academy.com/updates/nightreign',
    },
  }
}

const nightreignUpdates = [
  {
    id: 1,
    date: '2025-07-22',
    title: '新キャラクター「アストレア」追加',
    description: '協力プレイ専用の新キャラクター「アストレア」が追加されました。魔術特化型で、パーティーサポートに特化した性能を持ちます。専用武器「星の杖」も同時実装。',
    type: 'character',
    version: '1.3.0',
    link: '/games/nightreign',
    featured: true,
    image: 'https://img.youtube.com/vi/placeholder2/maxresdefault.jpg'
  },
  {
    id: 2,
    date: '2025-07-20',
    title: '協力プレイ機能大幅改善',
    description: 'マッチング機能の改善により、協力プレイがより快適に。フレンド招待機能の追加、通信安定性の向上、ボイスチャット機能のβ版実装。',
    type: 'feature',
    version: '1.2.5',
    link: '/games/nightreign',
    featured: true
  },
  {
    id: 3,
    date: '2025-07-18',
    title: '新エリア「グノスターの居住区」実装',
    description: '新たな探索エリア「グノスターの居住区」が追加。3人協力専用の高難度ダンジョンと新たな夜の王「グラディウス・マグナ」が登場。',
    type: 'content',
    version: '1.2.4',
    link: '/games/nightreign',
    featured: false
  },
  {
    id: 4,
    date: '2025-07-15',
    title: 'キャラクター性能バランス調整',
    description: '全キャラクターの性能バランスを調整。特に近接キャラクターの生存能力向上、遠距離キャラクターの火力バランス見直しを実施。',
    type: 'balance',
    version: '1.2.3',
    link: '',
    featured: false
  },
  {
    id: 5,
    date: '2025-07-12',
    title: '夜の王「エデレ」戦闘システム改修',
    description: '夜の王「エデレ」の戦闘パターンを改修。より戦略性が重要になり、協力プレイでの連携がより重要に。新たな攻撃パターンも追加。',
    type: 'boss',
    version: '1.2.2',
    link: '/categories/1',
    featured: false
  },
  {
    id: 6,
    date: '2025-07-10',
    title: 'プレイヤーマッチング改善アップデート',
    description: 'レベル帯マッチング機能の改善により、適切なレベルのプレイヤー同士でのマッチングが可能に。初心者保護機能も強化。',
    type: 'system',
    version: '1.2.1',
    link: '',
    featured: false
  },
  {
    id: 7,
    date: '2025-07-08',
    title: 'ベータ版フィードバック対応アップデート',
    description: 'ベータテスト期間中に寄せられたフィードバックを基に、UI/UX改善、バグ修正、パフォーマンス最適化を実施。',
    type: 'improvement',
    version: '1.2.0',
    link: '',
    featured: false
  }
]

const getUpdateTypeStyle = (type: string) => {
  switch (type) {
    case 'character':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'feature':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'content':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'balance':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'boss':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'system':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    case 'improvement':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getUpdateTypeLabel = (type: string) => {
  switch (type) {
    case 'character':
      return '👤 新キャラ'
    case 'feature':
      return '✨ 機能追加'
    case 'content':
      return '🗺️ コンテンツ'
    case 'balance':
      return '⚖️ バランス調整'
    case 'boss':
      return '👑 ボス更新'
    case 'system':
      return '🔧 システム'
    case 'improvement':
      return '📈 改善'
    default:
      return '📢 お知らせ'
  }
}

function UpdateCard({ update }: { update: any }) {
  const typeStyle = getUpdateTypeStyle(update.type)
  const typeLabel = getUpdateTypeLabel(update.type)

  if (update.featured) {
    return (
      <Link href={update.link} className="block group">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
          <div className="relative aspect-video overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🌙</div>
                <h3 className="text-2xl font-bold mb-2">ナイトレイン</h3>
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
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                ナイトレイン
              </span>
              <div className="flex items-center space-x-2">
                {update.version && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono">
                    v{update.version}
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  {new Date(update.date).toLocaleDateString('ja-JP')}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
              {update.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {update.description}
            </p>
            {update.link && (
              <div className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            )}
          </div>
        </article>
      </Link>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🌙</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${typeStyle}`}>
            {typeLabel}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-right">
          {update.version && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-mono">
              v{update.version}
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
          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
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

export default async function NightreignUpdatesPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: 'アプデ情報', url: 'https://game-study-academy.com/updates' },
    { name: 'ナイトレイン', url: 'https://game-study-academy.com/updates/nightreign' }
  ]

  const featuredUpdates = nightreignUpdates.filter(update => update.featured)
  const otherUpdates = nightreignUpdates.filter(update => !update.featured)

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🌙</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  ナイトレイン アップデート情報
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                エルデンリング: ナイトレインの最新アップデート情報。<br />
                新キャラクター、協力プレイ機能、バランス調整情報を随時更新中。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/games/nightreign"
                  className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  📚 攻略記事一覧
                </Link>
                <Link
                  href="/updates"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-purple-600"
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
                <span className="text-gray-900 font-medium">ナイトレイン</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {featuredUpdates.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                🔥 重要なアップデート情報
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
              📢 その他のアップデート情報 ({otherUpdates.length}件)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
          </section>
        </div>

        <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              🌙 ナイトレイン攻略情報をチェック！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              アップデート情報と合わせて攻略記事もご覧ください。<br />
              新キャラクターや新システムを活かした攻略法を随時更新しています！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games/nightreign"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 ナイトレイン攻略記事
              </Link>
              <Link
                href="/beginner/nightreign"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-purple-600"
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