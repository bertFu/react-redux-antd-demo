#! /bin/bash
export NODE_ENV=$1
#如果没输入参数，提示数据参数test或production,test代表测试环境，production代表正式环境
if [ $# != 1 ];then
    echo “input parameter:test or production”
    exit 1;
fi
mkdir logs
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
npm run build
pm2 start server.js -i max
bash
