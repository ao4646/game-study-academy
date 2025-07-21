'use client'

import { useState } from 'react'
import Link from 'next/link'

// 型定義
interface Article {
  id: number
  title: string
  content: string
  summary: string
  video_id: number
  game_id: number
  category_id: number
  published: boolean
  created_at: string
  updated_at: string
  seo_title: string | null
  meta_description: string | null
  seo_keywords: string | null
  slug: string | null
  featured_image_url: string | null
  read_time: number
}

interface Video {
  id: number
  video_id: string
  title: string
  description: string
  channel_title: string
  published_at: string
  thumbnail_url: string
  search_query: string
  game_id: number
}

interface Game {
  id: number
  name: string
  slug: string
  description: string
}

interface Category {
  id: number
  name: string
  slug: string
  game_id: number
}

interface ArticleWithRelations {
  article: Article
  video: Video
  game: Game
  categories: Category[]
}

// 記事カードコンポーネント
function ArticleCard({ data }: { data: ArticleWithRelations }) {
  const { article, video, categories } = data
  const thumbnailUrl = video.thumbnail_url
  const categoryName = categories.length > 0 ? categories[0].name : 'エリア攻略'
  const createdDate = new Date(article.created_at).toLocaleDateString('ja-JP')

  return (
    <Link href={`/articles/${article.id}`} className="block group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {categoryName}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-70 rounded-full p-3 transition-all duration-300 group-hover:bg-opacity-80">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {article.seo_title || article.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {article.meta_description || article.summary?.substring(0, 120) + '...' || 
             article.content.replace(/[#*\\[\\]]/g, '').substring(0, 120) + '...'}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{createdDate}</span>
              <span>{article.read_time}分</span>
            </div>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {video.channel_title}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// エリアフィルターコンポーネント
function AreaFilter({ 
  selectedArea, 
  onAreaChange, 
  articles 
}: { 
  selectedArea: string
  onAreaChange: (area: string) => void
  articles: ArticleWithRelations[]
}) {
  // エリア別のキーワードマッピング
  const areaKeywords = {
    all: [],
    limgrave: ['リムグレイブ', 'Limgrave'],
    stormveil: ['ストームヴィル', 'Stormveil'],
    liurnia: ['リエーニエ', 'Liurnia'],
    raya_lucaria: ['レアルカリア', 'Raya Lucaria'],
    caelid: ['ケイリッド', 'Caelid'],
    altus: ['アルター高原', 'Altus'],
    leyndell: ['ローデイル', 'Leyndell'],
    mountaintops: ['巨人たちの山嶺', 'Mountaintops'],
    farum_azula: ['ファルム・アズラ', 'Farum Azula'],
    ashen_capital: ['灰都', 'Ashen Capital'],
    siofra: ['シーフラ', 'Siofra'],
    nokron: ['ノクローン', 'Nokron'],
    ainsel: ['エインセル', 'Ainsel'],
    lake_rot: ['腐れ湖', 'Lake of Rot'],
    nokstella: ['ノクステラ', 'Nokstella'],
    deeproot: ['深き根', 'Deeproot'],
    mohgwyn: ['モーグウィン', 'Mohgwyn'],
    weeping: ['啜り泣き', 'Weeping'],
    gelmir: ['ゲルミア', 'Gelmir'],
    volcano_manor: ['火山館', 'Volcano Manor'],
    shunning: ['忌み捨て', 'Shunning'],
    snowfield: ['聖別雪原', 'Snowfield'],
    haligtree: ['聖樹', 'Haligtree'],
    elphael: ['エブレフェール', 'Elphael']
  }

  // エリア別記事数を計算
  const getAreaCount = (areaKey: string) => {
    if (areaKey === 'all') return articles.length
    const keywords = areaKeywords[areaKey as keyof typeof areaKeywords]
    return articles.filter(({ article, video }) => {
      // 王都ローデイルの場合は灰都を除外
      if (areaKey === 'leyndell') {
        if (article.title.includes('灰都') || video.title.includes('灰都')) {
          return false
        }
      }
      
      return keywords.some(keyword => 
        article.title.includes(keyword) || 
        video.title.includes(keyword) ||
        article.content.includes(keyword)
      )
    }).length
  }

  const areas = [
    { key: 'all', name: 'すべて', section: '' },
    // メインエリア
    { key: 'limgrave', name: 'リムグレイブ', section: 'メインエリア' },
    { key: 'stormveil', name: 'ストームヴィル城', section: 'メインエリア' },
    { key: 'liurnia', name: '湖のリエーニエ', section: 'メインエリア' },
    { key: 'raya_lucaria', name: '魔術学院レアルカリア', section: 'メインエリア' },
    { key: 'caelid', name: 'ケイリッド', section: 'メインエリア' },
    { key: 'altus', name: 'アルター高原', section: 'メインエリア' },
    { key: 'leyndell', name: '王都ローデイル', section: 'メインエリア' },
    { key: 'mountaintops', name: '巨人たちの山嶺', section: 'メインエリア' },
    { key: 'farum_azula', name: '崩れゆくファルム・アズラ', section: 'メインエリア' },
    { key: 'ashen_capital', name: '灰都ローデイル', section: 'メインエリア' },
    // 地下エリア
    { key: 'siofra', name: 'シーフラ河', section: '地下エリア' },
    { key: 'nokron', name: '永遠の都ノクローン', section: '地下エリア' },
    { key: 'ainsel', name: 'エインセル河', section: '地下エリア' },
    { key: 'lake_rot', name: '腐れ湖', section: '地下エリア' },
    { key: 'nokstella', name: '永遠の都ノクステラ', section: '地下エリア' },
    { key: 'deeproot', name: '深き根の底', section: '地下エリア' },
    { key: 'mohgwyn', name: 'モーグウィン王朝', section: '地下エリア' },
    // 寄り道・やり込みエリア
    { key: 'weeping', name: '啜り泣きの半島', section: '寄り道・やり込みエリア' },
    { key: 'gelmir', name: 'ゲルミア火山', section: '寄り道・やり込みエリア' },
    { key: 'volcano_manor', name: '火山館', section: '寄り道・やり込みエリア' },
    { key: 'shunning', name: '忌み捨ての地下', section: '寄り道・やり込みエリア' },
    { key: 'snowfield', name: '聖別雪原', section: '寄り道・やり込みエリア' },
    { key: 'haligtree', name: 'ミケラの聖樹', section: '寄り道・やり込みエリア' },
    { key: 'elphael', name: '聖樹の支えエブレフェール', section: '寄り道・やり込みエリア' }
  ]

  const sections = ['', 'メインエリア', '地下エリア', '寄り道・やり込みエリア']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🗺️ エリア別絞り込み</h3>
      
      {sections.map(section => (
        <div key={section} className="mb-6 last:mb-0">
          {section && (
            <h4 className="text-md font-medium text-gray-700 mb-3">{section}</h4>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {areas
              .filter(area => area.section === section)
              .map(area => {
                const count = getAreaCount(area.key)
                return (
                  <button
                    key={area.key}
                    onClick={() => onAreaChange(area.key)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedArea === area.key
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {area.name} ({count})
                  </button>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}

// クライアントコンポーネント（絞り込み機能用）
export default function AreaArticlesClient({ articles }: { articles: ArticleWithRelations[] }) {
  const [selectedArea, setSelectedArea] = useState('all')

  // エリア別のキーワードマッピング
  const areaKeywords = {
    all: [],
    limgrave: ['リムグレイブ', 'Limgrave'],
    stormveil: ['ストームヴィル', 'Stormveil'],
    liurnia: ['リエーニエ', 'Liurnia'],
    raya_lucaria: ['レアルカリア', 'Raya Lucaria'],
    caelid: ['ケイリッド', 'Caelid'],
    altus: ['アルター高原', 'Altus'],
    leyndell: ['ローデイル', 'Leyndell'],
    mountaintops: ['巨人たちの山嶺', 'Mountaintops'],
    farum_azula: ['ファルム・アズラ', 'Farum Azula'],
    ashen_capital: ['灰都', 'Ashen Capital'],
    siofra: ['シーフラ', 'Siofra'],
    nokron: ['ノクローン', 'Nokron'],
    ainsel: ['エインセル', 'Ainsel'],
    lake_rot: ['腐れ湖', 'Lake of Rot'],
    nokstella: ['ノクステラ', 'Nokstella'],
    deeproot: ['深き根', 'Deeproot'],
    mohgwyn: ['モーグウィン', 'Mohgwyn'],
    weeping: ['啜り泣き', 'Weeping'],
    gelmir: ['ゲルミア', 'Gelmir'],
    volcano_manor: ['火山館', 'Volcano Manor'],
    shunning: ['忌み捨て', 'Shunning'],
    snowfield: ['聖別雪原', 'Snowfield'],
    haligtree: ['聖樹', 'Haligtree'],
    elphael: ['エブレフェール', 'Elphael']
  }

  // 絞り込み処理
  const filteredArticles = selectedArea === 'all' 
    ? articles 
    : articles.filter(({ article, video }) => {
        const keywords = areaKeywords[selectedArea as keyof typeof areaKeywords]
        
        // 王都ローデイルの場合は灰都を除外
        if (selectedArea === 'leyndell') {
          if (article.title.includes('灰都') || video.title.includes('灰都')) {
            return false
          }
        }
        
        return keywords.some(keyword => 
          article.title.includes(keyword) || 
          video.title.includes(keyword) ||
          article.content.includes(keyword)
        )
      })

  return (
    <>
      <AreaFilter 
        selectedArea={selectedArea}
        onAreaChange={setSelectedArea}
        articles={articles}
      />

      {/* 記事一覧 */}
      {filteredArticles.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📚 エリア攻略記事 ({filteredArticles.length}件)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((data) => (
              <ArticleCard key={data.article.id} data={data} />
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center py-16">
          <div className="text-6xl mb-4">🗺️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">該当する記事がありません</h2>
          <p className="text-gray-600 mb-8">
            選択したエリアの攻略記事は現在準備中です。<br />
            他のエリアをお試しください。
          </p>
        </section>
      )}
    </>
  )
}