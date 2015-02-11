angular.module('hks.urlAdapter', [])
.constant('URL_PARTS', {
    "module": "m",
    "sub": "s",
    "action": "a"
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
