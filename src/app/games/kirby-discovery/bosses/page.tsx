import { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'

export function generateMetadata(): Metadata {
  return {
    title: '星のカービィ ディスカバリー ボス攻略 | Game Study Academy',
    description: '星のカービィ ディスカバリーの全ボス攻略法を徹底解説。YouTube動画から学ぶボス戦のコツ、弱点、攻撃パターンを詳しく紹介。',
    keywords: '星のカービィ ディスカバリー,ボス攻略,ボス戦,攻略,YouTube,動画解説',
    openGraph: {
      title: '星のカービィ ディスカバリー ボス攻略',
      description: '星のカービィ ディスカバリーの全ボス攻略法を徹底解説',
      type: 'website'
    }
  }
}

export default function KirbyBossesPage() {
  const bosses = [
    {
      name: 'グーイ',
      area: 'ナチュラルプレーンズ',
      difficulty: 1,
      weakPoint: 'ファイア系の攻撃',
      description: '最初のボス。基本的な攻撃パターンを覚えよう'
    },
    {
      name: 'トロピカルウッズ',
      area: 'イートンアイランズ',
      difficulty: 2,
      weakPoint: 'アイス系の攻撃',
      description: '植物系ボス。火属性に弱い'
    },
    {
      name: 'クラッコ',
      area: 'ウィンターホーンズ',
      difficulty: 3,
      weakPoint: '目玉への直接攻撃',
      description: '空中戦が中心。タイミングが重要'
    },
    {
      name: 'フロストライオン',
      area: 'ウィンターホーンズ',
      difficulty: 4,
      weakPoint: 'ファイア系の攻撃',
      description: '氷の攻撃を多用。火で溶かそう'
    },
    {
      name: 'キング・デデデ',
      area: 'ワンダリア',
      difficulty: 4,
      weakPoint: 'ハンマー攻撃後の隙',
      description: 'おなじみのライバル。パターンを覚えれば楽勝'
    },
    {
      name: 'メタナイト',
      area: 'ワンダリア',
      difficulty: 5,
      weakPoint: '剣攻撃後の隙',
      description: '高速戦闘。反射神経が試される'
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
              👹 ボス攻略
            </h1>
            <p className="text-xl mb-8">
              星のカービィ ディスカバリーの全ボス攻略法をマスターしよう
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games/kirby-discovery"
                className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                ← カービィ攻略トップに戻る
              </Link>
              <Link
                href="/articles?category=bosses&game=kirby-discovery"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
              >
                📚 ボス攻略の記事を見る
              </Link>
            </div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* ボス攻略の基本 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">⚔️ ボス攻略の基本</h2>
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">👁️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">攻撃パターンを観察</h3>
                    <p className="text-gray-600 text-sm">ボスの行動を注意深く観察し、攻撃のタイミングと種類を覚えましょう</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">⭐</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">適切な能力を選択</h3>
                    <p className="text-gray-600 text-sm">ボスの弱点に合わせてコピー能力を使い分けることが勝利の鍵</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🛡️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">回避とガードを活用</h3>
                    <p className="text-gray-600 text-sm">攻撃だけでなく、適切な回避とガードで被ダメージを最小限に</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ボス一覧 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">👹 ボス攻略一覧</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {bosses.map((boss, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{boss.name}</h3>
                        <div className="flex">
                          {Array.from({length: boss.difficulty}, (_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="font-semibold text-gray-700 w-20">出現地:</span>
                          <span className="text-gray-600">{boss.area}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold text-gray-700 w-20">弱点:</span>
                          <span className="text-red-600">{boss.weakPoint}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="font-semibold text-gray-700 w-20">攻略法:</span>
                          <span className="text-gray-600">{boss.description}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex gap-3">
                        <button className="flex-1 bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors">
                          詳細攻略を見る
                        </button>
                        <button className="flex-1 border border-pink-600 text-pink-600 py-2 px-4 rounded-lg hover:bg-pink-50 transition-colors">
                          動画解説
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 攻略のコツ */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">💡 ボス戦攻略のコツ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🎯</span>
                    効果的な攻撃方法
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• ボスの弱点属性を把握する</li>
                    <li>• 攻撃後の隙を狙って反撃</li>
                    <li>• ほおばりヘンケイを活用</li>
                    <li>• 連続攻撃でダメージを稼ぐ</li>
                    <li>• 環境を利用した攻撃</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🛡️</span>
                    安全な戦い方
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 攻撃パターンを覚える</li>
                    <li>• 適切な距離を保つ</li>
                    <li>• ガードタイミングを覚える</li>
                    <li>• 回復アイテムを活用</li>
                    <li>• 焦らず確実に攻撃</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 難易度別攻略 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📊 難易度別攻略法</h2>
              <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">⭐ 初級ボス（★1-2）</h3>
                  <p className="text-green-700 mb-3">基本的な攻撃パターンが中心。操作に慣れるのに最適です。</p>
                  <ul className="text-green-600 text-sm space-y-1">
                    <li>• 基本操作を確実に行う</li>
                    <li>• 攻撃パターンをしっかり覚える</li>
                    <li>• 焦らず確実にダメージを与える</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                  <h3 className="text-xl font-semibold text-yellow-800 mb-3">⭐⭐ 中級ボス（★3-4）</h3>
                  <p className="text-yellow-700 mb-3">複雑な攻撃パターンと特殊能力を持つボス。戦略が重要です。</p>
                  <ul className="text-yellow-600 text-sm space-y-1">
                    <li>• 適切なコピー能力を選択</li>
                    <li>• 特殊攻撃のタイミングを把握</li>
                    <li>• ほおばりヘンケイを効果的に使用</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">⭐⭐⭐ 上級ボス（★5）</h3>
                  <p className="text-red-700 mb-3">高速かつ強力な攻撃を繰り出す最難関ボス。完璧な戦略が必要です。</p>
                  <ul className="text-red-600 text-sm space-y-1">
                    <li>• 全ての攻撃パターンを暗記</li>
                    <li>• 反射神経と判断力が重要</li>
                    <li>• 最適な能力とタイミングで戦う</li>
                  </ul>
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