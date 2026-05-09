---
title: "【入門記事】ClaudeCodeの中級者になりたい人は集合してください"
source: "https://qiita.com/K5K/items/72cc4282819ace823524"
clipped_at: 2026-04-05
category: AI_IDE_And_CLI
tags: ['claude-code', 'tutorial', 'mcp']
status: distilled
compiled: true
---

## はじめに

この記事はClaudeCodeと共同で執筆しました。  
ただ内容については100%投稿主の意図したものであり、隅々まで監修しております。

みなさん、ClaudeCodeを使っていますか？  
(「バチバチ使いこなしているぜ！」という方は読んでも意味ないので、この記事は閉じてください！)

私はClaudeCodeが好きで、業務はもちろん日常生活でもほぼ毎日使っています。なるべくClaudeCodeに仕事をさせるように、設定やSkillを日々いじくり回しています。

ただ、ClaudeCodeは便利な反面、難しいツールでもあります。難しい理由は「機能の豊富さ」と「爆発的なアップデート速度および頻度」から来ていると思っています。気を抜くとすぐに自分の知らない機能が増えています。私もなんとかしがみつくため、毎朝 [Changelog](https://code.claude.com/docs/en/changelog) を見ています。その情報量たるや、無量空処を食らい続けていると言っても過言ではありません。

あとはCLIというインターフェースも慣れてない人にとってはとっつきにくいと思います。CursorなどのIDE内蔵ツールと比べると、直感的にわかりにくいところもあり、他のツールから乗り換える際につまずきやすいのではないでしょうか？

私自身、使い始めてから慣れるまでは苦労した記憶があります。周りを見ても「ClaudeCodeをインストールしたんだけど、次はどうすればいいの？」、「ClaudeCodeわからんwwwただいまCursor」というような声も聞こえてきます。

ClaudeCodeの入門ブログなんて巷に溢れていますが、入門者向けの使い方や機能説明に留まっている内容ばかりな気がします。もちろん使い方や機能も大切ですが、私はClaudeCodeを使う上での **マインド** が大切だと思っています。そのマインドがある/なしで全く見える景色が違います。また最低限の機能や使い方を身に着けた後になにをしていけばよいかの **ロードマップ** も大切だと思っています。

そのため、本記事では以下の3点を伝えたいと思っています。

- ClaudeCodeを使う上で持っておきたいマインド
- 最初に覚えるべき使い方/機能（最低限に絞ります）
- スキルを高めていくためのロードマップ的なガイド

最低限に留めたつもりですが、かなり網羅的な記載になっているのでボリューミーです。しかし、この記事を読了した方は「ClaudeCodeの初心者」になれているはずです。そして「中級者になるにはどうすればよいか」の道筋も立っていることでしょう。

## 想定読者

以下のような方を想定しています。

- AIツール自体あまり触ったことがないけど、ClaudeCode使いたい方
- ClaudeCodeに興味はあるが、まだ使ったことがない方
- インストールはしたけれど、何から始めればよいかわからない方
- 使ってはいるが、使いこなせていないと感じている方
- なんとなくわかってきたけど、次に何をすればいいか迷っている方

AIツールに慣れていない方でも理解できるように、最初に前提知識を(わかりやすく)解説をします。AIツールに慣れている人は適宜読み飛ばしてください。

## マインド

最初に意識してほしいのはこの1つだけです。

`なるべくClaudeCodeにやらせる`

設定も、機能の調査も、Skillsの作成も、すべてClaudeCodeに頼んでしまいましょう。「自分でドキュメントを読んで理解してから使う」という進め方は、アップデートが速いClaudeCodeにおいては非効率です。

たとえば、Skillsという機能が気になったとしましょう。使い方がわからなくても大丈夫です。ClaudeCodeに「Skillsを使ってみたいんだけど、何もイメージがわかない。Skillsについてわかりやすく説明してから、実際にSkills作るのを手伝って」と伝えるだけでOKです。ClaudeCodeはclaude-code-guideという機能(サブエージェント)を通じて最新のドキュメントを参照しながら回答してくれます。

指示は抽象的でも構いません。「Skillsを使ってみたい」くらいのふわっとした状態で十分です。そこに「不明点があれば質問して」と一言添えておけば、ClaudeCodeが「どんな用途ですか？」「対象の言語は？」と掘り下げてくれます。質問に答えていくだけで、指示が自然と具体化されていきます。

ClaudeCodeには **AskUserQuestion** という機能があり、選択肢を番号付きで提示してくれます。キーボードで番号を選ぶだけで回答できるので、質問に答える負荷はかなり低いです。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/7bfc7c08-422f-489c-8522-a2573ca7b953.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F7bfc7c08-422f-489c-8522-a2573ca7b953.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=6f303b1994c8a54a3801efd36622d18e)

`「自分で調べてから使う」のではなく、「使いながら覚える」` 。このスタンスがClaudeCodeとうまく付き合っていくために必要なマインドです。

## 基本知識(前提知識)

この章で紹介する知識はClaudeCode固有のものではなく、AIツール全般に共通する概念です。すでに知っている方は読み飛ばしてください。

## LLM

LLM（Large Language Model / 大規模言語モデル）とは、大量のテキストデータを学習したAIモデルのことです。ChatGPTやClaude、Geminiなどはすべてこの仕組みをベースにしています。

LLMの本質は「入力された文章に対して、確率的に最も自然な続きの文字列を返す」ことです。画像や音声、動画も突き詰めれば0と1の文字列であり、LLMによるコンテンツ生成はすべて文字列の出力にすぎません。つまり、LLM単体では文章を生成することしかできません。ファイルを読んだり、コマンドを実行したり、外部サービスを操作したりする能力は持っていません。

この制約を突破したのがFunction Calling（Tool Use）という仕組みです。LLMに「使えるツールの一覧」を渡しておくと、LLMが状況に応じて適切なツールを選び、呼び出すことができるようになります。たとえば「このファイルを読んで」という指示に対して、LLMがファイル読み取りツールを呼び出し、その結果を受け取って回答する、という流れです。

ClaudeCodeをはじめとした現在のAIツールのほとんどはLLMベースです。LLM + Function Callingの組み合わせによって、文章生成だけでなく実際の「行動」が可能になっています。

## コンテキスト / コンテキストウィンドウ

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/6334cb58-b404-4a7d-a621-cddb1149c7a3.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F6334cb58-b404-4a7d-a621-cddb1149c7a3.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=5c0ad27e5b9bbc41bc243e97e9ac32a0)

コンテキストとは、AIに渡す情報・文脈のことです。これまでの会話の流れ、指定したファイルの中身、URLの内容、MCPやツールの実行結果など、AIが参照するあらゆる情報がコンテキストに含まれます。

コンテキストウィンドウとは、 **AIが一度に扱える情報量の上限** のことです。会話が長くなったり、大量のファイルを渡したりすると、この上限に近づいていきます。上限に達するとエラーが起きたり、AIが古い情報を参照できなくなったりします。(わかりやすく説明するために、かなりざっくりとした表現にしています)

※ちなみにClaudeCodeではコンテキストウィンドウの上限に近づくと `/compact` というコマンドによって自動的にコンテキストを圧縮してくれます。

参考：

