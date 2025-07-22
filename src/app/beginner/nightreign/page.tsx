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
    title: 'エルデンリング：ナイトレイン 初心者ガイド - ゲームの基本から上達のコツまで',
    description: 'エルデンリング：ナイトレイン（Elden Ring: Nightreign）の初心者向け完全ガイド。基本操作から戦術、キャラクター選択まで、YouTube動画から学んだプロの知識を分かりやすく解説します。',
    keywords: [
      'エルデンリング',
      'ナイトレイン',
      'Elden Ring',
      'Nightreign',
      '初心者',
      '初心者ガイド',
      'ゲーム攻略',
      '基本操作',
      'キャラクター選択',
      '無頼漢',
      '復讐者',
      'YouTube',
      '動画解説'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/beginner/nightreign',
      siteName: 'Game Study Academy',
      title: 'エルデンリング：ナイトレイン 初心者ガイド - ゲームの基本から上達のコツまで',
      description: 'エルデンリング：ナイトレイン（Elden Ring: Nightreign）の初心者向け完全ガイド。基本操作から戦術、キャラクター選択まで、YouTube動画から学んだプロの知識を分かりやすく解説します。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - エルデンリング：ナイトレイン 初心者ガイド',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'エルデンリング：ナイトレイン 初心者ガイド - ゲームの基本から上達のコツまで',
      description: 'エルデンリング：ナイトレイン（Elden Ring: Nightreign）の初心者向け完全ガイド。基本操作から戦術、キャラクター選択まで、YouTube動画から学んだプロの知識を分かりやすく解説します。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
    alternates: {
      canonical: 'https://game-study-academy.com/beginner/nightreign',
    },
  }
}

// 基本ガイドデータ
const basicGuides = [
  {
    id: 1,
    title: 'ゲームの流れ',
    icon: '🎮',
    description: 'ナイトレインの基本的なゲームサイクルと進行の流れを理解しよう',
    tips: [
      '1プレイ40-50分で完結する協力型ゲーム',
      '円卓から出撃→マッチング→夜の王選択→三日間を生き抜く',
      '夜渡り（キャラクター）を選んで他プレイヤーと協力',
      '職被りOK、途中でキャラ変更も可能'
    ]
  },
  {
    id: 2,
    title: '1日目の立ち回り',
    icon: '🌅',
    description: '序盤のレベル上げと装備収集の効率的な進め方',
    tips: [
      '目標レベル6-8、シングルプレイなら最低レベル6',
      'スタート地点の敵を倒してまずレベル2を目指す',
      '大教会・小砦の弱めボスから攻略開始',
      'アンコモン～レア武器の入手を目標に'
    ]
  },
  {
    id: 3,
    title: '2日目の立ち回り',
    icon: '🌄',
    description: '中盤戦の戦略とレベル上げの加速方法',
    tips: [
      '目標レベル10-12、レベル12で夜の王戦が楽になる',
      'メイン武器はレア武器（紫背景）まで強化',
      '砦や地変の攻略でルーンと潜在する力を獲得',
      '赤枠フィールドボスは高ルーン報酬で狙い目'
    ]
  },
  {
    id: 4,
    title: '基本システム',
    icon: '⚡',
    description: 'ナイトレイン特有のシステムと重要な要素',
    tips: [
      '霊鷹で高速移動、白線ルートに沿って移動',
      '夜の雨エリアから逃げて安全地帯（白円内）を維持',
      '教会で聖杯瓶の使用回数増加',
      'アイテムは持ち帰れないのでその場で使い切る'
    ]
  },
  {
    id: 5,
    title: '協力プレイのコツ',
    icon: '🤝',
    description: 'マルチプレイでの連携と意思疎通の方法',
    tips: [
      '基本的に味方と行動、単独行動より連携重視',
      'ピン（△+L3）で意思疎通、同意や目標共有に活用',
      '置いて行かれた味方がいたら合流を待つ',
      '強敵は無理せず撤退の判断も重要'
    ]
  },
  {
    id: 6,
    title: '夜の王攻略',
    icon: '👑',
    description: '最終ボス戦での立ち回りと勝利のコツ',
    tips: [
      'ターゲット時は攻撃より回避・防御を優先',
      '味方のフリー時間を作る「囮役」も重要な貢献',
      '生き延びることを最優先、攻撃は二の次',
      '大盾構えで安全度アップ、ターゲット分散を意識'
    ]
  }
]

