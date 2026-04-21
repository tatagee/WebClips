---
title: "【2026年最新】100ページ超の要件定義書も楽勝！Antigravity × NotebookLMでドキュメント作成を爆速化"
source: "https://qiita.com/hitotch/items/411bfd2be559b82d156d"
category: "[AI_IDE_And_CLI]"
clipped_at: "2026-04-04"
tags: ["ai-ide-and-cli"]
status: "distilled"
compiled: true
---
[@hitotch(藤崎 仁美)](https://qiita.com/hitotch)

86

最終更新日 投稿日 2026年03月10日

数日でこの記事の手法を大幅改良し、NotebookLMでの手動処理が完全に不要になったので別記事にしました。  
新しく読む方は新しい記事をおすすめします。  
→ [【全自動に超進化】100ページ超のPDF要件定義書も余裕！Antigravityだけで一気に設計書に落とし込む！](https://qiita.com/hitotch/items/0e746edf66e123a7af81)

> 💡 **プレゼン資料を作りたい場合は以下の記事へ。**  
> [実務レベルのパワポを1分で！Googleスライド/パワーポイント両対応のプレゼン自動生成エンジン「AI to Slides」](https://qiita.com/hitotch/items/47874e522d7bac9c2a80)

## AntigravityとNotebookLMで大規模PDF仕様書から大規模Wordドキュメントを作成するワークフロー

大規模な要件定義書や仕様書（数百ページのPDFなど）をAIに読み込ませ、そこからシステム設計書や提案書などの新規ドキュメントを自動生成させたい。

通常、これほど巨大なドキュメントはAIに一括処理させることはできません。しかし、ドキュメント特化型AI「NotebookLM」とAIネイティブIDE「Antigravity」を組み合わせることで、 **巨大なPDFを効率よくMarkdownのプロジェクト群として再構築し、AIエージェントに仕様全体を把握させた上でドキュメントを作らせる** ことが可能です。

本記事では、「こんな大きなPDFドキュメントがあるんだけど、読み解いて、こんなドキュメントを作って」ができるようにします。おまけで、最終的な提出フォーマットであるWordファイル（.docx）を出力するまでの実践的なワークフローを解説します。

## ゴール

- 数百ページ規模のPDF仕様書を読み込み、Markdown形式でドキュメント化する。
- Antigravity内でプロジェクトとして統合管理し、AIエージェントにドキュメントの生成・修正を行わせる。
- 業務フローなどの図表をMermaid化する、または画像をシームレスに配置する。
- 作成したMarkdown（Mermaid図含む）を、Antigravity上からWord形式へ一発変換する。

## 前提

- Antigravityの基本的な操作ができる。
- NotebookLMの基本的な操作ができる。
- **Google AI Ultraの契約（推奨）**: 数十〜100ページ超のPDFを実務レベルで処理する場合、無料枠では出力トークンやコンテキストウィンドウの制限が厳しいため、有料枠の利用を推奨します。

今回のお題となるサンプルPDFとして、デジタル庁が公開している「 [調達仕様書等の概要（2026年3月6日版）](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/24d6cfea-9b50-4510-9365-64b29f9d5796/8edccaa3/20260306_procurement_public_notice_outline_02.pdf) 」を使用します。（出典：デジタル庁ウェブサイト）

## 用語集

本記事で出てくる、ドキュメント管理の核となる2つの技術について簡単に触れておきます。

- **Markdown（マークダウン）**
	- **特徴**: プレーンテキストで手軽に見出しや箇条書きなどの構造を持たせることができる記述言語。
		- **必要な理由**: AIエージェントにとって最も読み書きがしやすく、プロジェクト内の複数ドキュメントを横断して理解・修正させるのに最適なフォーマットだからです。
- **Mermaid（マーメイド）**
	- **特徴**: テキストでコードを書くように、フローチャートやシーケンス図などの図表を生成できる記法・ツール。
		- **必要な理由**: 図を「画像」ではなく「テキスト（コード）」として扱えるため、AIに「この処理フローを図に追加して」と自然言語で指示するだけで図面の修正が完了し、保守性が飛躍的に高まるためです。

## 0\. Antigravityと必須プラグインのインストール

まずはベースとなるIDE環境を整えます。

1. **Antigravityのインストール**  
	[Antigravityの公式サイト](https://antigravity.google/) から、お使いのOSに合ったインストーラーをダウンロードし、インストールを完了させてください。VS CodeベースのUIとなっているため、普段エディタを触っている方なら迷わず導入できます。
2. **必須プラグインの導入**  
	Antigravityを起動し、左側のメニューから「拡張機能（Extensions）」アイコンを開き、今回のワークフローで必要になる以下の2つのプラグインを検索してインストールします。
- **`Markdown Preview Mermaid Support` (作者: bierner)**  
	Antigravity標準のMarkdownプレビュー画面で、Mermaid形式のコードを美しい図表として直接レンダリングするために使用します。
- **`Markdown Preview Enhanced` (作者: shd101wyy)**  
	完成したMarkdownファイル（および生成されたMermaidの図表）を、一発でWordファイル（.docx）にエクスポートするために使用します。

## 1\. NotebookLMでPDFを分割・Markdown化する

大規模なPDFをNotebookLMに読み込ませて一括でMarkdown化しようとすると、出力トークン数の上限に達して途中で切れてしまいます。そのため、AIに分割指示のリストを作らせてから順次処理します。

まずはNotebookLMにPDFをアップロードし、以下のプロンプトを実行します。

```text
内容を読み解いて、君がトークン制限に引っかからずMarkdownを出力できるよう、問題がない分量ごとに分割した「Markdown化指示のリスト」を作って。
```

出力されたリスト（例：「第1章〜第2章をMarkdownにする」「第3章を…」）に従って、順番にプロンプトを投げてMarkdownを出力させます。出力されたテキストは、Antigravityのプロジェクトフォルダ内に `.md` ファイルとして保存していきます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/dd6a6701-e89e-464a-adc6-338c0bdadcc7.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2Fdd6a6701-e89e-464a-adc6-338c0bdadcc7.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d032fd7a77e70e8952d9af092d720119)

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/e51e3cba-c910-4b23-939f-00ec4eb1b7b4.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2Fe51e3cba-c910-4b23-939f-00ec4eb1b7b4.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=95191f8833cdde56749d12a34000e378)

中略

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/c78fb325-64d3-48e8-92a3-5c0ae154944e.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2Fc78fb325-64d3-48e8-92a3-5c0ae154944e.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b7f8860a4fd4fe4135f92886bcd56e1a)

それぞれ出力の最後にあるコピーボタンを押して、Antigravityに作ったマークダウンファイルに貼り付けていく。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/484d06d7-cbbd-442d-8d04-a1377beb55c7.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2F484d06d7-cbbd-442d-8d04-a1377beb55c7.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=4ef3f4b3d6d0b3b6f8650e9053599b7e)

