'use client'

import { useState, useRef } from 'react'
import { uploadImage, type ImageBucket } from '@/lib/storage'

interface ImageUploadProps {
  onUpload: (url: string) => void
  bucket?: ImageBucket
  path?: string
  accept?: string
  maxSize?: number // MB
  className?: string
  children?: React.ReactNode
}

export default function ImageUpload({
  onUpload,
  bucket = 'images',
  path,
  accept = 'image/*',
  maxSize = 5,
  className,
  children
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File selected event triggered')
    const file = event.target.files?.[0]
    if (!file) {
      console.log('No file selected')
      return
    }

    console.log('File selected:', file.name, file.size, file.type)
    setError(null)

    // ファイルサイズチェック
    if (file.size > maxSize * 1024 * 1024) {
      setError(`ファイルサイズが${maxSize}MBを超えています`)
      return
    }

    // ファイルタイプチェック
    if (!file.type.startsWith('image/')) {
      setError('画像ファイルのみアップロード可能です')
      return
    }

    setUploading(true)
    
    try {
      const result = await uploadImage(file, bucket, path)
      
      if (result.success && result.url) {
        onUpload(result.url)
      } else {
        setError(result.error || 'アップロードに失敗しました')
      }
    } catch (err) {
      setError('アップロード中にエラーが発生しました')
    } finally {
      setUploading(false)
      // ファイル入力をリセット
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleClick = () => {
    console.log('ImageUpload clicked')
    if (fileInputRef.current) {
      console.log('File input ref exists, clicking...')
      fileInputRef.current.click()
    } else {
      console.error('File input ref is null')
    }
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      <div
        onClick={handleClick}
        className={`
          cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 
          text-center hover:border-gray-400 transition-colors
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
            <p className="text-gray-600">アップロード中...</p>
          </div>
        ) : (
          children || (
            <div className="flex flex-col items-center">
              <svg className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600">クリックして画像を選択</p>
              <p className="text-sm text-gray-500 mt-1">最大{maxSize}MB</p>
            </div>
          )
        )}
      </div>

      {error && (
        <div className="mt-2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}