- [Context windows - Anthropic Docs](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- [Glossary - Anthropic Docs](https://platform.claude.com/docs/en/about-claude/glossary)

## MCP

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/3f3a0ed8-cbb6-4237-95b4-73e48b4ccd57.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F3f3a0ed8-cbb6-4237-95b4-73e48b4ccd57.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=4d7d3a6a8d92d2eabb95347a8b8a7c24)

MCP（Model Context Protocol）とは、ClaudeCodeと外部ツール・サービスを連携させるための仕組みです。SlackやGitHub、データベースなどをMCPサーバーとして設定することで、ClaudeCodeからそれらを直接操作できるようになります。

Slackを例に、MCPの有無でできることがどう変わるか見てみましょう。

- MCPなしの場合: ClaudeCodeはSlackの存在を知りません。「今日のSlackのやりとりを要約して」と頼んでも、Slackにアクセスする手段がないため、何もできません。
- MCPありの場合: ClaudeCodeがSlack MCPを経由してSlackにアクセスできるようになります。「#generalチャンネルの今日の会話を要約して」「この内容をSlackに投稿しておいて」といった指示をそのまま実行してくれます。

MCPを設定すると、ツールの実行結果がコンテキストに追加されます。便利な反面、コンテキストを消費するため、使わないMCPは設定しないようにすることをおすすめします。

設定方法や具体的な使い方は「使い始めよう」の章で説明します。

参考：

- [What is the Model Context Protocol (MCP)?](https://docs.anthropic.com/en/docs/mcp)
- [Connect Claude Code to tools via MCP - Anthropic Docs](https://docs.anthropic.com/en/docs/claude-code/mcp)

## Skills

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/2f93d263-f30a-427f-a073-8fcf92f34ebe.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F2f93d263-f30a-427f-a073-8fcf92f34ebe.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d78634695ba4f43c5e1b442d670ca377)

Skillsとは、 **ClaudeCodeにタスクの手順やルールを教えるための仕組み** です。マークダウンファイルで「業務マニュアル」を作成し、`.claude/skills/` フォルダに置くことで利用できます。

Skillsの有無でできることがどう変わるか見てみましょう。

- Skillsなしの場合: 「日報を作成して」と伝えても、ClaudeCodeは書き方のルールや形式を知らないため、毎回ゼロから説明し直すか、意図しない曖昧な結果が返ってきます。
- Skillsありの場合: 日報作成のSkillを用意しておけば、「日報を作成して」と伝えるだけでClaudeCodeが自動的にSkillを呼び出し、定められた形式・ルールで日報を書いてくれます。

Skillsのもう一つの特徴が「必要なときに自動で呼び出される」点です。明示的に指示しなくてもClaudeCodeが会話の文脈を判断して適切なSkillを自動的に読み込んでくれます。

また、MCPが常時コンテキストを消費するのに対し、Skillsは呼び出されたときのみコンテキストを使います(Progressive Disclosure)。このコンテキスト効率の高さから、今のClaudeCodeではSkillsが中心的な役割を担っています。

Skillsの具体的な使い方や作り方は「使い始めよう」の章で説明します。

補足

SkillsはもともとAnthropicがClaudeCode向けに生み出した仕組みですが、2025年12月にオープン標準として公開され、現在はOpenAI Codex・GitHub Copilot・Cursor・Windsurfなど多数のAIツールが採用しています。MCPと同様に、業界標準へと広がっています。

- [Anthropic makes agent Skills an open standard - SiliconANGLE](https://siliconangle.com/2025/12/18/anthropic-makes-agent-skills-open-standard/)

参考：

- [Extend Claude with skills - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/slash-commands)
- [Agent Skills - Anthropic Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

## メモリ

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/50e1ff96-2502-46d2-95ce-eb086cb8c841.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F50e1ff96-2502-46d2-95ce-eb086cb8c841.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=67a6b13ff979b9ef856a68b4d2816184)

AIはデフォルトでは会話が終わると記憶がリセットされます。メモリとは、この制約を超えてAIに情報を記憶させる仕組み全般を指します。ファイルへの書き出し、外部データベースへの保存、Memory MCPの活用など、さまざまなアプローチがあります。

ClaudeCodeにはこの「メモリ」に相当する仕組みとして、CLAUDE.mdというファイルが用意されています。ここに「常に覚えておいてほしいこと」を書いておくことで、セッション（ClaudeCodeを起動してから終了するまでの1回の会話）をまたいでその内容が毎回読み込まれます。

たとえば「日本語で回答して」「コミットは明示的に依頼されない限り行わない」といったルールをCLAUDE.mdに書いておけば、毎回伝えなくても自動的に適用されます。

なお、ClaudeCodeにはAutoMemoryという仕組みもあります。会話の中で得た学びや情報をClaudeCodeが自動的にメモリファイルへ書き出してくれる機能で、CLAUDE.mdを手動で編集しなくてもメモリを育てていくことができます。

また、メモリ機能はSkillsを使って自分で作ることもできます。たとえば「これを記憶して」と会話の中でClaudeCodeに伝えたらCLAUDE.mdに反映するSkillを作れば、オリジナルのメモリ機能を実装できます。ClaudeCodeの拡張性の高さを活かした使い方の一例です。

CLAUDE.mdの詳細は「使い始めよう」の章で説明します(AutoMemoryについては本記事では触れません)。

参考：

- [Memory - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/memory)

## 使い始めよう

## インストール

インストール手順は公式ドキュメントに詳しく書かれているため、ここでは割愛します。  
インストール後に、 `/login` を実行して、ClaudeCodeと会話できる状態にしておきます。

- [Quickstart - Claude Code Docs](https://code.claude.com/docs/en/quickstart)
- [Install Claude Code - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/overview)
料金プランについて

料金プランはMAXプラン（月額100ドルor200ドルでの定額使い放題）を強くおすすめします。 `ClaudeCodeは「代替」として使ってこそ真価を発揮します` が、代替用途ではトークン消費量が非常に多くなります。従量課金だとコストが気になって気軽に試せなくなり、結果としてClaudeCodeのポテンシャルを引き出しにくくなります。定額であることが、躊躇なく丸投げできる前提条件です。

- [Plans & Pricing - Anthropic](https://www.anthropic.com/pricing)

## 開いてみる

インストールが完了したら、ターミナルで `claude` と入力して起動してみましょう。会話セッションが始まり、ClaudeCodeとやりとりできる状態になります。

ここで覚えておいてほしいのは、1つの会話セッションが1つのコンテキストウィンドウに対応しているということです。会話が長くなるとコンテキストが膨らみ、ClaudeCodeのパフォーマンスが落ちていきます。1つのタスクが終わったら `/clear` でセッションをリフレッシュする習慣をつけておくと、常にクリーンな状態で作業を始められます。

## オプトアウト

Free/Pro/MAXプランの場合、ClaudeCodeに入力したデータがモデルの改善（学習）に利用される可能性があります。このデータ利用を拒否することを「オプトアウト」と呼びます。

業務でClaudeCodeを使う場合、業務データが学習に使われるリスクがあるため、オプトアウトしておきましょう。 [claude.aiのプライバシー設定](https://claude.ai/settings/data-privacy-controls) から設定できます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/13f09abe-b7fe-4c69-920e-b9874bd58b6a.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F13f09abe-b7fe-4c69-920e-b9874bd58b6a.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d4da4708990f8f7bf681e95acedc2755)

「Claudeの改善にご協力ください」のチェックをオフにするとオプトアウトできます。  
※2026/03におけるオプトアウト手順なので、画面が異なる場合は最新のものをご確認ください

なお、Team/Enterpriseプランではデフォルトでモデル改善に利用されないため、この設定は不要です。

テレメトリーのオプトアウトについて

ClaudeCodeはテレメトリー（使用パターンの計測）やエラーログなどの運用データも収集しています。これらにはコードやファイル内容は含まれませんが、気になる場合は以下の環境変数で無効化できます。

```bash
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

気になる人はこちらもオプトアウトしておきましょう。

参考：

- [Data usage - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/data-usage)
- [Updates to Consumer Terms and Privacy Policy](https://www.anthropic.com/news/updates-to-our-consumer-terms)

## 設定ファイルとスコープ

ClaudeCodeの設定は`.claude/` フォルダにまとまっています。設定にはスコープ（適用範囲）があり、入門段階ではUserとProjectの2つを押さえておけば十分です。

- Userスコープ：すべてのプロジェクトに適用される個人設定
- Projectスコープ：そのプロジェクトのみに適用される設定

最初のうちは、以下のフォルダとファイルを理解しておけばOKです。

```text
~/
├── .claude/                     # Userスコープ（すべてのプロジェクトに適用）
│   ├── settings.json            #   権限や動作に関する設定
│   ├── CLAUDE.md                #   AIへの指示書（メモリ）
│   ├── skills/                  #   カスタムSkills
│   └── agents/                  #   カスタムサブエージェント
│
└── my-project/                  # Projectスコープ（このプロジェクトのみに適用）
    ├── .claude/
    │   ├── settings.json
    │   ├── CLAUDE.md
    │   ├── skills/
    │   └── agents/
    ├── CLAUDE.md                #   このCLAUDE.mdもプロジェクトのみに適用される
    └── .mcp.json                #   プロジェクト内で利用するMCP設定
```

たとえば「日本語で回答して」のようなルールはUserスコープのCLAUDE.mdに書いておけば、どのプロジェクトでも適用されます。一方、「このプロジェクトではTypeScriptを使う」のようなルールはProjectスコープのCLAUDE.mdに書きます。

MCP、Skills、サブエージェントなども同様にスコープを持ちます。どのプロジェクトでも使いたいものはUserスコープに、特定のプロジェクト専用のものはProjectスコープに配置します。

参考：

- [Settings - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/settings)

## 基本操作

### コンテキストの渡し方

ClaudeCodeの会話でよく使うコンテキストの渡し方を紹介します。

- ファイル/フォルダパス： `@src/index.ts` のように `@` をつけてファイルパスを入力すると、ファイルの内容がコンテキストに含まれます。フォルダを指定するとファイル一覧が渡されます。 `@` をつけなくてもパスとして認識してくれることが多いです。
- URL：URLを貼ると、ClaudeCodeがWebページの内容を取得してコンテキストに含めます。公式ドキュメントやエラーページのURLを貼って質問する、といった使い方ができます。
- 画像：画像ファイルのパスを渡すか、スクリーンショットをペーストすることで、画像をコンテキストに含められます。エラー画面のスクリーンショットを貼って「これを解決して」と伝える使い方が便利です。

上記以外にも色々なコンテキストの渡し方がありますが、ひとまず入門段階では上記3つを抑えておけば大丈夫です。すぐに試せると思うので、実際に試してみましょう。

なお、Cursorなどでは `@file:10-20` のようにファイルの特定行だけをコンテキストに渡せますが、ClaudeCodeでは現時点（2026/03）でファイルの一部分だけを指定する方法はありません。ファイル全体が読み込まれます。ただし、ClaudeCodeはファイルを読み込んだ上で必要な箇所を自ら判断してくれるため、実用上はあまり困りません。

### Permission（権限）

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/5be59e6b-94c9-4940-b27a-f10517a69ea1.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F5be59e6b-94c9-4940-b27a-f10517a69ea1.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=12fab367341a6acbb37ac298b73aeca7)

ClaudeCodeはファイルの編集やコマンドの実行を行う際、都度ユーザーに許可を求めます。たとえば「このファイルを編集していいですか？」「このコマンドを実行していいですか？」といった確認が表示されます。意図しない操作を防ぐための安全装置です。

Permissionは `settings.json` で細かく制御できます。たとえば以下のように、特定のコマンドを自動許可（ `allow` ）したり、危険な操作を禁止（ `deny` ）したりできます。

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run test *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Bash(rm -rf /*)",
      "Bash(curl *)"
    ]
  }
}
```

`allow` に追加したコマンドは確認なしで自動実行され、 `deny` に追加したコマンドは実行が拒否されます。どちらにも該当しない操作は、都度確認が表示されます。

参考：

- [Permissions - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/permissions)

#### モード

ClaudeCodeには、Permissionの動作を切り替える「モード」があります。入門段階では以下の3つを知っておけば十分です。

| モード | 動作 | 画面上の表示 |
| --- | --- | --- |
| Ask permissions（デフォルト） | ファイル編集やコマンド実行の前に毎回確認を求める | なし(デフォルトなので) |
| Auto accept edits | ファイル編集は確認なしで自動実行。コマンド実行のみ確認を求める | `⏵⏵ accept edits on` |
| Plan Mode | コードの分析と計画の作成のみを行い、ファイルの変更やコマンドの実行は一切行わない | `⏸ plan mode on` |

モードは `Shift+Tab` で切り替えられます。Ask permissions → Auto accept edits → Plan Mode の順で循環します。モードを切り替えると、会話セッション下部の表示が切り替わるため、今どのモードであるかはひと目でわかります。

Plan Modeは特におすすめです。複雑なタスクに取り掛かる前に、まずPlan Modeで「どのファイルをどう変更するか」の計画を立ててもらい、内容を確認してからモードを切り替えて実装に移る、という使い方ができます。いきなり実装させるより安全で、結果的に手戻りも減ります。Claude Codeの生みの親であるBoris Cherny氏も [Xにて「ほとんどのセッションはまず「Planモード」（shift+tabを2回）からスタートする」](https://x.com/bcherny/status/2007179845336527000?s=20) と言っており、Planモードの利用を強く推奨しています。すぐ使えるTipsでも触れていますが、最初のうちは常にPlan Modeで始めることをおすすめします。

なお、bypassPermissionsモード（後述）は `Shift+Tab` では切り替えられません。起動時のオプションでのみ有効化できます。

参考：

- [Permissions - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/permissions)

#### bypassPermissionsモード

Permissionによる確認は安全ではありますが、頻繁に発生すると煩わしく感じることもあります。ClaudeCodeにタスクを丸投げして代替させたい場合、確認なしで作業を進めてほしいものです。そんなときに利用するのがbypassPermissionsモードです。すべてのPermissionをスキップし、ファイル生成・コマンド実行・リファクタリングなど一連の操作をユーザー確認なしで進めます。俗に「YOLOモード」とも呼ばれています。

ClaudeCodeではclaudeコマンド実行時に `--dangerously-skip-permissions` オプションをつけることで、bypassPermissionsモードを有効化することができます。

```bash
claude --dangerously-skip-permissions
```

これでClaudeCodeを起動すると、会話セッションの下部に `⏵⏵ bypass permissions on` と表示されます。この状態になると、確認なしでファイルの変更やコマンドの実行が行われるため、作業のテンポが大幅に上がります。

ただし、意図しない変更が行われるリスクもあるため、最初のうちは使わないで置くほうが無難です。ClaudeCodeに慣れてきて「この確認、毎回面倒だな」と感じるようになったら導入を検討しましょう。そのタイミングはすぐに来ると思います。

※3/5にAutoModeというbypassPermissionsモードせず、ClaudeCodeが自動で承認を行う機能がリリースされました。私も今試していますが、安全性を考慮するとAutoModeを利用したほうが良いでしょう。ただし、結局「安全性と便利さはトレードオフ」なので、AutoModeでも煩わしさを感じるシーンはありそうだなと。

bypassPermissionsモードを安全に使うためのテクニックもさまざまあります。たとえば、DevContainerを使って隔離された環境内で実行する方法や、hooks（後述）を利用して事前に定義した禁止コマンドの実行をブロックする方法があります。ClaudeCodeに慣れてきたら、これらのテクニックを取り入れつつ、bypassPermissionsモードでClaudeCodeを動かすことも検討していきましょう(再三ですが、リスクはしっかりと理解しておきましょう)。

参考：

- [Permissions - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/permissions)
- [Use Dev Containers - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/devcontainer)
- [Claude Code の YOLO モードを安全に使う hooks 設定 - wasabeef blog](https://wasabeef.jp/blog/claude-code-secure-bash)

### コマンド

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/599f2d70-7c9e-4c92-978f-7fd84ece7de4.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F599f2d70-7c9e-4c92-978f-7fd84ece7de4.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=052aa8ab9de5e9fe69bb49d627bf1663)

ClaudeCodeの会話中に `/` から始まるテキストを入力すると、スラッシュコマンドとして認識されます。セッションの管理、モデルの切り替え、コンテキストの圧縮など、ClaudeCodeの操作に関わるさまざまな機能がスラッシュコマンドとして用意されています。 `/` を入力するとコマンドの一覧が表示されるので、どんなコマンドがあるか確認してみましょう。

ここでは入門段階でよく使うコマンドを紹介します。

参考：

- [Built-in commands - Claude Code Docs](https://code.claude.com/docs/en/interactive-mode#built-in-commands)

#### /exit

`/exit` はClaudeCodeを終了するコマンドです。セッションは自動的に保存されるため、後から `/resume` (後述)で再開できます。 `Ctrl+C` でも終了できます。

#### /clear

`/clear` は会話履歴をクリアして、新しいセッションを開始するコマンドです。ClaudeCodeを終了せずにまっさらな状態からやり直せます。クリア前のセッションは保存されるため、 `/resume` で再開することも可能です。

`/clear` はコンテキストをリフレッシュしたいときに便利です。たとえば、あるタスクが終わって別のタスクに取り掛かるとき、前のタスクのコンテキストが残っているとAIのパフォーマンスに悪影響を及ぼします。タスクの切れ目で `/clear` する習慣をつけておくと、常にクリーンな状態で作業を始められます。

#### /model

ClaudeCodeでは会話中に `/model` コマンドを実行することで、使用するAIモデルを切り替えられます。対話型のセレクターが表示され、上下キーでモデルを選択できます。

ClaudeCodeで利用可能なモデルは以下の3つです。

| モデル | 特徴 |
| --- | --- |
| Opus | 最も高性能。複雑な推論やアーキテクチャ設計に強い |
| Sonnet | 速度と性能のバランスが良い。日常的なタスク向き |
| Haiku | 最も高速で軽量。シンプルな質問や軽い作業向き |

MAXプランを利用している場合はOpusを使いましょう。迷ったらOpusで問題ありません。Boris氏も [Xで「モデルとしての料金は最も高いが、その分手戻りがないことを考えると、一番コストパフォーマンスが良いのはOpusだ」](https://x.com/bcherny/status/2007179838864666847?s=20) と言っています。(MAXプラン以外（Pro等）を利用している場合はSonnetがおすすめです。)

`/model` のセレクターでは、モデルの選択に加えてeffort（推論努力）も調整できます。左右キーでスライダーを操作し、low / medium / highの3段階から選べます。highにするとより深く考えてくれますが、その分時間がかかります。デフォルトはmediumです。基本的にはデフォルトのままで問題ありませんが、難しい問題を解かせたいときはhighに切り替えてみましょう。(と言いながら私はいつもhighを使っています。)

なお、CLIの起動時に `claude --model opus` のようにオプションを指定することもできます。

参考：

- [Model configuration - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/model-config)

#### /compact

基本知識の章で説明した通り、コンテキストウィンドウには上限があります。会話が長くなるとこの上限に近づき、AIが過去の情報を参照できなくなったり、エラーが発生したりします。

`/compact` コマンドを実行すると、これまでの会話履歴を要約して圧縮し、コンテキストの使用量を大幅に削減してくれます。圧縮後もCLAUDE.mdの内容はディスクから再読み込みされるため、永続的なルールは失われません。

コンテキストの使用量が80-90%程度に達すると、ClaudeCodeが自動的にcompactを実行してくれます。そのため、手動で実行しなくても会話が途切れる心配は基本的にありません。ただしコンテキストの使用量が大きくなればなるほど、パフォーマンスの悪化が顕著になります(ClaudeCodeがやたら忘れっぽくなったり)。そのため、早めに手動で `/compact` を実行するのも大切です。

私の体感ですが、50-60%あたりからパフォーマンスが悪くなるような気がします。なので50%くらいに到達したら、なるべく手動で  
`/compact` を実行するようにしています。

#### /resume

ClaudeCodeを終了しても、セッション（会話の履歴）は自動的に保存されています。 `/resume` コマンドを実行するとセッションの一覧が表示され、過去のセッションを選択して再開できます。「昨日の続きをやりたい」「あの会話の続きから再開したい」といった場面で使います。

セッションが増えてくると、一覧から目的のセッションを見つけるのが大変になります。 `/rename` をしていないセッションはセッションIDが表示されるだけなので、どのセッションがどの作業だったか判別がつきません。 `/rename 認証機能リファクタ` のようにセッションに名前をつけておくと、 `/resume` の一覧で一目で識別でき、すぐに再開できます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/ad92b837-70c1-484a-8cd6-8fa2bab3c506.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Fad92b837-70c1-484a-8cd6-8fa2bab3c506.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=db8698e6a01940ec2244700212c17f9d)

`/rename tokyo-weather` でセッションに「tokyo-weather」という名前をつけています。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/ab79e35f-863b-4699-ae99-348a1a05f0c3.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Fab79e35f-863b-4699-ae99-348a1a05f0c3.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=06c5adf57c148374a8313f254a6d0764)

`/resume` でセッション一覧を表示した画面です。 `/rename` で名前をつけた「tokyo-weather」はすぐに見つけられますが、名前をつけていないセッションは最後のユーザー入力（「人生相談したいです。」など）が表示されるだけなので、何の作業だったか判別しづらくなります。

後で再開する可能性があるセッションには、早めに名前をつけておくのがおすすめです。

セッションの実態

セッションの実態はJSONLファイル（1行1レコードのJSON形式）です。 `~/.claude/projects/<プロジェクトパス>/` 配下にUUID形式のファイル名で保存されています。

```text
~/.claude/projects/-Users-username-my-project/
├── 02034434-33e0-486e-ae63-4a7525baf7a7.jsonl
├── 04553fb0-ff44-4b34-810f-e9e1c6031e91.jsonl
└── ...
```

会話のやりとり、ツールの実行結果などがすべて記録されており、このファイルがあるからこそ `/resume` での再開や `/rewind` (後述)でのやり直しが可能になっています。

参考：

- [Common workflows - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/common-workflows)

#### /rewind

ClaudeCodeはユーザーがメッセージを送信するたびに、自動的にチェックポイントを記録しています。 `/rewind` コマンドを実行すると、セッション内のチェックポイント一覧が表示され、任意のポイントまで巻き戻すことができます。 `Esc` キーを2回押すことでも同じ操作ができます。

巻き戻す際には、コードと会話の両方を戻す、会話だけ戻す、コードだけ戻すなど、復元対象を選べます。

たとえば「実装方針Aで進めたけれど、やっぱり方針Bを試したい」というときに、方針Aを始める前のチェックポイントまで巻き戻して、別のアプローチを試す、といった使い方ができます。ClaudeCodeに作業を任せていると「思っていたのと違う方向に進んでしまった」ということが起きがちなので、 `/rewind` は頻繁にお世話になるコマンドです。

/rewindの実例

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/5ed1f543-51f7-47df-8570-1f1183c784c2.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F5ed1f543-51f7-47df-8570-1f1183c784c2.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=a7793ed2800cab51f9bec3d3458b1c51)

まず、ClaudeCodeに「Hello Worldのシェルスクリプトを作成して」と頼み、次に「出力する内容をHello ClaudeCodeにして」と変更を依頼しました。ここで「やっぱりHello Worldに戻したい」と思い、 `/rewind` を実行します。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/bed1bd62-7bf0-40d8-b59a-a8167494ca1a.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Fbed1bd62-7bf0-40d8-b59a-a8167494ca1a.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=cd575a243c9a0a82be24973842918e26)

セッション内のチェックポイント一覧が表示されます。各チェックポイントにはユーザーの入力内容とファイル変更の有無が表示されるので、どの時点に戻りたいかを選択します。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/f64d046f-5021-4687-8ccb-ad37c4f62141.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Ff64d046f-5021-4687-8ccb-ad37c4f62141.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=d09587dfecd6e8dee9df0f6cfdfc992d)

チェックポイントを選択すると、復元対象を選ぶ画面が表示されます。「Restore code and conversation」を選べばコードと会話の両方が巻き戻り、「Restore code」ならコードだけが戻ります。

参考：

- [Checkpointing - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/checkpointing)

### カスタムコマンド (Skillsに統合済み)

`.claude/commands/` ディレクトリにMarkdownファイルを置くことで、自分で作ったコマンドを `/コマンド名` として呼び出せます。Markdownファイルの内容がClaudeへの指示になります。

現在はSkillsに統合されており、`.claude/commands/deploy.md` と `.claude/skills/deploy/SKILL.md` はどちらも `/deploy` として同じように機能します。既存の `.claude/commands/` ファイルはそのまま動作しますが、新しく作る場合はSkillsとして作成するのが推奨です。

Skillsには `disable-model-invocation: true` のようなフロントマター設定が使えるため、「AIに自動判断させず、人間が明示的に `/コマンド名` で呼び出す」といった制御が可能です。

参考：

- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)

## CLAUDE.md

基本知識の章で紹介した通り、 `CLAUDE.mdはClaudeCodeの「メモリ」にあたるファイル` です。セッション開始時に自動で読み込まれ、 `/compact` による圧縮後も再読み込みされるため、ここに書いた内容は常にClaudeCodeに伝わります。

- [CLAUDE.md files - Claude Code Docs](https://code.claude.com/docs/en/memory#claude-md-files)

設定ファイルとスコープの章で紹介した通り、CLAUDE.mdにはUserスコープ（ `~/.claude/CLAUDE.md` ）とProjectスコープ（プロジェクト直下の `CLAUDE.md` や`.claude/CLAUDE.md` ）があります。すべてのプロジェクトに適用したいルールはUserスコープに、プロジェクト固有のルールはProjectスコープに書きます。

### 何を書くべきか

CLAUDE.mdに書くべき内容は「ClaudeCodeが推測できないこと」です。逆に言えば、ClaudeCodeがコードを読めば判断できることは書く必要がありません。スコープによって書く内容が異なります。

#### Userスコープ（~/.claude/CLAUDE.md）に書く内容

すべてのプロジェクトに適用されるコンテキストになるため、特定のプロジェクトのみに当てはまる具体的な記述をせず、抽象度の高い記述にするのがポイントです。

- 応答の言語設定（例：日本語で回答して）
- 自分の好みのコードスタイルや作法
- コミットは明示的に依頼されない限り行わない、などの個人ルール

参考として、私のUserスコープのCLAUDE.mdを載せておきます。

```markdown
# 常に日本語で応答

- すべての説明と回答は日本語で提供する
- コードコメントも日本語で記述する
- エラーメッセージの説明も日本語で行う

# ユーザーの判断を求める場合はAskUserQuestionを利用

ユーザーに選択、判断を求める場合はAskUserQuestionツールを使うこと。

# 絵文字禁止

ファイル出力する場合絵文字は利用しない。
(会話セッションにおける絵文字の利用は問題ない)

# コミット

明示的に依頼されない限り git commit は行わない。
```

このように、どのプロジェクトでも共通で適用したい個人のルールを書いています。

#### Projectスコープに書く内容

そのプロジェクトで作業するために必要な情報を書いておくイメージです。

- プロダクトの概要
- プロジェクトのフォルダ構成
- プロジェクト固有のビルド・テストコマンド（例： `npm test` で単体テストを実行）
- ブランチ名やコミットメッセージの規約
- 開発環境の特殊な設定（必須の環境変数など）
- 非自明な仕様やハマりどころ

```markdown
# プロダクト概要

ユーザー向けのタスク管理Webアプリケーション。
フロントエンドはReact + TypeScript、バックエンドはExpress。

# フォルダ構成

- \`src/frontend/\` - Reactフロントエンド
- \`src/backend/\` - Express APIサーバー
- \`src/shared/\` - フロントエンド・バックエンド共通の型定義

# ビルド・テスト

- \`npm run build\` でビルド
- \`npm test\` で全テスト実行
- 単体テストは \`npm test -- --grep "テスト名"\` で個別実行

# コミット規約

- コミットメッセージは \`feat:\` \`fix:\` \`chore:\` のprefixをつける
- mainブランチへの直接コミット禁止。feature/xxx ブランチを切る

# 注意事項

- APIキーは \`.env\` に記載。\`.env\` をコミットしないこと
- Node.js v20 以上が必要

# 参考ドキュメント

- API仕様: https://example.com/api-docs
- デザインガイドライン: https://example.com/design-guide
```

このように、プロジェクトに参加するメンバー全員に共通で適用したいルールや、ClaudeCodeがコードを読むだけでは判断できない情報を書いておきます。

#### 書かなくてよい内容の例

- 標準的な言語の慣例（ClaudeCodeはすでに知っている）
- 「きれいなコードを書いて」のような曖昧な指示
- 頻繁に変わるAPI仕様（ドキュメントへのリンクで代替）

### 最低限でよい

**~CLAUDE.mdは短いほど効果的** です。内容が多すぎると重要な指示が埋もれてしまい、ClaudeCodeが指示に従わなくなる傾向があります。 **目安として200行以下** に収めることが推奨されています。

最初からCLAUDE.mdを書く必要はありません。ClaudeCodeを使っていく中で「毎回同じことを伝えているな」と感じたら、その内容をCLAUDE.mdに追記していく、という育て方がおすすめです。「日本語で回答して」のような簡単なルールから始めて、徐々に育てていきましょう。

### はじめの一歩

CLAUDE.mdを作成するのはClaudeCodeのはじめの一歩です。  
でもCLAUDE.mdに何を書けばよいかわからない？ならClaudeCodeに聞きながらやりましょう！

「User(Project)スコープのCLAUDE.mdを作りたいけど、何からやればよいかわからない。作成を手伝ってほしい。」とClaudeCodeにお願いすれば大丈夫です。さらに「公式仕様を意識して、最低限の記載に留めて、不明点は質問して」と添えると、より良い結果が得られます。

(`/init` コマンドを実行すると、ClaudeCodeがコードベースを分析してCLAUDE.mdの初期テンプレートを自動生成してくれます。ゼロから書くのが面倒な場合はここから始めるのも手ですが、割と無駄なことを記述する印象があるので、 `/init` ではなくClaudeCodeに頼むことをおすすめします)

### 慣れたら

入門段階ではここまで意識しなくて大丈夫ですが、慣れてきたら以下の点も押さえておくとよいでしょう。

CLAUDE.mdは一度書けば終わりではありません。プロジェクトの進行やチームの変化に合わせて、定期的に見返して更新していくことが大切です。古い情報や不要になったルールが残っていると、ClaudeCodeの判断に悪影響を及ぼします。

また、プロジェクト内の任意のサブフォルダにCLAUDE.mdを配置することもできます。たとえば `src/frontend/CLAUDE.md` を置けば、ClaudeCodeがそのフォルダ内のファイルを読む際にオンデマンドで読み込まれます。大規模なプロジェクトではフォルダごとにルールを分けることで、CLAUDE.mdの肥大化を防げます。

さらに、「サブフォルダにCLAUDE.mdを配置する」と似た仕組みとして「ルール」というものもあります。`.claude/rules/` ディレクトリにトピック別のマークダウンファイルを配置することで、CLAUDE.mdの内容を構造的に分割できます。

- [Set up rules - Claude Code Docs](https://code.claude.com/docs/en/memory#set-up-rules)

## MCP

基本知識の章で紹介した通り、MCPはClaudeCodeと外部ツール・サービスを連携させるための仕組みです。MCPを設定することでClaudeCodeのできることが大きく広がります。便利な反面、MCPはコンテキストの消費が顕著になる傾向があります。最初はMCPを使えばよいのですが、慣れてきたらSkillsなどに代えていくことも検討しましょう。

ここでは設定方法と使い方を説明します。

### 使いたいMCPを探す

まず使いたいMCPを探しましょう。  
MCPサーバーはAPIさえあれば実装できるため、大抵のサービスに対応するものが存在します。 [MCP Servers](https://github.com/modelcontextprotocol/servers) や [mcp.so](https://mcp.so/) などで探してみましょう。

ただし、公式が提供しているものとサードパーティが提供しているものは区別すべきです。特にサードパーティのMCPサーバーを利用する場合は、以下の点を確認しましょう。

- 開発元が信頼できるか（企業・著名な開発者など）
- 利用実績があるか（GitHubのスター数、ダウンロード数など）
- ソースコードが公開されており、不審な処理がないか

ソースコードの確認もClaudeCodeに任せられます。リポジトリをcloneして「このMCPサーバーのソースコードを確認して、セキュリティ上問題がないか教えて」と伝えるだけです。

### 設定方法

MCPサーバーの具体的な設定方法は、各MCPの提供元のREADMEやドキュメントに記載されています。ただし、APIキーなどの環境変数を自分の環境に合わせてカスタマイズする必要がある場合もあるため、記載内容をそのままコピーするだけでは動かないこともあります。

MCPサーバーの追加は `claude mcp add` コマンドで行います。たとえばSlack MCPサーバーを追加する場合は以下のようになります。

```bash
claude mcp add slack --transport http https://mcp.slack.com/mcp
```

MCPの設定にもスコープがあり、 `--scope` オプションで指定できます。設定はスコープに応じて以下のファイルに保存されます。

- Userスコープ： `~/.claude.json`
- Projectスコープ： `プロジェクトルート/.mcp.json`

```bash
# Userスコープ（すべてのプロジェクトで利用）
claude mcp add --scope user slack --transport http https://mcp.slack.com/mcp

# Projectスコープ（そのプロジェクトのみ、チームで共有可能）
claude mcp add --scope project slack --transport http https://mcp.slack.com/mcp
```

Projectスコープの設定はプロジェクトルートの`.mcp.json` に保存されるため、gitでチームと共有できます。なお、 `claude mcp add` を使わず、`.mcp.json` を直接編集して設定することも可能です。

### MCPが設定されているかの確認

設定済みのMCPサーバーは `claude mcp list` で一覧確認できます。  
また、 `/mcp` コマンドで現在接続されているMCPサーバーの一覧と状態を確認できます。

### MCPが会話にて呼び出されているかの確認

MCPサーバーが呼ばれたかどうかは、会話のログを見ればわかります。ClaudeCodeがMCPツールを使うと、ログにツール名が `mcp__サーバー名__ツール名` の形式で表示されます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/b4e478a7-1767-4b04-b444-c93e194726e7.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Fb4e478a7-1767-4b04-b444-c93e194726e7.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=a00dfd66fc85493ae8dee1614686ce17)

### ClaudeCodeにMCPの設定をやらせる

MCPのREADMEやドキュメントを見て、それにならってclaude mcpコマンドを実行してもよいのですが、ぶっちゃけ面倒です。MCPの設定もClaudeCodeにやらせてしまいましょう。

たとえば「Slack MCPを設定したい」とClaudeCodeに伝えれば、必要なパッケージのインストールから`.mcp.json` の作成まで一通りやってくれます。「Xでこういうの見かけたんだけど、同じように設定して」とスクリーンショットを貼るだけでもOKです。MCPの設定してもらったら「使い方教えて」と聞けば完璧です。

### 注意点

基本知識の章でも触れましたが、MCPサーバーはコンテキストを消費します。接続しているだけでツールの定義情報が読み込まれるため、使わないMCPサーバーは設定しないようにしましょう。

なお、Tool Searchという機能を有効にすると、すべてのツール定義を事前に読み込むのではなく、必要なツールだけを動的に読み込むようになります。MCPサーバーを多数設定している場合はコンテキスト消費を大幅に削減できます。デフォルトではツール定義がコンテキストの10%以上を占めると自動的に有効になります。

参考：

- [Connect Claude Code to tools via MCP - Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code/mcp)
- [Configure tool search - Claude Code Docs](https://code.claude.com/docs/en/mcp#configure-tool-search)

## Skills

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/f7431ea5-af89-4c73-a945-a0fb7bb4c419.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Ff7431ea5-af89-4c73-a945-a0fb7bb4c419.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=88fbf3aa7d7c65a311debcbc6d935a2f)

基本知識の章で紹介した通り、Skillsはマークダウンファイルで「業務マニュアル」を作成し、ClaudeCodeに手順やルールを教える仕組みです。ここでは具体的な使い方を説明した後、Skillsを育てていくための考え方を紹介します。

### Skillsの仕組み

Skillsは`.claude/skills/` フォルダにマークダウンファイルを配置して利用します。CLAUDE.mdと同様にUser/Projectスコープがあります。

```text
~/.claude/skills/                  # Userスコープ（すべてのプロジェクトで利用）
├── daily-report/
│   └── SKILL.md
└── code-review/
    └── SKILL.md

my-project/.claude/skills/         # Projectスコープ（このプロジェクトのみ）
├── deploy/
│   └── SKILL.md
└── api-conventions/
    └── SKILL.md
```

各Skillは `スキル名/SKILL.md` というフォルダ構成になります。SKILL.mdの基本構造は以下の通りです。

```markdown
---
name: daily-report
description: 日報を作成するスキル。「日報」「日報作成」などのキーワードで自動的に呼び出される。
---

# 日報作成ルール

以下のフォーマットで日報を作成してください。
...
```

frontmatter（ `---` で囲まれた部分）の `description` が特に重要です。ClaudeCodeはこの説明文を見て「今の会話でこのSkillを呼び出すべきか」を判断します。

応用：サポートファイルとスクリプトの活用

SKILL.mdは500行以下に収めることが推奨されています。内容が増えてきたら `reference.md` や `examples.md` などのサポートファイルに分割し、SKILL.mdからリンクで参照する構成にできます。また、 `scripts/` にシェルスクリプトやPythonスクリプトを配置しておくと、Skill実行時にClaudeCodeがそれらを呼び出して処理を行えます。

```text
my-skill/
├── SKILL.md           # メインの指示（500行以下）
├── reference.md       # 詳細なリファレンス（必要時に読み込まれる）
├── examples.md        # 使用例（必要時に読み込まれる）
└── scripts/
    └── helper.sh      # スクリプト（Skillから実行される）
```

SKILL.mdからはマークダウンリンクでサポートファイルやスクリプトを参照します。

```markdown
---
name: code-review
description: コードレビューを実施するスキル。
---

# コードレビュー手順

1. 変更差分を確認する
2. 以下の観点でレビューする
...

## 参考資料

- レビュー観点の詳細は [reference.md](reference.md) を参照
- レビューコメントの書き方は [examples.md](examples.md) を参照
- レビュー前に [scripts/lint-check.sh](scripts/lint-check.sh) を実行してLint結果を確認すること
```

ただし、最初からファイル分割を意識する必要はありません。まずはSKILL.md単体で作り始めて、内容が膨らんできたら分割を検討しましょう。「公式のSkillsベストプラクティスに従ってSkillsを作って」とClaudeCodeにお願いすれば、いい塩梅で分割してくれます。

Skillsの大きな特徴は、段階的開示（Progressive Disclosure）という仕組みでコンテキストを効率的に使う点です。セッション開始時にはすべてのSkillの `description` （説明文）だけがコンテキストに読み込まれます。SKILL.mdの中身が読み込まれるのは、実際にSkillが呼び出されたときだけです。使わないSkillはコンテキストを消費しません。

これはCLAUDE.mdとの大きな違いです。CLAUDE.mdはセッション開始時に全文が読み込まれ、毎回のリクエストでコンテキストを消費し続けます。一方Skillsは必要なときだけ読み込まれるため、多数のSkillを用意してもコンテキストへの影響は最小限です。

Skillsには2つの呼び出し方があります。

- スラッシュコマンド： `/daily-report` のように `/スキル名` で手動で呼び出します。会話中に `/` を入力すると、利用可能なSkillsの一覧が表示されます。
- 自動呼び出し：ClaudeCodeが会話の内容と `description` を照合し、関連するSkillを自動的に読み込みます。「日報を作成して」と伝えるだけで、日報作成のSkillが自動的に呼び出されます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/e5013b08-f4d4-46fb-8b43-1babca30ae82.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Fe5013b08-f4d4-46fb-8b43-1babca30ae82.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=ab0d48028df2f711dc5115d3f4bd218a)

「コミットして」と入力しただけで、ClaudeCodeがcommitスキルを自動的に呼び出していることがわかります（ `Skill(commit) Successfully loaded skill` ）。

参考：

- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)

### Skillsと向き合う

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/794e81a4-ed20-47fb-9324-19a42a19dca4.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F794e81a4-ed20-47fb-9324-19a42a19dca4.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b4b604f789b7bb8b6a9fd6d8ec5df01d)

まずはSkillsの作成をClaudeCodeに任せましょう。「Skillsを作りたいんだけど、手伝って」と伝えれば、ヒアリングしながら一緒に作ってくれます。

たとえば「コードレビューのSkillsを作りたい」と伝えると、ClaudeCodeが「どんな観点でレビューしますか？」「言語やフレームワークの指定はありますか？」と質問してくれます。それに答えていくだけで、SKILL.mdが出来上がります。

自分でゼロからSkillsを書くこともできますが、入門段階ではClaudeCodeに作ってもらうのがおすすめです。慣れてきたらSKILL.mdの中身を自分でチューニングしていきましょう。

なお、Anthropicが提供する [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) というSkillもあります。これはSkillsの作成をガイドしてくれるSkillで、構造化されたワークフローに沿ってSkillsを作成できます。ただし、私としてはまずClaudeCodeに「こういうSkillsがほしい」とラフにお願いするところから始めることをおすすめします。形式にこだわるより、まず動くものを作ってみるほうが学びが早いです。

`Skillsの本質は暗黙知を形式知に変える` ことだと私は考えています。

- 暗黙知: 経験や勘に基づく「頭の中にはあるけれど、言葉にしにくい知識」
- 形式知: 文章やマニュアルとして書き出された「誰でも読める知識」

たとえばコードレビューを考えてみましょう。「変数名がわかりにくい」「この処理は関数に切り出したほうがいい」「エラーハンドリングが足りない」。こうした判断基準は、経験を積んだエンジニアの頭の中にあります。しかし、それを言語化して他の人に伝えるのは容易ではありません。

Skillsはこの「頭の中にある判断基準」をマークダウンに書き出す行為です。自然言語で書けるので誰でも始められますが、「自分が普段無意識にやっていること」を言語化するのは想像以上に大変です。

そして、Skillsは作って終わりではありません。Skillに完璧はやってきません。すべての暗黙知を言語化するのは不可能ですし、業務のやり方も時間とともに変化していきます。使いながら「ここが足りない」「この指示だとうまくいかない」と気づいたら、その都度アップデートしていく。Skillsは常に育て続けるものです。

そして、この「育てる」作業もClaudeCodeに任せましょう。「Skillsの質をあげたいから、あいまいなところがクリアになるまで私に質問攻めして」とお願いすると、ClaudeCodeと一緒にブラッシュアップできます。「この会話でやりとりした内容をSkillsに落とし込んで」とお願いすれば、実際の作業から実践的な内容をSkillsに昇華できます。

#### Skillsが個人/組織の生産性を左右する

Skillsは個人で使うだけでなく、チームや組織で共有することもできます。Projectスコープの`.claude/skills/` に配置すれば、gitを通じてチーム全体で同じSkillsを利用できます。ある人のレビュー観点、デプロイ手順、障害対応のチェックリスト。こうした暗黙知がSkillsとして蓄積されると、チーム全体の知見がAIを通じて共有される状態になります。

私の所感ですが、Skillsは今後ますます重要になっていくと感じています。SkillsはAnthropicが生み出した仕組みですが、すでにOpenAI CodexやGitHub Copilot、Cursorなど多数のツールが採用しています。AIツールの利用が広がるにつれて、「どれだけ質の高いSkillsを持っているか」が生産性の差になっていくのではないでしょうか。

私は最近、「自分の身の回りの行動をすべてSkill化計画」というものに取り組んでいます。AIを「人間の補助」ではなく「人間の代替」として使いこなすには、AIに丸投げできる状態を作ることが重要です。Skillsはまさにその「丸投げ」を可能にする仕組みです。調査、文章作成、コード実装、デプロイ、ドキュメント整備。こうした作業をSkillsとして整備しておけば、「やっておいて」の一言で済むようになります。質の高いSkillsが揃うほど、自分がボトルネックでなくなる範囲が広がっていきます。

## CLAUDE.md vs MCP vs Skills

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/dcf6d770-e846-4def-98a2-df6a1727d90d.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Fdcf6d770-e846-4def-98a2-df6a1727d90d.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=be6b1ff9a6fd5198f1a72fb138e9a558)

一見それぞれ独立した機能に見えますが、 `CLAUDE.md・MCP・Skillsはすべて「ClaudeCodeへのコンテキストの渡し方」という点で共通` しています。会社員で例えると、それぞれの役割が分かりやすくなります。

- CLAUDE.md = 社訓・行動規範（「必ず敬語を使う」「期限を守る」 → 常に頭に入っている前提）
- MCP = 会社が契約している汎用SaaS（Slack・Backlog・Google Calendar → 設定するだけで使える）
- Skills = 部門が作った業務マニュアル（「障害報告の手順」「日報の書き方」 → 特定の作業専用）

コンテキスト消費のタイミングも三者で異なります。

| 機能 | コンテキスト消費 | イメージ |
| --- | --- | --- |
| CLAUDE.md | 常時 | 常に頭の中にある行動規範 |
| MCP | 呼ばれた時のみ | 必要な時に使う外部ツール |
| Skills | 実行時のみ | 作業時だけ開くマニュアル |

#### CLAUDE.md vs Skills

CLAUDE.mdもSkillsも、自然言語（マークダウン）でClaudeCodeへの指示を書くという点は同じです。そのため、慣れないうちは使い分けが難しく感じるかもしれません。  
社訓（CLAUDE.md）は常に頭に染み込んでいます。一方、インシデント対応手順や採用面接の進め方（Skills）は毎日意識するものではありませんが、必要な場面になれば必ず取り出します。

- 常に認識してほしいこと → CLAUDE.md（社訓）
- 必要になったら認識してほしいこと → Skills（業務マニュアル）

最初はCLAUDE.mdにすべて入れてしまっても問題ありません。使い続けるうちに「これは毎回読み込む必要がないな」と感じるものが出てきたら、Skillsに移していくとよいでしょう。「これってSkillsに移したほうがいいかな？」とClaudeCodeに相談してみるのもおすすめです。

#### MCP vs Skills

MCPとSkillsは一見かなり違う機能に見えます。しかし実際に使い始めると、どちらを使えばよいか悩む場面が出てきます。

|  | 準備コスト | 汎用性 | コンテキスト効率 |
| --- | --- | --- | --- |
| MCP | 低（設定するだけ） | 高（なんでもできる） | 低（余計な機能も全部ある） |
| Skills | 高（作成が必要） | 低（特定のユースケース専用） | 高（必要なものだけ） |

MCPは会社が契約した汎用SaaSのようなものです。Slackを設定すれば全チャンネル・全機能がすぐ使えます。ただし「日報を投稿するだけ」のために全機能を持ち込むのは少し重い。  
Skillsは「日報投稿」専用のマニュアルを作るイメージです。準備は手間ですが、そのユースケースに必要なことだけが入っているため、コンテキストの無駄がありません。

MCPは手軽に導入できるのが魅力ですが、よく使う作業についてはSkillsに移行することでコンテキスト効率が大きく改善します。また、最近はSkillsを公開しているケースも増えているので、自分の業務に合ったSkillsを探して取り入れるのもおすすめです（カスタマイズするのもよい手法です）。

「このやりとり、また使うな」と思う瞬間があったら、Skillsを作るサインです。逆に1回しか使わないものをわざわざSkillsにするのはコストが高いので、MCPにとどめておきましょう。

#### CLAUDE.md vs MCP

「MCP vs Skills」と趣旨が同じになるので割愛します。

## Hooks

ClaudeCodeの行動にトリガーを仕掛けられる機能です。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/6c2c9f94-6704-4311-ab4e-bd8ac9ef2aa3.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F6c2c9f94-6704-4311-ab4e-bd8ac9ef2aa3.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=365d2ac8c0e729ac42e31dedc5eaa13b)

