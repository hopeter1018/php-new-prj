app
.factory
(
    'localize',
    [
        '$http', '$rootScope', '$window', '$cookies',
        function($http, $rootScope, $window, $cookies)
        {
            var localize =
            {
                "path": './assets/i18n/',
                "translation": null,
                "resourceFileLoaded": false,
                "getLangCode" : function(){
                        //	TODO cookies
                        if (! $cookies.viewingLangCode) {
                                $cookies.viewingLangCode = $window.navigator.userLanguage || $window.navigator.language;
                        }
                        return $cookies.viewingLangCode;
                },
                "changeLang": function(langCode)
                {
                        $cookies.viewingLangCode = langCode;
                        console.log('js: $cookies.viewingLangCode');
                },
                "getTranslation": function(ns)
                {
                        $http({
                                method: "GET",
                                url: localize.path + localize.getLangCode() + (typeof ns === 'undefined' ? '/main' : '/' + ns) + '.json',
                                cache: false
                        }).success(function (data)
                        {
                                localize.translation = data;
                                localize.resourceFileLoaded = true;
                                $rootScope.$broadcast('localizeResourcesUpdates');
                        }).error(function() {
                                if (localize.getLangCode().indexOf('-') != -1) {
                                        $http({
                                                method: "GET",
                                                url: localize.path + localize.getLangCode().split('-')[0] + (typeof ns === 'undefined' ? '/main' : '/' + ns) + '.json',
                                                cache: false
                                        }).success(function (data)
                                        {
                                                localize.translation = data;
                                                localize.resourceFileLoaded = true;
                                                $rootScope.$broadcast('localizeResourcesUpdates');
                                        });
                                } else {
                                        $http({
                                                method: "GET",
                                                url: localize.path + 'en' + (typeof ns === 'undefined' ? '/main' : '/' + ns) + '.json',
                                                cache: false
                                        }).success(function (data)
                                        {
                                                localize.translation = data;
                                                localize.resourceFileLoaded = true;
                                                $rootScope.$broadcast('localizeResourcesUpdates');
                                        })
                                }
                        });
                },
                "translate": function (value, ns)
                {
                    var translated = '!!! ' + value;
                    if (!localize.resourceFileLoaded)
                    {
                        localize.getTranslation(ns);
                        localize.resourceFileLoaded = true;
                        return translated;
                    }

                    return localize.translation && localize.translation[value] ? localize.translation[value] : translated;
                },
                replace: function(elm, str, ns)
                {
                    var tag = localize.translate(str, ns);
                    if( (tag !== null) && (tag !== undefined) && (tag !== '') )
                    {
                        elm.html(tag);
                    }
				}
            };

            return localize;
        }
    ]
)

.filter
(
    'i18n',
    [
        'localize',
        function (localize)
        {
            return function ()
            {
                return localize.translate.apply(null, arguments);
            };
        }
    ]
)

.directive
(
    'i18n',
    [
        'localize',
        function(localize)
        {
            return {
                restrict : "EAC",
                link : function (scope, elm, attrs)
                {
                    var str = elm.html();
                    var ns = attrs.i18n;

                    if (localize.resourceFileLoaded)
                    {
                            localize.replace(elm, str, ns);
                    }
                    else
                    {
                        deregister = scope.$on('localizeResourcesUpdates',
                        function()
                        {
                            deregister();
                            localize.replace(elm, str, ns);
                        });
                    }
                }
            };
        }
    ]
);