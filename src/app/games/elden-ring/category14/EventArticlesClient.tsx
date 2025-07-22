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
  const categoryName = categories.length > 0 ? categories[0].name : 'イベント攻略'
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
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
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

// NPCフィルターコンポーネント
function NPCFilter({ 
  selectedNPC, 
  onNPCChange, 
  articles 
}: { 
  selectedNPC: string
  onNPCChange: (npc: string) => void
  articles: ArticleWithRelations[]
}) {
  // NPC別のキーワードマッピング
  const npcKeywords = {
    all: [],
    // 主要NPCイベント
    melina: ['メリナ', 'Melina'],
    ranni: ['魔女ラニ', 'ラニ', 'Ranni'],
    blaidd: ['半狼のブライヴ', 'ブライヴ', 'Blaidd'],
    rogier: ['魔術師ロジェール', 'ロジェール', 'Rogier'],
    iji: ['鍛冶師イジー', 'イジー', 'Iji'],
    tanith: ['火山館の主人、タニス', 'タニス', 'Tanith', '火山館'],
    rya: ['招き手のラーヤ', 'ラーヤ', 'Rya'],
    fia: ['死衾の乙女、フィア', 'フィア', 'Fia'],
    d: ['死を狩る者、D', 'D', 'ディー'],
    nepheli: ['戦士ネフェリ・ルー', 'ネフェリ・ルー', 'ネフェリ', 'Nepheli'],
    millicent: ['ミリセント', 'Millicent'],
    gowry: ['賢者ゴーリー', 'ゴーリー', 'Gowry'],
    hyetta: ['灯を探すハイータ', 'ハイータ', 'Hyetta'],
    irina: ['モーンのイレーナ', 'イレーナ', 'Irina'],
    edgar: ['城主エドガー', 'エドガー', 'Edgar'],
    // サブNPCイベント
    patches: ['パッチ', 'Patches'],
    gostoc: ['門衛ゴストーク', 'ゴストーク', 'Gostoc'],
    kenneth: ['領主の嫡男、ケネス・ハイト', 'ケネス・ハイト', 'ケネス', 'Kenneth'],
    dung_eater: ['糞喰い', 'Dung Eater'],
    loathsome_dung_eater: ['ならず者', 'Dung Eater'],
    shabriri: ['シャブリリ', 'Shabriri'],
    // その他の重要NPC
    alexander: ['戦士壺アレキサンダー', 'アレキサンダー', 'Alexander'],
    sellen: ['魔術師セレン', 'セレン', 'Sellen'],
    thops: ['魔術師トープス', 'トープス', 'Thops'],
    latenna: ['ラティナ', 'Latenna'],
    seluvis: ['魔法教授セルブス', 'セルブス', 'Seluvis'],
    bernahl: ['騎士ベルナール', 'ベルナール', 'Bernahl'],
    boc: ['亜人のボック', 'ボック', 'Boc'],
    yura: ['血の指の狩人、ユラ', 'ユラ', 'Yura'],
    gideon: ['百智卿ギデオン', 'ギデオン', 'Gideon'],
    corhyn: ['金仮面卿・コリン', 'コリン', 'Corhyn', '金仮面卿'],
    jerren: ['魔女狩りジェーレン', 'ジェーレン', 'Jerren'],
    diallos: ['騎士ディアロス', 'ディアロス', 'Diallos'],
    roderika: ['ローデリカ', 'Roderika'],
    hewg: ['ヒューグ', 'Hewg'],
    jar_bairn: ['小壷、壺氏', '小壷', '壺師', '壺氏', 'Jar Bairn'],
    varre: ['白面のヴァレー', 'ヴァレー', 'Varre']
  }

  // NPC別記事数を計算
  const getNPCCount = (npcKey: string) => {
    if (npcKey === 'all') return articles.length
    const keywords = npcKeywords[npcKey as keyof typeof npcKeywords]
    return articles.filter(({ article, video }) => {
      return keywords.some(keyword => 
        article.title.includes(keyword) || 
        video.title.includes(keyword) ||
        article.content.includes(keyword)
      )
    }).length
  }

  const npcs = [
    { key: 'all', name: 'すべて', section: '' },
    // 主要NPCイベント
    { key: 'melina', name: 'メリナ', section: '主要NPCイベント' },
    { key: 'ranni', name: '魔女ラニ', section: '主要NPCイベント' },
    { key: 'blaidd', name: '半狼のブライヴ', section: '主要NPCイベント' },
    { key: 'rogier', name: '魔術師ロジェール', section: '主要NPCイベント' },
    { key: 'iji', name: '鍛冶師イジー', section: '主要NPCイベント' },
    { key: 'tanith', name: '火山館の主人、タニス', section: '主要NPCイベント' },
    { key: 'rya', name: '招き手のラーヤ', section: '主要NPCイベント' },
    { key: 'fia', name: '死衾の乙女、フィア', section: '主要NPCイベント' },
    { key: 'd', name: '死を狩る者、D', section: '主要NPCイベント' },
    { key: 'nepheli', name: '戦士ネフェリ・ルー', section: '主要NPCイベント' },
    { key: 'millicent', name: 'ミリセント', section: '主要NPCイベント' },
    { key: 'gowry', name: '賢者ゴーリー', section: '主要NPCイベント' },
    { key: 'hyetta', name: '灯を探すハイータ', section: '主要NPCイベント' },
    { key: 'irina', name: 'モーンのイレーナ', section: '主要NPCイベント' },
    { key: 'edgar', name: '城主エドガー', section: '主要NPCイベント' },
    // サブNPCイベント
    { key: 'patches', name: 'パッチ', section: 'サブNPCイベント' },
    { key: 'gostoc', name: '門衛ゴストーク', section: 'サブNPCイベント' },
    { key: 'kenneth', name: '領主の嫡男、ケネス・ハイト', section: 'サブNPCイベント' },
    { key: 'dung_eater', name: '糞喰い', section: 'サブNPCイベント' },
    { key: 'loathsome_dung_eater', name: 'ならず者', section: 'サブNPCイベント' },
    { key: 'shabriri', name: 'シャブリリ', section: 'サブNPCイベント' },
    // その他の重要NPC
    { key: 'alexander', name: '戦士壺アレキサンダー', section: 'その他の重要NPC' },
    { key: 'sellen', name: '魔術師セレン', section: 'その他の重要NPC' },
    { key: 'thops', name: '魔術師トープス', section: 'その他の重要NPC' },
    { key: 'latenna', name: 'ラティナ', section: 'その他の重要NPC' },
    { key: 'seluvis', name: '魔法教授セルブス', section: 'その他の重要NPC' },
    { key: 'bernahl', name: '騎士ベルナール', section: 'その他の重要NPC' },
    { key: 'boc', name: '亜人のボック', section: 'その他の重要NPC' },
    { key: 'yura', name: '血の指の狩人、ユラ', section: 'その他の重要NPC' },
    { key: 'gideon', name: '百智卿ギデオン', section: 'その他の重要NPC' },
    { key: 'corhyn', name: '金仮面卿・コリン', section: 'その他の重要NPC' },
    { key: 'jerren', name: '魔女狩りジェーレン', section: 'その他の重要NPC' },
    { key: 'diallos', name: '騎士ディアロス', section: 'その他の重要NPC' },
    { key: 'roderika', name: 'ローデリカ', section: 'その他の重要NPC' },
    { key: 'hewg', name: 'ヒューグ', section: 'その他の重要NPC' },
    { key: 'jar_bairn', name: '小壷、壺氏', section: 'その他の重要NPC' },
    { key: 'varre', name: '白面のヴァレー', section: 'その他の重要NPC' }
  ]

  const sections = ['', '主要NPCイベント', 'サブNPCイベント', 'その他の重要NPC']

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🎭 NPC・キャラクター別絞り込み</h3>
      
      {sections.map(section => (
        <div key={section} className="mb-6 last:mb-0">
          {section && (
            <h4 className="text-md font-medium text-gray-700 mb-3">{section}</h4>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {npcs
              .filter(npc => npc.section === section)
              .map(npc => {
                const count = getNPCCount(npc.key)
                return (
                  <button
                    key={npc.key}
                    onClick={() => onNPCChange(npc.key)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedNPC === npc.key
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {npc.name} ({count})
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
export default function EventArticlesClient({ articles }: { articles: ArticleWithRelations[] }) {
  const [selectedNPC, setSelectedNPC] = useState('all')

  // NPC別のキーワードマッピング
  const npcKeywords = {
    all: [],
    // 主要NPCイベント
    melina: ['メリナ', 'Melina'],
    ranni: ['魔女ラニ', 'ラニ', 'Ranni'],
    blaidd: ['半狼のブライヴ', 'ブライヴ', 'Blaidd'],
    rogier: ['魔術師ロジェール', 'ロジェール', 'Rogier'],
    iji: ['鍛冶師イジー', 'イジー', 'Iji'],
    tanith: ['火山館の主人、タニス', 'タニス', 'Tanith', '火山館'],
    rya: ['招き手のラーヤ', 'ラーヤ', 'Rya'],
    fia: ['死衾の乙女、フィア', 'フィア', 'Fia'],
    d: ['死を狩る者、D', 'D', 'ディー'],
    nepheli: ['戦士ネフェリ・ルー', 'ネフェリ・ルー', 'ネフェリ', 'Nepheli'],
    millicent: ['ミリセント', 'Millicent'],
    gowry: ['賢者ゴーリー', 'ゴーリー', 'Gowry'],
    hyetta: ['灯を探すハイータ', 'ハイータ', 'Hyetta'],
    irina: ['モーンのイレーナ', 'イレーナ', 'Irina'],
    edgar: ['城主エドガー', 'エドガー', 'Edgar'],
    // サブNPCイベント
    patches: ['パッチ', 'Patches'],
    gostoc: ['門衛ゴストーク', 'ゴストーク', 'Gostoc'],
    kenneth: ['領主の嫡男、ケネス・ハイト', 'ケネス・ハイト', 'ケネス', 'Kenneth'],
    dung_eater: ['糞喰い', 'Dung Eater'],
    loathsome_dung_eater: ['ならず者', 'Dung Eater'],
    shabriri: ['シャブリリ', 'Shabriri'],
    // その他の重要NPC
    alexander: ['戦士壺アレキサンダー', 'アレキサンダー', 'Alexander'],
    sellen: ['魔術師セレン', 'セレン', 'Sellen'],
    thops: ['魔術師トープス', 'トープス', 'Thops'],
    latenna: ['ラティナ', 'Latenna'],
    seluvis: ['魔法教授セルブス', 'セルブス', 'Seluvis'],
    bernahl: ['騎士ベルナール', 'ベルナール', 'Bernahl'],
    boc: ['亜人のボック', 'ボック', 'Boc'],
    yura: ['血の指の狩人、ユラ', 'ユラ', 'Yura'],
    gideon: ['百智卿ギデオン', 'ギデオン', 'Gideon'],
    corhyn: ['金仮面卿・コリン', 'コリン', 'Corhyn', '金仮面卿'],
    jerren: ['魔女狩りジェーレン', 'ジェーレン', 'Jerren'],
    diallos: ['騎士ディアロス', 'ディアロス', 'Diallos'],
    roderika: ['ローデリカ', 'Roderika'],
    hewg: ['ヒューグ', 'Hewg'],
    jar_bairn: ['小壷、壺氏', '小壷', '壺師', '壺氏', 'Jar Bairn'],
    varre: ['白面のヴァレー', 'ヴァレー', 'Varre']
  }

  // 絞り込み処理
  const filteredArticles = selectedNPC === 'all' 
    ? articles 
    : articles.filter(({ article, video }) => {
        const keywords = npcKeywords[selectedNPC as keyof typeof npcKeywords] || []
        
        return keywords.some(keyword => 
          article.title.includes(keyword) || 
          video.title.includes(keyword) ||
          article.content.includes(keyword)
        )
      })

  return (
    <>
      <NPCFilter 
        selectedNPC={selectedNPC}
        onNPCChange={setSelectedNPC}
        articles={articles}
      />

      {/* 記事一覧 */}
      {filteredArticles.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎭 イベント攻略記事 ({filteredArticles.length}件)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((data) => (
              <ArticleCard key={data.article.id} data={data} />
            ))}
          </div>
        </section>
      ) : (
        <section className="text-center py-16">
          <div className="text-6xl mb-4">🎭</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">該当する記事がありません</h2>
          <p className="text-gray-600 mb-8">
            選択したNPCのイベント記事は現在準備中です。<br />
            他のNPCをお試しください。
          </p>
        </section>
      )}
    </>
  )
}