#!/bin/sh
ROOT_DIR='/home/liyongjian/Website/mydev'
ASSET_DIR=${ROOT_DIR}'/fe/asset'
rm -rf $ROOT_DIR/_tmp
mkdir -p $ROOT_DIR/_tmp/static/img/$1
mkdir -p $ROOT_DIR/_tmp/static/js/$1
mkdir -p $ROOT_DIR/_tmp/static/css/$1



cp $ASSET_DIR/img/$1/*.png $ROOT_DIR/_tmp/static/img/$1
cp $ASSET_DIR/img/$1/*.jpg $ROOT_DIR/_tmp/static/img/$1
cp $ASSET_DIR/img/$1/*.gif $ROOT_DIR/_tmp/static/img/$1

cp $ASSET_DIR/js/$1/* $ROOT_DIR/_tmp/static/js/$1
cp $ASSET_DIR/css/$1/*.css $ROOT_DIR/_tmp/static/css/$1
cp $ASSET_DIR/html/$1/* $ROOT_DIR/_tmp/

cd $ROOT_DIR/_tmp
zip -r $1.zip *
