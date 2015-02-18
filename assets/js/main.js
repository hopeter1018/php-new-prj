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

        'chosen': requireJsHelper.baseUrl + 'vendor/chosen/chosen.jquery',
        'bootstrap': requireJsHelper.baseUrl + 'vendor/bootstrap/dist/js/bootstrap',
        'ngUi': requireJsHelper.baseUrl + 'vendor/angular-ui/build/angular-ui',
        'ui-bootstrap': requireJsHelper.baseUrl + 'angularModule/ui-bootstrap-tpls-0.11.0',

        'ng-table': requireJsHelper.baseUrl + 'vendor/ng-table/dist/ng-table',
        'angular-file-upload': requireJsHelper.baseUrl + 'vendor/danialfarid-angular-file-upload/dist/angular-file-upload',
        'textAngular': [requireJsHelper.baseUrl + 'downloads/textAngular-1.3.6/dist/textAngular.min'],
        'textAngular-rangy': [requireJsHelper.baseUrl + 'downloads/textAngular-1.3.6/dist/textAngular-rangy.min'],
        'textAngular-sanitize': [requireJsHelper.baseUrl + 'downloads/textAngular-1.3.6/dist/textAngular-sanitize.min'],
        'ng-chosen': requireJsHelper.baseUrl + 'vendor/angular-chosen-localytics/chosen',

        'hkc-common': requireJsHelper.baseUrl + 'angularModule/zmsCommon',
        'hkc-form': requireJsHelper.baseUrl + 'angularModule/zmsForm',
        'hkc-table': requireJsHelper.baseUrl + 'angularModule/zmsTable',
        'hkc-urlAdapter': requireJsHelper.baseUrl + 'angularModule/zmsUrlAdapter',
        'hkc-bs-column-menu': requireJsHelper.baseUrl + 'angularModule/hkc-bs-column-menu',

        'prototypes': requireJsHelper.baseUrl + 'prototypes',
        'inflection': requireJsHelper.baseUrl + 'downloads/inflection-js/inflection'
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

        'chosen': ['jquery'],
        'ngUi': ['angular'],
        'ui-bootstrap': ['angular'],

        'ng-table': ['angular'],
        'angular-file-upload': ['angular'],
        'textAngular': ['angular'],
        'ng-chosen': ['angular'],

        'hkc-common': ['angular'],
        'hkc-form': ['angular'],
        'hkc-table': ['angular'],
        'hkc-urlAdapter': ['angular'],
        'hkc-bs-column-menu': ['angular']
    }
    // Use browser cache to handle
    // , urlArgs: "bust=" +  (new Date()).getTime()
});

define(
    'hkc-main',
    [
        'angular', 'angular-route', 'angular-resource', 'angular-cookies', 'angular-sanitize', 'chosen',
        'ngUi', 'ui-bootstrap', 'ng-table', 'angular-file-upload', 'textAngular-rangy', 'textAngular-sanitize', 'textAngular', 'ng-chosen',
        'hkc-urlAdapter', 'hkc-common', 'hkc-form', 'hkc-table', 'hkc-bs-column-menu',
        'prototypes', 'inflection'
    ],
    function(ng) {
        'use strict';
        var app = ng
            .module('app', [
                //  Angular Provided
                'ngResource', 'ngRoute', 'ngCookies', 'ngSanitize'
                //  Third party
                , 'ui', 'ngTable', 'angularFileUpload', 'textAngular', 'localytics.directives'
                //  Tailor-made
                , 'hkc.urlAdapter', 'hkc.common', 'hkc.form', 'hkc.table', 'hkc.bs.column-menu'
            ])
            .filter('status', function() {
                return function(int) {
                    if (int == 1) {
                        return 'Launched';
                    } else {
                        return 'Waiting / Rejected';
                    }
                };
            })
            .config(function($interpolateProvider){
                $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
            })
            .controller('bodyCtrl', ['$scope', '$location', function ($scope, $location) {

            }])
            .controller('mainContainerCtrl', ['$scope', function ($scope) {

            }]);
        return app;
    });