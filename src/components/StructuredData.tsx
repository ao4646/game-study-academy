import { Article, Video, Game } from '@/types'

// 記事構造化データの型定義
interface ArticleStructuredData {
  "@context": string
  "@type": string
  headline: string
  description: string
  image: string[]
  datePublished: string
  dateModified: string
  author: {
    "@type": string
    name: string
    url?: string
  }
  publisher: {
    "@type": string
    name: string
    logo: {
      "@type": string
      url: string
    }
  }
  mainEntityOfPage: {
    "@type": string
    "@id": string
  }
  about?: {
    "@type": string
    name: string
  }
  video?: {
    "@type": string
    name: string
    description: string
    thumbnailUrl: string[]
    uploadDate: string
    duration?: string
    embedUrl: string
    contentUrl: string
    publisher: {
      "@type": string
      name: string
    }
  }
}

// WebSite構造化データの型定義
interface WebSiteStructuredData {
  "@context": string
  "@type": string
  name: string
  url: string
  description: string
  potentialAction: {
    "@type": string
    target: {
      "@type": string
      urlTemplate: string
    }
    "query-input": string
  }
}

interface StructuredDataProps {
  type: 'article' | 'website'
  article?: Article
  video?: Video
  game?: Game
  url?: string
}

export default function StructuredData({ type, article, video, game, url }: StructuredDataProps) {
  const baseUrl = 'https://game-study-academy.com'

  if (type === 'website') {
    const websiteData: WebSiteStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Game Study Academy",
      url: baseUrl,
      description: "YouTube動画から学ぶゲーム徹底攻略サイト。実況者の知識とテクニックを文字で学習できます。",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/articles?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData, null, 2)
        }}
      />
    )
  }

  if (type === 'article' && article && video && game && url) {
    const thumbnailUrl = `https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`
    
    const articleData: ArticleStructuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.seo_title || article.title,
      description: article.meta_description || article.summary?.substring(0, 160) || '',
      image: [
        thumbnailUrl,
        `${baseUrl}/og-image.jpg` // サイトのOG画像（将来実装）
      ],
      datePublished: article.created_at,
      dateModified: article.updated_at,
      author: {
        "@type": "Organization",
        name: video.channel_title,
        url: `https://www.youtube.com/channel/${video.video_id}` // 近似値
      },
      publisher: {
        "@type": "Organization",
        name: "Game Study Academy",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png` // サイトロゴ（将来実装）
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url
      },
      about: {
        "@type": "VideoGame",
        name: game.name
      },
      video: {
        "@type": "VideoObject",
        name: video.title,
        description: video.description.substring(0, 200),
        thumbnailUrl: [thumbnailUrl],
        uploadDate: video.published_at,
        embedUrl: `https://www.youtube.com/embed/${video.video_id}`,
        contentUrl: `https://www.youtube.com/watch?v=${video.video_id}`,
        publisher: {
          "@type": "Person",
          name: video.channel_title
        }
      }
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleData, null, 2)
        }}
      />
    )
  }

  return null
}

// パンくずリスト構造化データ
interface BreadcrumbProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData, null, 2)
      }}
    />
  )
}