// src/app/api/update-article/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json();
    
    if (articleId !== 7) {
      return NextResponse.json({
        error: 'この更新は記事ID=7のみ対応しています'
      }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Supabase configuration not available',
        message: 'Environment variables not configured'
      }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const newContent = `# エルデンリング「強化エデレ」攻略が劇的に変わる！守護者戦術の新発見とは【動画解説】

## この動画をおすすめする理由
トマトちゃん氏による丁寧な解説と、実践的な検証プロセスの公開により、誰でも再現可能な攻略方法を学ぶことができます。

単なる攻略動画を超えて、ゲームメカニクスの深い理解や、プレイスキル向上にもつながる価値ある内容となっています。

特に、守護者を活用した新戦術は、エルデンリングの攻略シーンに新たな可能性を示唆する画期的な発見といえるでしょう。

この動画を通じて、あなたも強化エデレ攻略の新たな扉を開いてみませんか？

## この動画で学べる攻略のポイント
・守護者を活用した強化エデレ戦の新たな攻略戦術
・従来の定説を覆す画期的な立ち回り方
・誰でも実践できる安定した戦闘手法の詳細解説

## なぜ動画で学ぶべきか
テキストだけでは伝わりにくい「強化エデレ」との戦いにおける守護者活用の妙を、実際の映像で確認できることが最大の利点です。特にタイミングや距離感、敵の動きに対する対応など、文字では表現しきれない実戦的な要素を視覚的に学べます。

動画では失敗例も含めた検証過程が丁寧に解説されており、なぜその戦術が効果的なのか、理論的な理解も深められます。

## 守護者戦術がもたらす新発見
従来の強化エデレ攻略では見られなかった、守護者を活用した画期的な戦術が明らかになっています。特に注目すべきは、守護者のスキルが想定以上の効果を発揮する場面が複数確認されたことです。

この発見により、これまで難しいとされてきた強化エデレ戦が、より安定した攻略が可能になりました。動画では実際の戦闘シーンを通じて、その有効性が説得力を持って示されています。

## 実践で身につく5つのスキル
### 1. 状況判断力
守護者の特性を活かしたタイミングの見極めが養われます。敵の動きを読み、最適なタイミングでスキルを使用する判断力が向上します。

### 2. リソース管理
FPやHPの効率的な管理方法を学べます。守護者のスキル使用タイミングと消費リソースの関係性を理解することで、より長期戦にも対応できるようになります。

### 3. 位置取りの感覚
強化エデレの攻撃パターンに対する理想的な位置取りを、実践的な映像で学べます。

### 4. コンボ構築力
守護者のスキルを軸としたダメージの最大化方法を習得できます。

### 5. リカバリー技術
ピンチ時の対処法や、失敗からの立て直し方を具体的に学べます。

## 視聴者の成功事例と反響
「何度も苦戦していた強化エデレを初見撃破できた」「守護者の新たな使い方を知れて驚いた」など、多くの視聴者が実践での成功を報告しています。

特に、これまでソロ攻略を諦めていたプレイヤーからも、「思っていたより簡単にできた」という声が多く寄せられています。`;

    const { data, error } = await supabase
      .from('articles')
      .update({ 
        content: newContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', articleId)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: '記事が更新されました',
      updatedArticle: data[0],
      changes: '「この動画をおすすめする理由」を一番上に移動しました'
    });

  } catch (error) {
    console.error('記事更新エラー:', error);
    return NextResponse.json({
      error: '記事更新に失敗しました',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}