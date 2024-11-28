#!/bin/bash

# 构建项目
npm run build

# 替换以下内容为你的实际服务器信息
SERVER_USER="你的用户名"
SERVER_IP="你的服务器IP"
DEPLOY_PATH="/var/www/your-project/out"

# 同步到服务器
rsync -avz --delete ./out/ $SERVER_USER@$SERVER_IP:$DEPLOY_PATH

# SSH 到服务器执行权限设置
ssh $SERVER_USER@$SERVER_IP "sudo chown -R www-data:www-data /var/www/your-project && sudo chmod -R 755 /var/www/your-project" 