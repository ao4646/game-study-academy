// src/app/api/youtube/add-video/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface AddVideoRequest {
  video_id?: string;
  url?: string;
  game_id?: number;
}

// YouTube URLから動画IDを抽出
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // 直接動画IDの場合
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Add Single YouTube Video ===');
    
    const params: AddVideoRequest = await request.json();
    
    // 動画IDの取得
    let videoId: string | null = null;
    
    if (params.video_id) {
      videoId = params.video_id;
    } else if (params.url) {
      videoId = extractVideoId(params.url);
    }
    
    if (!videoId) {
      return NextResponse.json({
        success: false,
        error: 'Invalid video ID or URL',
        message: 'Please provide a valid YouTube video ID or URL'
      }, { status: 400 });
    }
    
    console.log('Video ID:', videoId);
    
    // YouTube API呼び出し（動画詳細取得）
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    if (!youtubeApiKey) {
      throw new Error('YouTube API key not found');
    }
    
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?` +
      `part=snippet,contentDetails,statistics&` +
      `id=${videoId}&` +
      `key=${youtubeApiKey}`;
    
    const response = await fetch(youtubeUrl);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Video not found',
        message: 'The specified video does not exist or is not accessible'
      }, { status: 404 });
    }
    
    const videoData = data.items[0];
    const snippet = videoData.snippet;
    const contentDetails = videoData.contentDetails;
    const statistics = videoData.statistics;
    
    console.log('Video found:', snippet.title);
    
    // Supabase接続
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Supabase configuration not available',
        message: 'Environment variables not configured'
      }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // 既存動画のチェック
    const { data: existingVideo } = await supabase
      .from('videos')
      .select('id, title')
      .eq('video_id', videoId)
      .single();
    
    if (existingVideo) {
      return NextResponse.json({
        success: false,
        error: 'Video already exists',
        message: 'This video is already in the database',
        existing_video: {
          id: existingVideo.id,
          title: existingVideo.title
        }
      }, { status: 409 });
    }
    
    // 動画データの準備（現在のテーブル構造に合わせて）
    const videoInsert = {
      video_id: videoId,
      title: snippet.title,
      description: snippet.description || '',
      channel_title: snippet.channelTitle,
      published_at: snippet.publishedAt,
      thumbnail_url: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || '',
      game_id: params.game_id || 1 // デフォルトはナイトレイン
      // created_at はデフォルト値が設定されているため省略
    };
    
    // データベースに保存
    const { data: savedVideo, error: saveError } = await supabase
      .from('videos')
      .insert([videoInsert])
      .select()
      .single();
    
    if (saveError) {
      console.error('Save error:', saveError);
      return NextResponse.json({
        success: false,
        error: 'Database save failed',
        message: saveError.message,
        details: saveError
      }, { status: 500 });
    }
    
    console.log('Video saved successfully:', savedVideo.id);
    
    return NextResponse.json({
      success: true,
      message: 'Video added successfully',
      video: {
        id: savedVideo.id,
        video_id: savedVideo.video_id,
        title: savedVideo.title,
        channel_title: savedVideo.channel_title,
        published_at: savedVideo.published_at,
        thumbnail_url: savedVideo.thumbnail_url,
        game_id: savedVideo.game_id
      },
      youtube_data: {
        duration: contentDetails?.duration,
        view_count: statistics?.viewCount,
        like_count: statistics?.likeCount,
        comment_count: statistics?.commentCount
      }
    });
    
  } catch (error) {
    console.error('Add video error:', error);
    return NextResponse.json({
      error: 'Failed to add video',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}