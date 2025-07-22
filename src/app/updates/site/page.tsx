import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'

export function generateMetadata(): Metadata {
  return {
    title: 'サイト機能更新情報 - Game Study Academy',
    description: 'Game Study Academyのサイト機能更新情報。新機能追加、UI/UX改善、検索機能強化、パフォーマンス向上などの技術的な更新情報をお届け。',
    keywords: [
      'サイト更新',
      '機能追加',
      'UI改善',
      'UX向上',
      '検索機能',
      'パフォーマンス',
      'バグ修正',
      '技術更新'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/updates/site',
      siteName: 'Game Study Academy',
      title: 'サイト機能更新情報 - Game Study Academy',
      description: 'Game Study Academyのサイト機能更新情報。新機能追加、UI/UX改善、検索機能強化、パフォーマンス向上などの技術的な更新情報をお届け。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - サイト機能更新情報',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'サイト機能更新情報 - Game Study Academy',
      description: 'Game Study Academyのサイト機能更新情報。新機能追加、UI/UX改善、検索機能強化、パフォーマンス向上などの技術的な更新情報をお届け。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://game-study-academy.com/updates/site',
    },
  }
}

const siteUpdates = [
  {
    id: 1,
    date: '2025-07-22',
    title: '検索機能大幅強化: 複数ワード検索対応',
    description: 'サイト内検索機能を大幅に強化しました。「ナイトレイン エデレ」のような複数ワード検索に対応し、検索結果数も20件に増加。より効率的に記事を見つけられます。',
    type: 'feature',
    impact: 'major',
    technical: 'フロントエンド・バックエンド',
    link: '',
    featured: true
  },
  {
    id: 2,
    date: '2025-07-21',
    title: 'アップデート情報ページシステム構築',
    description: '各ゲーム・各種情報別の専用アップデート情報ページを新設。エルデンリング、ナイトレイン、記事更新、サイト更新の4つの専用ページで情報を整理。',
    type: 'feature',
    impact: 'major',
    technical: 'フルスタック',
    link: '/updates',
    featured: true
  },
  {
    id: 3,
    date: '2025-07-20',
    title: 'カテゴリページ13ページ新設',
    description: 'エルデンリング専用のカテゴリページ13ページ（category9-21）を新設。初心者ガイドからスーパープレイまで、専門的な攻略情報を体系的に整理。',
    type: 'content-structure',
    impact: 'major',
    technical: 'フロントエンド',
    link: '/games/elden-ring',
    featured: false
  },
  {
    id: 4,
    date: '2025-07-18',
    title: 'サイトメニュー検索結果表示改善',
    description: 'サイドメニューの検索結果表示を改善。検索件数表示の追加、結果の見やすさ向上、レスポンシブ対応の強化を実施。',
    type: 'ui-improvement',
    impact: 'minor',
    technical: 'フロントエンド',
    link: '',
    featured: false
  },
  {
    id: 5,
    date: '2025-07-15',
    title: 'SEO対策強化: 構造化データ実装',
    description: 'Google検索での表示品質向上のため、全ページに構造化データ（JSON-LD）を実装。パンくずナビゲーション、記事情報の構造化データを追加。',
    type: 'seo',
    impact: 'minor',
    technical: 'バックエンド',
    link: '',
    featured: false
  },
  {
    id: 6,
    date: '2025-07-12',
    title: 'ページ表示速度最適化',
    description: '画像最適化、コード分割、キャッシュ戦略の見直しによりページ表示速度を平均30%向上。特にモバイル環境での表示速度を大幅に改善。',
    type: 'performance',
    impact: 'minor',
    technical: 'フルスタック',
    link: '',
    featured: false
  },
  {
    id: 7,
    date: '2025-07-10',
    title: 'レスポンシブデザイン改善',
    description: 'スマートフォン・タブレット表示の最適化を実施。カード表示、ナビゲーション、検索機能のモバイル対応を強化し、ユーザビリティを向上。',
    type: 'ui-improvement',
    impact: 'minor',
    technical: 'フロントエンド',
    link: '',
    featured: false
  },
  {
    id: 8,
    date: '2025-07-08',
    title: 'バックアップシステム強化',
    description: 'データベースの自動バックアップシステムを強化。1日3回の定期バックアップ、差分バックアップ機能により、データの安全性を大幅に向上。',
    type: 'infrastructure',
    impact: 'minor',
    technical: 'インフラ',
    link: '',
    featured: false
  }
]

