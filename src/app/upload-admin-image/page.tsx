'use client'

import { useState } from 'react'

export default function UploadAdminImagePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setResult({ message: '画像ファイルを選択してください。', type: 'error' })
      return
    }

    setSelectedFile(file)
    setResult({ message: `選択されたファイル: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`, type: 'success' })

    // プレビュー表示
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const uploadImage = async () => {
    if (!selectedFile) {
      setResult({ message: 'ファイルが選択されていません。', type: 'error' })
      return
    }

    setUploading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/upload-admin-image', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setResult({ 
          message: `アップロード成功！画像がデータベースに保存されました。`, 
          type: 'success' 
        })
        // 少し待ってから成功メッセージを表示
        setTimeout(() => {
          alert('画像のアップロードが完了しました。トップページで浮動ボタンを確認できます。')
        }, 1000)
      } else {
        setResult({ message: `アップロードエラー: ${data.error}`, type: 'error' })
      }
    } catch (error) {
      setResult({ message: `エラー: ${error}`, type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">管理人キャラクター画像アップロード</h1>
            <p className="text-gray-600">
              提供された管理人キャラクター画像をSupabaseにアップロードします。
            </p>
          </div>

          {/* ドラッグ&ドロップエリア */}
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors
              ${selectedFile ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400'}
            `}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-lg">ここに画像ファイルをドロップするか、下のボタンをクリックしてファイルを選択してください</p>
              </div>
              
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                id="fileInput"
              />
              
              <label
                htmlFor="fileInput"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                ファイルを選択
              </label>
            </div>
          </div>

          {/* プレビュー */}
          {preview && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">プレビュー</h3>
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="プレビュー"
                  className="max-w-xs max-h-64 rounded-lg shadow-md border"
                />
              </div>
            </div>
          )}

          {/* アップロードボタン */}
          <div className="mb-6">
            <button
              onClick={uploadImage}
              disabled={!selectedFile || uploading}
              className={`
                w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors
                ${!selectedFile || uploading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
                }
              `}
            >
              {uploading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  アップロード中...
                </span>
              ) : (
                'アップロード'
              )}
            </button>
          </div>

          {/* 結果表示 */}
          {result && (
            <div className={`
              p-4 rounded-lg mb-6
              ${result.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
              }
            `}>
              <p dangerouslySetInnerHTML={{ __html: result.message }} />
            </div>
          )}

          {/* 戻るボタン */}
          <div className="text-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップページに戻る
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}