#!/bin/sh


set -e

# 打印当前工作路径
pwd
remote=${git config remote.origin.url}

echo 'remote is: '$remote

# 新建一个发布的目录
mkdir secret-pages-branch
cd secret-pages-branch
# 创建的一个新的仓库
# 设置发布的用户名与邮箱
git config --global


