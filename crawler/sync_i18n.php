<?php

use Service\I18nService;

require_once '../vendor/autoload.php';
require_once '../config/config.php';

$sheet_key = '../config/sheet.json';

// 建立 Google Client
$client = new \Google_Client();
$client->setApplicationName('Google Sheets and PHP');

// 引入金鑰
$client->setAuthConfig($sheet_key);

// 設定權限
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');


// 建立 Google Sheets Service
$sheetService = new \Google_Service_Sheets($client);

$spreadSheet = $sheetService->spreadsheets->get(GOOGLE_SHEET_SPREADSHEET_ID);
$sheets = $spreadSheet->getSheets();
$sheetIds = [];
foreach($sheets as $sheet) {
    $sheetIds[] = [
        'title' => $sheet->properties->title,
        'sheetId' => $sheet->properties->sheetId,
    ];
}

$headerFormatMapping = [
    'Category' => 'category',
    'StringName' => 'key',
    'StringKey' => false,
    'app_format' => 'app_format',
];

$l10nKeys = [];

foreach ($sheetIds AS $sheetInfo) {
    $range = 'A1:H';
    $response = $sheetService->spreadsheets_values->get(GOOGLE_SHEET_SPREADSHEET_ID, "{$sheetInfo['title']}!$range");


    $raws = $response->getValues();
    $rawHeader = array_shift($raws);

    $headerMapping = [];

    foreach ($rawHeader AS $index => $_rawHeader) {
        $formatHeaderName = $_rawHeader;
        if (isset($headerFormatMapping[$_rawHeader])) {
            $formatHeaderName = $headerFormatMapping[$_rawHeader];
        }
        if (!empty($formatHeaderName)) {
            $headerMapping[$formatHeaderName] = $index;
        }
    }
    foreach ($raws AS $raw) {
        if (count($raw) >= 3) {
            $data = [];
            foreach ($headerMapping AS $key => $index) {
                $data[$key] = $raw[$index] ?? '';
            }

            if (!empty($data['category']) && !empty($data['key'])) {
                $key = $data['key'];
                $app_format = @json_decode($data['app_format'], true) ?? [];

                $tmp_category = trim($data['category']);
                $category_arr = explode(".", $tmp_category);
                $category = array_shift($category_arr);

                foreach ($data AS $columnKey => $val) {
                    if (!in_array($columnKey, ['category', 'key', 'app_format']) && $val !== '') {
                        $lang = $columnKey;

                        /**
                         * 語系資料夾
                         */
                        if (!isset($l10nKeys[$lang])) {
                            $l10nKeys[$lang] = [];
                        }

                        if (!isset($l10nKeys[$lang][$category])) {
                            $l10nKeys[$lang][$category] = [];
                        }

                        $keyPath = $category_arr;
                        $keyPath[] = $key;
                        $lastIndex = count($keyPath) - 1;
                        $targetValue = &$l10nKeys[$columnKey][$category];
                        foreach ($keyPath AS $index => $_keyPath) {
                            if ($index === $lastIndex) {
                                $targetValue[$_keyPath] = [
                                    'i18n_app_format' => $app_format,
                                    'i18n_txt' => $val,
                                ];
                            } else {
                                if (!isset($targetValue[$_keyPath])) {
                                    $targetValue[$_keyPath] = [];
                                }
                                $targetValue = &$targetValue[$_keyPath];
                            }
                        }

                    }
                }
            }
        }
    }
}

$I18nService = new I18nService();
foreach ($l10nKeys AS $lang => $l10n) {
    $I18nService->setL18N($lang, $l10n);
}

$path = $I18nService->export('js');

$I18nService->findAndRemoveFile(APP_DIR."/src/js/lang/");
// $I18nService->checkOrCreateFolder(APP_DIR."/src/js/lang/");

$zip = new ZipArchive;
$res = $zip->open($path);
if ($res === TRUE) {

    $unzipFolder = explode("/", $path);
    array_pop($unzipFolder);
    $unzipFolder = implode("/", $unzipFolder);
    $zip->extractTo($unzipFolder);
    $zip->close();

    $fromPath = str_replace(".zip", "", $path);
    rename($fromPath, APP_DIR."/src/js/lang");
    $I18nService->findAndRemoveFile($path);
  } else {
  }


print_r($path);
// print_r($I18nService);

