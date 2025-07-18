import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

// Supabaseクライアント設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// 記事データの型定義
interface Article {
  id: number
  updated_at: string
  created_at: string
  published: boolean
}

// 公開記事一覧を取得
async function getPublishedArticles(): Promise<Article[]> {
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, updated_at, created_at, published')
      .eq('published', true)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('サイトマップ用記事取得エラー:', error)
      return []
    }

    return articles || []
  } catch (error) {
    console.error('サイトマップ生成に失敗しました:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://game-study-academy.com'
  
  // 公開記事を取得
  const articles = await getPublishedArticles()

  // 基本ページのサイトマップエントリ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/beginner`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }
  ]

  // カテゴリページのサイトマップエントリ
  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/categories/bosses`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories/classes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categories/strategies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categories/dungeons`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categories/tips`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/categories/stories`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/categories/discussion`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }
  ]

  // 記事ページのサイトマップエントリ
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: new Date(article.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 全てのページを結合して返す
  return [
    ...staticPages,
    ...categoryPages,
    ...articlePages,
  ]
}