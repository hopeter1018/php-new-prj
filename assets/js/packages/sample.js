require(['../main'], function() {
    require(['hks-main', 'angular'], function(app, ng) {
        'use strict';
        app
            .controller('list', ['$scope', function ($scope) {
            }])
            .controller('record', ['$scope', function ($scope) {
            }])
            .config(function ($routeProvider) {
                $routeProvider.when('/list', {
                    templateUrl: 'list',
                    controller: 'list'
                }).when('/record/:recordid', {
                    templateUrl: 'record',
                    controller: 'record'
                }).otherwise({
                    redirectTo: '/list'
                });
            });
            
        ng.element(document).ready(function() {
            ng.bootstrap(document, ['app']);
        });
    });
});