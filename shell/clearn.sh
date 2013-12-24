#!/bin/sh
ROOT_DIR='/home/liyongjian/Website/mydev'
ASSET_DIR=${ROOT_DIR}'/fe/asset'

cd $ROOT_DIR
rm -rf ${ROOT_DIR}'/_tmp'
mkdir ../mydev_bak
cp * -rfp ../mydev_bak

rm -rf fe/asset/img/$1
rm -rf fe/asset/js/$1
rm -rf fe/asset/css/$1
rm -rf fe/asset/html/$1
