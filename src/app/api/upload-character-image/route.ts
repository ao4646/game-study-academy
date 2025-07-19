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
    const characterId = formData.get('characterId') as string

    if (!file || !characterId) {
      return NextResponse.json(
        { error: 'ファイルとキャラクターIDが必要です' },
        { status: 400 }
      )
    }

    // ファイル名を生成（キャラクターID_タイムスタンプ.拡張子）
    const fileExtension = file.name.split('.').pop()
    const fileName = `character_${characterId}_${Date.now()}.${fileExtension}`

    // Supabase Storageにアップロード
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('game-images')
      .upload(`characters/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('ファイルアップロードエラー:', uploadError)
      return NextResponse.json(
        { error: 'ファイルのアップロードに失敗しました' },
        { status: 500 }
      )
    }

    // 公開URLを取得
    const { data: urlData } = supabase.storage
      .from('game-images')
      .getPublicUrl(`characters/${fileName}`)

    // データベースを更新
    const { data, error } = await supabase
      .from('classes')
      .update({ 
        image_url: urlData.publicUrl,
        icon_url: urlData.publicUrl // アイコンも同じ画像を使用
      })
      .eq('id', parseInt(characterId))

    if (error) {
      console.error('データベース更新エラー:', error)
      return NextResponse.json(
        { error: 'データベースの更新に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'キャラクター画像のアップロードが完了しました',
      imageUrl: urlData.publicUrl
    })

  } catch (error) {
    console.error('エラー:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}