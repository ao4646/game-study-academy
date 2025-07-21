import { Metadata } from 'next'
import Link from 'next/link'
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData'

// メタデータ生成（SEO最適化）
export function generateMetadata(): Metadata {
  return {
    title: 'サイトの使い方ガイド - Game Study Academy',
    description: 'Game Study Academyの使い方を詳しく解説。メニューの場所、記事の探し方、検索機能、カレンダー機能など、サイトを効率的に使うための完全ガイドです。',
    keywords: [
      'サイトの使い方',
      'ガイド',
      'Game Study Academy',
      '使い方',
      'メニュー',
      '検索',
      'カレンダー',
      'ナビゲーション',
      'エルデンリング',
      'ナイトレイン'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://game-study-academy.com/guide',
      siteName: 'Game Study Academy',
      title: 'サイトの使い方ガイド - Game Study Academy',
      description: 'Game Study Academyの使い方を詳しく解説。メニューの場所、記事の探し方、検索機能、カレンダー機能など、サイトを効率的に使うための完全ガイドです。',
      images: [
        {
          url: 'https://game-study-academy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - サイトの使い方ガイド',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'サイトの使い方ガイド - Game Study Academy',
      description: 'Game Study Academyの使い方を詳しく解説。メニューの場所、記事の探し方、検索機能、カレンダー機能など、サイトを効率的に使うための完全ガイドです。',
      images: ['https://game-study-academy.com/og-image.jpg'],
    },
  }
}

export default function GuideePage() {
  const breadcrumbItems = [
    { name: 'ホーム', item: 'https://game-study-academy.com' },
    { name: 'サイトの使い方ガイド', item: 'https://game-study-academy.com/guide' }
  ]

  return (
    <>
      {/* 構造化データ */}
      <StructuredData type="article" />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダーセクション */}
        <section className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                📖 サイトの使い方ガイド
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Game Study Academyを効率的に使うための完全ガイド
              </p>
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 shadow-lg"
                >
                  🏠 トップページに戻る
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* なぜGame Study Academyが選ばれるのか */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              なぜGame Study Academyが選ばれるのか
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">厳選された高品質コンテンツ</h3>
                <p className="text-gray-600">
                  実況者の動画から学べる、本当に役立つ攻略法だけを厳選してお届け
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">スキマ時間で効率学習</h3>
                <p className="text-gray-600">
                  記事を読んでから学習することで、動画の理解度UP！一回見れば全部わかる！
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">YouTuber応援型サイト</h3>
                <p className="text-gray-600">
                  元動画の理解促進を促す記事で、クリエイターの利益も守る。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* 目次 */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                📋 目次
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="#menu" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-black">
                  <span className="text-red-600 font-semibold">1. </span>メニューの場所と開き方
                </Link>
                <Link href="#search" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-black">
                  <span className="text-red-600 font-semibold">2. </span>サイト内検索機能
                </Link>
                <Link href="#calendar" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-black">
                  <span className="text-red-600 font-semibold">3. </span>カレンダー機能
                </Link>
                <Link href="#navigation" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-black">
                  <span className="text-red-600 font-semibold">4. </span>ナビゲーション項目
                </Link>
                <Link href="#articles" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-black">
                  <span className="text-red-600 font-semibold">5. </span>記事の探し方
                </Link>
                <Link href="#categories" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-black">
                  <span className="text-red-600 font-semibold">6. </span>カテゴリ別記事
                </Link>
                <Link href="#terms" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-black">
                  <span className="text-red-600 font-semibold">7. </span>利用規約
                </Link>
              </div>
            </div>

            {/* 1. メニューの場所と開き方 */}
            <div id="menu" className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                🎛️ 1. メニューの場所と開き方
              </h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">📍 メニューボタンの場所</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    画面の<strong>左上角</strong>に赤い色のメニューボタン（ハンバーガーメニュー）があります。
                    このボタンは常に表示されているので、どのページからでもアクセスできます。
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-red-200">
                    <p className="text-sm text-gray-600 mb-2"><strong>ボタンの特徴：</strong></p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>赤い背景色（#dc2626）</li>
                      <li>3本の横線アイコン（ハンバーガーメニュー）</li>
                      <li>黒い境界線付き</li>
                      <li>ホバー時に少し濃い赤色に変化</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">🖱️ メニューの開き方</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">デスクトップ（パソコン）：</h4>
                      <p className="text-gray-700">メニューボタンをクリックすると、左側からスライドしてメニューパネルが表示されます。</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">モバイル（スマートフォン・タブレット）：</h4>
                      <p className="text-gray-700">メニューボタンをタップすると、左側からスライドしてメニューパネルが表示されます。</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">❌ メニューの閉じ方</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    メニューを閉じる方法は3つあります：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>×ボタン</strong>：メニューパネル右上の×ボタンをクリック/タップ</li>
                    <li><strong>背景をクリック</strong>：メニューパネル以外の暗い背景部分をクリック/タップ</li>
                    <li><strong>項目選択</strong>：メニュー内の任意の項目をクリック/タップすると自動的に閉じる</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. サイト内検索機能 */}
            <div id="search" className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                🔍 2. サイト内検索機能
              </h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">📝 検索機能の使い方</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    メニューを開くと、一番上に「サイト内検索」セクションがあります。
                    ここで記事タイトルや内容から目的の記事を素早く見つけることができます。
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg border-2 border-blue-200 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">検索のステップ：</h4>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2">
                      <li>メニューを開く</li>
                      <li>「To search type and hit enter」と書かれた検索ボックスをクリック</li>
                      <li>検索したいキーワードを入力（2文字以上）</li>
                      <li>Enterキーを押すか、そのまま待つと自動的に検索結果が表示</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">🎯 検索可能な内容</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    以下の内容から検索できます：
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>記事タイトル</strong>：記事の主タイトル</li>
                    <li><strong>SEOタイトル</strong>：検索エンジン最適化用のタイトル</li>
                    <li><strong>記事内容</strong>：記事本文の内容</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">💡 検索のコツ</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">効果的な検索キーワード例：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>「ナイトレイン」「エルデンリング」（ゲーム名）</li>
                        <li>「初心者」「攻略」「ボス」（攻略タイプ）</li>
                        <li>「キャラ」「戦術」「地変」（カテゴリ）</li>
                        <li>具体的なボス名やエリア名</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <p className="text-sm text-green-700">
                        <strong>💡 ヒント：</strong> 検索結果は最大10件まで表示され、最新記事から順番に表示されます。
                        検索結果をクリックすると、メニューが自動的に閉じて該当記事に移動します。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. カレンダー機能 */}
            <div id="calendar" className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                📅 3. カレンダー機能
              </h2>
              
              <div className="space-y-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">📆 カレンダーとは</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    「カレンダー(更新日ごとの記事確認)」セクションでは、記事が投稿された日付を視覚的に確認できます。
                    記事が投稿された日付は<strong className="text-yellow-600">黄色でハイライト</strong>され、
                    その日にクリックすることで、その日に投稿された記事一覧を見ることができます。
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">🗓️ カレンダーの操作方法</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">📊 月の切り替え：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li><strong>前月</strong>：カレンダー上部の「◀」ボタンをクリック</li>
                        <li><strong>翌月</strong>：カレンダー上部の「▶」ボタンをクリック</li>
                        <li>現在表示中の年月はカレンダー上部に表示されます</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🎯 記事がある日の確認：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li><strong>黄色でハイライト</strong>された日付は記事が投稿されています</li>
                        <li>マウスを日付にホバーすると、記事数が表示されます</li>
                        <li>「○日に△件の記事 - クリックして記事一覧を見る」と表示</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">📋 日付別記事一覧の表示：</h4>
                      <p className="text-gray-700">
                        黄色でハイライトされた日付をクリックすると、メニューが閉じて
                        その日に投稿された記事一覧ページに自動移動します。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">💡 カレンダー活用のメリット</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>時系列で記事を振り返る</strong>：過去の特定日に投稿された記事を確認</li>
                    <li><strong>更新頻度の把握</strong>：どの程度の頻度で記事が投稿されているか一目で分かる</li>
                    <li><strong>見逃した記事の発見</strong>：過去の記事を日付から遡って探せる</li>
                    <li><strong>記事投稿パターンの理解</strong>：管理人の投稿傾向を把握できる</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 4. ナビゲーション項目 */}
            <div id="navigation" className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                🧭 4. ナビゲーション項目
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  メニューの「ナビゲーション」セクションには、サイト内の主要なページへのリンクが整理されています。
                  各項目をクリックすると該当ページに移動し、メニューは自動的に閉じます。
                </p>

                <div className="grid gap-6">
                  {/* ナビゲーション項目の詳細説明 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">📍 各ナビゲーション項目の説明</h3>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-red-500 pl-4">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          🏠 トップページに戻る
                        </h4>
                        <p className="text-gray-600 text-sm">
                          サイトのホームページに戻ります。最新記事や注目記事、カテゴリ一覧を確認できます。
                        </p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          📚 記事一覧ページへ
                        </h4>
                        <p className="text-gray-600 text-sm">
                          サイト内の全記事を一覧表示。ゲーム別やカテゴリ別でのフィルタリングも可能です。
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          🔰 エルデンリング初心者ガイド
                        </h4>
                        <p className="text-gray-600 text-sm">
                          エルデンリングを始めたばかりの方向けの基本解説ページ。クラス選択や基本操作を学べます。
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          🌙 ナイトレイン初心者ガイド
                        </h4>
                        <p className="text-gray-600 text-sm">
                          ナイトレインを始めたばかりの方向けの基本解説ページ。ゲームシステムや基本戦術を学べます。
                        </p>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          👤 管理人について
                        </h4>
                        <p className="text-gray-600 text-sm">
                          サイト管理人の情報や、サイトの運営方針について確認できます。
                        </p>
                      </div>

                      <div className="border-l-4 border-indigo-500 pl-4">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          🌙 ナイトレイン(NIGHT REIGN)の記事一覧
                        </h4>
                        <p className="text-gray-600 text-sm">
                          ナイトレインに関する記事だけを表示。最新の攻略情報やキャラ解説などが見つかります。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. 記事の探し方 */}
            <div id="articles" className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                📖 5. 記事の探し方
              </h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">🎯 目的別の記事の探し方</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🔍 キーワードで探す：</h4>
                      <p className="text-gray-700 mb-2">
                        特定の情報を探したい場合は、メニューの「サイト内検索」を活用しましょう。
                      </p>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        <li>ボス名、エリア名、キャラクター名で検索</li>
                        <li>「初心者」「攻略」「戦術」などのキーワード</li>
                        <li>特定のゲーム名（「ナイトレイン」「エルデンリング」）</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">📅 日付で探す：</h4>
                      <p className="text-gray-700 mb-2">
                        特定の日に投稿された記事を探したい場合は、カレンダー機能を使いましょう。
                      </p>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        <li>記事が投稿された日は黄色でハイライト表示</li>
                        <li>月の切り替えで過去・未来の記事も確認可能</li>
                        <li>クリックでその日の記事一覧ページに移動</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">📚 全記事から探す：</h4>
                      <p className="text-gray-700 mb-2">
                        「記事一覧ページへ」から全記事を時系列で確認できます。
                      </p>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        <li>最新記事から順番に表示</li>
                        <li>ゲーム別フィルタリング機能あり</li>
                        <li>カテゴリ別フィルタリング機能あり</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">💡 効率的な記事探しのコツ</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-2">🎮 ゲーム別に探す：</h4>
                      <p className="text-gray-700 text-sm">
                        トップページの「ゲーム別最新記事」セクションから、エルデンリングとナイトレインの最新記事を素早く確認できます。
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-2">🔥 注目記事から探す：</h4>
                      <p className="text-gray-700 text-sm">
                        トップページの「注目の攻略記事」セクションで、管理人が厳選した重要な記事を確認できます。
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-2">🆕 最新記事をチェック：</h4>
                      <p className="text-gray-700 text-sm">
                        カレンダーで今月の最新投稿日を確認し、見逃した記事がないかチェックしましょう。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. カテゴリ別記事 */}
            <div id="categories" className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                🗂️ 6. カテゴリ別記事
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  トップページの「攻略カテゴリ」セクションから、興味のある分野の記事を効率的に探すことができます。
                  ゲーム別に整理されたカテゴリから、あなたの学びたい内容を選択しましょう。
                </p>

                {/* ナイトレインカテゴリ */}
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                    🌙 ナイトレイン (NIGHT REIGN) カテゴリ
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        ⚔️ 夜の王攻略
                      </h4>
                      <p className="text-gray-600 text-sm">ボス攻略の必勝法</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        👤 キャラ別解説
                      </h4>
                      <p className="text-gray-600 text-sm">キャラ性能と使い方</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        🛡️ 戦術
                      </h4>
                      <p className="text-gray-600 text-sm">戦闘テクニック</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        🏔️ 地変攻略
                      </h4>
                      <p className="text-gray-600 text-sm">ダンジョン攻略法</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        💡 小ネタ・裏技
                      </h4>
                      <p className="text-gray-600 text-sm">知って得する情報</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        📖 ストーリー(追憶)
                      </h4>
                      <p className="text-gray-600 text-sm">ストーリー解説</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        🤔 考察系
                      </h4>
                      <p className="text-gray-600 text-sm">深い分析と考察</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        📚 初心者ガイド
                      </h4>
                      <p className="text-gray-600 text-sm">初心者向け解説</p>
                    </div>
                  </div>
                </div>

                {/* エルデンリングカテゴリ */}
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                    ⚔️ エルデンリング (ELDEN RING) カテゴリ
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        🔰 初心者ガイド
                      </h4>
                      <p className="text-gray-600 text-sm">初心者向け基本解説</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        🗺️ エリア攻略
                      </h4>
                      <p className="text-gray-600 text-sm">マップエリア攻略</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        ✨ エリア攻略(DLC)
                      </h4>
                      <p className="text-gray-600 text-sm">DLCエリア攻略</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        ⚔️ ボス攻略
                      </h4>
                      <p className="text-gray-600 text-sm">ボス戦攻略法</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        👑 ボス攻略(DLC)
                      </h4>
                      <p className="text-gray-600 text-sm">DLCボス攻略</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        🌟 戦技・遺灰関連
                      </h4>
                      <p className="text-gray-600 text-sm">戦技と遺灰解説</p>
                    </div>
                  </div>

                  <div className="mt-4 bg-white p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      <strong>その他：</strong> イベント攻略、小ネタ・裏技、武器・防具関連、考察系動画、オンライン関連、スーパープレイなど、
                      豊富なカテゴリでエルデンリングを深く学習できます。
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">💡 カテゴリ活用のコツ</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>段階的学習</strong>：初心者ガイド → 基本攻略 → 応用テクニックの順で学習</li>
                    <li><strong>目的別選択</strong>：困っている内容に応じてカテゴリを選択</li>
                    <li><strong>ゲーム進行に合わせて</strong>：プレイ進度に応じたカテゴリの記事を参照</li>
                    <li><strong>関連記事も確認</strong>：1つのカテゴリで学んだ後、関連するカテゴリも確認</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 7. 利用規約 */}
            <div id="terms" className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                📋 7. 利用規約
              </h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">📝 サイトの目的と理念</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Game Study Academyは、YouTube動画から学ぶゲーム攻略サイトとして、
                    <strong className="text-blue-800">クリエイター応援型</strong>のサービスを提供しています。
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>教育目的</strong>：ゲーム攻略の学習効率向上</li>
                    <li><strong>クリエイター支援</strong>：YouTube動画の理解促進と視聴促進</li>
                    <li><strong>コミュニティ貢献</strong>：ゲーム攻略情報の体系的整理</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">✅ 利用について</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">📖 記事の利用：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>個人的な学習目的での閲覧・参考は自由です</li>
                        <li>記事内容は元YouTubeチャンネルの動画と併せてご覧ください</li>
                        <li>記事内容の商用利用や再配布は禁止です</li>
                        <li>記事の全文コピーや無断転載は禁止です</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🔍 検索・閲覧機能：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>サイト内検索は自由にご利用いただけます</li>
                        <li>カレンダー機能やカテゴリ機能も自由にご利用ください</li>
                        <li>過度なアクセスやサーバーに負荷をかける行為は禁止です</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">⚠️ 著作権について</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">📺 YouTube動画について：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>元動画の著作権は各クリエイター（YouTuber）に帰属します</li>
                        <li>サムネイル画像は引用として使用しています</li>
                        <li>記事は元動画の理解促進を目的とした解説です</li>
                        <li>必ず元動画もご視聴いただき、クリエイターを応援してください</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🎮 ゲーム情報について：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>ゲーム画像・情報の著作権は各ゲーム会社に帰属します</li>
                        <li>攻略情報は公開されている内容を整理したものです</li>
                        <li>ゲーム会社の利益を損なう目的ではありません</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">🚫 禁止事項</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>記事の無断転載・複製</strong>：他サイトやSNSでの全文転載</li>
                    <li><strong>商用利用</strong>：記事内容を使った商業目的での利用</li>
                    <li><strong>サーバー攻撃</strong>：DDoS攻撃やスクレイピングツールの使用</li>
                    <li><strong>誹謗中傷</strong>：クリエイターやゲーム会社への悪質な批判</li>
                    <li><strong>偽情報の拡散</strong>：間違った攻略情報の意図的な流布</li>
                    <li><strong>著作権侵害</strong>：動画やゲーム素材の無断使用</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">📞 お問い合わせ・報告</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🔗 各種お問い合わせ：</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li><strong>著作権に関するお問い合わせ</strong>：権利者様からのご連絡をお待ちしています</li>
                        <li><strong>記事の修正依頼</strong>：間違いを発見された場合はご連絡ください</li>
                        <li><strong>技術的な問題</strong>：サイトの不具合やアクセス問題</li>
                        <li><strong>利用規約違反の報告</strong>：悪質な利用を発見された場合</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                      <p className="text-sm text-purple-700">
                        <strong>📧 連絡方法：</strong> 
                        お問い合わせは「管理人について」ページからご連絡いただくか、
                        メニューの管理人情報をご確認ください。迅速に対応いたします。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border-l-4 border-gray-500 p-6 rounded-r-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">📅 規約の変更</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    本利用規約は、法令の変更やサービスの改善に伴い、予告なく変更される場合があります。
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>重要な変更がある場合は、トップページでお知らせします</li>
                    <li>継続的なサイト利用は、変更後の規約に同意したものとみなします</li>
                    <li>定期的に本ページをご確認ください</li>
                  </ul>
                </div>

                <div className="bg-blue-100 border-2 border-blue-300 p-6 rounded-lg text-center">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">🤝 最後に</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Game Study Academyは、ゲーム愛好者とクリエイターの皆様が
                    共に楽しめるサイトを目指しています。<br />
                    <strong className="text-blue-800">
                      記事を読んだ後は、ぜひ元のYouTube動画もご視聴いただき、
                      クリエイターの皆様を応援してください！
                    </strong><br />
                    皆様のゲームライフがより充実したものになりますように。
                  </p>
                </div>
              </div>
            </div>

            {/* まとめセクション */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">
                🎯 サイト活用のまとめ
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">📱 基本的な使い方</h3>
                  <ul className="space-y-2 text-red-100">
                    <li>• 左上の赤いボタンでメニューを開く</li>
                    <li>• 検索機能で素早く記事を見つける</li>
                    <li>• カレンダーで日付別記事を確認</li>
                    <li>• ナビゲーションで主要ページに移動</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">🎮 効率的な学習方法</h3>
                  <ul className="space-y-2 text-red-100">
                    <li>• カテゴリ別で体系的に学習</li>
                    <li>• 初心者ガイドから始める</li>
                    <li>• 記事を読んでから動画を視聴</li>
                    <li>• 定期的に最新記事をチェック</li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-xl mb-4">
                  🎓 Game Study Academyでゲームスキルを向上させましょう！
                </p>
                <Link
                  href="/"
                  className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  🏠 トップページで学習を始める
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}