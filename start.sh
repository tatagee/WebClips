#!/bin/bash

echo "🚀 开始部署 WebClips 知识库..."

# 切换到脚本所在目录
cd "$(dirname "$0")"

# 1. 安装依赖
echo "📦 正在检查并安装依赖 (npm install)..."
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ 依赖已安装，跳过 (如需重新安装请手动删除 node_modules 目录)。"
fi

# 2. 同步内容
echo "🔄 正在同步内容到 docs/ 目录..."
npm run docs:sync

# 3. 释放端口
echo "🧹 检查并清理已被占用的 80 端口..."
PIDS=$(sudo lsof -t -i:80)
if [ ! -z "$PIDS" ]; then
    echo "⚠️ 发现 80 端口已被进程占用，正在强制停止旧服务 (PID: $PIDS)..."
    sudo kill -9 $PIDS
    sleep 1
    echo "✅ 旧服务已清理完毕。"
fi

# 4. 启动服务
echo "🌐 启动 VitePress 服务..."
# 这里使用 sudo 运行 vitepress dev，并指定 --port 80 和 --host 0.0.0.0
# 局域网其他设备可以直接通过 IP 访问（无需加端口号）
sudo npx vitepress dev docs --host --port 80
