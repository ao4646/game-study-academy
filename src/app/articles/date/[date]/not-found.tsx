import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          指定された日付の記事が見つかりません
        </h2>
        <p className="text-gray-600 mb-8">
          この日付には記事が投稿されていないか、<br />
          日付の形式が正しくない可能性があります。
        </p>
        <div className="space-y-4">
          <Link
            href="/articles"
            className="block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            📚 全記事一覧を見る
          </Link>
          <Link
            href="/"
            className="block text-gray-600 hover:text-gray-700 transition-colors"
          >
            ← ホームページに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}