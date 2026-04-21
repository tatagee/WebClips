#!/bin/bash
# 自动将 02_Library 和 03_Wiki 中的增量 Markdown 转换为 PDF

echo "📄 开始将 Markdown 文件转换为 PDF..."

cd "$(dirname "$0")"

# 查找所有需要在 Library 中转换的 MD 文件 (排除以_开头的目录和文件)
find 02_Library -type f -name "*.md" | while read -r md_file; do
    pdf_file="${md_file%.md}.pdf"
    
    # 检查如果 PDF 不存在或比 MD 文件旧，则转换
    if [ ! -f "$pdf_file" ] || [ "$md_file" -nt "$pdf_file" ]; then
        echo "🔄 正在转换: $md_file"
        # 假设使用 npx md-to-pdf 进行转换
        npx md-to-pdf "$md_file"
        if [ $? -eq 0 ]; then
            echo "✅ 成功生成: $pdf_file"
        else
            echo "❌ 转换失败: $md_file"
        fi
    fi
done

echo "🎉 转换完成！"
