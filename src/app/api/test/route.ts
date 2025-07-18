import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    console.log('=== API Test Start ===');
    
    // 環境変数の詳細確認
    const envCheck = {
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      supabase_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      youtube_key: process.env.YOUTUBE_API_KEY ? 'Set' : 'Missing',
      claude_key: process.env.ANTHROPIC_API_KEY ? 'Set' : 'Missing'
    };
    
    console.log('Environment Variables:', envCheck);

    // Supabase接続テスト
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error(`Missing Supabase credentials: URL=${envCheck.supabase_url}, KEY=${envCheck.supabase_key}`);
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    console.log('Supabase client created');

    // データベース接続テスト
    const { data: games, error } = await supabase.from('games').select('*');
    
    console.log('Database query result:', { games, error });
    
    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return NextResponse.json({
      message: "Game Study Academy API Test Success! 🎮",
      timestamp: new Date().toISOString(),
      environment: envCheck,
      database: {
        status: "Connected",
        games_count: games?.length || 0,
        tables_tested: "games",
        sample_data: games?.slice(0, 2) // 最初の2件を表示
      }
    });
  } catch (error) {
    console.error('API Test Error Details:', error);
    return NextResponse.json(
      { 
        error: "API Test Failed",
        message: error instanceof Error ? error.message : "Unknown error",
        error_details: error instanceof Error ? error.stack : String(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}