### Hooksの仕組み

Hooksは、ClaudeCodeのライフサイクル上の特定イベントに合わせてシェルコマンドを自動実行する機能です。設定は `~/.claude/settings.json` （ユーザー全体）または `.claude/settings.json` （プロジェクト単位）に記述します。

主なユースケースはこのようなものです。

- ファイル編集後にPrettierなどで自動フォーマット（ `PostToolUse` ）
- 危険なコマンドの実行をブロック（ `PreToolUse` ）
- 作業完了時にデスクトップ通知（ `Notification` ）

設定はEvent（発火タイミング）とMatcher（フィルタ）の組み合わせで定義します。

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.command' | grep -qE '(rm -rf|DROP TABLE)' && exit 2 || exit 0"
          }
        ]
      }
    ]
  }
}
```

上の例では、EventとMatcherをそれぞれ以下のように指定しています。

- Event（ `PreToolUse` ）: ツールを実行する前に発火するタイミング
- Matcher（ `Bash` ）: そのなかでBashツール（ClaudeCodeがシェルコマンドを実行するために使う内部ツール）だけを対象にするフィルタ

つまり「Bashコマンドを実行しようとするたびに発火する」Hookです。コマンド内容に `rm -rf` や `DROP TABLE` が含まれていれば `exit 2` を返してブロックします。

代表的なEventとMatcherの組み合わせを抜粋します。

| Event | Matcherの対象 | 用途の例 |
| --- | --- | --- |
| `PreToolUse` | ツール名（ `Bash` 、 `Edit\|Write` など） | 危険なコマンドのブロック、書き込み制限 |
| `PostToolUse` | ツール名（ `Edit\|Write` など） | ファイル編集後の自動フォーマット |
| `Notification` | 通知タイプ（空文字で全通知） | 入力待ち・完了時のデスクトップ通知 |
| `SessionStart` | 開始方法（ `startup` 、 `compact` など） | セッション開始時のコンテキスト注入 |
| `Stop` | （なし） | 作業完了時の後処理 |

Matcherに指定できるパターンはEventによって異なります。 `PreToolUse` ならツール名、 `SessionStart` なら開始方法、といった具合です。EventとMatcherの種類は多岐にわたるため、詳細は公式ドキュメントを参照してください。

参考：

- [Hooks - Claude Code Docs](https://code.claude.com/docs/en/hooks)

### もちろんHooksもClaudeCodeに作らせる

さんざん言ってきたのでまたかと思われそうですが、「こういうことをやりたいんだけど、Hooksで実現できる？できるなら実装して」とお願いすればOKです。Hooksを作るSkillsも公開されていますが、まずは気軽に頼んでみましょう。

### 具体例

せっかくなのでHooksのユースケースの具体例をいくつか提示します。

#### 通知

ClaudeCodeが入力待ちになったとき・作業が完了したときにmacOS通知を飛ばすHooksです。別の作業をしながら待てるので、長い処理を走らせる場面で重宝します。

- [Claude Codeの手が止まったら通知する - Qiita](https://qiita.com/take8/items/28bae27208580f0a2e44)

#### YOLOモードで指定コマンドを実行させない

`PreToolUse` でBashコマンドの内容を検査し、 `rm -rf` や `git config` など危険なパターンをブロックするHooksです。yoloモード使用時のセキュリティ対策として参考になります。

- [ClaudeCodeをyoloモードで安全に使う - wasabeef.jp](https://wasabeef.jp/blog/claude-code-secure-bash)

#### ClaudeCodeの会話履歴をObsidianに連携する

セッション開始・終了のタイミングで会話履歴をObsidian形式のMarkdownに自動保存するHooksです。私も実際に使っており、本記事のClaudeCodeセッション管理にも活用しています。

- [ClaudeCodeの会話履歴をObsidianに取り込む (Hooksだけで実現) - Qiita](https://qiita.com/K5K/items/b1dd8b92df682a37c829)

## サブエージェント

サブエージェントは、いわば影分身の術です。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/a2c0592f-37c9-4a7a-b203-515ea875f041.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Fa2c0592f-37c9-4a7a-b203-515ea875f041.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=7df86850b0ccb594cf1239992bc649e1)

ClaudeCodeは、複雑な調査や独立したタスクを処理するとき、内部的に別のClaudeインスタンス（サブエージェント）を起動してタスクを委ねることがあります。分身それぞれが独立したコンテキストウィンドウを持って動き、本体（メインの会話）には結果だけが届きます。

コードレビューSkillsを例に、サブエージェントがある場合とない場合の違いを見てみましょう。

- 影分身なし（サブエージェントなし）の場合: ClaudeCode本体がメインの会話のコンテキスト上で直接ファイルを読み込んでレビューします。ファイル数が多いほどコンテキストが消費され、その後の作業に使えるコンテキストが減っていきます。
- 影分身あり（サブエージェントあり）の場合: code-reviewerという分身が別のコンテキストで起動し、調査・レビューをそちらで完結させます。本体の会話には結果のみが返ってくるため、コンテキストの消費を大幅に抑えられます。

また、分身は複数同時に起こせます。独立したタスクを並列で走らせることで、直列処理より速く完了できます。

参考：

- [Sub-agents - Claude Code Docs](https://code.claude.com/docs/en/sub-agents)

### 組み込みサブエージェント

ClaudeCodeにはあらかじめ組み込まれているサブエージェントが存在します。なお、私たちと直接会話しているClaudeCode本体のことをメインエージェントと呼びます。

| エージェント | 用途 | モデル |
| --- | --- | --- |
| Explore | コードベースの探索・ファイル検索（読み取り専用） | Haiku |
| Plan | プランモード中の調査（読み取り専用） | 継承 |
| general-purpose | 複雑なマルチステップタスクの実行（全ツール） | 継承 |
| claude-code-guide | ClaudeCodeの機能・仕様に関する質問への回答 | Haiku |

「継承」はメインエージェントが使用しているモデルをそのまま引き継ぐことを意味します。例えばメインエージェントがOpusで動いていれば、PlanやGeneral-purposeもOpusで動作します。Exploreやclaude-code-guideのように、調査・回答特化のサブエージェントにはHaikuが使われます。タスクの性質に合わせてモデルを使い分けることでトークンを節約しています。

これらはClaudeCodeが自動的に判断して使うことがほとんどです。「このコードベース全体で `fetchUser` を使っている箇所を調べて」と依頼するだけで、ClaudeCodeが必要に応じてExploreサブエージェントを使って調査します。

### カスタムサブエージェントを作る

`.claude/agents/` （プロジェクト単位）または `~/.claude/agents/` （ユーザー全体）にMarkdownファイルを置くことで、独自のサブエージェントを定義できます。

例えばコードレビュー専用のサブエージェントを作る場合、`.claude/agents/code-reviewer.md` を以下の内容で作成します。

```markdown
---
name: code-reviewer
description: コードレビューの専門家。コードの品質・セキュリティを確認する。
tools: Read, Grep, Glob
model: haiku
---

