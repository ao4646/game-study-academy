import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type ImageBucket = 'images' | 'thumbnails' | 'avatars'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

/**
 * 画像をSupabase Storageにアップロード
 */
export async function uploadImage(
  file: File,
  bucket: ImageBucket = 'images',
  path?: string
): Promise<UploadResult> {
  try {
    // ファイル名を生成（タイムスタンプ + ランダム文字列）
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}_${randomString}.${fileExtension}`
    
    // パスを設定（指定されていない場合はルートに保存）
    const filePath = path ? `${path}/${fileName}` : fileName

    // ファイルをアップロード
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('画像アップロードエラー:', error)
      return { success: false, error: error.message }
    }

    // 公開URLを取得
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return {
      success: true,
      url: publicData.publicUrl
    }
  } catch (error) {
    console.error('画像アップロード中にエラーが発生しました:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '不明なエラー'
    }
  }
}

/**
 * 画像を削除
 */
export async function deleteImage(
  filePath: string,
  bucket: ImageBucket = 'images'
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) {
      console.error('画像削除エラー:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('画像削除中にエラーが発生しました:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '不明なエラー'
    }
  }
}

/**
 * URLからファイルパスを抽出
 */
export function extractFilePathFromUrl(url: string, bucket: ImageBucket): string | null {
  try {
    const urlObj = new URL(url)
    const pathSegments = urlObj.pathname.split('/')
    const bucketIndex = pathSegments.findIndex(segment => segment === bucket)
    
    if (bucketIndex === -1) return null
    
    return pathSegments.slice(bucketIndex + 1).join('/')
  } catch {
    return null
  }
}

/**
 * 画像の最適化とサムネイル生成
 */
export async function optimizeImage(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 600,
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // アスペクト比を維持しながらリサイズ
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height)
      const newWidth = img.width * ratio
      const newHeight = img.height * ratio
      
      canvas.width = newWidth
      canvas.height = newHeight
      
      ctx?.drawImage(img, 0, 0, newWidth, newHeight)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const optimizedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          })
          resolve(optimizedFile)
        } else {
          resolve(file)
        }
      }, 'image/jpeg', quality)
    }
    
    img.onerror = () => resolve(file)
    img.src = URL.createObjectURL(file)
  })
}

/**
 * 複数の画像を一括アップロード
 */
export async function uploadMultipleImages(
  files: File[],
  bucket: ImageBucket = 'images',
  path?: string,
  optimize: boolean = true
): Promise<UploadResult[]> {
  const results: UploadResult[] = []
  
  for (const file of files) {
    const fileToUpload = optimize ? await optimizeImage(file) : file
    const result = await uploadImage(fileToUpload, bucket, path)
    results.push(result)
  }
  
  return results
}