// src/app/articles/[id]/page.tsx
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import StructuredData, { BreadcrumbStructuredData } from '@/components/StructuredData';
import { generateArticleMetadata } from '@/lib/metadata';
import { Article, Video, Game, Category } from '@/types';

// Supabase クライアント作成
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// 関連コンテンツの型定義
interface RelatedContent {
  boss?: { id: number; name: string; jp_name: string; description: string | null; thumbnail_url: string | null };
  strategy?: { id: number; name: string; jp_name: string; description: string | null; thumbnail_url: string | null };
  class?: { id: number; name: string; jp_name: string; description: string | null; thumbnail_url: string | null };
  tip?: { id: number; title: string; description: string | null; thumbnail_url: string | null };
  dungeon?: { id: number; name: string; jp_name: string; description: string | null; thumbnail_url: string | null };
  story?: { id: number; title: string; jp_title: string; description: string | null; thumbnail_url: string | null };
}

// 記事データと関連コンテンツの型定義
interface ArticleWithRelatedContent {
  article: Article;
  video: Video;
  game: Game;
  categories: Category[];
  relatedContent: RelatedContent;
}

// 記事データ取得関数
async function getArticle(id: string): Promise<ArticleWithRelatedContent | null> {
  try {
    // 記事データ取得
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single();

    if (articleError || !article) {
      return null;
    }

    // 関連動画データ取得
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .select('*')
      .eq('id', article.video_id)
      .single();

    // ゲームデータ取得
    const { data: game, error: gameError } = await supabase
      .from('games')
      .select('*')
      .eq('id', article.game_id)
      .single();

    if (videoError || !video || gameError || !game) {
      return null;
    }

    // カテゴリデータ取得（複数対応）
    const { data: categoryData } = await supabase
      .from('article_categories')
      .select(`
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('article_id', article.id);

    const categories: Category[] = categoryData?.map(item => {
      const cat = (item as unknown as { categories: { id: number; name: string; slug: string } }).categories;
      return {
        ...cat,
        jp_name: cat.name, // jp_nameが存在しない場合はnameを使用
        parent_id: null,
        icon: null,
        description: null,
        url_path: `/categories/${cat.slug}`,
        sort_order: null,
        is_active: true,
        created_at: new Date().toISOString()
      };
    }) || [];

    // 関連コンテンツ取得
    const relatedContent: RelatedContent = {};

    // 関連ボス取得
    if (article.related_boss_id) {
      const { data: boss } = await supabase
        .from('bosses')
        .select('id, name, description')
        .eq('id', article.related_boss_id)
        .single();
      if (boss) relatedContent.boss = { ...boss, jp_name: boss.name, thumbnail_url: null };
    }

    // 関連戦術取得
    if (article.related_strategy_id) {
      const { data: strategy } = await supabase
        .from('strategies')
        .select('id, name, description')
        .eq('id', article.related_strategy_id)
        .single();
      if (strategy) relatedContent.strategy = { ...strategy, jp_name: strategy.name, thumbnail_url: null };
    }

    // 関連クラス取得
    if (article.related_classes_id) {
      const { data: classData } = await supabase
        .from('classes')
        .select('id, name, description')
        .eq('id', article.related_classes_id)
        .single();
      if (classData) relatedContent.class = { ...classData, jp_name: classData.name, thumbnail_url: null };
    }

    // 関連TIPS取得
    if (article.related_tip_id) {
      const { data: tip } = await supabase
        .from('tips')
        .select('id, name, description')
        .eq('id', article.related_tip_id)
        .single();
      if (tip) relatedContent.tip = { id: tip.id, title: tip.name, description: tip.description, thumbnail_url: null };
    }

    // 関連ダンジョン取得
    if (article.related_dungeon_id) {
      const { data: dungeon } = await supabase
        .from('dungeons')
        .select('id, name, description')
        .eq('id', article.related_dungeon_id)
        .single();
      if (dungeon) relatedContent.dungeon = { ...dungeon, jp_name: dungeon.name, thumbnail_url: null };
    }

    // 関連ストーリー取得
    if (article.related_story_id) {
      const { data: story } = await supabase
        .from('stories')
        .select('id, name, description')
        .eq('id', article.related_story_id)
        .single();
      if (story) relatedContent.story = { id: story.id, title: story.name, jp_title: story.name, description: story.description, thumbnail_url: null };
    }

    return { article, video, game, categories, relatedContent };
  } catch (error) {
    console.error('記事データ取得エラー:', error);
    return null;
  }
}

// 関連コンテンツカードコンポーネント
function RelatedContentCard({ 
  title, 
  jpTitle, 
  description, 
  type, 
  href 
}: { 
  title: string; 
  jpTitle?: string; 
  description: string | null; 
  type: string; 
  href: string; 
}) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'boss': return '👹';
      case 'strategy': return '⚔️';
      case 'class': return '🧙';
      case 'tip': return '💡';
      case 'dungeon': return '🏰';
      case 'story': return '📚';
      default: return '🎮';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'boss': return 'ボス';
      case 'strategy': return '戦術';
      case 'class': return 'クラス';
      case 'tip': return 'TIPS';
      case 'dungeon': return 'ダンジョン';
      case 'story': return 'ストーリー';
      default: return 'コンテンツ';
    }
  };

  return (
    <a 
      href={href}
      className="block p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:from-blue-50 hover:to-red-50 transition-all duration-300 hover:shadow-md border border-gray-200 hover:border-blue-300"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">{getIcon(type)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
              {getTypeLabel(type)}
            </span>
          </div>
          <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">
            {jpTitle || title}
          </h4>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}

// SEO メタデータ生成（最適化版）
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getArticle(id);
  
  if (!data) {
    return {
      title: '記事が見つかりません | Game Study Academy',
      description: '指定された記事は存在しません。',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { article, video, game } = data;
  const url = `https://game-study-academy.com/articles/${article.id}`;
  
  // 新しいメタデータ生成関数を使用
  return generateArticleMetadata(article, video, game, url);
}

// マークダウンを簡単なHTMLに変換する関数（修正版）
function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-6 mt-8 text-gray-900 border-b-2 border-red-500 pb-2">$1</h1>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-gray-800 border-l-4 border-red-500 pl-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-medium mb-3 mt-6 text-gray-700">$1</h3>')
    .replace(/^\・(.+)$/gm, '<li class="mb-2 text-gray-700 leading-relaxed">$1</li>')
    .replace(/^([^<\n#\・]+)$/gm, '<p class="mb-4 text-gray-700 leading-relaxed">$1</p>')
    .replace(/(<li[\s\S]*?<\/li>)/g, '<ul class="list-disc list-inside mb-6 space-y-2 ml-4">$1</ul>')
    .replace(/<\/ul>\s*<ul[^>]*>/g, '')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
}

// 記事詳細ページコンポーネント（SEO最適化版）
export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getArticle(id);

  if (!data) {
    notFound();
  }

  const { article, video, game, categories, relatedContent } = data;
  const hasRelatedContent = Object.keys(relatedContent).length > 0;
  const url = `https://game-study-academy.com/articles/${article.id}`;

  // パンくずリストデータ
  const breadcrumbItems = [
    { name: 'ホーム', url: 'https://game-study-academy.com' },
    { name: '記事一覧', url: 'https://game-study-academy.com/articles' },
    { name: article.title, url }
  ];

  return (
    <>
      {/* 構造化データ */}
      <StructuredData 
        type="article" 
        article={article} 
        video={video} 
        game={game} 
        url={url}
      />
      <BreadcrumbStructuredData items={breadcrumbItems} />

      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー（パンくずナビ改良版） */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-red-600 transition-colors">ホーム</Link>
              <span className="text-gray-400">/</span>
              <Link href="/articles" className="hover:text-red-600 transition-colors">記事一覧</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium line-clamp-1">{article.title}</span>
            </nav>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* 記事ヘッダー（改良版） */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              {/* カテゴリ・ゲーム・読了時間 */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {categories && categories.length > 0 && categories.map((category) => (
                  <Link href={`/categories/${category.id}`} key={category.id}>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors cursor-pointer">
                      {category.jp_name || category.name}
                    </span>
                  </Link>
                ))}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {game.name}
                </span>
              </div>
              
              {/* 記事タイトル */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              
              {/* 投稿・更新日 */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <time dateTime={article.created_at} className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  投稿: {new Date(article.created_at).toLocaleDateString('ja-JP')}
                </time>
                <time dateTime={article.updated_at} className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  更新: {new Date(article.updated_at).toLocaleDateString('ja-JP')}
                </time>
              </div>
              
              {/* 記事要約（改良版） */}
              <div className="bg-gradient-to-r from-blue-50 to-red-50 p-6 rounded-lg mb-6 border-l-4 border-red-500">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-2">📝</span>
                  この記事の要約
                </h2>
                <p className="text-gray-800 leading-relaxed">
                  {article.summary || 'この記事の要約はありません。'}
                </p>
              </div>
            </div>
          </article>

          {/* 関連コンテンツセクション */}
          {hasRelatedContent && relatedContent && (
            <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="text-2xl mr-2">🔗</span>
                  関連コンテンツ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedContent.boss && (
                    <RelatedContentCard
                      title={relatedContent.boss.name}
                      jpTitle={relatedContent.boss.jp_name}
                      description={relatedContent.boss.description}
                      type="boss"
                      href={`/bosses/${relatedContent.boss.id}`}
                    />
                  )}
                  {relatedContent.strategy && (
                    <RelatedContentCard
                      title={relatedContent.strategy.name}
                      jpTitle={relatedContent.strategy.jp_name}
                      description={relatedContent.strategy.description}
                      type="strategy"
                      href={`/strategies/${relatedContent.strategy.id}`}
                    />
                  )}
                  {relatedContent.class && (
                    <RelatedContentCard
                      title={relatedContent.class.name}
                      jpTitle={relatedContent.class.jp_name}
                      description={relatedContent.class.description}
                      type="class"
                      href={`/classes/${relatedContent.class.id}`}
                    />
                  )}
                  {relatedContent.tip && (
                    <RelatedContentCard
                      title={relatedContent.tip.title}
                      description={relatedContent.tip.description}
                      type="tip"
                      href={`/tips/${relatedContent.tip.id}`}
                    />
                  )}
                  {relatedContent.dungeon && (
                    <RelatedContentCard
                      title={relatedContent.dungeon.name}
                      jpTitle={relatedContent.dungeon.jp_name}
                      description={relatedContent.dungeon.description}
                      type="dungeon"
                      href={`/dungeons/${relatedContent.dungeon.id}`}
                    />
                  )}
                  {relatedContent.story && (
                    <RelatedContentCard
                      title={relatedContent.story.title}
                      jpTitle={relatedContent.story.jp_title}
                      description={relatedContent.story.description}
                      type="story"
                      href={`/stories/${relatedContent.story.id}`}
                    />
                  )}
                </div>
              </div>
            </section>
          )}

          {/* YouTube動画埋め込み（改良版） */}
          <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">🎬</span>
                参考動画
              </h2>
              <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.video_id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">{video.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h12zM9 8v8l7-4-7-4z"/>
                    </svg>
                    チャンネル: {video.channel_title || 'Unknown'}
                  </span>
                  {video.published_at && (
                    <time dateTime={video.published_at} className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      投稿: {new Date(video.published_at).toLocaleDateString('ja-JP')}
                    </time>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* 記事本文（改良版） */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: markdownToHtml(article.content || '') 
                }}
              />
            </div>
          </article>

          {/* 関連リンク（改良版） */}
          <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="text-2xl mr-2">🔗</span>
                関連リンク
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href={`https://www.youtube.com/watch?v=${video.video_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">▶</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">YouTube動画を見る</h3>
                    <p className="text-sm text-gray-600">詳細な解説動画をチェック</p>
                  </div>
                </a>
                
                <Link 
                  href="/articles"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">📝</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">他の記事を見る</h3>
                    <p className="text-sm text-gray-600">関連する攻略記事をチェック</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* YouTuber応援メッセージ */}
          <section className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg p-6 mb-8">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-3">🎮 動画が役に立ったら、ぜひ元動画も視聴してください！</h2>
              <p className="text-red-100 mb-4">
                この記事は <strong>{video.channel_title || 'クリエイター'}</strong> さんの素晴らしい動画を参考に作成されています。<br />
                より詳しい解説は元動画をチェックして、クリエイターさんを応援しましょう！
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${video.video_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <span className="mr-2">📺</span>
                元動画を視聴して応援する
              </a>
            </div>
          </section>
        </main>

        {/* フッター */}
        <footer className="bg-gray-900 text-white mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Game Study Academy</h3>
              <p className="text-gray-400">YouTube動画から学ぶゲーム徹底攻略</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}