// 上達のコツ
const advancedTips = [
  {
    title: '🗺️ 地図とアイコンの理解',
    content: '霊鷹移動中に地図を確認し、教会・拠点・夜の王の弱点属性拠点の位置を把握しましょう。初心者のうちはアイコンの種類を覚えるだけでも大きな進歩です。'
  },
  {
    title: '⚔️ 武器収集と強化戦略',
    content: '武器は6つまで所持可能で、使わなくても付帯効果を得られます。不得意武器でも拾っておき、鍛石で積極的に強化しましょう。坑道のボスから鍛石【2】を狙うのがコツです。'
  },
  {
    title: '⏰ タイムスケジュールの把握',
    content: '夜の雨の収縮タイミングを覚えましょう。4:30と11:00に収縮開始、14:00にボス戦開始です。拠点攻略中の撤退判断が生存の鍵になります。'
  },
  {
    title: '🔄 繰り返しプレイの重要性',
    content: '何度もプレイして拠点配置、ボス位置、効率的なルートを覚えましょう。失敗から学ぶことで、次回のプレイがより戦略的になります。懲りずに挑戦することが上達への近道です。'
  }
]

// よくある質問
const faqs = [
  {
    question: '1日目でレベル6まで上がりません。どうすればいいですか？',
    answer: 'スタート地点が野営地の場合は周辺の敵を全て倒してまずレベル2を目指しましょう。その後大教会や小砦の弱いボスから攻略し、石剣の鍵があれば封牢も狙い目です。味方と協力することで効率が上がります。'
  },
  {
    question: '夜の雨に巻き込まれて死んでしまいます。',
    answer: 'ミニマップの白い円が安全地帯です。拠点攻略中でも収縮開始時刻（4:30、11:00）を意識して早めの撤退判断を心がけましょう。コンパスの黄金樹アイコンを目指すと安全です。'
  },
  {
    question: '武器はどれを集めればいいですか？',
    answer: '武器は6つまで所持でき、使わなくても付帯効果があるので基本的に全て拾いましょう。特に結晶人対策の打撃武器、失地騎士用の大型武器、腐敗・冷気属性武器、パリィ用の盾は価値が高いです。'
  },
  {
    question: '夜の王戦でいつも死んでしまいます。',
    answer: '自分がターゲットされている時は攻撃をやめて回避・防御に専念しましょう。3人いるので1人が囮になれば他の2人が攻撃できます。「生き延びること」も立派な貢献です。大盾があれば安全度が上がります。'
  },
  {
    question: 'マルチプレイでの連携が上手くできません。',
    answer: 'ピン機能（△+L3）を積極的に使いましょう。同じ場所にピンを刺すことで同意を示せます。基本は味方について行き、置いていかれた仲間がいたら待ってあげることが大切です。'
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
    <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6 border-l-4 border-purple-500">
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
export default async function NightreignBeginnerGuidePage() {
  const recommendedArticles = await getRecommendedArticles()

  // パンくずリストデータ
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '初心者ガイド', url: 'https://game-study-academy.com/beginner' },
    { name: 'ナイトレイン', url: 'https://game-study-academy.com/beginner/nightreign' }
  ]

  return (
    <>
      {/* 構造化データ */}
      <StructuredData type="website" />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヒーローセクション */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🌙</span>
                <h1 className="text-4xl md:text-5xl font-bold">
                  ナイトレイン 初心者ガイド
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                エルデンリング：ナイトレイン（Elden Ring: Nightreign）の世界へようこそ！<br />
                実況者の知識を基に、初心者の方でも安心してプレイできるよう<br />
                基本操作から上達のコツまでを丁寧に解説します。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/games/nightreign"
                  className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  📚 攻略記事を読む
                </Link>
                <Link
                  href="/beginners"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-purple-600"
                >
                  📺 初心者向け動画へ
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
                <Link href="/beginner" className="text-gray-500 hover:text-gray-700">
                  初心者ガイド
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

        {/* 基本ガイドセクション */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🎮 ゲームの基本を学ぼう
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                まずはこれらの基本を覚えて、ナイトレインの世界に慣れていきましょう
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
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
                href="https://kamikouryaku.net/nightreign_eldenring/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 font-semibold ml-1 mr-1"
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
        <section className="py-16 bg-gradient-to-r from-purple-600 to-violet-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              🌙 さあ、ナイトレインの世界を冒険しよう！
            </h2>
            <p className="text-xl mb-8 leading-relaxed">
              基本を覚えたら、実際にプレイしてみましょう。<br />
              分からないことがあったら、いつでもこのガイドに戻ってきてください。<br />
              YouTube動画と合わせて学習することで、より効果的に上達できます！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games/nightreign"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
              >
                📚 攻略記事を読む
              </Link>
              <Link
                href="/beginner"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-purple-600"
              >
                🔰 エルデンリング初心者ガイド
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}