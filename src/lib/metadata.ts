import { Metadata } from 'next'
import { Article, Video, Game } from '@/types'

// サイト基本情報
const SITE_CONFIG = {
  name: 'Game Study Academy',
  description: 'YouTube動画から学ぶゲーム徹底攻略サイト。プロ実況者の知識とテクニックを文字で学習できます。',
  url: 'https://game-study-academy.com',
  ogImage: '/og-image.jpg', // 将来実装
  twitterHandle: '@game_study_academy', // 将来実装
}

// デフォルトメタデータ
export function generateDefaultMetadata(): Metadata {
  return {
    title: {
      default: SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
      'ゲーム攻略',
      'YouTube',
      'エルデンリング',
      'ナイトレイン',
      'Nightreign',
      '動画解説',
      'プロ実況者',
      '攻略法',
      'テクニック'
    ],
    authors: [{ name: 'Game Study Academy Team' }],
    creator: 'Game Study Academy',
    publisher: 'Game Study Academy',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      images: [
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    other: {
      'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_CODE', // 将来設定
    },
  }
}

// 記事詳細ページのメタデータ生成
export function generateArticleMetadata(
  article: Article,
  video: Video,
  game: Game,
  url: string
): Metadata {
  const title = article.title
  const description = article.meta_description || article.summary?.substring(0, 160) || ''
  const keywords = article.seo_keywords || `${game.name},攻略,解説,${video.channel_title}`
  const thumbnailUrl = `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`
  
  return {
    title,
    description,
    keywords: keywords.split(','),
    openGraph: {
      type: 'article',
      locale: 'ja_JP',
      url,
      siteName: SITE_CONFIG.name,
      title,
      description,
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      section: game.name,
      tags: [game.name, '攻略', '解説', video.channel_title],
      images: [
        {
          url: thumbnailUrl,
          width: 1280,
          height: 720,
          alt: title,
        },
      ],
      videos: [
        {
          url: `https://www.youtube.com/embed/${video.video_id}`,
          secureUrl: `https://www.youtube.com/embed/${video.video_id}`,
          type: 'text/html',
          width: 1280,
          height: 720,
        },
        {
          url: `https://www.youtube.com/watch?v=${video.video_id}`,
          secureUrl: `https://www.youtube.com/watch?v=${video.video_id}`,
          type: 'video/mp4',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title,
      description,
      images: [thumbnailUrl],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'article:author': video.channel_title,
      'article:published_time': article.created_at,
      'article:modified_time': article.updated_at,
      'article:section': game.name,
      'video:duration': '300' // デフォルト5分
    },
  }
}

// 記事一覧ページのメタデータ生成
export function generateArticleListMetadata(): Metadata {
  const title = 'エルデンリング・ナイトレイン 攻略記事一覧'
  const description = 'YouTube動画から学ぶ、厳選された攻略解説記事。プロの実況者たちの知識とテクニックを文字で学習できます。'
  
  return {
    title,
    description,
    keywords: ['記事一覧', 'エルデンリング', 'ナイトレイン', '攻略記事', 'YouTube', '動画解説'],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: `${SITE_CONFIG.url}/articles`,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/articles`,
    },
  }
}

// カテゴリページのメタデータ生成
export function generateCategoryMetadata(
  categoryName: string,
  categoryDescription: string,
  categorySlug: string
): Metadata {
  const title = `${categoryName} - 攻略記事一覧`
  const description = `${categoryDescription}の攻略記事一覧。YouTube動画から学ぶ専門的な解説記事をまとめています。`
  
  return {
    title,
    description,
    keywords: [categoryName, '攻略', 'エルデンリング', 'ナイトレイン', 'YouTube', '動画解説'],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: `${SITE_CONFIG.url}/categories/${categorySlug}`,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/categories/${categorySlug}`,
    },
  }
}

// ホームページのメタデータ生成
export function generateHomeMetadata(): Metadata {
  return {
    title: 'YouTube動画から学ぶゲーム徹底攻略',
    description: 'Game Study Academy - プロ実況者の知識とテクニックを文字で学習。エルデンリング: ナイトレインの攻略法を厳選された動画から効率的に学べます。',
    keywords: [
      'ゲーム攻略',
      'YouTube',
      'エルデンリング',
      'ナイトレイン',
      'Nightreign',
      '動画解説',
      'プロ実況者',
      '攻略サイト',
      'ゲーム学習'
    ],
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title: 'YouTube動画から学ぶゲーム徹底攻略 | Game Study Academy',
      description: 'プロ実況者の知識とテクニックを文字で学習。エルデンリング: ナイトレインの攻略法を厳選された動画から効率的に学べます。',
      images: [
        {
          url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
          width: 1200,
          height: 630,
          alt: 'Game Study Academy - YouTube動画から学ぶゲーム徹底攻略',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'YouTube動画から学ぶゲーム徹底攻略 | Game Study Academy',
      description: 'プロ実況者の知識とテクニックを文字で学習。エルデンリング: ナイトレインの攻略法を厳選された動画から効率的に学べます。',
      images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
    },
    alternates: {
      canonical: SITE_CONFIG.url,
    },
  }
}