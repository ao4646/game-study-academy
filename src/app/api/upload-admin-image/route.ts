import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'ファイルが見つかりません' }, { status: 400 })
    }

    // ファイル名を生成
    const timestamp = Date.now()
    const fileName = `admin_character_${timestamp}.png`
    
    // Supabase Storageにアップロード
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`admin/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('アップロードエラー:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // 公開URLを取得
    const { data: publicData } = supabase.storage
      .from('images')
      .getPublicUrl(`admin/${fileName}`)

    // データベースの管理人情報を更新
    const { error: updateError } = await supabase
      .from('admin_info')
      .update({ character_image_url: publicData.publicUrl })
      .eq('id', 1)

    if (updateError) {
      console.error('データベース更新エラー:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      url: publicData.publicUrl 
    })
  } catch (error) {
    console.error('API エラー:', error)
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 })
  }
}