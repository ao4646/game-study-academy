'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const ADMIN_PASSWORD = 'kamamemadoka'

export default function ManagementDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    // セッションストレージから認証状態をチェック
    const checkAuthentication = () => {
      const authToken = sessionStorage.getItem('admin_auth')
      const authTime = sessionStorage.getItem('admin_auth_time')
      
      if (authToken && authTime) {
        const currentTime = Date.now()
        const authTimeMs = parseInt(authTime)
        const oneHour = 60 * 60 * 1000 // 1時間
        
        // 1時間以内の認証なら有効
        if (currentTime - authTimeMs < oneHour) {
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        } else {
          // 期限切れの場合は削除
          sessionStorage.removeItem('admin_auth')
          sessionStorage.removeItem('admin_auth_time')
        }
      }
      
      setShowPasswordForm(true)
      setIsLoading(false)
    }

    checkAuthentication()
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === ADMIN_PASSWORD) {
      // 認証成功
      const currentTime = Date.now().toString()
      sessionStorage.setItem('admin_auth', 'authenticated')
      sessionStorage.setItem('admin_auth_time', currentTime)
      
      setIsAuthenticated(true)
      setShowPasswordForm(false)
      setPasswordError('')
      setPassword('')
    } else {
      // 認証失敗
      setAttempts(prev => prev + 1)
      setPasswordError('パスワードが正しくありません')
      setPassword('')
      
      // 3回失敗したらトップページにリダイレクト
      if (attempts >= 2) {
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
        setPasswordError('認証に3回失敗しました。トップページにリダイレクトします...')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600">認証状態を確認中...</p>
        </div>
      </div>
    )
  }

  if (showPasswordForm && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">管理ダッシュボード</h1>
              <p className="text-gray-600">パスワードを入力してください</p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="パスワードを入力"
                  required
                  autoFocus
                />
              </div>

              {passwordError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{passwordError}</p>
                  {attempts > 0 && attempts < 3 && (
                    <p className="text-red-600 text-xs mt-1">
                      残り試行回数: {3 - attempts}回
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={attempts >= 3}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {attempts >= 3 ? 'アクセス制限中...' : 'ログイン'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/admin"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← 管理人ページに戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    sessionStorage.removeItem('admin_auth_time')
    setIsAuthenticated(false)
    setShowPasswordForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">管理ダッシュボード</h1>
              <p className="text-gray-600 mt-2">
                サイトの画像やコンテンツを管理できます
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              ログアウト
            </button>
          </div>
        </div>

        {/* 管理メニュー */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ボス画像管理 */}
          <Link
            href="/admin/boss-images"
            className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">👑</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                  夜の王 画像管理
                </h3>
                <p className="text-gray-600 text-sm">ボスの画像をアップロード・管理</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              夜の王（ボス）の画像をアップロードして、攻略ページに表示することができます。
              各ボスのアイコンや詳細画像を管理できます。
            </p>
          </Link>

          {/* キャラクター画像管理 */}
          <Link
            href="/admin/character-images"
            className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  夜渡り（キャラクター） 画像管理
                </h3>
                <p className="text-gray-600 text-sm">キャラクターの画像をアップロード・管理</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              夜渡り（キャラクター）の画像をアップロードして、解説ページに表示することができます。
              各キャラクターのアイコンや詳細画像を管理できます。
            </p>
          </Link>
        </div>

        {/* 注意事項 */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">使用方法</h2>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• 各画像管理ページでファイルをアップロードできます</li>
            <li>• アップロードされた画像は自動的にデータベースに保存されます</li>
            <li>• 画像は該当する攻略・解説ページに自動的に表示されます</li>
            <li>• 推奨画像サイズ: 正方形（例: 200x200px）</li>
            <li>• 対応フォーマット: JPG, PNG, GIF</li>
          </ul>
        </div>

        {/* セキュリティ注意 */}
        <div className="mt-8 bg-red-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-900 mb-4">⚠️ セキュリティについて</h2>
          <ul className="space-y-2 text-red-800 text-sm">
            <li>• このページのURLは外部に公開しないでください</li>
            <li>• パスワードは安全に管理し、他人に教えないでください</li>
            <li>• 認証セッションは1時間で自動的に期限切れになります</li>
            <li>• 使用後は必ずログアウトしてください</li>
            <li>• ブラウザの履歴やブックマークにも注意してください</li>
          </ul>
        </div>

        {/* 戻るリンク */}
        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="inline-flex items-center text-gray-600 hover:text-gray-700"
          >
            ← 管理人ページに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}