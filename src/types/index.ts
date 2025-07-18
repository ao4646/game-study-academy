// データベース型定義
export interface Article {
  id: number
  title: string
  content: string | null
  summary: string | null
  video_id: number | null
  game_id: number | null
  published: boolean | null
  created_at: string
  updated_at: string
  seo_title: string | null
  meta_description: string | null
  seo_keywords: string | null
  slug: string | null
  featured_image_url: string | null
  header_image_url: string | null
  thumbnail_image_url: string | null
  read_time: number | null
  related_boss_id: number | null
  related_strategy_id: number | null
  related_tip_id: number | null
  related_dungeon_id: number | null
  related_story_id: number | null
  related_classes_id: number | null
}

export interface Video {
  id: number
  video_id: string
  title: string
  description: string
  channel_title: string
  published_at: string
  thumbnail_url: string
  local_thumbnail_url: string | null
  search_query: string
  game_id: number
}

export interface Game {
  id: number
  name: string
  slug: string
  description: string
  image_url: string | null
  thumbnail_url: string | null
}

export interface Category {
  id: number
  name: string
  slug: string
  jp_name: string
  parent_id: number | null
  icon: string | null
  description: string | null
  url_path: string
  sort_order: number | null
  is_active: boolean | null
  created_at: string
  image_url: string | null
  icon_url: string | null
}

// 関連データ付き記事型
export interface ArticleWithRelations {
  article: Article
  video: Video
  game: Game
}

// API レスポンス型
export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
}

// YouTube API レスポンス型
export interface YouTubeSearchResponse {
  items: YouTubeVideoItem[]
  nextPageToken?: string
  prevPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}

export interface YouTubeVideoItem {
  id: string
  title: string
  description: string
  channelTitle: string
  publishedAt: string
  thumbnails: {
    default?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    high?: { url: string; width: number; height: number }
    maxres?: { url: string; width: number; height: number }
  }
  duration?: string
  viewCount?: string
}

// SEO メタデータ型
export interface SEOMetadata {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  canonicalUrl?: string
  publishedTime?: string
  modifiedTime?: string
}

// ページネーション型
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 検索フィルター型
export interface SearchFilters {
  query?: string
  category?: string
  game?: string
  dateFrom?: string
  dateTo?: string
}

// エラー型
export interface AppError {
  code: string
  message: string
  details?: Record<string, unknown>
}

// 新しいエンティティ型
export interface Boss {
  id: number
  name: string
  slug: string
  description: string | null
  difficulty: number | null
  game_id: number | null
  created_at: string
  image_url: string | null
  thumbnail_url: string | null
}

export interface Class {
  id: number
  name: string
  slug: string
  description: string | null
  game_id: number | null
  created_at: string
  image_url: string | null
  icon_url: string | null
}

export interface Strategy {
  id: number
  name: string
  slug: string
  description: string | null
  game_id: number | null
  created_at: string
  image_url: string | null
  icon_url: string | null
}

export interface Dungeon {
  id: number
  name: string
  slug: string
  description: string | null
  game_id: number | null
  created_at: string
  image_url: string | null
  thumbnail_url: string | null
}

export interface Tip {
  id: number
  name: string
  slug: string
  description: string | null
  game_id: number | null
  created_at: string
  image_url: string | null
  icon_url: string | null
}

export interface Story {
  id: number
  name: string
  slug: string
  description: string | null
  game_id: number | null
  created_at: string
  image_url: string | null
  thumbnail_url: string | null
}

export interface AdminInfo {
  id: number
  name: string
  display_name: string
  bio: string | null
  avatar_url: string | null
  character_image_url: string | null
  twitter_url: string | null
  github_url: string | null
  website_url: string | null
  favorite_games: string[] | null
  gaming_experience: string | null
  created_at: string
  updated_at: string
}