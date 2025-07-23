import { Metadata } from 'next'
import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import KirbyAreaArticlesClient from './KirbyAreaArticlesClient'

export function generateMetadata(): Metadata {
  return {
    title: '星のカービィ ディスカバリー エリア攻略 | Game Study Academy',
    description: '星のカービィ ディスカバリーの全エリア・ステージ攻略法を徹底解説。YouTube動画から学ぶエリア別攻略のコツ、隠し要素、ルート解説まで詳しく紹介。',
    keywords: '星のカービィ ディスカバリー,エリア攻略,ステージ攻略,攻略,YouTube,動画解説',
    openGraph: {
      title: '星のカービィ ディスカバリー エリア攻略',
      description: '星のカービィ ディスカバリーの全エリア・ステージ攻略法を徹底解説',
      type: 'website'
    }
  }
}

export default function KirbyAreasPage() {

  return (
    <>
      <StructuredData type="website" />
      
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダーセクション */}
        <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🗺️ エリア攻略
            </h1>
            <p className="text-xl mb-8">
              星のカービィ ディスカバリーの全エリア・ステージ攻略法をマスターしよう
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/games/kirby-discovery"
                className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                ← カービィ攻略トップに戻る
              </Link>
              <Link
                href="/articles?category=areas&game=kirby-discovery"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
              >
                📚 エリア攻略の記事を見る
              </Link>
            </div>
          </div>
        </section>

        {/* エリア攻略ガイド */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
    
            {/* 攻略記事一覧 */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📚 エリア攻略記事</h2>
              <KirbyAreaArticlesClient />
            </div>

            {/* 関連ページリンク */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">🔗 関連攻略ページ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/games/kirby-discovery/basics"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">🎮</div>
                  <div className="font-semibold">基本操作</div>
                </Link>
                <Link
                  href="/games/kirby-discovery/bosses"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">👹</div>
                  <div className="font-semibold">ボス攻略</div>
                </Link>
                <Link
                  href="/games/kirby-discovery/secrets"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">💎</div>
                  <div className="font-semibold">隠し要素</div>
                </Link>
                <Link
                  href="/games/kirby-discovery/abilities"
                  className="bg-pink-100 hover:bg-pink-200 rounded-lg p-4 transition-colors"
                >
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="font-semibold">コピー能力</div>
                </Link>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}