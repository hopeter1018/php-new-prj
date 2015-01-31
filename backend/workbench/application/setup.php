<?php

define('APP_DEFAULT_TIMEZONE', 'Asia/Hong_Kong');

ini_set('session.gc_divisor', 1);
ini_set('session.gc_probability', 1);
//ini_set('session.gc_maxlifetime', '3600');
ini_set('session.hash_function', '1');
ini_set('session.hash_bits_per_character', '6');
//ini_set('session.cache_expire', 180);
ini_set('last_modified', 'Off');
ini_set('define_syslog_variables', 'Off');
ini_set('ignore_repeated_errors', 'On');
ini_set('ignore_repeated_source', 'On');
ini_set('magic_quotes_gpc', 'Off');
ini_set('magic_quotes_runtime', 'Off');
ini_set('magic_quotes_sybase', 'Off');
ini_set('html_errors', 'On');
ini_set('allow_url_fopen', 'Off');
ini_set('allow_url_include', 'Off');
ini_set('date.timezone', APP_DEFAULT_TIMEZONE);
date_default_timezone_set(APP_DEFAULT_TIMEZONE);

/**
 * Absolute path to _system_storage/
 */
define('APP_SYSTEM_STORAGE', APP_WCMS_ROOT . '_system_storage/');
/**
 * Absolute path to workbench/application/generated/
 */
define('APP_WORKBENCH_STORAGE', APP_WORKBENCH_ROOT . 'application/generated/');
define('APP_TWIG_CACHE', APP_SYSTEM_STORAGE . 'twig-cache/');

define('APP_CRYPT_KEY', '');
define('APP_HASH_KEY', '');

register_shutdown_function(function() {
    $error = error_get_last();
    if ($error['type'] == E_ERROR && !headers_sent()) {
        header('HTTP/1.1 500 Internal Server Error');
    }
});