const getUpdateTypeStyle = (type: string) => {
  switch (type) {
    case 'feature':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'ui-improvement':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'performance':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    case 'seo':
      return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'content-structure':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200'
    case 'infrastructure':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getUpdateTypeLabel = (type: string) => {
  switch (type) {
    case 'feature':
      return '✨ 新機能'
    case 'ui-improvement':
      return '🎨 UI改善'
    case 'performance':
      return '⚡ パフォーマンス'
    case 'seo':
      return '🔍 SEO対策'
    case 'content-structure':
      return '🗂️ 構造改善'
    case 'infrastructure':
      return '🏗️ インフラ'
    default:
      return '🔧 その他'
  }
}

const getImpactStyle = (impact: string) => {
  switch (impact) {
    case 'major':
      return 'bg-red-100 text-red-800'
    case 'minor':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getImpactLabel = (impact: string) => {
  switch (impact) {
    case 'major':
      return '🔥 大型更新'
    case 'minor':
      return '🔧 小規模更新'
    default:
      return '📝 更新'
  }
}

function UpdateCard({ update }: { update: any }) {
  const typeStyle = getUpdateTypeStyle(update.type)
  const typeLabel = getUpdateTypeLabel(update.type)
  const impactStyle = getImpactStyle(update.impact)
  const impactLabel = getImpactLabel(update.impact)

  if (update.featured) {
    return (
      <div className="group">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
          <div className="relative aspect-video overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-indigo-700 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-2xl font-bold mb-2">サイト機能更新</h3>
                <p className="text-lg opacity-90">ユーザビリティ向上</p>
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold text-white ${update.impact === 'major' ? 'bg-red-600' : 'bg-blue-600'}`}>
                {impactLabel}
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
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                サイト機能
              </span>
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {update.technical}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(update.date).toLocaleDateString('ja-JP')}
                </span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
              {update.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {update.description}
            </p>
            {update.link && (
              <div className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                確認する
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            )}
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">🔧</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${typeStyle}`}>
            {typeLabel}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-right">
          <span className={`px-2 py-1 rounded text-xs font-medium ${impactStyle}`}>
            {impactLabel}
          </span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
            {update.technical}
          </span>
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
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
        >
          確認する
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </Link>
      )}
    </div>
  )
}

export default async function SiteUpdatesPage() {
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: 'アプデ情報', url: 'https://game-study-academy.com/updates' },
    { name: 'サイト更新', url: 'https://game-study-academy.com/updates/site' }
  ]

  const featuredUpdates = siteUpdates.filter(update => update.featured)
  const otherUpdates = siteUpdates.filter(update => !update.featured)

  return (
    <>
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🔧</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  サイト機能更新情報
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Game Study Academyのサイト機能更新情報。<br />
                新機能追加、UI/UX改善、パフォーマンス向上などの技術的な更新をお届けします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  🏠 サイトを利用する
                </Link>
                <Link
                  href="/updates"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-indigo-600"
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
                <span className="text-gray-900 font-medium">サイト更新</span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {featuredUpdates.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                🔥 主要なサイト機能更新
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
              📢 その他のサイト更新情報 ({otherUpdates.length}件)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
          </section>
        </div>

        <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              🔧 より使いやすいサイトを目指して！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              ユーザビリティの向上とパフォーマンス改善を継続的に実施中。<br />
              ご要望やバグ報告などございましたら、お気軽にお知らせください！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 攻略記事を読む
              </Link>
              <Link
                href="/"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-indigo-600"
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