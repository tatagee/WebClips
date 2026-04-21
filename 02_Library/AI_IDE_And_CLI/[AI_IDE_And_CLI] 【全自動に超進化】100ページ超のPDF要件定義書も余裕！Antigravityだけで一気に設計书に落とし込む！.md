---
title: "【全自動に超進化】100ページ超のPDF要件定義書も余裕！Antigravityだけで一気に設計書に落とし込む！"
source: "https://qiita.com/hitotch/items/0e746edf66e123a7af81"
category: "[AI_IDE_And_CLI]"
clipped_at: "2026-04-04"
tags: ["ai-ide-and-cli"]
status: "distilled"
compiled: true
---
## Antigravity「だけ」で大規模PDF仕様書から大規模Wordドキュメントを作成する最新ワークフロー

大規模な要件定義書や仕様書（数百ページのPDFなど）をAIに読み込ませ、そこからシステム設計書や提案書などの新規ドキュメントを自動生成させたい。

[以前の記事](https://qiita.com/hitotch/items/411bfd2be559b82d156d) では「NotebookLM」などを使い、AIが処理できるサイズにPDFを分割して読み込ませる必要がありました。しかし、さらなる工夫により **その分割作業すら不要** になり、全自動化に成功しました！

本記事では、AIネイティブIDE「Antigravity」と最新LLMの広大なコンテキストウィンドウを活かし、 **巨大なPDFを一切分割せずに一気通貫でMarkdownとして再構築し、最終的にWordファイル（.docx）を出力する** までの実践的な爆速ワークフローを解説します。

> **💡 筆者の環境**  
> 本記事のワークフローは、超広大なコンテキストウィンドウと高度なマルチモーダル能力を持つ **Gemini 3.1 Pro** を使用して検証しています。

> 💡 **文書ではなくプレゼン資料を作りたい場合は以下の記事へ。**  
> [実務レベルのパワポを1分で！Googleスライド/パワーポイント両対応のプレゼン自動生成エンジン「AI to Slides」](https://qiita.com/hitotch/items/47874e522d7bac9c2a80)

## ゴール

- 数百ページ規模のPDF仕様書を **分割することなく** 、一気にMarkdown形式でドキュメント化する。
- Antigravity内でプロジェクトとして統合管理し、AIエージェントにドキュメントの生成・修正を行わせる。
- ドキュメント内の図表は「元の画像」として残しつつ、後からテキストベースで編集できるよう「Mermaid化」したコードも併記させる。
- 作成したMarkdown（Mermaid図含む）を、Antigravity上からWord形式へ一発変換する。

## 前提

- Antigravityの基本的な操作ができる。
- **Gemini 3.1 Pro等の高性能モデルの利用（推奨）**: 数十〜100ページ超のPDFを分割なしで実務レベルで処理する場合、広大なコンテキストウィンドウと強力なビジョン（視覚）能力を持つ最新モデルの利用を推奨します。

今回のお題となるサンプルPDFとして、デジタル庁が公開している「 [調達仕様書等の概要（2026年3月6日版）](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/24d6cfea-9b50-4510-9365-64b29f9d5796/8edccaa3/20260306_procurement_public_notice_outline_02.pdf) 」を使用します。（出典：デジタル庁ウェブサイト）

## 用語集

本記事で出てくる、ドキュメント管理の核となる2つの技術について簡単に触れておきます。

- **Markdown（マークダウン）**
	- **特徴**: プレーンテキストで手軽に見出しや箇条書きなどの構造を持たせることができる記述言語。
		- **必要な理由**: AIエージェントにとって最も読み書きがしやすく、プロジェクト内の複数ドキュメントを横断して理解・修正させるのに最適なフォーマットだからです。
- **Mermaid（マーメイド）**
	- **特徴**: テキストでコードを書くように、フローチャートやシーケンス図などの図表を生成できる記法・ツール。
		- **必要な理由**: 図を「画像」ではなく「テキスト（コード）」として扱えるため、AIに「この処理フローを図に追加して」と自然言語で指示するだけで図面の修正が完了し、保守性が飛躍的に高まるためです。

---

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

> **💡 WindowsではNVMとNodeを入れておこう**  
> WindowsではこのあとのPDF→画像変換で環境構築に躓くことが多いです。事前にNVM（Node Version Manager）を使ってNode.jsをインストールしておきましょう。  
> PowerShellを開き、以下のコマンドを順番に実行して環境を構築します。
>
> ```powershell
> # 1. NVM for Windowsをインストール (※パッケージ名に注意！)
> winget install CoreyButler.NVMforWindows
> 
> # --- ここで一度PowerShellを閉じて、再起動してください ---
> 
> # 2. Node.jsの安定版（LTS）をインストールして有効化
> nvm install lts
> nvm use lts
> 
> # 3. npm実行時のセキュリティエラー（スクリプト実行不可）を防ぐためポリシーを変更
> # （警告が出たら「Y」を入力してEnter）
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```
>
> 最後に `node -v` と `npm -v` を実行し、両方のバージョン番号が表示されれば準備完了です！

## 1\. プロジェクトフォルダの作成とPDFの配置

Antigravity上でプロジェクトを作成し、対象となるPDFを所定のフォルダに配置します。今回は例として `ElectricMedicalRecord` （電子カルテ）というプロジェクトを想定します。  
今回のお題となるサンプルPDFとして、デジタル庁が公開している [「調達仕様書等の概要（2026年3月6日版）」](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/24d6cfea-9b50-4510-9365-64b29f9d5796/8edccaa3/20260306_procurement_public_notice_outline_02.pdf) を使用します。（出典：デジタル庁ウェブサイト）

Antigravity上で、以下のようなディレクトリ構成を作成してください。

```text
ElectricMedicalRecord
├── Requirements
│   ├── OriginalDocuments  ← ここに原本のPDF（20260306_procurement_public_notice_outline_02.pdf）を入れる
│   └── ConvertedDocuments ← ここにMarkdownが出力される
└── Designs
```

[![2026-03-12_11-34.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/33f03bb3-7f77-4a69-9204-0fd9a32b1f84.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2F33f03bb3-7f77-4a69-9204-0fd9a32b1f84.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d2fd4bb4bcbf8237b218dbd2057f3370)

## 2\. AntigravityのAIに一括変換を指示する（プロンプトが鍵！）

対象のPDFを配置したら、Antigravityのチャットから **一発でプロンプトを投げるだけ** です。

ここで完成品の品質を最大化するために、非常に重要なプロンプトの工夫があります。  
それは\*\*「PDFを一度画像として読み込ませてからMarkdown化する」 **ことと、** 「図表の画像とMermaidを両立させる」\*\*ことです。

以下のプロンプトをコピーして、AntigravityのAI（Agent）に指示を出してください。

### 実行するプロンプト

```text
Requirements/OriginalDocuments/20260306_procurement_public_notice_outline_02.pdf 
このファイルを読み込んで、Requirements/ConvertedDocuments フォルダ内に同じ内容のマークダウンファイルを作ってください。

【完成品の品質を最大化するための重要手順】
1. テキストを単に抽出するのではなく、一度PDFの各ページを「画像」に落とし込み、視覚的なレイアウトや図解の文脈を深く理解してからマークダウンを作成してください。
2. 文中に図や複雑な表がある場合、そのまま画像としてマークダウン内に残してください。
3. さらに、可能であればその図を「mermaid」に変換した図も、画像の直後に付けてください。
```

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/747de27a-92e2-4b8d-8eac-7715a35a09d1.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2F747de27a-92e2-4b8d-8eac-7715a35a09d1.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=fdbffcadc5eca5fb75c8e3b992572e5c)

> **💡 Windowsでは画像変換にローカルのNodeを使うように指示しよう**  
> Windows環境では、AIがPythonなどの別のツールを使ってPDFを画像変換しようとすると、ライブラリの依存関係などでエラーになることがよくあります。  
> そのため、上記でせっかく構築したNode環境を確実に使わせるために、プロンプトの最後に以下の1文を付け足すと成功率がグッと上がります。
>
> `4. 画像変換処理を行う場合は、ローカル環境にインストール済みのNode.jsを使用してください。`

### なぜこの指示が必要なのか？

複雑な仕様書は、テキスト情報だけの抽出では段落の意図や図解との紐づきが破綻しがちです。最新モデルの強力なビジョン（視覚）能力を使って「人間が目で見るように」全体を把握させることで、文書構造を正確に捉えた美しいMarkdownが生成されます。  
さらに、元の図表を画像として残すことで「原本の正確なニュアンス」を担保しつつ、直後にMermaidコードを出力させることで「後からフローを修正・追加できる保守性」を同時に獲得できます。

## 3\. 出力結果の確認とドキュメントの編集

プロンプトを実行すると、Antigravityが自動的にPDFを解析し、文書全体の見出し構造を維持したまま整理されたマークダウンファイルが生成されます。

プレビューしたい場合は右クリックメニューからプレビューを開くことができます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/c2b7c38b-edff-4245-af2b-f017d3334a1d.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2Fc2b7c38b-edff-4245-af2b-f017d3334a1d.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1041dd891ab3cdb37c34e2f154fe95f7)

ここからがAntigravityの真骨頂です。生成されたディレクトリをベースに、チャット欄から以下のように自然言語で指示を出します。

```text
この調達仕様書のディレクトリをベースに、Designsフォルダ内にまずはシステム構成案のドキュメントを作って。
・AWSの場合とGCPの場合の2つを考えて。
・構成図はmermaidで作って。
```

[![2026-03-12_12-18.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/315589/6585de9f-3ff9-4b30-8155-c6c02abb48b8.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F315589%2F6585de9f-3ff9-4b30-8155-c6c02abb48b8.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=8a9a2dcf5045d16cc881562ed7186646)

※実践では構成図にはmermaidではなく見た目がきれいになるdraw.ioを指定してもよいでしょう。Antigravityでは拡張機能でdraw.ioも扱えます。

Agentがプロジェクト全体を俯瞰し、矛盾のないドキュメントを自動生成・修正してくれます。人間は内容の精査とAgentへの指示出しに専念します。  
図の修正が必要な場合も、Agentに「このMermaid図の認証シーケンスに、マイナンバーカードを用いたプロセスを追加して」と指示するだけで、コードを正確に書き換えてくれます。

## 4\. Wordファイル（.docx）へのエクスポート環境を作る

最終的な提出物がWord形式で求められるケースに対応するため、Antigravity内でMarkdownからWordへ一発変換する環境を構築します。

### 必要なツールのインストール

図の生成に必要な `Node.js (npx)` と、Word変換に必要な `Pandoc` をOSにインストールします。

- **Windowsの場合**:  
	現在のWindowsでは、PowerShellから標準パッケージマネージャーの winget を使用するのが最も簡単です。  
	※手順0でNVMを使ってすでにNode.jsはインストール済みのため、ここではPandocのみを追加します。

```powershell
# Pandocのインストール
winget install JohnMacFarlane.Pandoc
```

（※過去に winget install OpenJS.NodeJS などでNode.jsを直接入れてしまっている場合は、NVMと競合してエラーの原因になるため、アンインストールしてNVMでの管理に統一することをおすすめします。）

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

1. Antigravityの拡張機能アイコンから `Markdown Preview Enhanced` (作者: shd101wyy) をインストール済みであることを確認します。
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

以上で、巨大な要件定義書を一括処理し、設計を経てWordドキュメントを生成する一連のワークフローは完了です。ぜひ皆さんのプロジェクトでも試してみてください！

[0](https://qiita.com/hitotch/items/0e746edf66e123a7af81#comments)

コメント一覧へ移動

X（Twitter）でシェアする

Facebookでシェアする

はてなブックマークに追加する