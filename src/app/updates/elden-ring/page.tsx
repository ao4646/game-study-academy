import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'

export function generateMetadata(): Metadata {
  return {
    title: 'エルデンリング アップデート情報 - Game Study Academy',
    description: 'エルデンリング（Elden Ring）の最新アップデート情報、DLC「影の地」情報、パッチノート、メンテナンス情報をお届け。新機能やバランス調整など最新情報をチェック。',
    keywords: [
      'エルデンリング',
      'Elden Ring',
      'アップデート',
      'DLC',
      '影の地',
      'パッチノート',
      'メンテナンス',
      '最新情報',
      'バランス調整'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/updates/elden-ring',
      siteName: 'Game Study Academy',
      title: 'エルデンリング アップデート情報 - Game Study Academy',
      description: 'エルデンリング（Elden Ring）の最新アップデート情報、DLC「影の地」情報、パッチノート、メンテナンス情報をお届け。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - エルデンリング アップデート情報',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'エルデンリング アップデート情報 - Game Study Academy',
      description: 'エルデンリング（Elden Ring）の最新アップデート情報、DLC「影の地」情報、パッチノート、メンテナンス情報をお届け。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://game-study-academy.com/updates/elden-ring',
    },
  }
}

const eldenRingUpdates = [
  {
    id: 1,
    date: '2025-07-22',
    title: 'DLC「影の地」新ボス「メスメル」追加情報',
    description: '新たなボス「メスメル」が影の地に追加されました。弱点攻撃の詳細解説や推奨装備について詳しく解説しています。攻略記事も同時更新。',
    type: 'dlc',
    version: '1.12.3',
    link: '/games/elden-ring',
    featured: true,
    image: 'https://img.youtube.com/vi/placeholder/maxresdefault.jpg'
  },
  {
    id: 2,
    date: '2025-07-20',
    title: 'バージョン1.12.2 バランス調整アップデート',
    description: '武器・戦技のバランス調整を実施。特に大剣系武器の威力向上、魔術の消費FPを軽減。PvP環境の改善も含まれます。',
    type: 'balance',
    version: '1.12.2',
    link: '/games/elden-ring',
    featured: true
  },
  {
    id: 3,
    date: '2025-07-18',
    title: 'DLC「影の地」エリア拡張情報',
    description: '影の地に新たなエリア「古き王の墓所」が追加。新しいNPCイベントと隠し武器の情報を掲載しています。',
    type: 'dlc',
    version: '1.12.1',
    link: '/games/elden-ring/category11',
    featured: false
  },
  {
    id: 4,
    date: '2025-07-15',
    title: 'メンテナンス情報: サーバー安定化',
    description: '2025年7月15日 14:00-16:00にメンテナンスを実施。オンラインプレイの安定化とバグ修正を含みます。',
    type: 'maintenance',
    version: '',
    link: '',
    featured: false
  },
  {
    id: 5,
    date: '2025-07-12',
    title: 'DLC「影の地」新武器・防具情報',
    description: 'DLCエリアで入手可能な新武器「黄金の大剣」「影の騎士鎧」などの性能詳細と入手方法を解説。',
    type: 'dlc',
    version: '1.12.0',
    link: '/games/elden-ring',
    featured: false
  },
  {
    id: 6,
    date: '2025-07-10',
    title: 'バグ修正アップデート ver1.11.5',
    description: '特定条件下でゲームが進行不能になるバグを修正。セーブデータの安全性向上も含まれます。',
    type: 'bugfix',
    version: '1.11.5',
    link: '',
    featured: false
  }
]

const getUpdateTypeStyle = (type: string) => {
  switch (type) {
    case 'dlc':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'balance':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'bugfix':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'maintenance':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getUpdateTypeLabel = (type: string) => {
  switch (type) {
    case 'dlc':
      return '🔥 DLC情報'
    case 'balance':
      return '⚖️ バランス調整'
    case 'bugfix':
      return '🔧 バグ修正'
    case 'maintenance':
      return '🛠️ メンテナンス'
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
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🔰</div>
                <h3 className="text-2xl font-bold mb-2">エルデンリング</h3>
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
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                エルデンリング
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
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {update.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {update.description}
            </p>
            {update.link && (
              <div className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors">
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
          <span className="text-2xl">🔰</span>
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
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
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

export default async function EldenRingUpdatesPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: 'アプデ情報', url: 'https://game-study-academy.com/updates' },
    { name: 'エルデンリング', url: 'https://game-study-academy.com/updates/elden-ring' }
  ]

  const featuredUpdates = eldenRingUpdates.filter(update => update.featured)
  const otherUpdates = eldenRingUpdates.filter(update => !update.featured)

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🔰</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  エルデンリング アップデート情報
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                エルデンリング（Elden Ring）の最新アップデート情報。<br />
                DLC「影の地」情報、パッチノート、メンテナンス情報を随時更新中。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/games/elden-ring"
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  📚 攻略記事一覧
                </Link>
                <Link
                  href="/updates"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600"
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
                <span className="text-gray-900 font-medium">エルデンリング</span>
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

        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              🔰 エルデンリング攻略情報をチェック！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              アップデート情報と合わせて攻略記事もご覧ください。<br />
              新要素や変更点を活かした攻略法を随時更新しています！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games/elden-ring"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 エルデンリング攻略記事
              </Link>
              <Link
                href="/beginner"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600"
              >
                🔰 初心者ガイド
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}