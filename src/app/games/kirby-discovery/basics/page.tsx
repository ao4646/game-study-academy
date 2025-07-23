import { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export function generateMetadata(): Metadata {
  return {
    title: '星のカービィ ディスカバリー 基本操作・システム攻略 | Game Study Academy',
    description: '星のカービィ ディスカバリーの基本操作とゲームシステムを徹底解説。YouTube動画から学ぶ操作方法、システム理解で快適なプレイを。',
    keywords: '星のカービィ ディスカバリー,基本操作,システム,攻略,YouTube,動画解説',
    openGraph: {
      title: '星のカービィ ディスカバリー 基本操作・システム攻略',
      description: '星のカービィ ディスカバリーの基本操作とゲームシステムを徹底解説',
      type: 'website'
    }
  }
}

export default function KirbyBasicsPage() {
  return (
    <>
      <StructuredData type="website" />
      
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダーセクション */}
        <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎮 基本操作・システム
            </h1>
            <p className="text-xl mb-8">
              星のカービィ ディスカバリーの基本操作とゲームシステムを学ぼう
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games/kirby-discovery"
                className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                ← カービィ攻略トップに戻る
              </Link>
              <Link
                href="/articles?category=basics&game=kirby-discovery"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
              >
                📚 基本操作の記事を見る
              </Link>
            </div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* 基本操作ガイド */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🎮 基本操作ガイド</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-4xl mb-4 text-center">🕹️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">移動とジャンプ</h3>
                  <p className="text-gray-600 text-sm mb-4">3D空間での基本的な移動操作とジャンプアクション</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 左スティックで移動</li>
                    <li>• Bボタンでジャンプ</li>
                    <li>• 空中でもう一度Bで滑空</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-4xl mb-4 text-center">💨</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">すいこみとはきだし</h3>
                  <p className="text-gray-600 text-sm mb-4">カービィの基本アクション、敵をすいこんで能力をコピー</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Yボタンですいこみ</li>
                    <li>• もう一度Yではきだし</li>
                    <li>• すいこんだ敵から能力コピー</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-4xl mb-4 text-center">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">コピー能力</h3>
                  <p className="text-gray-600 text-sm mb-4">敵をすいこんで様々な能力を使用</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Xボタンで能力攻撃</li>
                    <li>• 上+Xで特殊攻撃</li>
                    <li>• Aボタンで能力を捨てる</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-4xl mb-4 text-center">🚗</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">ほおばりヘンケイ</h3>
                  <p className="text-gray-600 text-sm mb-4">大きなものをほおばって変身する新システム</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 大きなオブジェクトに近づく</li>
                    <li>• Yボタンでほおばり</li>
                    <li>• 各変身で専用操作</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-4xl mb-4 text-center">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">アクション操作</h3>
                  <p className="text-gray-600 text-sm mb-4">戦闘や探索で使用する各種アクション</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ZRでダッシュ</li>
                    <li>• ZLでガード</li>
                    <li>• Rスティックでカメラ操作</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-4xl mb-4 text-center">🎮</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">システム操作</h3>
                  <p className="text-gray-600 text-sm mb-4">メニューやマップなどのシステム操作</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• +ボタンでポーズメニュー</li>
                    <li>• -ボタンでマップ表示</li>
                    <li>• Lでカメラリセット</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ゲームシステム */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🌟 重要なゲームシステム</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-3xl mr-3">🚗</span>
                    ほおばりヘンケイシステム
                  </h3>
                  <p className="text-gray-600 mb-4">カービィの新要素。大きなオブジェクトをほおばって変身し、パズルを解いたり新しいエリアに進んだりできます。</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">🚗 カー:</span>
                      <span>高速移動、壁の破壊</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">🏠 ハウス:</span>
                      <span>敵の攻撃を防ぐ、隠れる</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">🚀 ロケット:</span>
                      <span>空中移動、高所へのアクセス</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-3xl mr-3">⭐</span>
                    コピー能力システム
                  </h3>
                  <p className="text-gray-600 mb-4">敵をすいこんで能力をコピー。各能力には基本攻撃と進化攻撃があり、戦略的に使い分けることが重要です。</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">🔥 ファイア:</span>
                      <span>炎で攻撃、氷を溶かす</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">❄️ アイス:</span>
                      <span>氷で攻撃、水面を凍らせる</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">⚡ スパーク:</span>
                      <span>電気攻撃、機械を起動</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 攻略のコツ */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">💡 攻略のコツ</h2>
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 効率的な探索方法</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• カメラを動かして死角をチェック</li>
                      <li>• 高い場所から全体を見渡す</li>
                      <li>• ほおばりヘンケイを活用した移動</li>
                      <li>• 隠し通路は壁の色や形で判断</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">⚔️ 戦闘のポイント</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• 敵の攻撃パターンを覚える</li>
                      <li>• 適切なコピー能力を選択</li>
                      <li>• ガードとダッシュを使い分け</li>
                      <li>• 環境を利用した攻撃</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 関連ページリンク */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">🔗 関連攻略ページ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/games/kirby-discovery/abilities"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="font-semibold">コピー能力</div>
                </Link>
                <Link
                  href="/games/kirby-discovery/copy-abilities"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">🚗</div>
                  <div className="font-semibold">ほおばりヘンケイ</div>
                </Link>
                <Link
                  href="/games/kirby-discovery/areas"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">🗺️</div>
                  <div className="font-semibold">エリア攻略</div>
                </Link>
                <Link
                  href="/games/kirby-discovery/bosses"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">👹</div>
                  <div className="font-semibold">ボス攻略</div>
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}