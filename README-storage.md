# Supabase Storage 画像機能の使用方法

## 概要

このプロジェクトでは、Supabase Storageを使用してゲーム攻略サイトの画像を管理しています。

## 設定済みの機能

### 1. ストレージバケット
- `images`: 記事画像、ゲーム画像等 (最大50MB)
- `thumbnails`: サムネイル画像 (最大10MB)  
- `avatars`: アバター画像 (最大2MB)

### 2. データベーススキーマ
各テーブルに画像URL用のカラムを追加済み：

```sql
-- articles テーブル
ALTER TABLE articles ADD COLUMN header_image_url TEXT;
ALTER TABLE articles ADD COLUMN thumbnail_image_url TEXT;

-- games テーブル
ALTER TABLE games ADD COLUMN image_url TEXT;
ALTER TABLE games ADD COLUMN thumbnail_url TEXT;

-- その他全テーブルに対応
```

### 3. ユーティリティ関数 (`src/lib/storage.ts`)

#### 画像アップロード
```typescript
import { uploadImage } from '@/lib/storage'

const result = await uploadImage(file, 'images', 'games')
if (result.success) {
  console.log('アップロード成功:', result.url)
}
```

#### 画像削除
```typescript
import { deleteImage } from '@/lib/storage'

const result = await deleteImage('path/to/image.jpg', 'images')
```

#### 画像最適化
```typescript
import { optimizeImage } from '@/lib/storage'

const optimizedFile = await optimizeImage(file, 800, 600, 0.8)
```

### 4. Reactコンポーネント

#### 画像アップロード (`src/components/ImageUpload.tsx`)
```tsx
import ImageUpload from '@/components/ImageUpload'

<ImageUpload
  onUpload={(url) => setImageUrl(url)}
  bucket="images"
  path="games"
  maxSize={5}
/>
```

#### 最適化された画像表示 (`src/components/OptimizedImage.tsx`)
```tsx
import OptimizedImage from '@/components/OptimizedImage'

<OptimizedImage
  src={imageUrl}
  alt="ゲーム画像"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

## 使用例

### 記事に画像を追加
```tsx
'use client'

import { useState } from 'react'
import ImageUpload from '@/components/ImageUpload'
import OptimizedImage from '@/components/OptimizedImage'

export default function ArticleEditor() {
  const [headerImage, setHeaderImage] = useState<string>('')
  const [thumbnailImage, setThumbnailImage] = useState<string>('')

  return (
    <div className="space-y-6">
      <div>
        <h3>ヘッダー画像</h3>
        <ImageUpload
          onUpload={setHeaderImage}
          bucket="images"
          path="articles"
          maxSize={5}
        />
        {headerImage && (
          <OptimizedImage
            src={headerImage}
            alt="記事ヘッダー"
            width={800}
            height={400}
            className="mt-4 rounded-lg"
          />
        )}
      </div>

      <div>
        <h3>サムネイル画像</h3>
        <ImageUpload
          onUpload={setThumbnailImage}
          bucket="thumbnails"
          path="articles"
          maxSize={2}
        />
        {thumbnailImage && (
          <OptimizedImage
            src={thumbnailImage}
            alt="記事サムネイル"
            width={300}
            height={200}
            className="mt-4 rounded-lg"
          />
        )}
      </div>
    </div>
  )
}
```

### ゲーム画像の管理
```tsx
import { uploadImage } from '@/lib/storage'

// ゲーム画像をアップロード
const uploadGameImage = async (file: File, gameId: number) => {
  const result = await uploadImage(file, 'images', `games/${gameId}`)
  
  if (result.success) {
    // データベースを更新
    await fetch('/api/games/update-image', {
      method: 'POST',
      body: JSON.stringify({
        gameId,
        imageUrl: result.url
      })
    })
  }
}
```

## セキュリティ設定

### ストレージポリシー
- 全ての画像バケットは公開読み取り可能
- 認証済みユーザーのみアップロード/更新/削除可能
- ファイルサイズ制限あり

### 推奨事項
1. 本番環境では、より厳密なアクセス制御を実装
2. 画像の自動最適化を有効化
3. CDN使用でパフォーマンス向上
4. 定期的な不要画像の削除

## トラブルシューティング

### よくある問題
1. **アップロードエラー**: バケット設定とポリシーを確認
2. **画像が表示されない**: 公開URLが正しいか確認
3. **パフォーマンス問題**: 画像サイズを最適化

### デバッグ方法
```typescript
// ストレージ接続テスト
const testConnection = async () => {
  const { data, error } = await supabase.storage.listBuckets()
  console.log('バケット一覧:', data)
  if (error) console.error('エラー:', error)
}
```

## 次の実装予定
- [ ] 画像の自動リサイズ
- [ ] 画像の圧縮最適化
- [ ] 管理画面での画像管理
- [ ] 画像の一括アップロード機能