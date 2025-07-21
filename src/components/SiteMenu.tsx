'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Article {
  id: number
  title: string
  created_at: string
  seo_title: string | null
}

export default function SiteMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Article[]>([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [articlesByDate, setArticlesByDate] = useState<Record<string, Article[]>>({})

  useEffect(() => {
    if (isOpen) {
      fetchArticlesByMonth()
    }
  }, [isOpen, currentDate]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchArticlesByMonth = async () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`
    const endDate = `${year}-${month.toString().padStart(2, '0')}-31`

    try {
      const { data: articles, error } = await supabase
        .from('articles')
        .select('id, title, created_at, seo_title')
        .eq('published', true)
        .gte('created_at', startDate)
        .lte('created_at', endDate)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('記事取得エラー:', error)
        return
      }

      const groupedByDate: Record<string, Article[]> = {}
      articles?.forEach(article => {
        const date = new Date(article.created_at).getDate().toString()
        if (!groupedByDate[date]) {
          groupedByDate[date] = []
        }
        groupedByDate[date].push(article)
      })

      setArticlesByDate(groupedByDate)
    } catch (error) {
      console.error('記事取得中にエラーが発生しました:', error)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    try {
      const { data: articles, error } = await supabase
        .from('articles')
        .select('id, title, seo_title, created_at')
        .eq('published', true)
        .or(`title.ilike.%${query}%,seo_title.ilike.%${query}%,content.ilike.%${query}%`)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        console.error('検索エラー:', error)
        return
      }

      setSearchResults(articles || [])
    } catch (error) {
      console.error('検索中にエラーが発生しました:', error)
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const handleDateClick = (dateString: string, hasArticles: boolean) => {
    if (hasArticles) {
      // メニューを閉じてから遷移
      setIsOpen(false)
      // 少し遅延を入れてからページ遷移
      setTimeout(() => {
        window.location.href = `/articles/date/${dateString}`
      }, 300)
    }
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDay = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const day = currentDay.getDate()
      const isCurrentMonth = currentDay.getMonth() === month
      const hasArticles = articlesByDate[day.toString()]?.length > 0
      
      // 日付文字列を作成 (YYYY-MM-DD形式)
      const dateString = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      
      days.push(
        <div
          key={i}
          className={`
            p-2 text-center cursor-pointer transition-colors rounded
            ${isCurrentMonth ? 'text-white' : 'text-gray-500'}
            ${hasArticles && isCurrentMonth ? 'text-yellow-400 font-bold bg-yellow-400/20 hover:bg-yellow-400/30' : ''}
            ${!hasArticles ? 'hover:bg-gray-600' : ''}
            ${hasArticles && isCurrentMonth ? 'cursor-pointer' : ''}
          `}
          title={hasArticles ? `${day}日に${articlesByDate[day.toString()]?.length}件の記事 - クリックして記事一覧を見る` : ''}
          onClick={() => handleDateClick(dateString, hasArticles && isCurrentMonth)}
        >
          {day}
        </div>
      )
      currentDay.setDate(currentDay.getDate() + 1)
    }

    return days
  }

  return (
    <>
      {/* メニューボタン */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 bg-red-600 text-white p-3 rounded-lg shadow-lg hover:bg-red-700 transition-colors border-2 border-black"
        aria-label="メニューを開く"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* メニューオーバーレイ */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* 背景オーバーレイ */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* メニューパネル */}
          <div className="relative w-96 bg-gray-800 text-white overflow-y-auto">
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* サイト内検索 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-300">サイト内検索</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="To search type and hit enter"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                {/* 検索結果 */}
                {searchResults.length > 0 && (
                  <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                    {searchResults.map((article) => (
                      <Link
                        key={article.id}
                        href={`/articles/${article.id}`}
                        onClick={() => setIsOpen(false)}
                        className="block p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                      >
                        <div className="text-sm font-medium">{article.seo_title || article.title}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(article.created_at).toLocaleDateString('ja-JP')}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* カレンダー */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-300">カレンダー(更新日ごとの記事確認)</h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  {/* カレンダーヘッダー */}
                  <div className="flex items-center justify-between mb-4 bg-red-600 text-white p-3 rounded">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="hover:bg-red-700 p-1 rounded"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                      <span className="font-semibold">
                        {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
                      </span>
                    </div>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="hover:bg-red-700 p-1 rounded"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* 曜日ヘッダー */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
                      <div key={day} className="text-center text-gray-400 font-medium p-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* カレンダーの日付 */}
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>

                  {/* 前月ナビゲーション */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      « {currentDate.getMonth() === 0 ? '12' : currentDate.getMonth()}月
                    </button>
                  </div>
                </div>
              </div>

              {/* メニュー項目 */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-300">ナビゲーション</h3>
                <nav className="space-y-2">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  >
                    🏠 トップページに戻る
                  </Link>
                  <Link
                    href="/guide"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  >
                    📖 サイトの使い方ガイド
                  </Link>
                  <Link
                    href="/articles"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  >
                    📚 記事一覧ページへ
                  </Link>
                  <Link
                    href="/beginner"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  >
                    🔰 エルデンリング初心者ガイド
                  </Link>
                  <Link
                    href="/games/elden-ring"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  >
                    ⚔️ エルデンリングの記事一覧
                  </Link>
                  <Link
                    href="/beginner/nightreign"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  >
                    🌙 ナイトレイン初心者ガイド
                  </Link>
                  <Link
                    href="/games/nightreign"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  >
                    🌙 ナイトレインの記事一覧
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                  >
                    👤 管理人について
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}