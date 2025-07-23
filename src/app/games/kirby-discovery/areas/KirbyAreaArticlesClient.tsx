'use client'

import { useState, useEffect } from 'react'
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
            <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">
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

// シンプルなエリア・ステージフィルターコンポーネント
function SimpleAreaFilter({ 
  selectedFilter, 
  onFilterChange, 
  articles 
}: { 
  selectedFilter: string
  onFilterChange: (filter: string) => void
  articles: ArticleWithRelations[]
}) {
  // エリア・ステージ別のキーワードマッピング
  const filterKeywords = {
    all: [],
    // エリア別
    area_natural_plains: ['ネイチェル草原', 'Natural Plains'],
    area_everbay_coast: ['エバーブルグ海岸', 'Everbay Coast'],
    area_wondaria_remains: ['ワンダリア跡地', 'Wondaria'],
    area_wintry_horns: ['ホワイティホルンズ', 'Wintry Horns'],
    area_originull_wasteland: ['オリジネシア高野大地', 'Originull Wasteland'],
    area_redgar_forbidden: ['レッドガル禁足地', 'Redgar Forbidden'],
    area_lab_discovera: ['ラボ・ディスカバール', 'Lab Discovera'],
    area_forgo_dreams: ['絶島ドリーミー・フォルガ', 'Forgo Dreams', 'フォルガトゥン'],
    // ステージ別
    stage_1_1: ['草原のビルディング'],
    stage_1_2: ['トンネルくぐって'],
    stage_1_3: ['ごろりんロード'],
    stage_1_4: ['行こうよアライブルモール', 'アライブルモール'],
    stage_1_5: ['モールにひびくおたけび'],
    stage_2_1: ['泳げ！ひろびろビーチ', 'ひろびろビーチ'],
    stage_2_2: ['コンクリートアイランズ'],
    stage_2_3: ['登ってブロックヒルズ', 'ブロックヒルズ'],
    stage_2_4: ['地下水道に流されて', '地下水道'],
    stage_2_5: ['きょうふのトロピカル', 'トロピカル'],
    stage_3_1: ['ようこそワンダリア'],
    stage_3_2: ['サーキットでGO！', 'サーキット'],
    stage_3_3: ['びっくりホラーハウス', 'ホラーハウス'],
    stage_3_4: ['ワンダリアパレードの夢', 'パレード'],
    stage_3_5: ['あぶないサーカスショー', 'サーカス'],
    stage_4_1: ['北のホワイトストリート', 'ホワイトストリート'],
    stage_4_2: ['フローズン・メトロ', 'フローズンメトロ'],
    stage_4_3: ['いてつく海と風と'],
    stage_4_4: ['ブリザードブリッヂの戦い', 'ブリザード'],
    stage_4_5: ['まさかのビーストキング', 'ビーストキング'],
    stage_5_1: ['命はじまる大荒野', '大荒野'],
    stage_5_2: ['うるおい求めて'],
    stage_5_3: ['うら・アライブルモール'],
    stage_5_4: ['ムーンライトキャニオン'],
    stage_5_5: ['眠らぬ谷のコレクター', 'コレクター'],
    stage_6_1: ['アツアツの禁足地へ'],
    stage_6_2: ['烈火征く道', '烈火'],
    stage_6_3: ['資源エネルギープラント', 'エネルギープラント'],
    stage_6_4: ['幹部招集'],
    stage_6_5: ['決戦！ビースト軍団包囲網', 'ビースト軍団'],
    stage_6_6: ['王の御前'],
    stage_7_1: ['ラボ・ディスカバール'],
    stage_8_1: ['フォルガトゥン・チェル'],
    stage_8_2: ['フォルガトゥン・ブルグ'],
    stage_8_3: ['フォルガトゥン・ダリア'],
    stage_8_4: ['フォルガトゥン・ホルンズ'],
    stage_8_5: ['フォルガトゥン・ネシア'],
    stage_8_6: ['フォルガトゥン・ガル'],
    stage_8_7: ['フォルガトゥン・ランド']
  }

  // フィルター別記事数を計算
  const getFilterCount = (filterKey: string) => {
    if (filterKey === 'all') return articles.length
    const keywords = filterKeywords[filterKey as keyof typeof filterKeywords]
    return articles.filter(({ article, video }) => {
      return keywords.some(keyword => 
        article.title.includes(keyword) || 
        video.title.includes(keyword) ||
        article.content.includes(keyword)
      )
    }).length
  }

  // エリア・ステージ定義
  const areas = [
    {
      name: 'ネイチェル草原',
      key: 'area_natural_plains',
      stages: [
        { key: 'stage_1_1', name: '草原のビルディング' },
        { key: 'stage_1_2', name: 'トンネルくぐって' },
        { key: 'stage_1_3', name: 'ごろりんロード' },
        { key: 'stage_1_4', name: 'アライブルモール' },
        { key: 'stage_1_5', name: 'モールにひびくおたけび' }
      ]
    },
    {
      name: 'エバーブルグ海岸',
      key: 'area_everbay_coast',
      stages: [
        { key: 'stage_2_1', name: 'ひろびろビーチ' },
        { key: 'stage_2_2', name: 'コンクリートアイランズ' },
        { key: 'stage_2_3', name: 'ブロックヒルズ' },
        { key: 'stage_2_4', name: '地下水道に流されて' },
        { key: 'stage_2_5', name: 'きょうふのトロピカル' }
      ]
    },
    {
      name: 'ワンダリア跡地',
      key: 'area_wondaria_remains',
      stages: [
        { key: 'stage_3_1', name: 'ようこそワンダリア' },
        { key: 'stage_3_2', name: 'サーキットでGO！' },
        { key: 'stage_3_3', name: 'びっくりホラーハウス' },
        { key: 'stage_3_4', name: 'ワンダリアパレードの夢' },
        { key: 'stage_3_5', name: 'あぶないサーカスショー' }
      ]
    },
    {
      name: 'ホワイティホルンズ',
      key: 'area_wintry_horns',
      stages: [
        { key: 'stage_4_1', name: 'ホワイトストリート' },
        { key: 'stage_4_2', name: 'フローズン・メトロ' },
        { key: 'stage_4_3', name: 'いてつく海と風と' },
        { key: 'stage_4_4', name: 'ブリザードブリッヂの戦い' },
        { key: 'stage_4_5', name: 'ビーストキング' }
      ]
    },
    {
      name: 'オリジネシア高野大地',
      key: 'area_originull_wasteland',
      stages: [
        { key: 'stage_5_1', name: '命はじまる大荒野' },
        { key: 'stage_5_2', name: 'うるおい求めて' },
        { key: 'stage_5_3', name: 'うら・アライブルモール' },
        { key: 'stage_5_4', name: 'ムーンライトキャニオン' },
        { key: 'stage_5_5', name: '眠らぬ谷のコレクター' }
      ]
    },
    {
      name: 'レッドガル禁足地',
      key: 'area_redgar_forbidden',
      stages: [
        { key: 'stage_6_1', name: 'アツアツの禁足地へ' },
        { key: 'stage_6_2', name: '烈火征く道' },
        { key: 'stage_6_3', name: 'エネルギープラント' },
        { key: 'stage_6_4', name: '幹部招集' },
        { key: 'stage_6_5', name: 'ビースト軍団包囲網' },
        { key: 'stage_6_6', name: '王の御前' }
      ]
    },
    {
      name: 'ラボ・ディスカバール',
      key: 'area_lab_discovera',
      stages: []
    },
    {
      name: '絶島ドリーミー・フォルガ',
      key: 'area_forgo_dreams',
      stages: [
        { key: 'stage_8_1', name: 'フォルガトゥン・チェル' },
        { key: 'stage_8_2', name: 'フォルガトゥン・ブルグ' },
        { key: 'stage_8_3', name: 'フォルガトゥン・ダリア' },
        { key: 'stage_8_4', name: 'フォルガトゥン・ホルンズ' },
        { key: 'stage_8_5', name: 'フォルガトゥン・ネシア' },
        { key: 'stage_8_6', name: 'フォルガトゥン・ガル' },
        { key: 'stage_8_7', name: 'フォルガトゥン・ランド' }
      ]
    }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🗺️ エリア別絞り込み</h3>
      
      {/* すべて */}
      <div className="mb-6">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            selectedFilter === 'all'
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          すべて ({getFilterCount('all')})
        </button>
      </div>

      {/* エリア別 */}
      {areas.map((area) => (
        <div key={area.key} className="mb-6">
          <h4 className="text-md font-medium text-gray-700 mb-3">{area.name}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {/* エリア全体ボタン */}
            <button
              onClick={() => onFilterChange(area.key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedFilter === area.key
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {area.name} ({getFilterCount(area.key)})
            </button>
            
            {/* ステージボタン */}
            {area.stages.map((stage) => (
              <button
                key={stage.key}
                onClick={() => onFilterChange(stage.key)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedFilter === stage.key
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stage.name} ({getFilterCount(stage.key)})
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// クライアントコンポーネント（絞り込み機能用）
export default function KirbyAreaArticlesClient() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [articles, setArticles] = useState<ArticleWithRelations[]>([])
  const [loading, setLoading] = useState(true)

  // フィルター別のキーワードマッピング
  const filterKeywords = {
    all: [],
    // エリア別
    area_natural_plains: ['ネイチェル草原', 'Natural Plains'],
    area_everbay_coast: ['エバーブルグ海岸', 'Everbay Coast'],
    area_wondaria_remains: ['ワンダリア跡地', 'Wondaria'],
    area_wintry_horns: ['ホワイティホルンズ', 'Wintry Horns'],
    area_originull_wasteland: ['オリジネシア高野大地', 'Originull Wasteland'],
    area_redgar_forbidden: ['レッドガル禁足地', 'Redgar Forbidden'],
    area_lab_discovera: ['ラボ・ディスカバール', 'Lab Discovera'],
    area_forgo_dreams: ['絶島ドリーミー・フォルガ', 'Forgo Dreams', 'フォルガトゥン'],
    // ステージ別
    stage_1_1: ['草原のビルディング'],
    stage_1_2: ['トンネルくぐって'],
    stage_1_3: ['ごろりんロード'],
    stage_1_4: ['行こうよアライブルモール', 'アライブルモール'],
    stage_1_5: ['モールにひびくおたけび'],
    stage_2_1: ['泳げ！ひろびろビーチ', 'ひろびろビーチ'],
    stage_2_2: ['コンクリートアイランズ'],
    stage_2_3: ['登ってブロックヒルズ', 'ブロックヒルズ'],
    stage_2_4: ['地下水道に流されて', '地下水道'],
    stage_2_5: ['きょうふのトロピカル', 'トロピカル'],
    stage_3_1: ['ようこそワンダリア'],
    stage_3_2: ['サーキットでGO！', 'サーキット'],
    stage_3_3: ['びっくりホラーハウス', 'ホラーハウス'],
    stage_3_4: ['ワンダリアパレードの夢', 'パレード'],
    stage_3_5: ['あぶないサーカスショー', 'サーカス'],
    stage_4_1: ['北のホワイトストリート', 'ホワイトストリート'],
    stage_4_2: ['フローズン・メトロ', 'フローズンメトロ'],
    stage_4_3: ['いてつく海と風と'],
    stage_4_4: ['ブリザードブリッヂの戦い', 'ブリザード'],
    stage_4_5: ['まさかのビーストキング', 'ビーストキング'],
    stage_5_1: ['命はじまる大荒野', '大荒野'],
    stage_5_2: ['うるおい求めて'],
    stage_5_3: ['うら・アライブルモール'],
    stage_5_4: ['ムーンライトキャニオン'],
    stage_5_5: ['眠らぬ谷のコレクター', 'コレクター'],
    stage_6_1: ['アツアツの禁足地へ'],
    stage_6_2: ['烈火征く道', '烈火'],
    stage_6_3: ['資源エネルギープラント', 'エネルギープラント'],
    stage_6_4: ['幹部招集'],
    stage_6_5: ['決戦！ビースト軍団包囲網', 'ビースト軍団'],
    stage_6_6: ['王の御前'],
    stage_7_1: ['ラボ・ディスカバール'],
    stage_8_1: ['フォルガトゥン・チェル'],
    stage_8_2: ['フォルガトゥン・ブルグ'],
    stage_8_3: ['フォルガトゥン・ダリア'],
    stage_8_4: ['フォルガトゥン・ホルンズ'],
    stage_8_5: ['フォルガトゥン・ネシア'],
    stage_8_6: ['フォルガトゥン・ガル'],
    stage_8_7: ['フォルガトゥン・ランド']
  }

  // 記事データを取得
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles?game=kirby-discovery')
        if (response.ok) {
          const data = await response.json()
          setArticles(data)
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  // 絞り込み処理
  const filteredArticles = selectedFilter === 'all' 
    ? articles 
    : articles.filter(({ article, video }) => {
        const keywords = filterKeywords[selectedFilter as keyof typeof filterKeywords]
        return keywords.some(keyword => 
          article.title.includes(keyword) || 
          video.title.includes(keyword) ||
          article.content.includes(keyword)
        )
      })

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔄</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">記事を読み込み中...</h2>
        <p className="text-gray-600">少々お待ちください</p>
      </div>
    )
  }

  return (
    <>
      <SimpleAreaFilter 
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
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
          <button 
            onClick={() => setSelectedFilter('all')}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            すべての記事を表示
          </button>
        </section>
      )}
    </>
  )
}