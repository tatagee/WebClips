#!/usr/bin/env python3
"""
WebClips Markdown → PDF 批量转换脚本 (TUI增强版)
支持极简交互式选择，并在转换结束后自动无痕清理缓存。
通过 AppleScript 自动化调用 Typora 的 PDF 导出功能。
"""

import os
import re
import sys
import hashlib
import subprocess
import urllib.request
import urllib.error
import ssl
import time
import shutil
from pathlib import Path

try:
    from PIL import Image
    HAS_PILLOW = True
except ImportError:
    HAS_PILLOW = False


# ====== 配置 ======
# 因为脚本放在了 .tools 目录下，WEBCLIPS_DIR 就是上一级目录
WEBCLIPS_DIR = Path(__file__).parent.parent.resolve()
TOOLS_DIR = WEBCLIPS_DIR / ".tools"
IMAGE_CACHE_DIR = TOOLS_DIR / ".images_cache"
SKIP_SUFFIX = "-BL"  # 跳过带此后缀的文件

# 图片下载配置
DOWNLOAD_TIMEOUT = 15  # 秒
MAX_RETRIES = 2
RETRY_DELAY = 2  # 秒

# Typora 导出等待配置
TYPORA_EXPORT_TIMEOUT = 30  # 每个文件最长等待秒数
TYPORA_SETTLE_DELAY = 2     # 打开文件后等待 Typora 渲染的秒数


def log(msg: str, level: str = "INFO"):
    """简洁日志输出"""
    icons = {"INFO": "ℹ️", "OK": "✅", "WARN": "⚠️", "ERR": "❌", "SKIP": "⏭️"}
    print(f"  {icons.get(level, '·')} {msg}")


def parse_frontmatter(content: str) -> tuple[dict, str]:
    """解析 YAML frontmatter，返回 (metadata_dict, body_content)。"""
    metadata = {}
    body = content

    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            fm_text = parts[1].strip()
            body = parts[2]
            for line in fm_text.splitlines():
                line = line.strip()
                if ":" in line:
                    key, _, val = line.partition(":")
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    metadata[key] = val

    return metadata, body


def extract_image_urls(content: str) -> list[tuple[str, str]]:
    """提取 markdown 中所有远程图片的 URL"""
    results = []
    pattern = r'!\[([^\]]*)\]\((https?://[^)]+)\)'
    for match in re.finditer(pattern, content):
        results.append((match.group(0), match.group(2)))
    return results


def _detect_and_normalize_image(raw_path: Path, url_hash: str, cache_dir: Path) -> Path | None:
    """用 Pillow 检测图片真实格式并修正"""
    if not HAS_PILLOW:
        return raw_path

    try:
        img = Image.open(raw_path)
        real_format = img.format
    except Exception:
        return raw_path

    fmt_to_ext = {"JPEG": ".jpg", "PNG": ".png", "GIF": ".gif", "WEBP": ".png"}
    target_ext = fmt_to_ext.get(real_format, ".png")
    target_path = cache_dir / f"{url_hash}{target_ext}"

    if real_format == "WEBP":
        try:
            img.save(target_path, "PNG")
            if raw_path != target_path and raw_path.exists():
                raw_path.unlink()
            return target_path
        except Exception as e:
            log(f"webp→png 转换失败: {e}", "WARN")
            return raw_path

    if raw_path != target_path:
        raw_path.rename(target_path)
    return target_path


def download_image(url: str, cache_dir: Path) -> Path | None:
    """下载图片并检测"""
    url_hash = hashlib.md5(url.encode()).hexdigest()[:12]

    # 检查缓存
    for ext in [".jpg", ".png", ".gif"]:
        cached = cache_dir / f"{url_hash}{ext}"
        if cached.exists() and cached.stat().st_size > 0:
            return cached

    tmp_path = cache_dir / f"{url_hash}.tmp"
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                       "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0"
    }

    for attempt in range(MAX_RETRIES + 1):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=DOWNLOAD_TIMEOUT, context=ctx) as resp:
                data = resp.read()
                if len(data) > 0:
                    tmp_path.write_bytes(data)
                    return _detect_and_normalize_image(tmp_path, url_hash, cache_dir)
                else:
                    return None
        except Exception as e:
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY)
            else:
                log(f"下载失败 ({e}): {url[:80]}...", "WARN")
                return None
    return None


