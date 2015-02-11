var requireJsHelper = {
    "baseUrl": '',
    "init": function()
    {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0, total = scripts.length; i < total; i++) {
            if (-1 !== scripts[i].src.indexOf('/assets/js/main.js')) {
                requiredByDepth = scripts[i - 1].src.split('/').length - scripts[i].src.split('/').length;
                for (var j = 0; j < requiredByDepth; j++) {
                    this.baseUrl += '../';
                }
            }
        }
    }
};
requireJsHelper.init();

require.config({
    // alias libraries paths
    paths: {
        'domReady': ['//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady', requireJsHelper.baseUrl + 'vendor/requirejs-domready/domReady'],
        'jquery': ['//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min', requireJsHelper.baseUrl + 'vendor/jquery/dist/jquery'],
        'jquery-ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min', requireJsHelper.baseUrl + 'vendor/jquery-ui/jquery-ui'],
        'angular': ['//cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.12/angular.min', requireJsHelper.baseUrl + 'vendor/angular/angular'],
        'angular-cookies': ['//ajax.googleapis.com/ajax/libs/angularjs/1.3.12/angular-cookies', requireJsHelper.baseUrl + 'vendor/angular-route/angular-cookies'],
        'angular-route': ['//ajax.googleapis.com/ajax/libs/angularjs/1.3.12/angular-route', requireJsHelper.baseUrl + 'vendor/angular-route/angular-route'],
        'angular-resource': ['//ajax.googleapis.com/ajax/libs/angularjs/1.3.12/angular-resource', requireJsHelper.baseUrl + 'vendor/angular-route/angular-resource'],
        'angular-sanitize': ['//ajax.googleapis.com/ajax/libs/angularjs/1.3.12/angular-sanitize', requireJsHelper.baseUrl + 'vendor/angular-route/angular-sanitize'],

        'bootstrap': requireJsHelper.baseUrl + 'vendor/bootstrap/dist/js/bootstrap',
        'ngUi': requireJsHelper.baseUrl + 'vendor/angular-ui/build/angular-ui',
        'ui-bootstrap': requireJsHelper.baseUrl + 'angularModule/ui-bootstrap-tpls-0.11.0',

        'ng-table': requireJsHelper.baseUrl + 'vendor/ng-table/dist/ng-table',

        'hks-common': requireJsHelper.baseUrl + 'angularModule/zmsCommon',
        'hks-form': requireJsHelper.baseUrl + 'angularModule/zmsForm',
        'hks-table': requireJsHelper.baseUrl + 'angularModule/zmsTable',
        'hks-urlAdapter': requireJsHelper.baseUrl + 'angularModule/zmsUrlAdapter',
        
        'prototypes': requireJsHelper.baseUrl + 'prototypes'
    },
    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'jquery': { deps: [], exports: 'jquery' },
        'jquery-ui': { deps: ['jquery'], exports: 'jquery-ui' },
        'angular': {deps: ['jquery'], exports: 'angular'},
        'angular-cookies': {deps: ['angular']},
        'angular-route': {deps: ['angular'], exports: 'ngRoute'},
        'angular-resource': {deps: ['angular'], exports: 'ngResource'},
        'angular-sanitize': {deps: ['angular'], exports: 'ngSanitize'},
        'bootstrap': { deps: ['jquery'], exports: 'bootstrap' },

        'ngUi': ['angular'],
        'ui-bootstrap': ['angular'],

        'ng-table': ['angular'],

        'hks-common': ['angular'],
        'hks-form': ['angular'],
        'hks-table': ['angular'],
        'hks-urlAdapter': ['angular']
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});

define(
    'hks-main',
    [
        'angular', 'angular-route', 'angular-resource', 'angular-cookies', 'angular-sanitize',
        'ng-table', 'ngUi', 'ui-bootstrap', 
        'hks-urlAdapter', 'hks-common', 'hks-form', 'hks-table',
        'prototypes'
    ],
    function(ng) {
        'use strict';
        var app = ng
            .module('app', [
                //  Angular Provided
                'ngResource', 'ngRoute', 'ngCookies', 'ngSanitize'
                //  Third party
                , 'ui', 'ngTable'
                //  Tailor-made
                , 'hks.urlAdapter'
                , 'hks.common', 'hks.form', 'hks.table'
            ])
            .config(function($interpolateProvider){
                $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
            })
            .controller('bodyCtrl', ['$scope', function ($scope) {

            }])
            .controller('mainContainerCtrl', ['$scope', function ($scope) {

            }]);
        return app;
    });