## 2\. Antigravityでドキュメントを統合・編集する

Markdownファイル群をAntigravityのプロジェクトに配置したら、AntigravityのAgent機能を使ってドキュメントを構築していきます。

チャット欄から以下のように自然言語で指示を出します。

```text
この調達仕様書のディレクトリをベースに、ガバメントクラウド連携部分のAPI設計書を新規作成して。
```

Agentがプロジェクト全体を俯瞰し、矛盾のないドキュメントを自動生成・修正してくれます。人間は内容の精査とAgentへの指示出しに専念します。

ドキュメントは右クリックメニューからプレビューできます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/dee3c29c-4ff2-44a0-b5a9-2228fb3005f3.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2Fdee3c29c-4ff2-44a0-b5a9-2228fb3005f3.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=ae018a47c743c63ac747c1e16ba279c2)

## 3\. 図表の扱い（画像コピペとMermaid化）

PDF内の図表は、用途に合わせて2つの方法でAntigravityに取り込みます。

### 既存の図をそのまま使う場合

NotebookLMのPDFプレビュー画面で対象の図を右クリックしてコピーし、Antigravityのエディタ上に直接ペーストします。画像ファイルとして自動保存され、Markdown内にリンクが生成されます。

### 構造的な図をMermaid化する場合

業務フローやシーケンス図などは、保守性を高めるためにMermaid形式のコードに変換します。

1. NotebookLMで対象の図やテキストを指定し、「この業務フローをMermaid形式で書いて」と指示します。
2. 出力されたコードをAntigravity上のMarkdownに貼り付けます。
3. Antigravityの拡張機能から `Markdown Preview Mermaid Support` (作者: bierner) をインストールします。

これで、Antigravityのプレビュー画面にMermaid図がレンダリングされます。  
図の修正が必要な場合は、Agentに「このMermaid図の認証シーケンスに、マイナンバーカードを用いたプロセスを追加して」と指示するだけで、コードを正確に書き換えてくれます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/cd0f9e14-c9c9-4a42-9133-28117b1ec982.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2Fcd0f9e14-c9c9-4a42-9133-28117b1ec982.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d365c619f228cb427b7ddaa60f7f8bb6)

ここまでくれば、図からしか得られない情報も含めてAIに質問したり指示を出したりできるようになります。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/0f45aafd-1da3-4c4b-8b90-a9e6cbb5da26.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2F0f45aafd-1da3-4c4b-8b90-a9e6cbb5da26.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=2c480dd9107c6b607d0eccd04e8292a6)

## 4\. Wordファイル（.docx）へのエクスポート環境を作る

最終的な提出物がWord形式で求められるケースに対応するため、Antigravity内でMarkdownからWordへ一発変換する環境を構築します。

### 必要なツールのインストール

図の生成に必要な `Node.js (npx)` と、Word変換に必要な `Pandoc` をOSにインストールします。

- **Windowsの場合**:  
	現在のWindowsでは、PowerShellから標準パッケージマネージャーの `winget` を使用するのが最も簡単です。

