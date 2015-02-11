angular.module('hks.table', [])
.factory('zmsTable',
    ['$resource', '$timeout', 'ngTableParams', '$http', 'zmsUrlAdapter',
    function($resource, $timeout, ngTableParams, $http, zmsUrlAdapter)
    {
        var zmsTable = {
// <editor-fold defaultstate="collapsed" desc="zmsTable properties">
            restfulNames: ['list', 'add', 'edit', 'view', 'delete'],
            params: {
                listUrl: '',
                addUrl: '',
                editUrl: '',
                viewUrl: '',
                deleteUrl: ''
            },
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="zmsTable init & paseAttr">
            init: function ($scope, $element, $attrs)
            {
                this.parseAttr($scope, $attrs);
            },
            parseAttr: function($scope, $attrs)
            {
//                console.log(location.search);
                for (var i in this.restfulNames) {
                    this.params[ this.restfulNames[i] + 'Url' ] = zmsUrlAdapter.urlWithMode($attrs.restfulCrud + this.restfulNames[i].ucfirst());
                }
                $scope.searchParams = {};
            },
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="zmsTable.loadTable">
            loadTable: function ($scope, $element, $attrs, delayedValues)
            {
                if (typeof delayedValues === 'undefined') {
                    var Api = $resource(this.params.listUrl);
                } else {
                    var Api = $resource(this.params.listUrl + '&' + $.param(delayedValues));
                }
                $scope.tableParams = new ngTableParams(
                    angular.extend(
                        {"page": 1, "count": 20},
                        JSON.parse($attrs.params)
                    ),
                    {
                        total: 0, // length of data
                        getData: function($defer, params) {
                            var newParam = {}, filter = {}, filterType = {};
                            angular.copy(params, newParam);
                            if (angular.isObject($scope.search)) {
                                for (var key in $scope.search) {
                                    if (angular.isObject($scope.search[key])
                                        && ! angular.isUndefined($scope.search[key].model)
                                        && ! angular.isUndefined($scope.search[key].type)
                                    ) {
                                        filter[key] = $scope.search[key].model;
                                        filterType[key] = $scope.search[key].type;
                                    } else {
                                        filter[key] = $scope.search[key];
                                        filterType[key] = 'like';
                                    }
                                }
                            }
                            newParam.parameters({"filter": filter});
                            newParam.parameters({"filterType": filterType});
                            // ajax request to api
                            Api.get(newParam.url(), function(data) {
                                $timeout(function() {
                                    $scope.total = data.data.total;
                                    $scope.csrf = data.csrf;

                                    $scope.loaded = true; 

                                    // update table params
                                    params.total(data.data.total);
                                    // set new data
                                    $defer.resolve(data.data.result);
                                }, 500);
                            });
                        }
                    });
            },
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="zmsTable.delete">
            "delete": function($scope, recordId)
            {
                $http({
                    method: "post",
                    url: zmsTable.params.deleteUrl,
                    data: {"recordId": recordId}
                }).success(function(data, status, headers, config) {
                    $scope.tableParams.reload();
                }).error(function(data, status, headers, config) {
                });
            }
// </editor-fold>
        };
        return zmsTable;
    }]
)
.directive('zmsTable', [
    'zmsTable',
    function(zmsTable) {
        return {
            restrict: 'CA',
            link: function($scope, $element, $attrs)
            {
                if (typeof $attrs.delay !== 'undefined' && $attrs.delay !== null && $attrs.delay !== '') {
                    var delayed = JSON.parse($attrs.delay);
                    var watchTargets = []; var watchName = [];
                    for (var key in delayed) {
                        watchTargets = delayed[ key ];
                        watchName = key;
                    }
                    //  TODO upgrade to angular js 1.3 to use $watchGroup to support multiple watch
//                    $scope.$watchGroup(watchTargets, function(newValue, oldValue) {

                    $scope.$watch(watchTargets, function(newValue, oldValue) {
                        var delayedValues = {};
                        if (newValue !== null && newValue !== oldValue ) {
                            delayedValues[ watchName ] = newValue;
//                          console.log(watchTargets, newValue);
//                          for (var i = 0, total = watchTargets.length; i < total; i++) {
//                              delayedValues[ watchName[i] ] = newValue[i];
//                          }
                            zmsTable.init($scope, $element, $attrs);
                            zmsTable.loadTable($scope, $element, $attrs, delayedValues);
                        }
                    }, true);
                } else {
                    zmsTable.init($scope, $element, $attrs);
                    zmsTable.loadTable($scope, $element, $attrs);
                }

// <editor-fold defaultstate="collapsed" desc="Shortcuts">

                $scope.table = {
                    "search": function()
                    {
                        $scope.tableParams.reload();
                    },
                    "reload": function()
                    {
                        $scope.tableParams.reload();
                    },
                    "sorting": function(option)
                    {
                        $scope.tableParams.sorting(option);
                    },
                    /**
                     * @param int recordId
                     */
                    "delete": function(recordId)
                    {
                        zmsTable.delete($scope, recordId);
                    }
                };

// </editor-fold>
            }
        };
    }]
);