def preprocess_markdown(md_file: Path, metadata: dict, body: str, cache_dir: Path) -> Path:
    """预处理: 下载图片并注入绝对路径。临时文件创建在隐藏缓存内。"""
    header_parts = []
    title = metadata.get("title", "")
    source = metadata.get("source", "")
    if title:
        header_parts.append(f"# {title}\n")
    if source:
        header_parts.append(f"> 📎 来源: [{source}]({source})\n")
    if header_parts:
        header_parts.append("---\n")
    header = "\n".join(header_parts)

    image_refs = extract_image_urls(body)
    download_count = 0
    fail_count = 0

    for original_text, img_url in image_refs:
        local_path = download_image(img_url, cache_dir)
        if local_path:
            new_text = original_text.replace(img_url, str(local_path))
            body = body.replace(original_text, new_text, 1)
            download_count += 1
        else:
            fail_count += 1

    tmp_md = cache_dir / f"_typora_export_{md_file.stem}.md"
    tmp_md.write_text(header + body, encoding="utf-8")
    return tmp_md


def _detect_typora_menu_names() -> tuple[str, str]:
    """自动检测 Typora 的本地化菜单名称"""
    try:
        result = subprocess.run(
            ["osascript", "-e", '''
                tell application "Typora" to activate
                delay 0.5
                tell application "System Events"
                    tell process "Typora"
                        set menuNames to name of every menu of menu bar 1
                        set AppleScript's text item delimiters to "|||"
                        return menuNames as text
                    end tell
                end tell
            '''],
            capture_output=True, text=True, timeout=10
        )
        menus = [m.strip() for m in result.stdout.strip().split("|||")]
        
        file_candidates = ["文件", "ファイル", "파일", "File", "Archivo"]
        export_candidates = ["导出", "エクスポート", "내보내기", "Export", "Exportar"]

        file_menu = "File"
        export_menu = "Export"

        for name in file_candidates:
            if name in menus:
                file_menu = name
                break

        if file_menu:
            result2 = subprocess.run(
                ["osascript", "-e", f'''
                    tell application "System Events"
                        tell process "Typora"
                            set menuItems to name of every menu item of menu "{file_menu}" of menu bar 1
                            set AppleScript's text item delimiters to "|||"
                            return menuItems as text
                        end tell
                    end tell
                '''],
                capture_output=True, text=True, timeout=10
            )
            file_items = [m.strip() for m in result2.stdout.strip().split("|||")]
            for name in export_candidates:
                if name in file_items:
                    export_menu = name
                    break

        return file_menu, export_menu
    except Exception:
        return "File", "Export"


def export_via_typora(md_path: Path, pdf_path: Path, file_menu: str, export_menu: str) -> bool:
    """使用 AppleScript 指挥 Typora 输出 PDF"""
    md_abs = str(md_path.resolve())
    pdf_abs = str(pdf_path.resolve())

    if pdf_path.exists():
        pdf_path.unlink()

    pdf_dir = os.path.dirname(pdf_abs)
    pdf_name = os.path.basename(pdf_abs)

    applescript = f'''
        tell application "Typora"
            activate
            open POSIX file "{md_abs}"
            delay {TYPORA_SETTLE_DELAY}
        end tell

        tell application "System Events"
            tell process "Typora"
                click menu item "PDF" of menu "{export_menu}" of menu item "{export_menu}" of menu "{file_menu}" of menu bar 1

                set dialogTimeout to 0
                repeat until (exists sheet 1 of window 1) or dialogTimeout > 10
                    delay 0.5
                    set dialogTimeout to dialogTimeout + 0.5
                end repeat

                if exists sheet 1 of window 1 then
                    keystroke "g" using {{command down, shift down}}
                    delay 1

                    do shell script "echo " & quoted form of "{pdf_dir}" & " | tr -d '\\n' | pbcopy"
                    delay 0.3
                    keystroke "v" using command down
                    delay 0.5
                    keystroke return
                    delay 1

                    keystroke "a" using command down
                    delay 0.2
                    do shell script "echo " & quoted form of "{pdf_name}" & " | tr -d '\\n' | pbcopy"
                    delay 0.3
                    keystroke "v" using command down
                    delay 0.3

                    keystroke return
                    delay 2
                end if
            end tell
        end tell

        delay 2
        tell application "System Events"
            tell process "Typora"
                keystroke "w" using command down
            end tell
        end tell
        delay 0.5
    '''

    try:
        result = subprocess.run(["osascript", "-e", applescript], capture_output=True, text=True, timeout=TYPORA_EXPORT_TIMEOUT + 30)
        
        waited = 0
        while waited < TYPORA_EXPORT_TIMEOUT:
            if pdf_path.exists() and pdf_path.stat().st_size > 0:
                return True
            time.sleep(1)
            waited += 1

        return pdf_path.exists() and pdf_path.stat().st_size > 0
    except Exception as e:
        log(f"导出异常: {e}", "ERR")
        return False