```powershell
# Node.jsのインストール
winget install OpenJS.NodeJS

# Pandocのインストール
winget install JohnMacFarlane.Pandoc
```

※ `winget` が使えない場合や、インストーラー（.msi）をダウンロードしてGUIでインストールする従来の手順を知りたい場合は、以下のQiita記事が非常に丁寧にまとまっています。Windows特有の事情もカバーされているため、迷った際はこちらをご参照ください。  
👉 [Pandocの比較的簡単なインストール方法（@sky\_y様）](https://qiita.com/sky_y/items/3c5c46ebd319490907e8)

- **Macの場合**:  
	Homebrewを使ってインストールするのが標準的です。

```bash
brew install node
brew install pandoc
```

- **Ubuntu / WSLの場合**:  
	`apt` などのパッケージマネージャーを使用してインストールします。

```bash
sudo apt update
sudo apt install nodejs npm pandoc
```

### Antigravityのセットアップ

1. Antigravityの拡張機能アイコンから `Markdown Preview Enhanced` (作者: shd101wyy) をインストールします。
2. **【重要】** 新しくインストールした `npx` や `pandoc` のコマンドパスをIDEに認識させるため、 **Antigravityのウィンドウを一度完全に閉じて、再起動** してください。

### Markdownファイルの準備

出力フォーマットエラーを防ぐため、対象のMarkdownファイルの\*\*先頭（1行目）\*\*に以下のフロントマターを追記します。

```markdown
---
output: word_document
---
```

### エクスポートの実行

1. 対象のファイルを開き、 `Markdown Preview Enhanced` のプレビュー画面を表示します。
2. プレビュー画面上で **右クリック** > **「Pandoc」** > **「docx」** を選択します。

バックグラウンドで `npx` がMermaidを画像に変換し、同ディレクトリにWordファイル（.docx）が出力されます。

以上で、巨大な要件定義書からWordドキュメントを生成する一連のワークフローは完了です。

[0](https://qiita.com/hitotch/items/411bfd2be559b82d156d#comments)

コメント一覧へ移動

X（Twitter）でシェアする

Facebookでシェアする

はてなブックマークに追加する

この記事は以下の公開ストックリストからストックされています

- [尊敬](https://qiita.com/yukikoblog8376/stocks/14ed196abb28e17aaad5) 34記事

[

## @hitotch(藤崎 仁美)

](https://qiita.com/hitotch)

お仕事や協力開発、越境相談など大歓迎。 松下電器産業株式会社（現パナソニック）でレッツノートを設計、ホイールパッドなどを発明。2007年ニューヨークにて独立し、主に在米日系企業のシステム開発を請け負うかたわら、暇を見つけては新技術に触れてニタニタしています。

## 今日のトレンド記事

## ChatGPTが長いチャットで重くなったときに使っている「引き継ぎプロンプト」

## AIにロックマンエグゼになり切ってもらい一緒に開発してる話

## DDoS攻撃でAWS請求が200万円に！S3・CloudFrontで絶対やるべきコスト爆発防止策 6選

## 研究効率を爆上げするAIツールまとめ（論文調査〜執筆まで）

## AIに「いい感じに作って」と言うのをやめたら、開発が回り出した — Spec-Driven Development 実践ガイド

[トレンド一覧を見る](https://qiita.com/trend)

この記事は以下の記事からリンクされています

- [GithubActionでQiita記事のいいね数とストック数ランキング更新](https://qiita.com/Seiri/items/b22a79d04eae4a401067) 2026年03月15日
- [2026/03/13 今日のQiitaトレンド記事をポッドキャストで聴こう！](https://qiita.com/ennagara128/items/ce0e0eaed8bce00bccf6)
- [【全自動に超進化】100ページ超のPDF要件定義書も余裕！Antigravityだけで一気に設計書に落とし込む！](https://qiita.com/hitotch/items/0e746edf66e123a7af81)
- [2026/03/12 今日のQiitaトレンド記事をポッドキャストで聴こう！](https://qiita.com/ennagara128/items/d84d0811bbc2f3900074)

## 記事投稿キャンペーン開催中

[![](https://qiita-official-contents.imgix.net/https%3A%2F%2Fs3-ap-northeast-1.amazonaws.com%2Fqiita-official-event-image%2F8725665fb6c4c3e340fa645161d8e1a758b07226%2Foriginal.jpg%3F1774247209?ixlib=rb-4.0.0&auto=compress%2Cformat&s=37bf5ce136006f084f3e0fb7ff5fdb0f)](https://qiita.com/official-events/fedb44eff4b119730a79)

[

### 新人プログラマ応援 - みんなで新人を育てよう！

](https://qiita.com/official-events/fedb44eff4b119730a79)

2026年03月26日から2026年05月10日

[詳細を見る](https://qiita.com/official-events/fedb44eff4b119730a79)

[すべて見る](https://qiita.com/official-events)