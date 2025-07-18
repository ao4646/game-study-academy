import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { Metadata } from 'next'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'

// Supabaseクライアント設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// メタデータ生成（SEO最適化）
export function generateMetadata(): Metadata {
  return {
    title: 'エルデンリング 初心者ガイド - ゲームの基本から上達のコツまで',
    description: 'エルデンリング（Elden Ring）の初心者向け完全ガイド。基本操作から戦術、クラス選択まで、YouTube動画から学んだプロの知識を分かりやすく解説します。',
    keywords: [
      'エルデンリング',
      'Elden Ring',
      '初心者',
      '初心者ガイド',
      'ゲーム攻略',
      '基本操作',
      'クラス選択',
      '放浪騎士',
      'YouTube',
      '動画解説'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/beginner',
      siteName: 'Game Study Academy',
      title: 'エルデンリング 初心者ガイド - ゲームの基本から上達のコツまで',
      description: 'エルデンリング（Elden Ring）の初心者向け完全ガイド。基本操作から戦術、クラス選択まで、YouTube動画から学んだプロの知識を分かりやすく解説します。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - エルデンリング 初心者ガイド',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'エルデンリング 初心者ガイド - ゲームの基本から上達のコツまで',
      description: 'エルデンリング（Elden Ring）の初心者向け完全ガイド。基本操作から戦術、クラス選択まで、YouTube動画から学んだプロの知識を分かりやすく解説します。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://game-study-academy.com/beginner',
    },
  }
}

// 基本ガイドデータ
const basicGuides = [
  {
    id: 1,
    title: '基本操作',
    icon: '🎮',
    description: 'コントローラーの使い方から移動、攻撃、回避の基本操作を学びます',
    tips: [
      '回避は敵の攻撃タイミングに合わせて使用',
      'スタミナ管理が生存の鍵',
      '攻撃は連続で出さず、敵の隙を狙う',
      'カメラワークで常に敵を視界に入れる'
    ]
  },
  {
    id: 2,
    title: 'キャラクター・クラス選択',
    icon: '👤',
    description: 'エルデンリングの各クラス（素性）の特徴と初心者におすすめの選択肢を紹介',
    tips: [
      '放浪騎士：バランス型で初心者におすすめ',
      '魔術師：知力が高く魔術を扱える',
      '戦士：筋力が高く重装備が得意',
      '囚人：器用さが高く多彩な戦術が可能'
    ]
  },
  {
    id: 3,
    title: '装備・アイテム',
    icon: '⚔️',
    description: '武器の種類と特徴、アイテムの効果的な使い方を解説',
    tips: [
      '武器は攻撃力だけでなく攻撃速度も重要',
      'アイテムは適切なタイミングで使用',
      '装備の組み合わせで戦術が変わる',
      '回復アイテムの温存が生存率を上げる'
    ]
  },
  {
    id: 4,
    title: '戦闘の基本',
    icon: '⚔️',
    description: '敵との戦い方、タイミング、距離感の取り方を学習',
    tips: [
      '敵の攻撃パターンを覚える',
      '距離を取りながら戦う',
      '複数の敵は一体ずつ倒す',
      '無理な攻撃は避けて安全第一'
    ]
  }
]

// 上達のコツ
const advancedTips = [
  {
    title: '📹 動画学習のコツ',
    content: 'プロ実況者の動画を見る時は、操作だけでなく判断基準に注目しましょう。「なぜこのタイミングで攻撃したのか」「なぜここで回避したのか」を理解することが重要です。'
  },
  {
    title: '🎯 練習方法',
    content: '同じエリアを繰り返しプレイして、敵の動きを完全に覚えましょう。慣れてきたら異なる戦術を試して、自分に合った戦い方を見つけることが大切です。'
  },
  {
    title: '🧠 戦術思考',
    content: '行き当たりばったりではなく、事前に戦術を考えてから挑みましょう。「この敵にはこの戦法」というパターンを構築することで、安定した勝率を実現できます。'
  },
  {
    title: '⚡ 上達の近道',
    content: '失敗を恐れず、積極的に挑戦しましょう。死んでも経験値は蓄積されます。何度も挑戦して、徐々に上達していく過程を楽しみましょう。'
  }
]

