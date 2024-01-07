<?php
namespace Service;

use DirectoryIterator;

/**
 * jsVars 儲存器
 */
class I18nService
{
    private $i18n = [];
    private $folderId = '';

    public function __construct() {
        $this->folderId = $this->generateRandomString(10);
    }

    public function setL18N($lang, $data) {
        $this->i18n[$lang] = array_merge_recursive($this->i18n[$lang] ?? [], $data);
    }


    public function export($type)
    {
        $return = false;
        switch ($type) {
            // case 'php':
            //     $return = $this->exportPHP();
            //     break;
            case 'js':
                $return = $this->exportJS();
                break;
            // case 'android':
            //     $return = $this->exportAndroid();
            //     break;
            // case 'ios':
            //     $return = $this->exportIOS();
            //     break;
        }
        return $return;
    }


    private function exportJS()
    {
        $formatData = [];
        foreach ($this->i18n AS $lang => $data) {
            $formatData[$lang] = $this->format($data, 'js');
        }

        $folderName = "JS_{$this->folderId}";

        $storagePath = APP_DIR."/storage/export";
        $save_path = "{$storagePath}/{$folderName}";
        $this->checkOrCreateFolder($save_path);

        foreach ($formatData AS $lang => $l18n) {
            $langPath = $save_path."/{$lang}";
            $this->checkOrCreateFolder($langPath);
            foreach ($l18n AS $path => $info) {
                $folderArr = explode("/", $path);
                $fileName = array_pop($folderArr);
                $folderPath = implode("/", $folderArr);

                if (!empty($folderPath)) {
                    $folderPath = "{$langPath}/{$folderPath}";
                    $this->checkOrCreateFolder($folderPath);
                } else {
                    $folderPath = "{$langPath}";
                }

                $file_path = "{$folderPath}/{$fileName}.json";
                $export = json_encode($info, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                $f = fopen($file_path, "w");
                fwrite($f, $export);
            }
        }
        return $this->exportZipFile($storagePath, $folderName);
    }

    private function format($input, $type = 'js')
    {
        if (isset($input['i18n_txt']) && isset($input['i18n_app_format'])) {
            $input = $this->parseFormat($input['i18n_txt'], $type, $input['i18n_app_format']);
        } else if (is_string($input)) {
            $input = $this->parseFormat($input, $type);
        } else {
            foreach ($input AS $key => $val) {
                $input[$key] = $this->format($val, $type);
            }
        }

        return $input;
    }

    private function parseFormat($input_string = '', $format_type = '', $match_mapping = [])
    {
        $string = $input_string;
        if (preg_match_all('/\{(?P<key>\w+)\}/', $string, $matches)) {
            if (!empty($matches)) {
                foreach ($matches['key'] AS $key) {
                    $format_key = '{'.$key.'}';
                    switch ($format_type) {
                        case 'android':
                        case 'ios':

                            if (isset($match_mapping[$key])) {
                                $format_key = $match_mapping[$key];
                            }
                            break;
                        case 'php':
                            $format_key = ":".$key;
                            break;

                    }
                    if ('{'.$key.'}' !== $format_key) {
                        $string = str_replace("{".$key."}", $format_key , $string);
                    }
                }
            }
        }
        return  $string;
    }

    private function exportZipFile($path, $folderName)
    {
        $command = "cd {$path}; zip -r {$folderName}.zip {$folderName}/*";
        $output = shell_exec($command);
        $this->findAndRemoveFile("$path/{$folderName}");
        return "{$path}/{$folderName}.zip";
    }


    public function findAndRemoveFile($path, $index = 0, $force = false)
    {
        if (is_dir($path)) {
            $dir = new DirectoryIterator($path);
            $now = time();
            foreach ($dir as $fileinfo) {
                if (!$fileinfo->isDot()) {
                    $fileName = $fileinfo->getPathname();
                    if ($fileinfo->isDir()) {
                        $this->findAndRemoveFile($fileName, $index + 1, $force);
                    } else if ($fileinfo->isFile()) {
                        @unlink($fileName);
                    }
                }
            }
            @rmdir($path);
        } else if (is_file($path)) {
            @unlink($path);
        }
    }

    public function checkOrCreateFolder($folderPath)
    {
        // 檢查文件夾是否存在
        if (!file_exists($folderPath)) {
            // 如果不存在，嘗試逐級創建文件夾
            if (!mkdir($folderPath, 0777, true)) {
                // 如果創建失敗，可以根據需要進行錯誤處理
                return false;
            }
        }

        // 文件夾存在或已成功創建
        return true;
    }

    private function generateRandomString($length = 10) {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

}