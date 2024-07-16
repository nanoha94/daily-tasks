# アプリについて
ポートフォリオ用に、日々のタスクを共有できるSNSアプリを作成しました。  
【アプリURL】 https://daily-tasks-pearl.vercel.app/  
【ログイン情報】  
・メールアドレス：`abe@nanoha-code.com`  
・パスワード：`password`  

# 使用技術・機能
## バックエンド
Baas：supabase（Database / Auth / Storage）  
ORM：Prisma（Node.js）  

【REST API】
PrismaでREST APIを実装しました。実装内容は、以下のとおりです。  
|                |エンドポイント                   |機能
|----------------|-------------------------------|--------------------------------|
|GET             | /api/user/:userId             | [userId]を持つユーザ情報を取得する |
|PUT             | /api/user/:userId             | [userId]を持つユーザ情報を更新する |
|GET             | /api/post/                    | 投稿をすべて取得する　　　　　　    |
|GET             | /api/post/:postId             | [postId]を持つ投稿を取得する　　　 |
|POST            | /api/post/                    | 投稿を追加する　　　　　　　　　　　 |
|PUT             | /api/post/:postId             | [postId]を持つ投稿を更新する　　　 |
|DELETE          | /api/post/:postId             | [postId]を持つ投稿を削除する      |

## フロントエンド
言語：TypeScript  
フレームワーク：Next.js, Tailwind CSS  
フォーム管理：React Hook Form  
スタイリング：Tailwind CSS, styled-components  
アイコン：Heroicons  

【機能】  
・フィルター（ワード検索・カテゴリでの絞り込み）  
※クエリパラメータで実装  
![フィルター](https://github.com/user-attachments/assets/999071f0-449b-4cff-aed9-43503deb708e)

・並び替え  
![並び替え](https://github.com/user-attachments/assets/5bcc5536-2233-40e1-8a51-fbb42bbdd242)


・いいね  
![いいね](https://github.com/user-attachments/assets/2a940019-cbd2-4b49-b022-be984db69f4c)

・ハッシュタグ  
ハッシュタグ付きのテキストで投稿すると、対象テキストでの検索のリンクになる
![ハッシュタグ](https://github.com/user-attachments/assets/6aba77bc-1ad1-409c-9cbd-b6ecea61ed0a)


