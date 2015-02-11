require(['../main'], function() {
    require(['hks-main', 'angular'], function(app, ng) {
        'use strict';
        app
            .controller('index', ['$scope', function ($scope) {
            }])
            .config(function ($routeProvider) {
                $routeProvider.when('/index', {
                    template: 'index',
                    controller: 'index'
                }).otherwise({
                    redirectTo: '/index'
                });
            });
            
        ng.element(document).ready(function() {
            ng.bootstrap(document, ['app']);
        });
    });
});