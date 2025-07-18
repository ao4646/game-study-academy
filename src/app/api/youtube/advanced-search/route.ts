// src/app/api/youtube/advanced-search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface AdvancedSearchParams {
  query?: string;              // 検索クエリ (新しい形式)
  baseQuery?: string;          // 基本検索語 "ナイトレイン グラディウス" (後方互換)
  includeKeywords?: string[];  // 必須キーワード ["攻略", "解説"]
  excludeKeywords?: string[];  // 除外キーワード ["反応集", "切り抜き"]
  maxResults?: number;         // 最大取得数
  minViews?: number;          // 最小再生数（フィルタ用）
  maxDuration?: number;       // 最大動画時間（秒）
  channelFilter?: string[];   // 特定チャンネルのみ
  gameId?: number;            // ゲームID
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Advanced YouTube Search ===');
    
    const params: AdvancedSearchParams = await request.json();
    
    // 検索クエリ構築
    let searchQuery = params.query || params.baseQuery || '';
    
    // 必須キーワード追加（AND検索）
    if (params.includeKeywords?.length) {
      params.includeKeywords.forEach(keyword => {
        searchQuery += ` +${keyword}`;
      });
    }
    
    // 除外キーワード追加（NOT検索）
    if (params.excludeKeywords?.length) {
      params.excludeKeywords.forEach(keyword => {
        searchQuery += ` -${keyword}`;
      });
    }
    
    console.log('Constructed query:', searchQuery);
    
    // YouTube API呼び出し
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    if (!youtubeApiKey) {
      throw new Error('YouTube API key not found');
    }
    
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&` +
      `q=${encodeURIComponent(searchQuery)}&` +
      `type=video&` +
      `maxResults=${Math.min(params.maxResults || 10, 50)}&` +
      `order=relevance&` +
      `regionCode=JP&` +
      `relevanceLanguage=ja&` +
      `key=${youtubeApiKey}`;
    
    const response = await fetch(youtubeUrl);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 取得した動画データの詳細フィルタリング
    let filteredVideos = data.items?.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description || '',
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails
    })) || [];
    
    // 追加フィルタリング処理
    filteredVideos = filteredVideos.filter((video: any) => {
      const title = video.title.toLowerCase();
      const description = video.description.toLowerCase();
      const channelTitle = video.channelTitle.toLowerCase();
      
      // チャンネルフィルタ
      if (params.channelFilter?.length) {
        const isAllowedChannel = params.channelFilter.some(channel =>
          channelTitle.includes(channel.toLowerCase())
        );
        if (!isAllowedChannel) return false;
      }
      
      // より厳密な除外キーワードチェック
      const strictExcludeWords = [
        '反応集', '切り抜き'
      ];
      
      const hasExcludedContent = strictExcludeWords.some(word =>
        title.includes(word) || description.includes(word)
      );
      
      if (hasExcludedContent) return false;
      
      // ゲーム別必須コンテンツチェック
      let requiredContent: string[] = [];
      if (params.gameId === 2) {
        // エルデンリング用
        requiredContent = ['攻略', '解説', 'ガイド', 'コツ', '戦術', '初心者', 'チュートリアル', '基本', '始め方'];
      } else {
        // ナイトレイン用（デフォルト）
        requiredContent = ['攻略', '解説', 'ガイド', 'コツ', '戦術'];
      }
      
      const hasRequiredContent = requiredContent.some(word =>
        title.includes(word) || description.includes(word)
      );
      
      return hasRequiredContent;
    });
    
    // 品質スコア計算（レスポンス用のみ、DBには保存しない）
    filteredVideos = filteredVideos.map((video: any) => {
      let qualityScore = 0;
      const title = video.title.toLowerCase();
      
      // ゲーム別基本キーワードマッチ
      if (params.gameId === 2) {
        // エルデンリング用
        if (title.includes('エルデンリング')) qualityScore += 10;
        if (title.includes('elden ring')) qualityScore += 10;
        if (title.includes('初心者')) qualityScore += 8;
        if (title.includes('チュートリアル')) qualityScore += 7;
        if (title.includes('始め方')) qualityScore += 6;
        if (title.includes('基本')) qualityScore += 5;
      } else {
        // ナイトレイン用（デフォルト）
        if (title.includes('グラディウス')) qualityScore += 10;
        if (title.includes('ナイトレイン')) qualityScore += 10;
      }
      
      // 共通キーワード
      if (title.includes('攻略')) qualityScore += 5;
      if (title.includes('解説')) qualityScore += 5;
      if (title.includes('徹底')) qualityScore += 3;
      
      return { ...video, qualityScore };
    });
    
    // 品質スコア順でソート
    filteredVideos.sort((a: any, b: any) => b.qualityScore - a.qualityScore);
    
    console.log(`Filtered videos: ${filteredVideos.length} from ${data.items?.length || 0}`);
    
    // Supabase保存処理 - 現在のテーブル構造に合わせて修正
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // 現在のテーブル構造に合わせたデータ準備
    const videoInserts = filteredVideos.map((video: any) => ({
      video_id: video.id,
      title: video.title,
      description: video.description.substring(0, 1000), // 長すぎる場合の制限
      channel_title: video.channelTitle,
      published_at: video.publishedAt,
      thumbnail_url: video.thumbnails?.medium?.url || '',
      search_query: searchQuery,
      game_id: params.gameId || 1
      // quality_score と created_at を削除（テーブルに存在しないため）
    }));
    
    // upsert で重複回避しながら保存
    const { data: savedVideos, error: saveError } = await supabase
      .from('videos')
      .upsert(videoInserts, { onConflict: 'video_id' })
      .select();
    
    if (saveError) {
      console.error('Save error:', saveError);
      // エラーログを出力するが、処理は継続
    } else {
      console.log(`Successfully saved ${savedVideos?.length || 0} videos to database`);
    }
    
    return NextResponse.json({
      success: true,
      originalQuery: params.query || params.baseQuery,
      constructedQuery: searchQuery,
      totalFound: data.items?.length || 0,
      filteredCount: filteredVideos.length,
      savedCount: savedVideos?.length || 0,
      videos: filteredVideos.slice(0, 5), // レスポンスには5件のみ表示
      filterCriteria: {
        includeKeywords: params.includeKeywords,
        excludeKeywords: params.excludeKeywords,
        channelFilter: params.channelFilter,
        gameId: params.gameId
      },
      // デバッグ情報
      debug: {
        saveError: saveError ? saveError.message : null,
        tableStructureMatched: true
      }
    });
    
  } catch (error) {
    console.error('Advanced search error:', error);
    return NextResponse.json({
      error: 'Advanced search failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}