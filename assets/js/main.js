require.config({
//    packages: [
//        {name: 'jquery',
//            location: './vendor/jquery/src/', // default 'packagename'
//            main: 'jquery'                // default 'main' 
//        }
//    ],
    // alias libraries paths
    paths: {
        'domReady': './vendor/requirejs-domready/domReady',
        'jquery': './vendor/jquery/dist/jquery',
        'angular': './vendor/angular/angular',
        'angular-cookies': './vendor/angular-route/angular-cookies',
        'angular-route': './vendor/angular-route/angular-route',
        'angular-resource': './vendor/angular-route/angular-resource',
        'angular-sanitize': './vendor/angular-route/angular-sanitize'
    },
    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-cookies': {deps: ['angular']},
        'angular-route': {deps: ['angular']},
        'angular-resource': {deps: ['angular']},
        'angular-sanitize': {deps: ['angular']}
    },
    // kick start application
//    deps: ['zms-main'],
    urlArgs: "bust=" +  (new Date()).getTime()
});

define('zms-main', ['angular', 'angular-route'], function(ng) {
    'use strict';
    console.log('zms-main');
    var app = ng
        .module('app', ['ngRoute'])
        .config(function($interpolateProvider){
            $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
        })
        .controller('bodyCtrl', ['$scope', function ($scope) {

        }])
        .controller('mainContainerCtrl', ['$scope', function ($scope) {

        }]);
    return app;
});