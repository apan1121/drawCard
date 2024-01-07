# # 設定取得決定位置
# SOURCE="${BASH_SOURCE[0]}"
# while [ -h "$SOURCE" ]; do
#     DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null && pwd )"
#     SOURCE="$(readlink "$SOURCE")"
#     [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
# done
# export ABS_DIR="$( cd -P "$( dirname "$SOURCE" )/../" >/dev/null && pwd )"

# 設定 WEB_VER 檔案位置
MODE_TYPE=$1
if [ "$MODE_TYPE" != "prod" ]; then
    MODE_TYPE="dev"
fi

WEB_VER_PATH=$ABS_DIR"/config/version.php"
WEB_VER_JSON_PATH=$ABS_DIR"/config/version.json"

echo "啟動置換 WEB_VER"

if [ "$MODE_TYPE" == "prod" ]; then
    ver=`git rev-parse --short origin/master`
    ver_time=`git show --no-patch --no-notes --pretty='%ct' $ver`

    ver="\"$ver\"";
    ver_time="\"$ver_time\"";

    echo "正式模式建立 $ver 版號，版本時間 $ver_time"

    html="
        \$ver = $ver;
        define('WEB_VER', \$ver);
        \$ver_time = $ver_time;
        define('WEB_VER_TIME', \$ver_time);
    "

    json="
        {
            \"WEB_VER\": $ver,
            \"WEB_VER_TIME\": $ver_time
        }
    "


    # ver=`git rev-parse --short HEAD`
    # #ver="\"$ver\"";

    # # ver="$(date +%s)";

    # echo "取得版號 $ver"
else
    echo "開發模式建立 time() 版號"

    html="
        define('WEB_VER', \"dev\");
        define('WEB_VER_TIME', time());
    "

    json="
        {
            \"WEB_VER\": \"dev\",
            \"WEB_VER_TIME\": \"\"
        }
    ";
fi

echo "<?php
    $html" > $WEB_VER_PATH

echo "置換 WEB_VER 至 $WEB_VER_PATH"

echo $json
echo $json > $WEB_VER_JSON_PATH
echo "置換 WEB_VER 至 $WEB_VER_JSON_PATH"
echo "========================================"