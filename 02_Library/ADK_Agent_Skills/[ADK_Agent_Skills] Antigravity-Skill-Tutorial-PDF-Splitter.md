---
title: "Antigravity Skillを作ってみた！PDF分割で学ぶSkill作成入門｜miyo_ai_note"
source: "https://note.com/miyo_ska/n/na8a25a079eff"
category: "[ADK_Agent_Skills]"
clipped_at: "2026-04-04"
tags: ["adk-agent-skills"]
status: "distilled"
compiled: true
---
![見出し画像](https://assets.st-note.com/production/uploads/images/248660204/rectangle_large_type_2_c0f6ff7d9039defd2b5d3ecbe83d1471.png?width=1280)

## Antigravity Skillを作ってみた！PDF分割で学ぶSkill作成入門

最近、Antigravityを使っていて、「この操作、毎回同じこと説明してるな…」と思ったことありませんか？

例えば：

- 「PDFを100ページごとに分割して」
- 「コミットメッセージを自動生成して」
- 「画像をリサイズして」

  
こういった **繰り返し使う操作** を、Antigravityに「覚えさせる」ことができたら便利ですよね。

それを実現するのが、 **Antigravity Skill** です。

## きっかけ：NotebookLMでPDFがアップロードできない！

実は、この記事を書くきっかけは、NotebookLMでの失敗体験でした。

ローカルにあるPDFファイル（143ページ）をNotebookLMにアップロードしようとしたところ…

```
❌ エラー: ファイルサイズが大きすぎます
```

調べてみると、NotebookLMには **200MBのファイルサイズ制限** があることが判明しました。

「毎回手動で分割するのは面倒だな…」と思い、 **Antigravity Skillで解決できないか** 試してみることにしました。

結果、PDF分割Skillを作成し、 **実際に143ページのPDFを2つに分割** することに成功！

この記事では、その過程を通じて学んだSkill作成の方法を、初心者向けに解説します。

この記事を読めば：

- Skillの仕組みが分かる
- 実際にSkillを作れるようになる
- Antigravityをさらに強力にカスタマイズできる

「Skillって難しそう…」と思っているあなたも大丈夫。一緒に、PDF分割Skillを作りながら学んでいきましょう！

  

---

## 1️⃣ なぜSkillが必要なのか？

### Antigravityの基本機能だけでは足りない場面

Antigravityは非常に強力ですが、以下のような場面では毎回同じ説明が必要になります：

**例1: 繰り返し使う操作**

```
私: 「このPDFを100ページごとに分割して」
Antigravity: 「PyPDF2を使って分割しますね…」

（次の日）
私: 「このPDFも100ページごとに分割して」
Antigravity: 「PyPDF2を使って分割しますね…」
```

毎回同じ説明をするのは面倒ですよね。

**例2: プロジェクト固有のルール**

```
私: 「コミットメッセージは『[機能追加]』で始めて…」
Antigravity: 「了解しました」

（別のファイルで）
私: 「コミットメッセージは『[機能追加]』で始めて…」
```

プロジェクトのルールを毎回伝えるのも大変です。

### Skillで解決できること

Skillを作ると：

- ✅ 繰り返し使う操作を自動化
- ✅ プロジェクト固有のルールを記憶
- ✅ 複雑な手順を簡単な依頼で実行

**Skillを使った場合**:

```
私: 「このPDFを分割して」
Antigravity: 「pdf-splitterスキルを使って100ページごとに分割しますね」
```

シンプルになりました！

---

## 2️⃣ Skillって何？（超基礎編）

### ■ Skillの役割

Skillは、 **エージェントの能力を拡張する再利用可能な知識パッケージ** です。

  
ゲームで例えると：  
**・基本のAntigravity**: 初期装備のキャラクター  
**・Skill**: 新しいスキルや装備を習得  

### ■ エージェントがSkillを使う仕組み

Antigravityは、以下の3ステップでSkillを使います：

### ステップ1: 発見（Discovery）

会話開始時、利用可能なSkillのリスト（名前と説明）を取得

### ステップ2: 選択（Selection）

ユーザーの依頼に基づき、適切なSkillを選択

### ステップ3: 適用（Application）

実際に使用すると判断した時点で、Skillの全文を読み込んで実行

### 公式ドキュメントの解説（初心者向け）

公式ドキュメント（ [https://antigravity.google/docs/skills](https://antigravity.google/docs/skills%EF%BC%89%E3%81%AB%E3%81%AF%E3%80%81Skill%E3%81%AE%E8%A9%B3%E7%B4%B0%E3%81%8C%E6%9B%B8%E3%81%8B%E3%82%8C%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82))  
には、Skillの詳細が書かれています。

重要なポイント：  
・ **配置場所が決まっている**: \`.agent/skills/\` または \`~/.gemini/antigravity/global\_skills/\`  
**・SKILL.mdが必須**: エージェント用の指示書  
**・descriptionが重要**: エージェントがSkillを選ぶ判断材料

---

## 3️⃣ Skillの基本構造

### ■ フォルダ構成

Skillは以下の構造で作成します：

```
.agent/skills/<skill-name>/
├── SKILL.md (必須)
├── scripts/ (任意)
├── examples/ (任意)
└── resources/ (任意)
```

  

### ■ 各ファイルの役割

- **SKILL.md**: エージェント用の指示書（必須）
- **scripts/**: ヘルパースクリプト（Python、Bashなど）
- **examples/**: 参考実装
- **resources/**: テンプレートやその他のアセット

  

### ■ SKILL.md の書き方

SKILL.mdは、YAML形式のFrontmatterとMarkdown形式の本文で構成されます。

### ■ 基本フォーマット

```python
---
name: skill-name
description: Skillの説明（エージェントが選択判断に使用）
---

# Skillの指示内容
具体的な手順や指示をMarkdownで記述
```

### ■ Frontmatterのフィールド

- **name** (任意): Skillの一意識別子（省略時はフォルダ名）
- **description** (必須): 「何をするものか、いつ使うべきか」の簡潔な説明

> 💡 **重要**: \`description\` は、エージェントがSkillを選択するための非常に重要な情報です。

### ■ 良い description の例

```python
# ❌ 悪い例（曖昧）
description: PDFを処理します

# ✅ 良い例（具体的）
description: 大きなPDFファイルを指定ページ数ごとに分割します。NotebookLMなどのファイルサイズ制限がある場合に便利です。
```

### ■ 配置場所（プロジェクト vs グローバル）

Skillには2つの配置場所があります：

### 1️⃣ プロジェクト個別Skill

```javascript
<ワークスペースルート>/.agent/skills/
```

- **適用範囲**: そのワークスペース内でのみ有効
- **用途**: プロジェクト固有のルールや手順

  

### 2️⃣ グローバルSkill

```ruby
~/.gemini/antigravity/global_skills/
```

- **適用範囲**: すべてのプロジェクトで有効
- **用途**: 汎用的なツールや共通ルール

> 💡 **ポイント**: 今回のPDF分割Skillは、プロジェクト個別Skillとして作成します。

---

## 4️⃣ 実践編：PDF分割Skillを作ろう

### 背景：NotebookLMで大きなPDFが使えない問題

NotebookLMは非常に便利ですが、以下の制限があります：

- **ファイルサイズ**: 最大200MB
- **文字数**: 最大500,000ワード

大きなPDFファイルをアップロードしようとすると、エラーになってしまいます。

### 目標：PDFを指定ページ数ごとに分割するSkillを作成

この問題を解決するため、PDFを分割するSkillを作成します。  
Antigravityのチャットで、  
　PDFを分割するSkillを作成して  
　NotebookLMにアップロードしたいのだけど、サイズオーバーになるので分割したい  
と入力すると、以下のステップが実行されます。  
以下のステップは、Antigravity側で実施されるので、コマンド実行時に、「Accept」すればOKです。

---

### ステップ1: Skillフォルダを作成

まず、Skillフォルダを作成します：

```
mkdir -p .agent/skills/pdf-splitter/scripts
```

フォルダ構成：

```
.agent/skills/pdf-splitter/
├── SKILL.md
├── README.md
└── scripts/
    └── split_pdf.py
```

---

### ステップ2: SKILL.md を作成

エージェント用の指示書を作成します。

**\`.agent/skills/pdf-splitter/SKILL.md\`**:

```ruby
---
name: pdf-splitter
description: 大きなPDFファイルを指定ページ数ごとに分割します。NotebookLMなどのファイルサイズ制限がある場合に便利です。
---

# PDF分割の指示

ユーザーがPDFファイルの分割を依頼した場合、以下の手順に従ってください：

## 1. 情報の確認

まず、以下の情報を確認してください：

- **分割したいPDFファイルのパス**: ユーザーに確認するか、コンテキストから判断
- **何ページごとに分割するか**: デフォルトは100ページ
- **出力先フォルダ**: デフォルトは元のPDFと同じフォルダに \`split_output/\` を作成

## 2. スクリプトの実行

\`scripts/split_pdf.py\` を以下の引数で実行してください：

\\`\\`\\`bash
python .agent/skills/pdf-splitter/scripts/split_pdf.py <PDFファイルパス> --pages-per-file <ページ数> --output-dir <出力先>
\\`\\`\\`

## 3. 結果の報告

スクリプト実行後、以下の情報をユーザーに報告してください：

- 分割されたファイルの数
- 各ファイルのページ数
- 出力先フォルダのパス
- NotebookLMで使用する際の注意点
```

> 💡 **ポイント**:  
> **・** \`description\` で「いつ使うか」を明確に  
> **・** 具体的な手順を番号付きリストで記載  
> **・** エラーハンドリングも含める

---

### ステップ3: 分割スクリプトを作成

PDF分割の実際の処理を行うPythonスクリプトを作成します。

**\`.agent/skills/pdf-splitter/scripts/split\_pdf.py\`**:

```python
#!/usr/bin/env python3
"""
PDF分割スクリプト
"""

import argparse
from pathlib import Path
from PyPDF2 import PdfReader, PdfWriter

def split_pdf(input_path, pages_per_file=100, output_dir="split_output"):
    # 入力ファイルの確認
    input_path = Path(input_path)
    if not input_path.exists():
        raise FileNotFoundError(f"PDFファイルが見つかりません: {input_path}")
    
    # 出力フォルダの作成
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    # PDFを読み込む
    reader = PdfReader(str(input_path))
    total_pages = len(reader.pages)
    
    # 分割処理
    created_files = []
    file_count = 0
    
    for start_page in range(0, total_pages, pages_per_file):
        file_count += 1
        end_page = min(start_page + pages_per_file, total_pages)
        
        writer = PdfWriter()
        for page_num in range(start_page, end_page):
            writer.add_page(reader.pages[page_num])
        
        output_filename = f"{input_path.stem}_part{file_count}.pdf"
        output_filepath = output_path / output_filename
        
        with open(output_filepath, 'wb') as output_file:
            writer.write(output_file)
        
        created_files.append(output_filepath)
    
    return created_files
```

> 💡 **ポイント**:  
> **・** PyPDF2ライブラリを使用  
> **・** エラーハンドリングを含める  
> **・** ファイルサイズのチェック機能

---

### 実際にSkillを使ってみた

実際にAntigravityに依頼して動作確認します。  
今回は、pythonコードで動くので、必要なライブラリなどをインストールする必要があります。  
日頃、色々なシーンでpythonを使用するため、影響を受けないように、仮想環境で試すことにします。

仮想環境で実施したいことをAntigravityに伝えれば、仮想環境のコマンドやライブラリのインストール手順は、全て教えてくれます。  

■ 環境準備

以下のコマンドを実施する。

```
# 仮想環境を作成
python3 -m venv venv

# 仮想環境を有効化
source venv/bin/activate

# PyPDF2をインストール
pip install PyPDF2
```

■ 実行

冒頭で紹介した143ページのPDFファイルを、実際にSkillで分割してみました。

**依頼**:

```
「このPDFファイルを100ページごとに分割して」
```

**Antigravityの応答**:

```javascript
pdf-splitterスキルを使って分割しますね。

============================================================
� PDF分割スクリプト
============================================================
�📄 PDFを読み込んでいます: document.pdf
📊 総ページ数: 143
✅ 作成: document_part1.pdf (ページ 1-100, 170.65MB)
✅ 作成: document_part2.pdf (ページ 101-143, 76.53MB)
============================================================
🎉 分割完了！
📁 出力先: /path/to/split_output
📄 作成されたファイル数: 2
============================================================

💡 NotebookLMで使用する場合:
  - 各ファイルが200MB以下であることを確認してください
  - 無料版: 最大50ファイル/ノートブック
  - Plus版: 最大300ファイル/ノートブック
```

  

■ 結果

以下の２つのファイルに分割することに成功。ファイルも破損することなく、オープンできることが確認できました。

- part1: 170.65MB（200MB以下、OK）
- part2: 76.53MB（200MB以下、OK）

  
両方のファイルがNotebookLMの制限（200MB）以下なので、そのままアップロードできました！

**Skillを作る前** は、毎回手動で分割する必要がありましたが、 **Skillを作った後** は、「このPDFを分割して」と依頼するだけで自動的に処理してくれます。

これで、NotebookLMでの学習がスムーズになりました🎉

---

## 5️⃣ Skillのベストプラクティス

### 1️⃣ 具体的かつ実行可能な指示を書く

❌ **悪い例**:

```
PDFを処理してください。
```

✅ **良い例**:

```javascript
1. PDFファイルのパスを確認する
2. 何ページごとに分割するか確認する（デフォルト: 100ページ）
3. \`scripts/split_pdf.py\` を実行する
4. 分割されたファイルの保存先を報告する
```

### 2️⃣ descriptionは「いつ使うか」が分かるように書く

具体的に何をしてほしいskillであるかということを、Antigravityに伝えれば良しなに、書いてくれます。書いたものをベースに気に入らないところを修正すればOKです。

❌ **悪い例**:

```
description: PDFツール
```

✅ **良い例**:

```
description: 大きなPDFファイルを指定ページ数ごとに分割します。NotebookLMなどのファイルサイズ制限がある場合に便利です。
```

### 3️⃣ 複雑な処理はスクリプトに分離

SKILL.mdには「何をするか」を記載し、実際の処理はスクリプトに分離します。

### 4️⃣ エラーハンドリングを含める

よくあるエラーとその対処法を記載しておくと、エージェントが適切に対応できます。

---

## 6️⃣ よくある失敗と対策

### 1️⃣ Skillが選択されない

**原因**: \`description\` が曖昧

**対策**: 具体的なキーワードを含める

```python
# ❌ 悪い例
description: ファイル処理

# ✅ 良い例
description: 大きなPDFファイルを指定ページ数ごとに分割します。NotebookLMなどのファイルサイズ制限がある場合に便利です。
```

### 2️⃣ スクリプトが実行されない

**原因**: パスが間違っている

**対策**: 絶対パスまたは相対パスを明確に指定

```python
# ✅ 正しい例
python .agent/skills/pdf-splitter/scripts/split_pdf.py document.pdf
```

### 3️⃣ エージェントが指示を理解しない

**原因**: 曖昧な表現

**対策**: 具体的な手順を番号付きリストで記載

---

## 7️⃣ まとめ

### Skillを作ることで、Antigravityをさらに強力に

- ✅ 繰り返し使う操作を自動化
- ✅ プロジェクト固有のルールを記憶
- ✅ 複雑な手順を簡単な依頼で実行

  

### 繰り返し使う操作は積極的にSkill化

「この操作、毎回同じこと説明してるな…」と思ったら、Skillを作るチャンスです。  

### プロジェクトのルールを共有できる

チームでAntigravityを使う場合、Skillを共有することでプロジェクトのルールを統一できます。

---

![画像](https://assets.st-note.com/img/1770464849-qTLxdnwM3rA2EzYuIs7mlQGR.png?width=1200)