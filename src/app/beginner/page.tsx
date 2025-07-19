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
    title: 'キャラクター作成',
    icon: '👤',
    description: '素性と形見の選択で冒険の基盤を決めよう',
    tips: [
      '放浪騎士：重装備で打たれ強く、盾ガードで安定',
      '侍：バランス良く、技量武器と状態異常が強力',
      '形見は黄金の種子がおすすめ（聖杯瓶+1回）',
      '外見は後から変更可能、素性と形見のみ固定'
    ]
  },
  {
    id: 2,
    title: '序盤の進め方',
    icon: '🚀',
    description: 'ゲーム開始後の効率的な攻略手順',
    tips: [
      'チュートリアル後、メリナとの取引で霊馬とレベルアップ解禁',
      '地図断片をΠ型マーク（石碑）で入手し周辺把握',
      '祝福を発見して探索範囲を拡大、導きの光を活用',
      '生命力優先のレベルアップで死ににくいキャラに'
    ]
  },
  {
    id: 3,
    title: '聖杯瓶の管理',
    icon: '🧪',
    description: '回復アイテムの効率的な運用方法',
    tips: [
      '黄金の種子で使用回数増加、聖杯の雫で回復量向上',
      '緋雫（HP）と青雫（FP）の振り分けを戦闘スタイルに合わせる',
      '近接なら緋4/青0、魔術なら緋2/青2など調整',
      '祝福メニューで強化、白い○マークで強化可能を通知'
    ]
  },
  {
    id: 4,
    title: '戦闘システム',
    icon: '⚔️',
    description: 'エルデンリング特有の戦闘メカニクス',
    tips: [
      'ターゲット固定（右スティック）でカメラ安定',
      '致命の一撃：背後、体勢崩し、ガードカウンターが鍵',
      'ジャンプ攻撃で盾持ち対策と体勢崩し',
      'スタミナ管理：攻撃後も回避・ガード分を残す'
    ]
  },
  {
    id: 5,
    title: '装備と強化',
    icon: '🔧',
    description: '武器選択と効率的な強化戦略',
    tips: [
      '序盤武器でも強化すれば終盤まで使用可能',
      '攻撃力アップは能力値よりも武器強化が効率的',
      '装備重量70%以下で中量ローリング維持',
      '坑道（赤く縁取られた洞窟）で強化素材大量入手'
    ]
  },
  {
    id: 6,
    title: '探索と活用要素',
    icon: '🗺️',
    description: '効率的な探索と便利システムの活用',
    tips: [
      '霊馬で機動力アップ、二段ジャンプで攻撃回避',
      '遺灰召喚で戦闘を有利に、霊喚びの鈴が必要',
      'ルーン回収を最優先、死亡前に使い切る',
      '強敵は後回しOK、レベル上げ後に再挑戦'
    ]
  }
]

// 上達のコツ
const advancedTips = [
  {
    title: '⚔️ 武器選択のコツ',
    content: '序盤は攻撃力より攻撃速度を重視しましょう。ロングソードやツインブレードは手数が多く安定します。血の喪失や冷気などの状態異常武器は強敵に有効です。'
  },
  {
    title: '⚖️ 装備重量の管理',
    content: '装備重量は最大重量の70%以下を維持しましょう。中量ローリングができるとローリング距離が長く、無敵時間も確保できます。重装備は慣れてから挑戦しましょう。'
  },
  {
    title: '🔮 魔術・祈祷の活用',
    content: '近接戦が苦手なら魔術師や預言者がおすすめ。魔術の「輝石のつぶて」、祈祷の「獣の爪」は序盤から使える強力な遠距離攻撃です。FP管理を覚えて戦術の幅を広げましょう。'
  },
  {
    title: '🗺️ 効率的な探索術',
    content: '強敵エリアは後回しにして、自分のレベルに合った場所を攻略しましょう。坑道や遺跡ダンジョンは報酬が良く、レベル上げに最適です。迷ったら導きの光を頼りに進みましょう。'
  }
]

// よくある質問
const faqs = [
  {
    question: 'どの素性（クラス）で始めるのがおすすめですか？',
    answer: '初心者には放浪騎士がおすすめです。重装備で打たれ強く、盾ガードで安定した戦闘ができます。バランス重視なら侍、魔術を使いたいなら囚人を選びましょう。'
  },
  {
    question: 'ボスが強すぎて勝てません。どうすればいいですか？',
    answer: 'まずはレベル上げを優先しましょう。生命力を40、筋力/技量を20程度まで上げると戦いやすくなります。遺灰召喚や魔術・祈祷も活用して戦術の幅を広げましょう。'
  },
  {
    question: 'どこを探索すればいいか分からなくなりました。',
    answer: '導きの光（祝福から出る金色の光）を辿って進みましょう。マップの石碑（Π型マーク）で地図断片を入手すると周辺が分かりやすくなります。強すぎる敵がいたら別のルートを探しましょう。'
  },
  {
    question: '装備強化の素材が足りません。',
    answer: '坑道（赤く縁取られた洞窟アイコン）を攻略すると鍛石が大量入手できます。リムグレイブ坑道、モーンの坑道などは序盤でも攻略しやすくおすすめです。'
  },
  {
    question: 'オンライン要素はどう活用すればいいですか？',
    answer: 'メッセージシステムで他プレイヤーのヒントを確認しましょう。白いサインを使えば協力プレイも可能です。一人で苦戦するボスがいたら、ぜひ助けを呼んでみてください。'
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
                  href="/games/elden-ring"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* 神攻略wiki クレジット */}
        <section className="py-8 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-700 mb-4">
              このガイドの攻略情報は
              <a 
                href="https://kamikouryaku.net/eldenring/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-semibold ml-1 mr-1"
              >
                神攻略wiki
              </a>
              を参考にしています。
            </p>
            <p className="text-sm text-gray-600">
              より詳細な攻略情報は神攻略wikiをご確認ください。
            </p>
          </div>
        </section>

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
                href="/games/elden-ring"
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