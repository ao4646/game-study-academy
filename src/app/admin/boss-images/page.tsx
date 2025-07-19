'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Boss {
  id: number
  name: string
  slug: string
  description: string
  difficulty: number
  game_id: number
  image_url: string | null
  thumbnail_url: string | null
}

export default function BossImagesPage() {
  const [bosses, setBosses] = useState<Boss[]>([])
  const [uploadingBossId, setUploadingBossId] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 認証状態をチェック
    const checkAuth = () => {
      const authToken = sessionStorage.getItem('admin_auth')
      const authTime = sessionStorage.getItem('admin_auth_time')
      
      if (authToken && authTime) {
        const currentTime = Date.now()
        const authTimeMs = parseInt(authTime)
        const oneHour = 60 * 60 * 1000
        
        if (currentTime - authTimeMs < oneHour) {
          setIsAuthenticated(true)
          fetchBosses()
        } else {
          // 期限切れ
          sessionStorage.removeItem('admin_auth')
          sessionStorage.removeItem('admin_auth_time')
          window.location.href = '/admin/management-dashboard-secret-xyz123'
        }
      } else {
        // 未認証
        window.location.href = '/admin/management-dashboard-secret-xyz123'
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const fetchBosses = async () => {
    try {
      const { data, error } = await supabase
        .from('bosses')
        .select('*')
        .eq('game_id', 1) // ナイトレイン
        .order('id')

      if (error) {
        console.error('ボス取得エラー:', error)
        return
      }

      setBosses(data || [])
    } catch (error) {
      console.error('ボス取得中にエラーが発生しました:', error)
    }
  }

  const handleFileUpload = async (bossId: number, file: File) => {
    setUploadingBossId(bossId)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bossId', bossId.toString())

      const response = await fetch('/api/upload-boss-image', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setMessage(`${bosses.find(b => b.id === bossId)?.name}の画像をアップロードしました`)
        fetchBosses() // リストを更新
      } else {
        setMessage(`エラー: ${result.error}`)
      }
    } catch (error) {
      setMessage('アップロード中にエラーが発生しました')
    }

    setUploadingBossId(null)
  }

  const handleFileChange = (bossId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(bossId, file)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">認証状態を確認中...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">認証が必要です</h1>
          <p className="text-gray-600 mb-4">管理ダッシュボードにリダイレクトしています...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <Link
            href="/admin/management-dashboard-secret-xyz123"
            className="inline-flex items-center text-red-600 hover:text-red-700 mb-4"
          >
            ← 管理ダッシュボードに戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">夜の王 画像管理</h1>
          <p className="text-gray-600 mt-2">
            各ボスの画像をアップロードして管理できます
          </p>
        </div>

        {/* メッセージ表示 */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('エラー') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {/* ボス一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bosses.map((boss) => (
            <div key={boss.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{boss.name}</h3>
                <span className="text-sm text-gray-500">ID: {boss.id}</span>
              </div>

              {/* 現在の画像表示 */}
              <div className="mb-4">
                {boss.image_url ? (
                  <div className="text-center">
                    <img
                      src={boss.image_url}
                      alt={boss.name}
                      className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                    />
                    <span className="text-xs text-green-600">画像設定済み</span>
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto flex items-center justify-center mb-2">
                    <span className="text-4xl">👑</span>
                  </div>
                )}
              </div>

              {/* ファイルアップロード */}
              <div className="text-center">
                <label className={`cursor-pointer inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  uploadingBossId === boss.id
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}>
                  {uploadingBossId === boss.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      アップロード中...
                    </>
                  ) : (
                    <>
                      📸 画像を選択
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(boss.id, e)}
                    disabled={uploadingBossId === boss.id}
                    className="hidden"
                  />
                </label>
              </div>

              {/* ボス情報 */}
              <div className="mt-4 text-xs text-gray-500">
                <p>難易度: {boss.difficulty}/10</p>
                <p className="line-clamp-2">{boss.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 使用方法 */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">使用方法</h2>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• 各ボスカードの「画像を選択」ボタンをクリックして画像ファイルを選択</li>
            <li>• アップロードされた画像は自動的にデータベースに保存されます</li>
            <li>• 画像は夜の王攻略ページ（/categories/1）に表示されます</li>
            <li>• 推奨画像サイズ: 正方形（例: 200x200px）</li>
            <li>• 対応フォーマット: JPG, PNG, GIF</li>
          </ul>
        </div>
      </div>
    </div>
  )
}