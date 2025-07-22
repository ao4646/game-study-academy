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
  const categoryName = categories.length > 0 ? categories[0].name : 'ボス攻略'
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
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
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

// ボスフィルターコンポーネント
function BossFilter({ 
  selectedBoss, 
  onBossChange, 
  articles 
}: { 
  selectedBoss: string
  onBossChange: (boss: string) => void
  articles: ArticleWithRelations[]
}) {
  // ボス別のキーワードマッピング
  const bossKeywords = {
    all: [],
    // メインボス
    grafted_scion: ['接ぎ木の貴公子', 'Grafted Scion'],
    tree_sentinel: ['ツリーガード', 'Tree Sentinel'],
    margit: ['忌み鬼マルギット', 'Margit', 'マルギット'],
    godrick: ['接ぎ木のゴドリック', 'Godrick', 'ゴドリック'],
    red_wolf: ['ラダゴンの赤狼', 'Red Wolf'],
    rennala: ['満月の女王レナラ', 'Rennala', 'レナラ'],
    radahn: ['星砕きのラダーン', 'Radahn', 'ラダーン'],
    dragon_tree_sentinel: ['竜のツリーガード', 'Dragon Tree Sentinel'],
    godfrey_first: ['最初の王ゴッドフレイ', 'Godfrey', 'ゴッドフレイ'],
    morgott: ['忌み王モーゴット', 'Morgott', 'モーゴット'],
    fire_giant: ['火の巨人', 'Fire Giant'],
    godskin_duo: ['神肌のふたり', 'Godskin Duo'],
    maliketh: ['黒き剣のマリケス', 'Maliketh', 'マリケス'],
    gideon: ['ギデオン・オーフニール', 'Gideon'],
    hoarah_loux: ['戦士、ホーラルー', 'Hoarah Loux', 'ホーラルー'],
    radagon: ['黄金律、ラダゴン', 'Radagon', 'ラダゴン'],
    elden_beast: ['エルデの獣', 'Elden Beast'],
    // 寄り道・隠しボス
    rykard: ['ライカード', 'Rykard'],
    placidusax: ['竜王プラキドサクス', 'Placidusax', 'プラキドサクス'],
    fortissax: ['死龍フォルサクス', 'Fortissax', 'フォルサクス'],
    astel: ['アステール', 'Astel'],
    ancestor_spirit: ['祖霊の王', 'Ancestor Spirit'],
    mohg: ['血の君主、モーグ', 'Mohg', 'モーグ'],
    malenia: ['ミケラの刃、マレニア', 'Malenia', 'マレニア']
  }

  // ボス別記事数を計算
  const getBossCount = (bossKey: string) => {
    if (bossKey === 'all') return articles.length
    const keywords = bossKeywords[bossKey as keyof typeof bossKeywords]
    return articles.filter(({ article, video }) => {
      return keywords.some(keyword => 
        article.title.includes(keyword) || 
        video.title.includes(keyword) ||
        article.content.includes(keyword)
      )
    }).length
  }

  const bosses = [
    { key: 'all', name: 'すべて', section: '' },
    // メインボス
    { key: 'grafted_scion', name: '接ぎ木の貴公子', section: 'メインボス' },
    { key: 'tree_sentinel', name: 'ツリーガード', section: 'メインボス' },
    { key: 'margit', name: '忌み鬼マルギット', section: 'メインボス' },
    { key: 'godrick', name: '接ぎ木のゴドリック', section: 'メインボス' },
    { key: 'red_wolf', name: 'ラダゴンの赤狼', section: 'メインボス' },
    { key: 'rennala', name: '満月の女王レナラ', section: 'メインボス' },
    { key: 'radahn', name: '星砕きのラダーン', section: 'メインボス' },
    { key: 'dragon_tree_sentinel', name: '竜のツリーガード', section: 'メインボス' },
    { key: 'godfrey_first', name: '最初の王ゴッドフレイ', section: 'メインボス' },
    { key: 'morgott', name: '忌み王モーゴット', section: 'メインボス' },
    { key: 'fire_giant', name: '火の巨人', section: 'メインボス' },
    { key: 'godskin_duo', name: '神肌のふたり', section: 'メインボス' },
    { key: 'maliketh', name: '黒き剣のマリケス', section: 'メインボス' },
    { key: 'gideon', name: 'ギデオン・オーフニール', section: 'メインボス' },
    { key: 'hoarah_loux', name: '戦士、ホーラルー', section: 'メインボス' },
    { key: 'radagon', name: '黄金律、ラダゴン', section: 'メインボス' },
    { key: 'elden_beast', name: 'エルデの獣', section: 'メインボス' },
    // 寄り道・隠しボス
    { key: 'rykard', name: 'ライカード', section: '寄り道・隠しボス' },
    { key: 'placidusax', name: '竜王プラキドサクス', section: '寄り道・隠しボス' },
    { key: 'fortissax', name: '死龍フォルサクス', section: '寄り道・隠しボス' },
    { key: 'astel', name: 'アステール', section: '寄り道・隠しボス' },
    { key: 'ancestor_spirit', name: '祖霊の王', section: '寄り道・隠しボス' },
    { key: 'mohg', name: '血の君主、モーグ', section: '寄り道・隠しボス' },
    { key: 'malenia', name: 'ミケラの刃、マレニア', section: '寄り道・隠しボス' }
  ]

  const sections = ['', 'メインボス', '寄り道・隠しボス']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">⚔️ ボス別絞り込み</h3>
      
      {sections.map(section => (
        <div key={section} className="mb-6 last:mb-0">
          {section && (
            <h4 className="text-md font-medium text-gray-700 mb-3">{section}</h4>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {bosses
              .filter(boss => boss.section === section)
              .map(boss => {
                const count = getBossCount(boss.key)
                return (
                  <button
                    key={boss.key}
                    onClick={() => onBossChange(boss.key)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedBoss === boss.key
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {boss.name} ({count})
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
export default function BossArticlesClient({ articles }: { articles: ArticleWithRelations[] }) {
  const [selectedBoss, setSelectedBoss] = useState('all')

  // ボス別のキーワードマッピング
  const bossKeywords = {
    all: [],
    // メインボス
    grafted_scion: ['接ぎ木の貴公子', 'Grafted Scion'],
    tree_sentinel: ['ツリーガード', 'Tree Sentinel'],
    margit: ['忌み鬼マルギット', 'Margit', 'マルギット'],
    godrick: ['接ぎ木のゴドリック', 'Godrick', 'ゴドリック'],
    red_wolf: ['ラダゴンの赤狼', 'Red Wolf'],
    rennala: ['満月の女王レナラ', 'Rennala', 'レナラ'],
    radahn: ['星砕きのラダーン', 'Radahn', 'ラダーン'],
    dragon_tree_sentinel: ['竜のツリーガード', 'Dragon Tree Sentinel'],
    godfrey_first: ['最初の王ゴッドフレイ', 'Godfrey', 'ゴッドフレイ'],
    morgott: ['忌み王モーゴット', 'Morgott', 'モーゴット'],
    fire_giant: ['火の巨人', 'Fire Giant'],
    godskin_duo: ['神肌のふたり', 'Godskin Duo'],
    maliketh: ['黒き剣のマリケス', 'Maliketh', 'マリケス'],
    gideon: ['ギデオン・オーフニール', 'Gideon'],
    hoarah_loux: ['戦士、ホーラルー', 'Hoarah Loux', 'ホーラルー'],
    radagon: ['黄金律、ラダゴン', 'Radagon', 'ラダゴン'],
    elden_beast: ['エルデの獣', 'Elden Beast'],
    // 寄り道・隠しボス
    rykard: ['ライカード', 'Rykard'],
    placidusax: ['竜王プラキドサクス', 'Placidusax', 'プラキドサクス'],
    fortissax: ['死龍フォルサクス', 'Fortissax', 'フォルサクス'],
    astel: ['アステール', 'Astel'],
    ancestor_spirit: ['祖霊の王', 'Ancestor Spirit'],
    mohg: ['血の君主、モーグ', 'Mohg', 'モーグ'],
    malenia: ['ミケラの刃、マレニア', 'Malenia', 'マレニア']
  }

  // 絞り込み処理
  const filteredArticles = selectedBoss === 'all' 
    ? articles 
    : articles.filter(({ article, video }) => {
        const keywords = bossKeywords[selectedBoss as keyof typeof bossKeywords]
        
        return keywords.some(keyword => 
          article.title.includes(keyword) || 
          video.title.includes(keyword) ||
          article.content.includes(keyword)
        )
      })

  return (
    <>
      <BossFilter 
        selectedBoss={selectedBoss}
        onBossChange={setSelectedBoss}
        articles={articles}
      />

      {/* 記事一覧 */}
      {filteredArticles.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ⚔️ ボス攻略記事 ({filteredArticles.length}件)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((data) => (
              <ArticleCard key={data.article.id} data={data} />
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center py-16">
          <div className="text-6xl mb-4">⚔️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">該当する記事がありません</h2>
          <p className="text-gray-600 mb-8">
            選択したボスの攻略記事は現在準備中です。<br />
            他のボスをお試しください。
          </p>
        </section>
      )}
    </>
  )
}