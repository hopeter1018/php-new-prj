angular.module('zms.common', [])
.filter('htmlsave', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}])
.filter('humanizeInt', function() {
    return function(int) {
        if (0 !== (cap = Math.floor(int / 1000000))) {
            return cap + 'm+';
        } else if (0 !== (cap = Math.floor(int / 1000))) {
            return cap + 'k+';
        } else {
            return int;
        }
    };
})
// <editor-fold defaultstate="collapsed" desc="ng-directive: zms-icon-[x]">

.directive('zmsIconG', [
    function() {
        return {
            restrict: 'EA',
            link: function($scope, $element, $attrs) {
                $element.prepend('<span class="glyphicon glyphicon-' + $attrs.zmsIconG + '"></span> ');
            }
        };
    }
])

.directive('zmsIconF', [
    function() {
        return {
            restrict: 'EA',
            link: function($scope, $element, $attrs) {
                $element.prepend('<span class="fa fa-' + $attrs.zmsIconF + '"></span> ');
            }
        };
    }
])

// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="ng-directive: zms-input-date">

.directive('zmsInputDate', [
    function() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                'opened': '='
            },
            template: '<span class="input-group-addon cursor-pointer" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></span>',
            link: function($scope, $element, $attrs)
            {
                $scope.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.opened = ! $scope.opened;
                };
            }
        };
    }]
)

// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="ng-directive: zms-effective-date-button">

.directive('zmsEffectiveDateButton', [
    function() {
        return {
            restrict: 'A',
            scope: {
                'opened': '='
            },
            template: '<button type="button" class="btn btn-default" ng-click="open($event)" tooltip="Show Calendar"><i class="glyphicon glyphicon-calendar"></i></button>',
            link: function($scope, $element, $attrs)
            {
                $scope.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.opened = true;
                };
                $scope.clear = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.opened = false;
                };
            }
        };
    }]
)

// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="ng-directive: zms-expiry-date-button">

.directive('zmsExpiryDateButton', [
    function() {
        return {
            restrict: 'A',
            scope: {
                'opened': '=',
                'ngModel': '='
            },
            template: '<button type="button" class="btn btn-default" ng-click="open($event)" tooltip="Show Calendar"><i class="glyphicon glyphicon-calendar"></i></button>\\n\
<button type="button" class="btn btn-default" ng-click="clear($event, model)" tooltip="Never Expire" title="Never Expire"><i class="glyphicon glyphicon-remove"></i></button>',
            link: function($scope, $element, $attrs)
            {
                $scope.open = function($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    $scope.opened = true;
                };
                $scope.clear = function($event, model) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.ngModel = '';
                    $scope.opened = false;
                };
            }
        };
    }]
)

// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="ng-directive: zms-password">

.directive('zmsPassword',
    function() {
        return {
            require: 'ngModel',
            link: function($scope, elem, $attr, ngModel) {
                $scope.referPassword = null;
                $scope.$watch($attr.ngRequired, function(newValue) {
                    $scope.referPassword = newValue;
                });
                $scope.isValid = function(value) {
                    var valid = (typeof value === 'undefined' || value === '' || value.toString().match(/^\w{6,}$/));
                    if (valid && $attr.ngRequired && typeof $scope.referPassword !== 'undefined' && $scope.referPassword !== null) {
                        valid = $scope.referPassword === value;
                    }
                    return valid;
                };

                //For DOM -> model validation
                ngModel.$parsers.unshift(function(value) {
                    var valid = $scope.isValid(value);
                    ngModel.$setValidity('zmsPassword', valid);
                    return valid ? value : undefined;
                });

                //For model -> DOM validation
                ngModel.$formatters.unshift(function(value) {
                    ngModel.$setValidity('zmsPassword', $scope.isValid(value));
                    return value;
                });
            }
        };
})

// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="ng-directive: zms-postback">

.directive('zmsPostback',
    function($http) {
        return {
            require: 'ngModel',
            link: function($scope, elem, $attr, ngModel) {
                var queryString = $attr.zmsPostback;
                $scope.param = null;
                $scope.$watch($attr.param, function(newValue) {
                    $scope.param = newValue;
                });

                //when the scope changes, check the email.
                $scope.$watch($attr.ngModel, function(value) {
                    if (toId) clearTimeout(toId);
                    if (typeof value !== 'undefined') {
                        var toId = setTimeout(function () {
                            $http.get('?m=' + queryString + '&v=' + value + ($scope.param === null ? '' : '&p=' + $scope.param)).success(function (data) {
                                //set the validity of the field
                                ngModel.$setValidity('zmsPostback', data === 'true');
                            });
                        }, 200);
                    }
                });
            }
        };
})

// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="ng-filter: str2date">
.filter('str2date', [
    '$filter', 
    function($filter) {
        return function(dateString) {
            var theFormat = (typeof arguments[1] === 'undefined') ? 'yyyy/MM/dd' : arguments[1];
            return $filter('date')(new Date(dateString), theFormat);
        };
    }
])
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="ng-filter: obj2date / obj2datetime">
.filter('obj2date', [
    '$filter', 
    function($filter) {
        return function(phpDateObj) {
            var theFormat = (typeof arguments[1] === 'undefined') ? 'yyyy/MM/dd' : arguments[1];
            return (typeof phpDateObj !== 'undefined' && phpDateObj !== null
                    && typeof phpDateObj.date !== 'undefined')
                ? $filter('date')(new Date(phpDateObj.date), theFormat)
                : (typeof phpDateObj !== 'undefined' && phpDateObj !== null && phpDateObj !== '')
                    ? $filter('date')(new Date(phpDateObj), theFormat)
                    : '';
        };
    }
])
.filter('obj2datetime', [
    '$filter', 
    function($filter) {
        return function(phpDateObj) {
            var theFormat = (typeof arguments[1] === 'undefined') ? 'yyyy/MM/dd hh:mm:ss' : arguments[1];
            return (typeof phpDateObj !== 'undefined' && phpDateObj !== null
                    && typeof phpDateObj.date !== 'undefined')
                ? $filter('date')(new Date(phpDateObj.date), theFormat)
                : (phpDateObj !== null && phpDateObj !== '')
                    ? $filter('date')(new Date(phpDateObj), theFormat)
                    : '';
        };
    }
])
// </editor-fold>

;
