angular.module('zmsUrlAdapter', [])
.constant('URL_PARTS', {
    "module": "m",
    "sub": "s",
    "action": "a"
})
.provider('zmsService', ['$http', function($http) {
    var wcmsUrl = '';
    this.setWcmsUrl = function(url) {
        wcmsUrl = url;
    };

//  zmsService.doLogin(login, password);
    this.$get = function () {
        return {
            'doLogin': function(login, password)
            {
                return $http({

                });
            },
            'doLogout': function()
            {
                return $http({

                });
            }
        };
    };
}])
.config(function(zmsServiceProvider){
    zmsServiceProvider.setWcmsUrl('wcms/');
})
.factory('zmsUrlAdapter',
    ['$location', 'URL_PARTS',
    function()
    {
        var zmsUrlAdapter = {
            "urlWithMode": function(mode)
            {
                mode = mode.replace(/-(\w)/g, function(all, parts){
                    return parts.toUpperCase();
                });
                return location.pathname
                    + location.search
                    + ((location.search === '') ? '?' : '&')
                    + 'mode=' + mode;
            },
            "urlM": function(mode)
            {
                return location.pathname
                    + location.search
                    + ((location.search === '') ? '?' : '&')
                    + 'm=' + mode;
            },
            "getRoute": function ($route)
            {
                return $route.current.$$route.originalPath.substr(1);
            }
        };
        return zmsUrlAdapter;
    }]
);
