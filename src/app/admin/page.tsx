'use client'

import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)


interface AdminInfo {
  id: number
  name: string
  display_name: string
  bio: string
  avatar_url: string | null
  character_image_url: string | null
  floating_button_image_url: string | null
  twitter_url: string | null
  github_url: string | null
  website_url: string | null
  favorite_games: string[]
  gaming_experience: string
  created_at: string
  updated_at: string
}

export default function AdminPage() {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [floatingButtonImageUrl, setFloatingButtonImageUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchAdminInfo()
  }, [])

  const fetchAdminInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_info')
        .select('*')
        .eq('id', 1)
        .single()

      if (error) {
        console.error('管理人情報の取得エラー:', error)
        return
      }

      setAdminInfo(data)
      setFloatingButtonImageUrl(data.floating_button_image_url || '')
    } catch (error) {
      console.error('管理人情報の取得中にエラーが発生しました:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveFloatingButtonImage = async () => {
    if (!adminInfo) return

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('admin_info')
        .update({ floating_button_image_url: floatingButtonImageUrl || null })
        .eq('id', adminInfo.id)

      if (error) {
        console.error('保存エラー:', error)
        alert('保存に失敗しました')
        return
      }

      setAdminInfo({ ...adminInfo, floating_button_image_url: floatingButtonImageUrl || null })
      setIsEditing(false)
      alert('保存しました')
    } catch (error) {
      console.error('保存中にエラーが発生しました:', error)
      alert('保存に失敗しました')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-orange-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!adminInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-orange-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">管理人情報が見つかりません</h1>
          <p className="text-gray-600">後ほどもう一度お試しください。</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-orange-200">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">管理人について</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>

          {/* メインコンテンツ */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* キャラクター画像 */}
                <div className="flex-shrink-0">
                  {adminInfo.character_image_url ? (
                    <img
                      src={adminInfo.character_image_url}
                      alt={adminInfo.display_name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {adminInfo.display_name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* 基本情報 */}
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">{adminInfo.display_name}</h2>
                  <p className="text-orange-100 text-lg mb-4">Game Study Academy 管理人</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {adminInfo.twitter_url && (
                      <a
                        href={adminInfo.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {adminInfo.github_url && (
                      <a
                        href={adminInfo.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {adminInfo.website_url && (
                      <a
                        href={adminInfo.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors"
                      >
                        youtube(活動は終了済み)
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* 自己紹介 */}
              <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                  自己紹介
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{adminInfo.bio}</p>
                </div>
              </section>

              {/* ゲーム経験 */}
              <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                  ゲーム経験
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">{adminInfo.gaming_experience}</p>
                </div>
              </section>

              {/* 好きなゲーム */}
              <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                  好きなゲーム
                </h3>
                <div className="flex flex-wrap gap-3">
                  {adminInfo.favorite_games.map((game, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-medium"
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </section>

              {/* 浮動ボタン画像設定 */}
              <section>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                  浮動ボタン画像設定
                </h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* 現在の画像プレビュー */}
                    <div className="flex-shrink-0">
                      <p className="text-sm text-gray-600 mb-2">現在の浮動ボタン画像:</p>
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                        {adminInfo.floating_button_image_url || adminInfo.character_image_url ? (
                          <img
                            src={adminInfo.floating_button_image_url || adminInfo.character_image_url}
                            alt="浮動ボタン画像"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">
                              {adminInfo.display_name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 編集フォーム */}
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              浮動ボタン画像URL:
                            </label>
                            <input
                              type="url"
                              value={floatingButtonImageUrl}
                              onChange={(e) => setFloatingButtonImageUrl(e.target.value)}
                              placeholder="https://example.com/image.jpg"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              空の場合は管理人画像が使用されます
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={saveFloatingButtonImage}
                              disabled={isSaving}
                              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50"
                            >
                              {isSaving ? '保存中...' : '保存'}
                            </button>
                            <button
                              onClick={() => {
                                setIsEditing(false)
                                setFloatingButtonImageUrl(adminInfo.floating_button_image_url || '')
                              }}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                              キャンセル
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-gray-700">
                            現在のURL: {adminInfo.floating_button_image_url || '(管理人画像を使用)'}
                          </p>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all"
                          >
                            編集
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* メッセージ */}
              <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">サイトについて</h3>
                <p className="text-gray-700 leading-relaxed text-center text-lg">
                  このサイトでは、エルデンリング: ナイトレインを中心とした<br />
                  ゲーム攻略情報を分かりやすく発信しています。<br />
                  初心者から上級者まで、皆様のゲームライフが<br />
                  より充実するよう心がけています。
                </p>
              </section>
            </div>
          </div>

          {/* 戻るボタン */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}