シニアエンジニアとしてコードレビューを行います。
変更されたファイルを確認し、品質・セキュリティ・可読性の観点でフィードバックしてください。
```

`description` にいつ使うかを書くことでClaudeCodeが自動的に判断して呼び出します。また「code-reviewerエージェントを使ってレビューして」と明示的に依頼することもできます。

フロントマターでサブエージェントの行動を制御・カスタマイズできます。上の例で使っている `model` と `tools` もその一つです。

- `model` ：タスクの複雑さに応じてモデルを選ぶことでトークンを抑えられます
- `tools` ：サブエージェントが使えるツールを制限できます。例えば `Bash` を含めなければ、そのサブエージェントはコマンド実行が禁止された読み取り専用の動作になります

他にも設定できるフロントマターは多岐にわたります。詳細は [公式ドキュメント](https://code.claude.com/docs/en/sub-agents) を参照してください(最初のうちはClaudeCodeに聞きましょう)。

### サブエージェントをSkillsなどと組み合わせる

サブエージェントはSkillsなどと組み合わせて使うことが多いです。Skillsを作り育てていくなかで「この作業はサブエージェントに委譲できるな」と思ったら、Skillsからサブエージェントを呼び出す形にブラッシュアップしていけばよいと思います。

もちろんここも、「このSkillsってサブエージェントを使ってコンテキスト効率よくできない？」とClaudeCodeに投げることから始めてみるのがおすすめです。

## プラグイン

プラグインとは、Skills・MCP・Hooks・サブエージェントなどを組み合わせたパッケージです。目的ごとに必要な機能がひとまとめになっており、インストールするだけで使い始められます。

インストールはセッション中に `/plugin` コマンドで行います。そしてDiscoverタブからマーケットプレイスを検索してインストールできます。Installedタブを見ると、自分がインストールしているプラグインがわかります。

簡単に利用できる反面、どういうSkills/MCPが登録されているか認識しづらいので、自分が利用しているプラグインの中身を理解して、使用していないものは無効化/削除することをおすすめします。

参考：

- [Plugins - Claude Code Docs](https://code.claude.com/docs/en/discover-plugins)

## すぐ使えるTips

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/533f87ca-fd21-4b96-8201-6397f9270d28.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F533f87ca-fd21-4b96-8201-6397f9270d28.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=3cc287838f413c69643b8fa799c37b7c)

本文中にも何度か登場した内容ですが、改めてTipsとしてまとめます。いずれもClaudeCodeの生みの親であるBoris Cherny氏が [Xで紹介しているTips](https://x.com/bcherny/status/2017742741636321619) です。すぐに実践できるものばかりなので、まずはこの3つから始めてみてください。

### Planモードを常用する

モードの章でも紹介しましたが、Planモードの利用を強くおすすめします。 `Shift+Tab` を2回押してPlanモードにしてから会話を始めてください。

いきなり実装を始めると、意図しない方向に進んでしまうことがよくあります。Planモードでまず計画を立ててもらい、内容を確認してからモードを切り替えて実装に移る。このワンクッションを挟むだけで手戻りが大幅に減ります。

慣れてくると「この程度の作業ならPlanモードは不要だな」と判断できるようになりますが、最初のうちは常にPlanモードからスタートする癖をつけておくのがおすすめです。

### Opusモデルを常用する

`/model` の章でも触れましたが、MAXプランを利用しているならOpusを使いましょう。

「Opusは最も高性能なモデルだからコストが高い」と思われがちですが、MAXプランなら定額なのでモデルによるコスト差はありません。むしろ、Opusは一発で正確な結果を返すことが多いため、SonnetやHaikuで何度もやり直すよりトータルの作業時間が短くなります。手戻りがない分、一番コストパフォーマンスが良いのがOpusだという考え方です。

迷ったらOpus。これだけ覚えておけば大丈夫です。

### 質問攻めしてもらう

人間がAIに出す指示は、自分で思っている以上にあいまいです。指示があいまいだと意図した結果を得ることができません。しかし具体的な指示を出すのは面倒です。

そこで有効なのが「質問攻めにしてもらう」テクニックです。やり方は簡単で、指示の最後に「あいまいな点や不明点があれば、クリアになるまで質問して」と一言添えるだけです。AskUserQuestionと組み合わせると、最低限の労力で自分の指示を最大限に具体化することができます。

たとえば「認証機能を実装して。あいまいな点や不明点があれば、クリアになるまで質問して。」と伝えると、ClaudeCodeが「認証方式はJWTとセッションのどちらですか？」「パスワードリセット機能は必要ですか？」「多要素認証は対応しますか？」と聞いてきます。これに答えていくだけで、指示がどんどん具体的になっていきます。

このアプローチの良いところは、自分では気づかなかった考慮漏れを洗い出せる点です。質問に答える過程で「あ、そこは考えてなかった」と気づくことが頻繁にあります。結果として、最初から精度の高い指示になり、意図した結果が得られやすくなります。

## 中級者になるために

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/b7445768-5f16-4924-a0dd-5e70095f64e0.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2Fb7445768-5f16-4924-a0dd-5e70095f64e0.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=c4882290fe75680a57cf56280be9a872)

本記事の内容は最低限です。ここまでの内容を理解して、ようやく初心者を名乗れるのかなと思っています。では初心者になったあと、どのようにして中級者になればよいでしょうか？

冒頭でロードマップと言いましたが、具体的なステップはありません。 `とにかく使いまくるのが一番の近道` だと思っています。使い続けていると自ずと中級者への道は見えてきます。ただ、さすがにそれだけだときついと思うので、中級者になるために取り組むとよいことを以下にまとめます。

## 仕組み(基礎)を理解する

入門段階では、各機能の外側（何を入れたら何が出てくるか）だけを意識すれば十分です。しかし、外側だけの理解では応用が利きません。

たとえばSkillsであれば、「SKILL.mdを置けば自動で呼ばれる」という外側の知識だけでも使えます。しかし、段階的開示の仕組みやdescriptionの評価ロジックを理解していれば、「なぜこのSkillが呼ばれないのか」「どう書けば意図通りに発火するか」といった判断ができるようになります。今のClaudeCodeはSkillsが中心なので、特にSkillsの仕組みは深く理解しておくことをおすすめします。

ClaudeCodeの公式ドキュメントは非常に充実しています。機能の使い方だけでなく、内部の仕組みや設計思想まで丁寧に書かれています。わからない箇所はClaudeCodeに「この公式ドキュメントを読んで解説して」とURLを渡せば、噛み砕いて説明してくれます。

AIがあるからといって、基礎をおろそかにしてよいわけではありません。むしろ、AIがあるからこそ基礎の重要性が増していると感じています。仕組みを理解していない人はAIの出力を検証できません。AIが間違った回答をしたとき、それに気づけるかどうかは基礎知識にかかっています。AIを使って効率よく学べる時代だからこそ、 **基礎をしっかり固めていきましょう** 。

- [Claude Code Docs](https://code.claude.com/docs/en/overview)

## ベスト・プラクティスを読む

ClaudeCode開発チームが公式に公開しているベスト・プラクティスがあります。ClaudeCodeを実際に開発しているチームが「こう使うと効果的」とまとめたものなので、説得力があります。

内容はプロンプトの書き方、コンテキストの管理、ワークフローの組み立て方など多岐にわたります。本記事で紹介した内容と重なる部分もありますが、より実践的で具体的な知見が詰まっています。公式ドキュメントと合わせて目を通しておくことをおすすめします(こちらも公式ドキュメントの一つではありますが)。

- [Best practices - Claude Code Docs](https://code.claude.com/docs/en/best-practices)

## everything claude codeを読む

Everything Claude Codeは、Anthropic x Forum Venturesハッカソンで優勝したAffaan Mustafa氏が公開している、ClaudeCodeのカスタマイズ設定を体系的にまとめたオープンソースリポジトリです。ソフトウェア開発のプラクティスがコマンド/Skills/サブエージェントとして実装されており、Affaan Mustafa氏自身もEverything Claude Codeを活用して「 [Zenith](https://zenith.chat/) 」を開発して、ハッカソンに優勝しています。

本記事ではSkills、サブエージェント、Hooksなどの機能を個別に紹介しましたが、このリポジトリはそれらを組み合わせて業務フロー全体を最適化している点が参考になります。「各機能は使えるようになったけど、どうやって連携させればいいのかわからない」という段階で読むと、視野が広がります。

ただし、丸パクリはあまり意味がないと思っています。業務フローは人やチームによって異なるため、そのまま導入しても自分のワークフローにはフィットしないと思います。私としては、あくまで「こういう組み合わせ方があるのか」という引き出しを増やす目的で解読していくのをおすすめしたいです。

また、いきなりリポジトリだけ見ても構成が複雑で理解しづらいと思います。 `git clone` してClaudeCodeに「このリポジトリの構成を解説して」「このSkillは何をしているのか教えて」と聞きながら咀嚼していくのがおすすめです。

- [Everything Claude Code - GitHub](https://github.com/affaan-m/everything-claude-code)

## Status Lineのカスタマイズ

Status Lineとは、ClaudeCodeの画面下部に表示される情報バーのことです。デフォルトではモデル名やコンテキスト使用量などが表示されていますが、この表示内容はカスタマイズできます。

[![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/435280/2a2d12ea-9973-4106-899d-b9d9339a81e9.png)](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F435280%2F2a2d12ea-9973-4106-899d-b9d9339a81e9.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b7b6a254e9fb5af510f8e57eb56673a6)

たとえば現在のGitブランチ名、直近のテスト結果、プロジェクト固有の情報など、自分がよく確認する情報をStatus Lineに表示させておくと、ClaudeCodeでの作業体験がちょっとよくなります。地味ですが、毎回コマンドを叩いて確認する手間が省けるのは快適です。

Status Lineをカスタマイズするツールも公開されています。たとえば [ccstatusline](https://github.com/sirmalloc/ccstatusline) のようなものがあります。ただ、これもやはりClaudeCodeに「こんな情報をステータスラインで見たい」とお願いするのが手っ取り早いです。ちなみに私の現在のStatus Lineは上の画像の通りですが、 [@tonkotsuboy\_comさん](https://x.com/tonkotsuboy_com) のStatus Lineを丸パクリさせてもらっています。そしてClaudeCodeに「 [このツイート](https://x.com/tonkotsuboy_com/status/2031168969705734605?s=20) みたいなStatus Lineにしてと」お願いしただけです(ツイートの画像を渡しました)。

- [Status line - Claude Code Docs](https://code.claude.com/docs/en/interactive-mode#status-line)

## キャッチアップ方法

はじめにで触れた通り、ClaudeCodeはアップデートが非常に速いです。キャッチアップを怠ると、便利な機能を知らないまま遠回りしてしまうこともあります。おすすめのキャッチアップ方法を2つ紹介します。

1つ目はXです。ClaudeCodeに関する情報はXが最も鮮度が高いです。まずはClaudeCodeの生みの親であるBoris Cherny氏（ [@bcherny](https://x.com/bcherny) ）だけフォローしておけば十分です。Boris氏のポストを追っていると、関連するClaudeCodeの投稿がタイムラインに流れてくるようになります。気になるアカウントがあればフォローしていけば、自然とClaudeCode界隈の情報が集まってきます。

2つ目は [Changelog](https://code.claude.com/docs/en/changelog) です。ClaudeCodeの公式な変更履歴で、新機能の追加や仕様変更が記録されています。毎日確認する習慣をつけておくと、知らない間に機能が変わっていたという事態を防げます。Changelogで気になった項目をXで検索すると、実際の使い方や感想が見つかることも多いです。この流れでキャッチアップしていくのがおすすめです。

## セキュリティ/コンプライアンス対策

本記事でもオプトアウトやbypassPermissionsモードの注意点など、最初から気をつけるべきポイントは紹介しました。しかしセキュリティやコンプライアンスへの意識は、入門段階で終わるものではありません。AIエージェントを使い続ける限り、常に意識し続ける必要があります。

ClaudeCodeに慣れてくると、ClaudeCodeが担う役割はどんどん増えていきます。MCPを通じて外部サービスにアクセスし、bypassPermissionsモードでファイルやコマンドを自由に操作し、サブエージェントが並列で動く。便利になる一方で、ClaudeCodeがアクセスできる範囲もClaudeCodeが生み出すデータも拡大していきます。

慣れれば慣れるほど、セキュリティ/コンプライアンスへの意識を強く持たなければなりません。「便利だから全部許可する」ではなく、「何にアクセスさせていて、どんなデータが生まれているか」を常に把握しておくことが大切です。

本記事ではセキュリティの具体的な対策までは踏み込みませんが、ClaudeCodeの利用範囲が広がるタイミングで、公式ドキュメントのセキュリティに関するページを読んでおくことをおすすめします。

- [Security - Claude Code Docs](https://code.claude.com/docs/en/security)

## 最後に

軽い気持ちで書き始めたらとんでもないボリュームになりました。ここまで読んでくださった方、ありがとうございます。

経験がないうちはとにかく手が動きません。だからClaudeCodeにやらせるというマインドを意識しましょう。「私は何がやりたいの？」という問いすらClaudeCodeなら引き出してくれます。経験を積んでいけば、自分からClaudeCodeを引っ張っていけるようになります。

ClaudeCodeはあくまでツールです。どれだけ強力なツールでも、結局は使い手次第です。だからこそ、使い手によって生まれる生産性の差は著しいものになります。

AI時代でも量をこなすことが大切だという点は変わりません。ドキュメントを読んで、試して、うまくいかなくて、また試す。この繰り返しが一番の近道です。AIがあるおかげで、このサイクルを回す速度は格段に上がっています。

ClaudeCodeを正しく、最大限に活用して、生産性を上げていきましょう！

(ClaudeCode中級者ってなんだろう？)

[1](#comments)

コメント一覧へ移動

X（Twitter）でシェアする

Facebookでシェアする

はてなブックマークに追加する
