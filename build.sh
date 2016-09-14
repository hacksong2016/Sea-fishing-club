#!/usr/bin/env bash

echo "Start build App"
cd app;
meteor build --server="http://xdb.fami2u.com/" ../build;
echo "App build End."
cd ../;

echo "Start build admin."
cd admin;
meteor build --server="http://123.56.78.66:3000/" ../build;
echo "admin build End."
cd ../;

cd build;
scp admin.tar.gz root@123.56.78.66:/alidata/www/admin
scp app.tar.gz root@123.56.78.66:/alidata/www/app

echo 'pm2 list';
echo 'ssh root@123.56.78.66'
echo 'cd /alidata/www/admin && tar zxf admin.tar.gz'
echo 'cd /alidata/www/app && tar zxf app.tar.gz'
echo 'pm2 list';