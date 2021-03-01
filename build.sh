
build_local() {
	echo "building"
	mvn clean package -DskipTests -Plocal
	gen_output
}

build_dev() {
	echo "building"
	npm i
	npm run build
}

build_prod() {
    echo "building with npm"

	# 修改配置：admin,wechat 接口改为线上的
	sed -i 's#//adminapi.1d1d100.net#//admin.1d1d100.com/api#' src/config/index.js

	sed -i 's#http://wechatapi.1d1d100.net#https://wechat.1d1d100.com#' src/config/index.js
    
	# sed -i 's#//fdfs.1d1d100.net#//fdfs.1d1d100.com#' src/config/index.js

    npm i && npm run build

    # 编译失败，不能部署代码
    if [ $? -ne 0 ]; then
        echo "编译失败!"
        exit 1
    fi
}

deploy_prod() {

    # 部署代码
    version=$(date +%Y%m%d%H%M%S)
    path=/data/www/FRONTEND/admin-fe-$version
    tarz=/tmp/admin-fe-$version.tar.bz2
    symlink=/data/www/FRONTEND/admin-fe

    # 打包
    tar -jcf $tarz build 

    # 分发到服务器
    for host in $HOSTS
    do
        echo ">>>>>>start deploy to $host.<<<<<<<"
        scp $tarz root@$host:$tarz
        ssh root@$host "mkdir -p $path && tar -jxf $tarz -C $path && chown -R www-data:www-data $path && rm -f $symlink && ln -sf $path $symlink"
        echo "deploy $host finished"
    done
}

deploy_dev() {
	rm -rf /data/www/FRONTEND/admin-fe/build
	cp -r build /data/www/FRONTEND/admin-fe/
}

do_prod() {
	build_prod
	deploy_prod
}

do_dev() {
	build_dev
	deploy_dev
}

do_local() {
	build_local
}

echo "Usage: " $(basename $0) "prod|dev|local"

eval do_$1
