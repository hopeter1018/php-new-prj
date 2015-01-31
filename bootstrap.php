<?php

define('APP_CRYPT_KEY', '');
define('APP_HASH_KEY', '');

if (strstr(__FILE__, 'my_project.localhost')) {
    define('DB_HOST', '127.0.0.1');
    define('DB_USER', 'root');
    define('DB_PW', '');
    define('DB_PORT', 3306);
    define('DB_DB', '');
    define('DB_PREFIX', '');

    define('APP_DOMAIN', 'my_project.localhost');
    define('APP_DOMAIN_WCMS', 'my_project.localhost');

    define('APP_IS_DEV', true);
    define('APP_IS_UAT', true);
} else {
    die('Config Not Set');
}

define('APP_DEFAULT_SITE', 1);
define('APP_DEFAULT_CHARSET', 1);
define('APP_WEBADMIN_EMAIL', 'peter.ho@westcomzivo.com');

define('APP_WCMS_FOLDER', 'backend/');
define('APP_WORKBENCH_FOLDER', 'workbench/');
define('APP_ROOT', __DIR__ . '/');
define('APP_WCMS_ROOT', APP_ROOT . APP_WCMS_FOLDER);

if (PHP_SAPI !== 'cli' and class_exists('Phar') and is_file(APP_ROOT . 'phVendorWorkbench.phar')) {
    new Phar(APP_ROOT . 'phVendorWorkbench.phar', 0);
    define('APP_WORKBENCH_ROOT', 'phar://' . APP_ROOT . 'phVendorWorkbench.phar/' . APP_WCMS_FOLDER . APP_WORKBENCH_FOLDER);
    $composerAutoloader = require_once "phar://ph/wcms/vendor/autoload.php";
} else {
    define('APP_WORKBENCH_ROOT', APP_ROOT . APP_WCMS_FOLDER . APP_WORKBENCH_FOLDER);
    $composerAutoloader = require_once APP_WCMS_ROOT . "vendor/autoload.php";
}

list($conn, $config, $entityManager) = \Hopeter1018\DoctrineExtension\Connection::register();

\Hopeter1018\DeveloperTools\CliProcess::start();
