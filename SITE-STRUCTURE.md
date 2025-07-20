# Game Study Academy - サイト構成ドキュメント

## プロジェクト概要

**Game Study Academy**は、YouTube gaming動画を記事形式に変換して効率的な学習を提供するNext.js 15ベースのゲーム攻略サイトです。エルデンリング・ナイトレインの両方を扱った総合攻略サイトです。

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **UI**: React 19, TypeScript
- **スタイリング**: Tailwind CSS 4
- **データベース**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude SDK
- **動画データ**: YouTube Data API

## ディレクトリ構造

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── admin-info/           # 管理人情報API
│   │   ├── generate-article/     # AI記事生成API
│   │   ├── supabase-test/        # DB接続テスト
│   │   ├── test/                 # 一般テスト
│   │   ├── test-storage/         # ストレージテスト
│   │   ├── update-article/       # 記事更新API
│   │   ├── upload-admin-image/   # 管理人画像アップロード
│   │   └── youtube/
│   │       └── advanced-search/  # YouTube検索API
│   ├── admin/                    # 管理人ページ
│   ├── articles/                 # 記事関連ページ
│   │   ├── [id]/                 # 動的記事詳細ページ
│   │   └── page.tsx              # 記事一覧ページ
│   ├── beginner/                 # 初心者ガイドページ
│   ├── categories/
│   │   └── [id]/                 # 動的カテゴリページ
│   ├── upload-admin-image/       # 管理人画像アップロードページ
│   ├── favicon.ico               # ファビコン
│   ├── globals.css               # グローバルスタイル
│   ├── layout.tsx                # ルートレイアウト
│   ├── page.tsx                  # ホームページ
│   ├── robots.ts                 # SEO: robots.txt
│   └── sitemap.ts                # SEO: sitemap.xml
├── components/                   # 再利用可能なReactコンポーネント
│   ├── AdminFloatingButton.tsx   # 管理人アクセス浮動ボタン
│   ├── ImageUpload.tsx           # 画像アップロードコンポーネント
│   ├── OptimizedImage.tsx        # 最適化画像表示コンポーネント
│   └── StructuredData.tsx        # SEO構造化データ
├── lib/                          # ユーティリティライブラリ
│   ├── metadata.ts               # SEOメタデータ生成
│   └── storage.ts                # Supabase Storage管理
└── types/                        # TypeScript型定義
    └── index.ts                  # 全体型定義
```

## ページ構成

### 公開ページ

| URL | 機能 | 説明 |
|-----|------|------|
| `/` | ホームページ | サイトトップ、注目記事、カテゴリ一覧 |
| `/articles` | 記事一覧 | 全記事のリスト表示 |
| `/articles/[id]` | 記事詳細 | 個別記事の詳細表示 |
| `/categories/[id]` | カテゴリ別記事 | カテゴリでフィルタされた記事一覧 |
| `/beginner` | 初心者ガイド | 初心者向けコンテンツ |
| `/admin` | 管理人ページ | 管理人プロフィール表示 |

### 管理用ページ

| URL | 機能 | 説明 |
|-----|------|------|
| `/upload-admin-image` | 管理人画像アップロード | 管理人キャラクター画像の登録 |

## API エンドポイント

### 記事管理
- `POST /api/generate-article` - AI記事生成
- `PUT /api/update-article` - 記事更新

### 管理機能
- `GET /api/admin-info` - 管理人情報取得
- `POST /api/upload-admin-image` - 管理人画像アップロード

### データ取得
- `GET /api/youtube/advanced-search` - YouTube動画検索

### テスト・監視
- `GET /api/supabase-test` - Supabase接続確認
- `GET /api/test-storage` - ストレージ接続確認
- `GET /api/test` - 一般的なテスト

## データベース構造 (Supabase)

### 主要テーブル

#### articles (記事)
```sql
- id: 記事ID
- title: タイトル
- content: 記事本文
- summary: 概要
- video_id: 関連動画ID
- game_id: 関連ゲームID
- published: 公開状態
- seo_title: SEOタイトル
- meta_description: メタ説明
- slug: URLスラッグ
- featured_image_url: アイキャッチ画像
- read_time: 読了時間
```

#### videos (動画)
```sql
- id: 動画ID
- video_id: YouTube動画ID
- title: 動画タイトル
- description: 動画説明
- channel_title: チャンネル名
- thumbnail_url: サムネイルURL
- game_id: 関連ゲームID
```

#### games (ゲーム)
```sql
- id: ゲームID
- name: ゲーム名
- slug: URLスラッグ
- description: 説明
```

#### categories (カテゴリ)
```sql
- id: カテゴリID
- name: カテゴリ名
- slug: URLスラッグ
- game_id: 関連ゲームID
```

#### admin_info (管理人情報)
```sql
- id: 管理人ID
- name: 内部名
- display_name: 表示名
- bio: 自己紹介
- character_image_url: キャラクター画像URL
- favorite_games: 好きなゲーム配列
- gaming_experience: ゲーム経験
```

## コンポーネント詳細

### AdminFloatingButton
- トップページ右下に表示される管理人アクセスボタン
- 150×150pxの円形デザイン
- ホバーエフェクト、脈動アニメーション付き
- 管理人ページ(`/admin`)へのリンク

### ImageUpload
- Supabase Storageへの画像アップロード機能
- ドラッグ&ドロップ対応
- ファイルサイズ制限、形式チェック
- プレビュー表示機能

### OptimizedImage
- Next.js Imageコンポーネントの拡張
- エラー時のフォールバック機能
- ローディング状態の表示

### StructuredData
- SEO用の構造化データ(JSON-LD)を生成
- 記事、サイト情報の構造化

## SEO最適化

### メタデータ管理
- `lib/metadata.ts`で一元管理
- 動的なページタイトル、説明生成
- Open Graph、Twitter Cards対応

### サイトマップ・robots.txt
- 自動生成されるXMLサイトマップ
- SEOフレンドリーなrobots.txt

## ストレージ管理

### Supabase Storage バケット
- `images`: 記事画像、ゲーム画像 (最大50MB)
- `thumbnails`: サムネイル画像 (最大10MB)
- `avatars`: アバター画像 (最大2MB)

### 画像管理機能
- 自動リサイズ・最適化
- 公開URL自動生成
- ファイル削除機能

## セキュリティ

### データベースポリシー
- RLS (Row Level Security) 設定
- 認証済みユーザーのみ書き込み可能
- 全ユーザー読み取り可能

### ファイルアップロード
- ファイル形式制限
- サイズ制限
- 適切な保存先の分離

## 機能特徴

### AI記事生成
- Claude SDKを使用したYouTube動画からの記事自動生成
- SEOメタデータの自動生成
- 読了時間の自動計算

### レスポンシブデザイン
- モバイルファーストアプローチ
- Tailwind CSSによる効率的なスタイリング
- ダークモード未対応（今後の拡張予定）

### パフォーマンス最適化
- Next.js 15のApp Routerによる高速ルーティング
- 画像の最適化とレイジーローディング
- サーバーサイドレンダリング（SSR）

## 今後の拡張予定

- [ ] ダークモード対応
- [ ] ユーザー認証システム
- [ ] コメント機能
- [ ] 記事評価システム
- [ ] 管理画面の充実
- [ ] PWA対応
- [ ] 多言語対応

## 開発・デプロイ

### 開発環境
```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # ESLint実行
```

### 環境変数
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

---

**更新日**: 2025年7月18日  
**バージョン**: 1.0.0