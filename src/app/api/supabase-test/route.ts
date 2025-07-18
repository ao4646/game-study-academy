// src/app/api/supabase-test/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    console.log('=== Supabase Simple Test ===');
    
    // 環境変数確認
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key exists:', !!supabaseKey);
    console.log('Key prefix:', supabaseKey?.substring(0, 20) + '...');
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing Supabase credentials',
        supabase_url: !!supabaseUrl,
        supabase_key: !!supabaseKey
      }, { status: 400 });
    }

    // Supabase クライアント作成
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client created');

    // 最もシンプルなテストクエリ
    const { data, error, status, statusText } = await supabase
      .from('games')
      .select('count', { count: 'exact', head: true });

    console.log('Query result:', { data, error, status, statusText });

    if (error) {
      return NextResponse.json({
        error: 'Supabase query failed',
        details: error,
        status,
        statusText
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      count: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Supabase test error:', error);
    return NextResponse.json({
      error: 'Supabase test failed',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}