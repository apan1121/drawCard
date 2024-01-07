# 設定取得決定位置
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
    DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null && pwd )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
export ABS_DIR="$( cd -P "$( dirname "$SOURCE" )/../" >/dev/null && pwd )"

echo "STEP 1: 執行抓取最終 git 版號"
echo "========================================"
bash $ABS_DIR"/deploy/build_webVer.sh" prod

echo "STEP 2: 執行 public 資料夾打包程序"
echo "========================================"
bash $ABS_DIR"/deploy/build_webpack.sh" prod

echo "STEP 3: 移除 public gitignore 限制"
echo "========================================"
bash $ABS_DIR"/deploy/build_gitIgnore.sh"
