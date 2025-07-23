import { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export function generateMetadata(): Metadata {
  return {
    title: '星のカービィ ディスカバリー 隠し要素・収集攻略 | Game Study Academy',
    description: '星のカービィ ディスカバリーの隠し要素と収集アイテムを完全攻略。YouTube動画から学ぶ隠しアイテムの場所、収集のコツを詳しく解説。',
    keywords: '星のカービィ ディスカバリー,隠し要素,収集,攻略,YouTube,動画解説',
    openGraph: {
      title: '星のカービィ ディスカバリー 隠し要素・収集攻略',
      description: '星のカービィ ディスカバリーの隠し要素と収集アイテムを完全攻略',
      type: 'website'
    }
  }
}

export default function KirbySecretsPage() {
  const collectibles = [
    {
      name: 'ワドルディ',
      icon: '🎈',
      total: 300,
      description: 'ステージに隠されているワドルディを救出',
      reward: '新しいコピー能力や施設の開放',
      tips: '隠し通路や高所をチェック'
    },
    {
      name: 'フィギュア',
      icon: '🏆',
      total: 256,
      description: 'カプセルから入手できるフィギュア',
      reward: 'コレクション完成で特典',
      tips: 'カプセルは各ステージに複数配置'
    },
    {
      name: 'クリアタイム',
      icon: '⏱️',
      total: 'All',
      description: '各ステージの最短クリア記録',
      reward: 'タイムアタックの楽しみ',
      tips: 'ショートカットルートを見つける'
    },
    {
      name: 'ミッション',
      icon: '📋',
      total: 'All',
      description: '各ステージの隠しミッション',
      reward: 'スター獲得と達成感',
      tips: 'ステージ内でヒントを探す'
    }
  ]

  const areas = [
    {
      name: 'ナチュラルプレーンズ',
      stages: 6,
      waddle_dees: 47,
      secrets: '基本的な隠し要素が中心',
      color: 'bg-green-100 border-green-500'
    },
    {
      name: 'イートンアイランズ',
      stages: 6,
      waddle_dees: 52,
      secrets: '水中や高所に隠しエリア',
      color: 'bg-blue-100 border-blue-500'
    },
    {
      name: 'ウィンターホーンズ',
      stages: 6,
      waddle_dees: 54,
      secrets: '氷を溶かす仕掛けが多数',
      color: 'bg-cyan-100 border-cyan-500'
    },
    {
      name: 'オリジンヴィレッジ',
      stages: 4,
      waddle_dees: 31,
      secrets: '複雑な仕掛けとパズル',
      color: 'bg-purple-100 border-purple-500'
    },
    {
      name: 'レッドランド・フォビドゥン',
      stages: 5,
      waddle_dees: 43,
      secrets: '高難度の隠し要素',
      color: 'bg-red-100 border-red-500'
    },
    {
      name: 'ラボディスカバリー',
      stages: 6,
      waddle_dees: 49,
      secrets: '仕掛けを使った複雑な謎解き',
      color: 'bg-gray-100 border-gray-500'
    }
  ]

  return (
    <>
      <StructuredData type="website" />
      
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダーセクション */}
        <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              💎 隠し要素・収集
            </h1>
            <p className="text-xl mb-8">
              星のカービィ ディスカバリーの隠し要素と収集アイテムを完全コンプリート
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games/kirby-discovery"
                className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                ← カービィ攻略トップに戻る
              </Link>
              <Link
                href="/articles?category=secrets&game=kirby-discovery"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
              >
                📚 収集攻略の記事を見る
              </Link>
            </div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* 収集アイテム一覧 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🎯 収集アイテム一覧</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {collectibles.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-4">{item.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">全{item.total}個</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-700 w-16">報酬:</span>
                        <span className="text-green-600">{item.reward}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold text-gray-700 w-16">コツ:</span>
                        <span className="text-blue-600">{item.tips}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* エリア別収集情報 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🗺️ エリア別収集情報</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {areas.map((area, index) => (
                  <div key={index} className={`rounded-lg shadow-md p-6 border-l-4 ${area.color}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{area.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">ステージ数:</span>
                        <span className="font-semibold">{area.stages}ステージ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ワドルディ:</span>
                        <span className="font-semibold text-orange-600">{area.waddle_dees}体</span>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-600">特徴: </span>
                        <span className="text-gray-800">{area.secrets}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                        詳細マップを見る
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 収集のコツ */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">💡 収集攻略のコツ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-3xl mb-4 text-center">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">探索のコツ</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• カメラを360度回して死角をチェック</li>
                    <li>• 壁の色や模様の違いに注意</li>
                    <li>• 高い場所や水中も忘れずに</li>
                    <li>• 音にも注意を払う</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-3xl mb-4 text-center">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">能力活用</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• ファイアで氷を溶かす</li>
                    <li>• アイスで水面を凍らせる</li>
                    <li>• スパークで機械を起動</li>
                    <li>• ドリルで地面を掘る</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="text-3xl mb-4 text-center">🚗</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">ほおばりヘンケイ</h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• カーで壁を破壊</li>
                    <li>• ロケットで高所にアクセス</li>
                    <li>• 階段で新しいルートを作成</li>
                    <li>• アーチで遠くに移動</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 隠しエリアの種類 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🚪 隠しエリアの種類</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">🚪 隠し通路</h3>
                  <p className="text-blue-700 mb-3">壁や床に隠された通路。よく観察すると色や質感が違います。</p>
                  <ul className="text-blue-600 text-sm space-y-1">
                    <li>• 壁の色が微妙に違う場所</li>
                    <li>• 床に隠されたハッチ</li>
                    <li>• 背景に溶け込んだドア</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">🎯 仕掛け解放</h3>
                  <p className="text-green-700 mb-3">特定の能力や行動で開放される隠しエリア。</p>
                  <ul className="text-green-600 text-sm space-y-1">
                    <li>• スイッチを押して開く扉</li>
                    <li>• 特定の能力で破壊できる壁</li>
                    <li>• ほおばりヘンケイで作るルート</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">🌟 特殊条件</h3>
                  <p className="text-purple-700 mb-3">特定の条件を満たすことで出現する隠しエリア。</p>
                  <ul className="text-purple-600 text-sm space-y-1">
                    <li>• 全ての敵を倒す</li>
                    <li>• 制限時間内にクリア</li>
                    <li>• 特定のアイテムを持参</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 100%達成への道 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">🏆 100%達成への道</h2>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">完全攻略チェックリスト</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">📊 収集項目</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ワドルディ</span>
                        <span>300/300</span>
                      </div>
                      <div className="flex justify-between">
                        <span>フィギュア</span>
                        <span>256/256</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ステージクリア</span>
                        <span>All Clear</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3">🎯 達成目標</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ミッション達成</span>
                        <span>All Complete</span>
                      </div>
                      <div className="flex justify-between">
                        <span>タイムアタック</span>
                        <span>全ステージ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>特典解放</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 関連ページリンク */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">🔗 関連攻略ページ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/games/kirby-discovery/areas"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">🗺️</div>
                  <div className="font-semibold">エリア攻略</div>
                </Link>
                <Link
                  href="/games/kirby-discovery/abilities"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="font-semibold">コピー能力</div>
                </Link>
                <Link
                  href="/games/kirby-discovery/completion"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-semibold">完全攻略</div>
                </Link>
                <Link
                  href="/games/kirby-discovery/tips"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">💡</div>
                  <div className="font-semibold">攻略のコツ</div>
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}