# 設定取得決定位置
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
    DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null && pwd )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
export ABS_DIR="$( cd -P "$( dirname "$SOURCE" )/../" >/dev/null && pwd )"

# 歡迎使用 LavueAdmin Development deploy 程序
echo "歡迎使用 LavueAdmin Development deploy 程序"
echo "========================================"

echo "STEP 1: 執行抓取最終 git 版號"
echo "========================================"
bash $ABS_DIR"/deploy/build_webVer.sh" dev

echo "STEP 2: 執行 public 資料夾打包程序"
echo "========================================"
bash $ABS_DIR"/deploy/build_webpack.sh" dev "--user="$(who am i | awk '{print $1}')""
