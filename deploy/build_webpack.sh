MODE_TYPE=$1

if [ "$MODE_TYPE" != "prod" ]; then
    MODE_TYPE="dev"
fi

echo "webpack 執行程序，執行模式為 $MODE_TYPE"
echo "========================================"
echo "STEP 2-1: 移除 public 中的資料夾 (版號資料夾 與 img 資料夾)"
echo "rm -rf ./dist"
    rm -rf ./dist
echo "STEP 2-1: 移除 public 中的資料夾 (版號資料夾 與 img 資料夾) 完成"
echo "========================================"
echo "STEP 2-2: 執行 npm webpack dll 共用library/plugins程序"
cd $ABS_DIR
npm run build:dll:$MODE_TYPE
echo "STEP 2-2: 執行 npm webpack dll 共用library/plugins程序 完成"
echo "========================================"
echo "STEP 2-3: 執行 npm webpack bundle 把包程序"
cd $ABS_DIR
npm run build:$MODE_TYPE
echo "STEP 2-3: 執行 npm webpack bundle 把包程序 完成"
if [ "$MODE_TYPE" = "prod" ]; then
    echo "========================================"
    echo "STEP 2-4: 移除 public/*/js/css_del css 暫存資料夾"
    PUBLIC_PATH="$ABS_DIR/dist/*/js/css_del"
    rm -rf $PUBLIC_PATH
    echo "STEP 2-4: 移除 dist/*/js/css_del css 暫存資料夾 完成"
fi