#!/bin/bash

# WebClips 启动脚本
# 端口 9005（由 DevDock 统一管理，避免与 Nginx :80 冲突）

PORT="${PORT:-9005}"

cd "$(dirname "$0")"
cd tools

# 解析参数
FOREGROUND=false
for arg in "$@"; do
  case "$arg" in
    --foreground) FOREGROUND=true ;;
  esac
done

# 1. 安装依赖
if [ ! -d "node_modules" ]; then
  echo "📦 安装依赖..."
  npm install
fi

# 2. 同步内容到 docs/
echo "🔄 同步内容..."
npm run docs:sync 2>/dev/null || true

# 3. 启动 VitePress 开发服务器
echo "🌐 启动 WebClips (端口 $PORT)..."
if [ "$FOREGROUND" = true ]; then
  exec npx vitepress dev docs --host --port "$PORT"
else
  nohup npx vitepress dev docs --host --port "$PORT" > nohup.log 2>&1 &
  echo "✅ WebClips 已在后台启动 (PID: $!)"
fi
