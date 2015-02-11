angular.module('hks.form', [])
.factory('zmsForm',
    ['$http', '$location', '$q', 'zmsUrlAdapter',
    function($http, $location, $q, zmsUrlAdapter)
    {
        var zmsForm = {
// <editor-fold defaultstate="collapsed" desc="zmsForm properties">
            restfulNames: ['edit', 'view', 'launch', 'reject', 'requestApproval'],
            params: {
                editUrl: '',
                viewUrl: '',
                launchUrl: '',
                rejectUrl: '',
                requestApprovalUrl: ''
            },
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="zmsForm init & parseAttr">
            init: function ($scope, $element, $attrs, $routeParams)
            {
                $scope.serverMessage = '';
                $scope.formDataLoaded = false;
                this.parseAttr($scope, $attrs);

                $scope.modeAdd = $routeParams.recordid === "0";
                $scope.modeEdit = $routeParams.recordid !== "0";
            },
            parseAttr: function($scope, $attrs)
            {
                for (var i in this.restfulNames) {
                    this.params[ this.restfulNames[i] + 'Url' ] = zmsUrlAdapter.urlWithMode($attrs.restfulCrud + this.restfulNames[i].ucfirst());
                }
                this.params[ 'uploadUrl' ] = zmsUrlAdapter.urlM($attrs.restfulCrud + 'Upload');
            },
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="zmsForm.get">
            get: function(recordid, $scope)
            {
                $http({
                    method: "post",
                    url: zmsForm.params.viewUrl,
                    data: {
                        "recordId": recordid
                    }
                }).success(function(data, status, headers, config) {
                    $scope.csrf = data.csrf;
                    angular.extend($scope.data, data.data);
                    $scope.formDataLoaded = true;
                    if (typeof $scope.onLoadData === 'function') {
                        $scope.onLoadData(data.data);
                    }
                }).error(function(data, status, headers, config) {
                });
            },
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="zmsForm.save">
            "_upload": function($q, $upload, recordid, i, name, fileObj) {
                var d = $q.defer();
                $upload.upload({
                    url: zmsForm.params.uploadUrl,
                    headers: {'zms-form-upload': true},
                    //method: 'POST' or 'PUT',
                    //withCredentials: true,
                    //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                    // customize file formData name ('Content-Disposition'), server side file variable name. 
                    //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
                    // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                    //formDataAppender: function(formData, key, val){}
                    data: {
                        "recordId": recordid,
                        "index": i,
                        "name": name,
                        "upload": 'true'
                    },
                    file: fileObj.file
                }).success(function (data, status, headers, config) {
                    d.resolve(data);
                });
                return d.promise;
            },
            save: function(recordid, $scope, $upload)
            {
                //  reset server message;
                $scope.serverMessage = '';

                $http({
                    method: "post",
                    url: zmsForm.params.editUrl,
                    data: {
                        "recordId": recordid,
                        "csrf": $scope.csrf,
                        "data": $scope.data
                    }
                }).success(function(data, status, headers, config) {
                    if (! angular.equals({}, $scope.dataFileUpload)) {
                        var qs = [];
                        for (var name in $scope.dataFileUpload) {
                            for (var i = 0, total = $scope.dataFileUpload[name].length; i < total; i++) {
                                console.log($scope.dataFileUpload[name][i]);
                                qs.push(zmsForm._upload($q, $upload, recordid, i, name, $scope.dataFileUpload[name][i]));
                            }
                        }
                        $q.all(qs).then(function(data) {
                            console.log(data);
                        });
                    }

                    $scope.csrf = data.csrf;
                    if (typeof $scope.onSaveData === 'function') {
                        $scope.onSaveData(data.data);
                    }

                    $location.path("/list");
                }).error(function(data, status, headers, config) {
                    $scope.serverMessage = headers()['zms-form-error'];
                    angular.extend($scope.form, data.form);
                });
            },
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="zmsForm.launch">
            launch: function(recordid, $scope)
            {
                $http({
                    method: "post",
                    url: zmsForm.params.launchUrl,
                    data: {
                        "recordId": recordid,
                        "data": $scope.data
                    }
                }).success(function(data, status, headers, config) {
                    if (typeof $scope.onLaunchData === 'function') {
                        $scope.onLaunchData(data);
                    }
                    $location.path("/list");
                }).error(function(data, status, headers, config) {
                    angular.extend($scope.form, data.form);
                });
            },
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="zmsForm.reject">
            reject: function(recordid, $scope)
            {
                $http({
                    method: "post",
                    url: zmsForm.params.rejectUrl,
                    data: {
                        "recordId": recordid,
                        "data": $scope.data
                    }
                }).success(function(data, status, headers, config) {
                    if (typeof $scope.onRejectData === 'function') {
                        $scope.onRejectData(data);
                    }
                    $location.path("/list");
                }).error(function(data, status, headers, config) {
                    angular.extend($scope.form, data.form);
                });
            },
// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="zmsForm.requestApproval">
            requestApproval: function(recordid, $scope)
            {
                $http({
                    method: "post",
                    url: zmsForm.params.requestApprovalUrl,
                    data: {
                        "recordId": recordid,
                        "data": $scope.data
                    }
                }).success(function(data, status, headers, config) {
                    if (typeof $scope.onRequestApprovalData === 'function') {
                        $scope.onRequestApprovalData(data);
                    }
                    $location.path("/list");
                }).error(function(data, status, headers, config) {
                    angular.extend($scope.form, data.form);
                });
            }
// </editor-fold>
        };

        return zmsForm;
    }]
)
// <editor-fold defaultstate="collapsed" desc="ng directive: zms-form">