def main():
    print("\n" + "=" * 60)
    print("  📑 WebClips 知识库 PDF 转换助手")
    print("=" * 60 + "\n")

    if not Path("/Applications/Typora.app").exists():
        log("Typora 未安装！请先安装: https://typora.io", "ERR")
        sys.exit(1)

    # 创建工作目录
    TOOLS_DIR.mkdir(exist_ok=True)
    IMAGE_CACHE_DIR.mkdir(exist_ok=True)

    # 扫描 01_Inbox 和 02_Library
    md_files = []
    for search_dir in ["01_Inbox", "02_Library"]:
        target_path = WEBCLIPS_DIR / search_dir
        if target_path.exists():
            md_files.extend(list(target_path.rglob("*.md")))
            
    # 排出模板或特殊文件
    md_files = sorted([f for f in md_files if not f.name.endswith(SKIP_SUFFIX) and f.name != "README.md"])

    if not md_files:
        log("未在 Inbox 或 Library 中找到 Markdown 文件。", "WARN")
        sys.exit(0)

    # 收集文件状态 (原位转换：PDF 输出在 MD 的同级目录)
    files_info = []
    for f in md_files:
        pdf_path = f.with_suffix(".pdf")
        has_pdf = pdf_path.exists() and pdf_path.stat().st_size > 0
        files_info.append({"md": f, "pdf": pdf_path, "has_pdf": has_pdf})

    # ===============
    #   TUI 交互菜单
    # ===============
    print("  📁 当前知识库文件状态:\n")
    for i, info in enumerate(files_info, 1):
        status = "[已出_PDF]" if info["has_pdf"] else "[等待转换]"
        # 截取相对于 WebClips 的展示路径
        rel_path = info["md"].relative_to(WEBCLIPS_DIR)
        print(f"  {i:2d}. {status} {rel_path}")

    print("\n  👉 选择转换策略 (输入序号或快捷键):")
    print("     [1,3,5] -> 指定文章")
    print("     [1-5]   -> 范围文章")
    print("     [A]     -> 智能全转 (仅未生成的)")
    print("     [F]     -> 强制重转 (覆盖所有)")
    print("     [Q]     -> 取消并退出")

    choice = input("\n  请输入您的选择: ").strip().upper()

    if choice == 'Q' or choice == '':
        sys.exit(0)

    selected_files = []
    if choice == 'A':
        selected_files = [info for info in files_info if not info["has_pdf"]]
    elif choice == 'F':
        selected_files = files_info
    else:
        indices = set()
        for p in choice.split(','):
            p = p.strip()
            if '-' in p:
                try:
                    s, e = map(int, p.split('-'))
                    indices.update(range(s, e + 1))
                except ValueError:
                    pass
            elif p.isdigit():
                indices.add(int(p))
        selected_files = [files_info[i-1] for i in sorted(list(indices)) if 1 <= i <= len(files_info)]

    if not selected_files:
        log("未选择任何待转文件。", "WARN")
        sys.exit(0)

    print(f"\n  🚀 开始执行，共 {len(selected_files)} 篇...\n")

    # 执行批处理
    success, failed, skipped = 0, 0, 0

    try:
        file_menu, export_menu = _detect_typora_menu_names()
        
        for i, info in enumerate(selected_files, 1):
            md_file = info["md"]
            pdf_path = info["pdf"]
            print(f"[{i}/{len(selected_files)}] {md_file.name}")

            # 增量判断 (如果刚才选了 F，则肯定会强转。但以防被意外中断，如果存在且已最新，可安全跳过)
            # 为了严谨，这里就按选择的来，如果不强制拦截，就覆盖。
            if choice == 'A' and info["has_pdf"]:
                log(f"跳过已存在: {pdf_path.name}", "SKIP")
                skipped += 1
                continue

            try:
                content = md_file.read_text(encoding="utf-8")
                metadata, body = parse_frontmatter(content)
                tmp_md = preprocess_markdown(md_file, metadata, body, IMAGE_CACHE_DIR)

                if export_via_typora(tmp_md, pdf_path, file_menu, export_menu):
                    kb = pdf_path.stat().st_size / 1024
                    log(f"✅ 生成成功 -> 同级目录 ({kb:.0f} KB)", "OK")
                    success += 1
                else:
                    failed += 1
            except Exception as e:
                log(f"处理失败: {e}", "ERR")
                failed += 1
            print()

    finally:
        # ===============
        #   阅后即焚清理
        # ===============
        print("=" * 60)
        log("🧹 正在进入环境清理流程 (防止打扰 Google Drive)...", "INFO")
        try:
            if IMAGE_CACHE_DIR.exists():
                shutil.rmtree(IMAGE_CACHE_DIR)
            log("✨ 中间缓存与临时文件已完全抹除", "OK")
        except Exception as e:
            log(f"⚠️ 清理部分失败: {e}", "WARN")

    print("\n" + "=" * 60)
    print(f"  🏁 任务结束")
    print(f"     ✅ 成功: {success}  |  ⏭️ 跳过: {skipped}  |  ❌ 失败: {failed}")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
