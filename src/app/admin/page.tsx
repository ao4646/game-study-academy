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
  // 一時的に無効化
  // const [characterImageUrl, setCharacterImageUrl] = useState('')
  // const [isEditingCharacter, setIsEditingCharacter] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadingCharacter, setIsUploadingCharacter] = useState(false)

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
      // setCharacterImageUrl(data.character_image_url || '')
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

  const uploadFloatingButtonImage = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-floating-button-image', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'アップロードに失敗しました')
      }

      if (adminInfo) {
        setAdminInfo({ ...adminInfo, floating_button_image_url: result.url })
        setFloatingButtonImageUrl(result.url)
        alert('画像をアップロードしました')
      }
    } catch (error) {
      console.error('アップロード中にエラーが発生しました:', error)
      alert('アップロードに失敗しました')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        uploadFloatingButtonImage(file)
      } else {
        alert('画像ファイルを選択してください')
      }
    }
  }

  // 一時的に無効化
  /*
  const saveCharacterImage = async () => {
    if (!adminInfo) return

    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('admin_info')
        .update({ character_image_url: characterImageUrl || null })
        .eq('id', adminInfo.id)

      if (error) {
        console.error('保存エラー:', error)
        alert('保存に失敗しました')
        return
      }

      setAdminInfo({ ...adminInfo, character_image_url: characterImageUrl || null })
      setIsEditingCharacter(false)
      alert('保存しました')
    } catch (error) {
      console.error('保存中にエラーが発生しました:', error)
      alert('保存に失敗しました')
    } finally {
      setIsSaving(false)
    }
  }

  const uploadCharacterImage = async (file: File) => {
    setIsUploadingCharacter(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-admin-image', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'アップロードに失敗しました')
      }

      if (adminInfo) {
        setAdminInfo({ ...adminInfo, character_image_url: result.url })
        setCharacterImageUrl(result.url)
        alert('画像をアップロードしました')
      }
    } catch (error) {
      console.error('アップロード中にエラーが発生しました:', error)
      alert('アップロードに失敗しました')
    } finally {
      setIsUploadingCharacter(false)
    }
  }

  const handleCharacterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        uploadCharacterImage(file)
      } else {
        alert('画像ファイルを選択してください')
      }
    }
  }
  */

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
                <div className="flex-shrink-0 relative">
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
                  {/* 編集ボタン - 一時的に無効化 */}
                  {/* <button
                    onClick={() => setIsEditingCharacter(true)}
                    className="absolute -bottom-2 -right-2 bg-white text-orange-500 rounded-full p-2 shadow-lg hover:bg-orange-50 transition-colors"
                    title="画像を編集"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button> */}
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

          {/* 管理機能へのアクセス（隠しリンク） */}
          {/* 必要な場合は以下のコメントアウトを解除してください */}
          {/* 
          <div className="text-center mt-4">
            <Link
              href="/admin/management-dashboard-secret-xyz123"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              管理機能
            </Link>
          </div>
          */}
        </div>
      </div>

      {/* キャラクター画像編集モーダル - 一時的に無効化 */}
      {/* {isEditingCharacter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">管理人画像を編集</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画像ファイルをアップロード:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCharacterFileChange}
                  disabled={isUploadingCharacter}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
                {isUploadingCharacter && (
                  <p className="text-sm text-orange-600 mt-1">アップロード中...</p>
                )}
              </div>
              
              <div className="text-center text-gray-500">または</div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画像URL:
                </label>
                <input
                  type="url"
                  value={characterImageUrl}
                  onChange={(e) => setCharacterImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => {
                    setIsEditingCharacter(false)
                    setCharacterImageUrl(adminInfo.character_image_url || '')
                  }}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={saveCharacterImage}
                  disabled={isSaving}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50"
                >
                  {isSaving ? '保存中...' : '保存'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}