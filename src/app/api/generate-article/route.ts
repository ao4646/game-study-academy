// src/app/api/generate-article/route.ts（新データベース構造対応版）
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

interface GenerateArticleRequest {
  video_id: string;
  category_id?: number;
  category_ids?: number[];
  related_boss_id?: number;
  related_strategy_id?: number;
  related_classes_id?: number;
  related_tip_id?: number;
  related_dungeon_id?: number;
  related_story_id?: number;
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Claude記事生成開始（新DB構造対応） ===');
    
    const {
      video_id,
      category_id,
      category_ids = [],
      related_boss_id,
      related_strategy_id,
      related_classes_id,
      related_tip_id,
      related_dungeon_id,
      related_story_id
    }: GenerateArticleRequest = await request.json();
    
    // category_idが指定されている場合、category_idsに追加
    const finalCategoryIds = category_id ? [...category_ids, category_id] : category_ids;
    
    if (!video_id) {
      return NextResponse.json({
        error: 'video_id is required'
      }, { status: 400 });
    }

    // Supabase接続
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Supabase configuration not available',
        message: 'Environment variables not configured'
      }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 動画データ取得
    const { data: video, error: videoError } = await supabase
      .from('videos')
      .select('*')
      .eq('video_id', video_id)
      .single();

    if (videoError || !video) {
      return NextResponse.json({
        error: 'Video not found',
        details: videoError
      }, { status: 404 });
    }

    console.log('動画データ取得:', video.title);

    // 関連コンテンツ情報を取得してプロンプトに追加
    let relatedContentInfo = '';
    
    // ボス情報取得
    if (related_boss_id) {
      const { data: boss } = await supabase
        .from('bosses')
        .select('name, description')
        .eq('id', related_boss_id)
        .single();
      if (boss) {
        relatedContentInfo += `\n関連ボス: ${boss.name} - ${boss.description}`;
      }
    }

    // 戦術情報取得
    if (related_strategy_id) {
      const { data: strategy } = await supabase
        .from('strategies')
        .select('name, description')
        .eq('id', related_strategy_id)
        .single();
      if (strategy) {
        relatedContentInfo += `\n関連戦術: ${strategy.name} - ${strategy.description}`;
      }
    }

    // クラス情報取得
    if (related_classes_id) {
      const { data: characterClass } = await supabase
        .from('classes')
        .select('name, description')
        .eq('id', related_classes_id)
        .single();
      if (characterClass) {
        relatedContentInfo += `\n関連キャラクター: ${characterClass.name} - ${characterClass.description}`;
      }
    }

    // Tips情報取得
    if (related_tip_id) {
      const { data: tip } = await supabase
        .from('tips')
        .select('name, description')
        .eq('id', related_tip_id)
        .single();
      if (tip) {
        relatedContentInfo += `\n関連Tips: ${tip.name} - ${tip.description}`;
      }
    }

    // ゲーム情報取得
    const { data: game } = await supabase
      .from('games')
      .select('name')
      .eq('id', video.game_id)
      .single();

    const gameName = game?.name || 'ゲーム';

    // カテゴリ情報取得
    let categoryInfo = '';
    if (finalCategoryIds.length > 0) {
      const { data: categories } = await supabase
        .from('categories')
        .select('name')
        .in('id', finalCategoryIds);
      
      if (categories && categories.length > 0) {
        // null/undefinedのカテゴリ名を除外
        const categoryNames = categories
          .filter(c => c.name && c.name.trim() !== '')
          .map(c => c.name)
          .join(', ');
        
        if (categoryNames) {
          categoryInfo = `\nカテゴリ: ${categoryNames}`;
        }
      }
    }

    // Claude API接続
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // ゲーム別のキーワードとコンテキスト設定
    const gameContext = video.game_id === 2 ? {
      gameKeywords: 'エルデンリング,ELDEN RING,FromSoftware,アクションRPG,ソウルライク',
      gameSpecificTerms: 'ボス,武器,戦技,遺灰,エリア,DLC',
      gameDescription: 'FromSoftwareが手がけるオープンワールドアクションRPG「エルデンリング」'
    } : {
      gameKeywords: 'ナイトレイン,NIGHT REIGN,FromSoftware,協力型,アクションRPG',
      gameSpecificTerms: '夜の王,キャラクター,戦術,地変,ダンジョン,協力プレイ',
      gameDescription: 'FromSoftware最新作の協力型アクションRPG「ナイトレイン」'
    };

    // Claude APIで記事生成（ゲーム別対応の改良版プロンプト）
    const prompt = `
あなたは「YouTube動画から学ぶ」ゲーム攻略サイトの専門ライターです。
${gameContext.gameDescription}の攻略記事を作成し、読者の検索意図を満たし、動画視聴を促進する高品質記事を書いてください。

【動画情報】
ゲーム: ${gameName}
タイトル: ${video.title}
説明: ${video.description}
チャンネル: ${video.channel_title}
投稿日: ${video.published_at}${categoryInfo}${relatedContentInfo}

【記事の独自価値】
1. YouTube動画学習の優位性を明確化
2. 従来の文字攻略との差別化  
3. 動画ならではの学習体験の価値

【文章品質要件】
- 冗長な表現を避け、簡潔で読みやすく
- 専門用語は簡潔に説明
- AI生成感を排除した自然な文章
- 読者の検索意図に直接応える構成

【記事構成（1500文字）】※必ずこの順序で作成してください
# [SEOタイトル]（50-60文字、自然なキーワード配置）

## この動画をおすすめする理由（175文字）※必ず最初に配置
最終的な視聴促進メッセージ。なぜこの動画を見るべきかを魅力的に説明

## この動画で学べる攻略のポイント（150文字）
具体的な学習価値を3つのポイントで簡潔に

## なぜ動画で学ぶべきか（225文字）
・視覚的理解の優位性
・リアルタイム戦闘の観察価値  
・失敗例から学ぶ重要性

## [ボス名/戦術名]攻略の新発見（300文字）
・動画で明かされる重要な発見
・従来攻略法との違い（詳細は避ける）
・なぜこの発見が重要なのか

## 実践で身につく5つのスキル（450文字）
・判断力向上
・タイミング習得
・危機管理能力
・効率的な学習方法
・応用力開発

## 視聴者の成功事例と反響（200文字）
コメントや反応から見る実際の効果

【記事品質基準】
1. 読者が「動画を見たい」と感じる内容
2. 検索意図（攻略情報）に応える価値提示
3. YouTuberの利益を損なわない配慮
4. 独自性のある価値提案
5. 自然で読みやすい文章

【重要：構成順序の厳守】
「この動画をおすすめする理由」を必ずタイトル直後の最初のセクションに配置してください。
他のセクションを最初に持ってくることは絶対に避けてください。

【禁止事項】
- 具体的攻略手順の詳細記載
- 動画の完全なネタバレ
- 冗長で回りくどい表現
- 意味のない修飾語の多用
- 構成順序の変更

1500文字で、動画学習の価値を伝える魅力的な記事を作成してください。
`;

    console.log('Claude API呼び出し開始');

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      temperature: 0.7,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    const generatedContent = response.content[0].type === 'text' 
      ? response.content[0].text 
      : '';

    console.log('記事生成完了、文字数:', generatedContent.length);

    // 記事タイトル抽出
    const lines = generatedContent.split('\n').filter(line => line.trim());
    const h1Line = lines.find(line => line.startsWith('# '));
    const articleTitle = h1Line?.replace(/^#+\s*/, '') || `${video.title} - 攻略ガイド`;
    
    // メタディスクリプション生成
    const contentBody = generatedContent.replace(/^#+.*$/gm, '').trim();
    const metaDescription = contentBody.substring(0, 160).replace(/\n/g, ' ') + '...';
    
    // SEOキーワード抽出（ゲーム別）
    const seoKeywords = `${gameContext.gameKeywords},${video.title.split(/[【】・]/)[1] || '攻略'},YouTube,動画解説,${gameContext.gameSpecificTerms}`;

    console.log('SEOタイトル:', articleTitle);
    console.log('メタディスクリプション:', metaDescription);

    // カテゴリ7,8の特別処理
    let related_analysis_id = null;
    let related_beginner_id = null;
    
    if (finalCategoryIds.includes(7)) {
      related_analysis_id = 7;
    }
    if (finalCategoryIds.includes(8)) {
      related_beginner_id = 8;
    }

    // 記事をデータベースに保存（新構造対応）
    const { data: article, error: insertError } = await supabase
      .from('articles')
      .insert({
        title: articleTitle,
        content: generatedContent,
        summary: metaDescription,
        video_id: video.id,
        game_id: video.game_id,
        published: true,
        // 関連コンテンツを設定
        related_boss_id: related_boss_id || null,
        related_strategy_id: related_strategy_id || null,
        related_classes_id: related_classes_id || null,
        related_tip_id: related_tip_id || null,
        related_dungeon_id: related_dungeon_id || null,
        related_story_id: related_story_id || null,
        // 新しく追加されたカテゴリ関連カラム
        related_analysis_id: related_analysis_id,
        related_beginner_id: related_beginner_id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error('記事保存エラー:', insertError);
      return NextResponse.json({
        error: 'Failed to save article',
        details: insertError
      }, { status: 500 });
    }

    console.log('記事保存完了:', article.id);

    // 複数カテゴリの関連付け
    if (finalCategoryIds.length > 0) {
      const categoryInserts = finalCategoryIds.map(categoryId => ({
        article_id: article.id,
        category_id: categoryId
      }));

      const { error: categoryError } = await supabase
        .from('article_categories')
        .insert(categoryInserts);

      if (categoryError) {
        console.error('カテゴリ関連付けエラー:', categoryError);
      } else {
        console.log('カテゴリ関連付け完了:', finalCategoryIds);
      }
    }

    // SEOデータを別途更新
    try {
      await supabase
        .from('articles')
        .update({
          seo_title: articleTitle,
          meta_description: metaDescription,
          seo_keywords: seoKeywords
        })
        .eq('id', article.id);
      
      console.log('SEO更新完了');
    } catch (seoError) {
      console.log('SEO更新エラー（非致命的）:', seoError);
    }

    return NextResponse.json({
      success: true,
      message: '記事生成・保存完了（新DB構造対応）',
      article: {
        id: article.id,
        title: article.title,
        content_length: generatedContent.length,
        summary: article.summary,
        categories: finalCategoryIds,
        related_content: {
          boss_id: related_boss_id,
          strategy_id: related_strategy_id,
          classes_id: related_classes_id,
          tip_id: related_tip_id,
          dungeon_id: related_dungeon_id,
          story_id: related_story_id
        },
        seo_data: {
          seo_title: articleTitle,
          meta_description: metaDescription,
          keywords: seoKeywords
        },
        video_source: {
          title: video.title,
          channel: video.channel_title
        }
      },
      metrics: {
        content_length: generatedContent.length,
        tokens_used: response.usage?.input_tokens + response.usage?.output_tokens || 0,
        processing_time: new Date().toISOString()
      },
      quality_check: {
        structure_order: '「この動画をおすすめする理由」を最上部に配置',
        youtube_friendly: true,
        seo_optimized: true,
        multiple_categories: finalCategoryIds.length,
        related_content_count: [
          related_boss_id, related_strategy_id, related_classes_id, 
          related_tip_id, related_dungeon_id, related_story_id
        ].filter(Boolean).length
      }
    });

  } catch (error) {
    console.error('Claude記事生成エラー:', error);
    return NextResponse.json({
      error: 'Article generation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}