.directive('zmsForm', [
    'zmsForm', '$http', '$upload', '$routeParams',
    function(zmsForm, $http, $upload, $routeParams) {
        return {
            restrict: 'A',
//            require: 'restfulCrud',
            link: function($scope, $element, $attrs)
            {
                zmsForm.init($scope, $element, $attrs, $routeParams);

                $scope.data = {};
                $scope.dataFileUpload = {};
                $scope.save = function()
                {
                    zmsForm.save($routeParams.recordid, $scope, $upload);
                };
                $scope.launch = function()
                {
                    zmsForm.launch($routeParams.recordid, $scope);
                };
                $scope.reject = function()
                {
                    zmsForm.reject($routeParams.recordid, $scope);
                };
                $scope.requestApproval = function()
                {
                    zmsForm.requestApproval($routeParams.recordid, $scope);
                };
                $scope.addUpload = function($files, $event, name)
                {
                    if (typeof $scope.dataFileUpload[ name ] === 'undefined'
                        || ! $event.target.multiple
                    ) {
                        $scope.dataFileUpload[ name ] = [];
                    }
                    for (var i = 0; i < $files.length; i++) {
                        $scope.dataFileUpload[ name ].push({
                            file: $files[i],
                            ele: $event.target
                        });
                    }
                    console.log($scope.dataFileUpload);
                };

                zmsForm.get($routeParams.recordid, $scope);
            }
        };
    }]
)

// </editor-fold>

.directive('zmsInputFile', [
    function() {
        return {
            restrict: 'A',
            replace: true,
            scope: true,
            template: '<div>\
<input class="form-control" name="{[{ zmsInputFile }]}" type="file" ng-file-select="addUpload($files, $event, zmsInputFile)" />\
<div ng-repeat="file in dataFileUpload[ zmsInputFile ]">{[{ file.file.name }]}</div>\
<div ng-show="fileData[zmsInputFile].length === 1 && fileData[zmsInputFile][0] !== \'\'"><a href="{[{ fileData[zmsInputFile][0] }]}?{[{ dummy }]}" target="_blank">Preview</a></div>\
</div>',
            link: function($scope, $element, $attrs)
            {
                $scope.dummy = new Date();
                $scope.zmsInputFile = $attrs.zmsInputFile;
                $scope.$parent.$watch($attrs.data, function(newValue) {
                    $scope.fileData = newValue;
                });
            }
        };
    }
])

;
