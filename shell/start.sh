cd ../
rm -rf _tmp
mkdir -p fe/asset/img/$1
mkdir -p fe/asset/js/$1
mkdir -p fe/asset/css/$1
mkdir -p fe/asset/html/$1


cp fe/asset/html/_start/start.html fe/asset/html/$1/index.html

chrome http://127.0.0.1:3001/asset/html/$1/index.html
