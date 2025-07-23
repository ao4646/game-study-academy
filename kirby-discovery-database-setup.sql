-- 星のカービィ ディスカバリーのデータベースセットアップ

-- 1. ゲーム情報の追加
INSERT INTO games (id, name, slug, description, created_at, updated_at) VALUES 
(3, '星のカービィ ディスカバリー', 'kirby-discovery', '任天堂とHAL研究所による3Dアクションゲーム。カービィが「新世界」を冒険し、ほおばりヘンケイなどの新要素を駆使して謎を解いていく。', NOW(), NOW());

-- 2. カテゴリの追加
INSERT INTO categories (id, name, slug, description, game_id, created_at, updated_at) VALUES 
(22, '基本操作・システム', 'basics', 'ゲーム基本操作とシステム解説', 3, NOW(), NOW()),
(23, 'エリア攻略', 'areas', '各エリアの攻略法とルート', 3, NOW(), NOW()),
(24, 'ボス攻略', 'bosses', 'ボス戦の攻略テクニック', 3, NOW(), NOW()),
(25, 'ほおばりヘンケイ', 'copy-abilities', 'ほおばりヘンケイの使い方', 3, NOW(), NOW()),
(26, 'コピー能力', 'abilities', 'コピー能力の詳細解説', 3, NOW(), NOW()),
(27, '隠し要素・収集', 'secrets', '隠しアイテムと収集要素', 3, NOW(), NOW()),
(28, '完全攻略', 'completion', '100%クリアを目指す攻略', 3, NOW(), NOW()),
(29, '小ネタ・裏技', 'tips', '知って得する小技集', 3, NOW(), NOW());

-- 3. 確認用クエリ
-- ゲーム情報の確認
SELECT * FROM games WHERE name = '星のカービィ ディスカバリー';

-- カテゴリ情報の確認
SELECT * FROM categories WHERE game_id = 3 ORDER BY id;

-- カテゴリ数の確認
SELECT COUNT(*) as category_count FROM categories WHERE game_id = 3;