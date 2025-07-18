import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    // 環境変数の確認
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log('Supabase URL:', supabaseUrl)
    console.log('Supabase Key exists:', !!supabaseKey)

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        success: false,
        error: 'Supabase configuration not available',
        message: 'Environment variables not configured' 
      }, { status: 503 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    // バケット一覧を取得
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      return NextResponse.json({ 
        success: false, 
        error: `バケット取得エラー: ${bucketsError.message}` 
      }, { status: 500 })
    }

    // 各バケットの情報を収集
    const bucketInfo = []
    for (const bucket of buckets) {
      const { data: files, error: filesError } = await supabase.storage
        .from(bucket.name)
        .list('', { limit: 5 })
      
      bucketInfo.push({
        name: bucket.name,
        id: bucket.id,
        created_at: bucket.created_at,
        updated_at: bucket.updated_at,
        public: bucket.public,
        file_count: files ? files.length : 0,
        has_error: !!filesError,
        error: filesError?.message
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase Storage接続成功',
      buckets: bucketInfo
    })
  } catch (error) {
    console.error('Storage test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '不明なエラー'
    }, { status: 500 })
  }
}