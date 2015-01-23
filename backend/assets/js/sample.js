require(['main'], function() {
    require(['zms-main', 'angular'], function(app, ng) {
        'use strict';
        app
            .controller('sample', ['$scope', function ($scope) {
            }])
            .config(function ($routeProvider) {
                $routeProvider.when('/sample', {
                    template: 'sample',
                    controller: 'sample'
                }).otherwise({
                    redirectTo: '/sample'
                });
            });
            
        ng.element(document).ready(function() {
            ng.bootstrap(document, ['app']);
        });
    });
});