<?php

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

list($conn, $config, $entityManager) = \Hopeter1018\DoctrineExtension\Connection::register();

\Hopeter1018\DeveloperTools\CliProcess::start();

//$htmlSrc = <<<HTML
//<html>
//    <form>
//        <div id="d1" ng-repeat="child in data.parent">
//            <div id ="d1-1" ng-repeat="item in child.child">
//                Name: <input type="number" ng-bind="item.name" required="true" />
//            </div>
//        </div>
//        <div id="d1" ng-repeat="child in data.parent2">
//            <div id ="d1-1" ng-repeat="item in child.child">
//                Name: <input ng-bind="item.name" required="true" />
//            </div>
//        </div>
//    </form>
//</html>
//HTML;
//$json = '{'
//    . '"parent": ['
//        . '{"child": [{"name": "name-1-1"}, {"name": "name-1-2"}]},'
//        . '{"child": [{"name": "name-2-1"}, {"name": "name-2-2"}]},'
//        . '{"child": [{"name": "name-3-1"}, {"name": "name-3-2"}]}'
//    . '],'
//    . '"parent2": ['
//        . '{"child": [{"name": "name-1-1"}, {"name": "name-1-2"}]},'
//        . '{"child": [{"name": "name-2-1"}, {"name": "name-2-2"}]},'
//        . '{"child": [{"name": "name-3-1"}, {"name": "name-3-2"}]}'
//    . ']'
//. '}';
//$data = json_decode($json);
//echo "<pre>";
//$selector = Zms5Library\AngularjsExtension\ValidatorParser::getXpathSelectors("//form");
//echo $selector, "<hr />";
//
//$doc = new \DOMDocument();
//$doc->loadXML($htmlSrc);
//$xpath = new \DOMXpath($doc);
//$elements = $xpath->query($selector);
//foreach ($elements as $element) {
//    /* @var $element DOMNode */
//    echo htmlentities($doc->saveXML($element)) . "<br />";
//}

//echo htmlentities( Zms5Library\AngularjsExtension\ValidatorParser::replaceNgRepeat($htmlSrc, $data) );
//echo htmlentities( Zms5Library\AngularjsExtension\ValidatorParser::replaceNgRepeatXpath($htmlSrc, $data) );
//exit;
        
//if (isset($_GET['SOCKET'])) {
//    var_dump(Zms5Library\Helper\SocketCache\Client::command($_GET["SOCKET"]));
//}
//
//\Zms5Library\Helper\BackgroundInstance::register("socketCache", function() {
//    Zms5Library\Helper\SocketCache\Server::register();
//});
//
//\Zms5Library\Helper\BackgroundInstance::register(
//    'test4',
//    function($applicationName) {
//        $dest = "wcms/_system_storage/background-instance/{$applicationName}.txt";
//        is_file($dest) or file_put_contents($dest, "START single instance scheduled 5 seconds, task need 4-7 seconds.");
//        $rand = rand(4, 7);
//        file_put_contents($dest, file_get_contents($dest) . "\r\n###################################\r\n" . date('Y-m-d H:i:s'));
////        set_time_limit(5);
//        sleep($rand);
//        file_put_contents($dest, file_get_contents($dest) . "\r\n" . date('Y-m-d H:i:s') . " - after " . $rand);
//    },
//    2
//);

//$bp = new Zms5Library\BackgroundProcess\BackgroundProcess(
//    function(Zms5Library\BackgroundProcess\BackgroundProcess $bp) {
//        error_log('Hi from: ' . $bp->getName());
//    },
//    Zms5Library\DoctrineExtension\Cache::file('background-process'),
//    'Test1',
//    5,
//    Zms5Library\BackgroundProcess\Enum\InstanceType::single(),
//    Zms5Library\BackgroundProcess\Enum\IntervalStrategy::repeatedWaitNext()
//);

//$bp->setEnabled(false);