// よくある質問
const faqs = [
  {
    question: 'どのクラスから始めるのがおすすめですか？',
    answer: '初心者の方にはバランス型のクラス（放浪騎士など）がおすすめです。攻撃・防御・機動力のすべてが平均的なため、ゲームの基本を学ぶのに最適です。'
  },
  {
    question: '敵が強すぎて勝てません。どうすればいいですか？',
    answer: '無理に正面から戦わず、回避を多用して敵の攻撃パターンを覚えましょう。また、装備やアイテムを見直したり、より基本的なエリアで練習することも有効です。'
  },
  {
    question: '動画を見ても上手くできません。',
    answer: '動画と同じ操作をしようとせず、まずは基本操作を身につけることを優先しましょう。慣れてきたら少しずつ高度なテクニックに挑戦してください。'
  },
  {
    question: 'マルチプレイとソロプレイ、どちらがおすすめですか？',
    answer: '最初はソロプレイで基本を覚えることをおすすめします。操作に慣れてきたらマルチプレイで他のプレイヤーと協力して楽しみましょう。'
  }
]

// 推奨記事データ取得
async function getRecommendedArticles() {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select(`
        *,
        videos (
          video_id,
          title,
          channel_title,
          thumbnail_url
        ),
        games (
          name
        )
      `)
      .eq('published', true)
      .eq('category_id', 8) // 初心者ガイドカテゴリ
      .order('created_at', { ascending: false })
      .limit(3)

    return articles || []
  } catch (error) {
    console.error('推奨記事取得エラー:', error)
    return []
  }
}

// ガイドカードコンポーネント
function GuideCard({ guide }: { guide: typeof basicGuides[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{guide.icon}</span>
        <h3 className="text-xl font-bold text-gray-900">{guide.title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{guide.description}</p>
      <div className="space-y-2">
        {guide.tips.map((tip, index) => (
          <div key={index} className="flex items-start">
            <span className="text-red-500 mr-2 mt-1">✓</span>
            <span className="text-sm text-gray-700">{tip}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// 上達のコツカード
function TipCard({ tip }: { tip: typeof advancedTips[0] }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{tip.title}</h3>
      <p className="text-gray-700 leading-relaxed">{tip.content}</p>
    </div>
  )
}

// FAQ コンポーネント
function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Q. {faq.question}</h3>
      <p className="text-gray-700 leading-relaxed">A. {faq.answer}</p>
    </div>
  )
}

// メインコンポーネント
export default async function BeginnerGuidePage() {
  const recommendedArticles = await getRecommendedArticles()

  // パンくずリストデータ
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '初心者ガイド', url: 'https://game-study-academy.com/beginner' }
  ]

  return (
    <>
      {/* 構造化データ */}
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヒーローセクション */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🔰</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  エルデンリング 初心者ガイド
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                エルデンリング（Elden Ring）の世界へようこそ！<br />
                プロ実況者の知識を基に、初心者の方でも安心してプレイできるよう<br />
                基本操作から上達のコツまでを丁寧に解説します。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/articles"
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  📚 攻略記事を読む
                </Link>
                <Link
                  href="/categories/9"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600"
                >
                  🎮 初心者向け記事
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
                <span className="text-gray-900 font-medium">初心者ガイド</span>
              </li>
            </ol>
          </nav>
        </div>

        {/* 基本ガイドセクション */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🎮 ゲームの基本を学ぼう
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                まずはこれらの基本を覚えて、エルデンリングの世界に慣れていきましょう
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {basicGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>
        </section>

        {/* 上達のコツセクション */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🚀 上達のコツ
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                効率的に上達するための考え方とテクニック
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advancedTips.map((tip, index) => (
                <TipCard key={index} tip={tip} />
              ))}
            </div>
          </div>
        </section>

        {/* よくある質問セクション */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ❓ よくある質問
              </h2>
              <p className="text-xl text-gray-600">
                初心者の方からよく寄せられる質問にお答えします
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} />
              ))}
            </div>
          </div>
        </section>

        {/* 推奨記事セクション */}
        {recommendedArticles.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  📚 初心者におすすめの記事
                </h2>
                <p className="text-xl text-gray-600">
                  YouTube動画から学ぶ、初心者向けの詳細解説記事
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recommendedArticles.map((article: any) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-200 relative">
                        <img
                          src={`https://img.youtube.com/vi/${article.videos.video_id}/maxresdefault.jpg`}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-70 rounded-full p-3">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {article.seo_title || article.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {article.meta_description || article.summary?.substring(0, 100) + '...'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              🎮 さあ、エルデンリングの世界を冒険しよう！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              基本を覚えたら、実際にプレイしてみましょう。<br />
              分からないことがあったら、いつでもこのガイドに戻ってきてください。<br />
              YouTube動画と合わせて学習することで、より効果的に上達できます！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 攻略記事を読む
              </Link>
              <Link
                href="/categories/9"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-blue-600"
              >
                🔰 初心者向け記事
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}