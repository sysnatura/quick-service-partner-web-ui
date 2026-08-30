/***********************************************************************
 Program Name             : branchCreate.controller.js
 Purpose                  :
 Creation Date            : 05-07-2017
 Created By               : Suhail
 Last Modified By         :
 Modification Date        :
 Change Request/Bug Nos   :
/***********************************************************************/

(function () {
    'use strict';

    angular
        .module('administrator.serviceCompanyAtttribute')
        .controller('serviceCompanyAtttributeController', serviceCompanyAtttributeController);

    /** @ngInject */
    function serviceCompanyAtttributeController($scope, $filter, $state, $rootScope, $stateParams, ServiceCompanyAttributesService, blockUI, serviceCompanyEmployeeService) {
        var vm = this;
        vm.saveAttributes = saveAttributes;
        //vm.getAllAttribute = getAllAttribute;
        //Method
        vm.imageUrl = $rootScope.imgurl + "AttributeImages/";
        vm.pageUrl = $rootScope.url;
       vm.isSave = true;
        vm.isVisible = false;
        $scope.items = [];
        $scope.selected = [];
        vm.serviceCompanyId = $rootScope.loggedInCompanyId;
        vm.companyUsersId = $rootScope.loggedInCompanyUser.cmpanyUsersDto.companyUsersId;
        vm.getAllModules = function () {
            blockUI.start(); 
            ServiceCompanyAttributesService.getAllModule(vm.serviceCompanyId).then(function (res) {
                //Sorting based on displayPosition
                vm.moduleList = $filter('orderBy')(res.data, 'displayPosition');
                blockUI.stop();
            });
        }
        vm.changeBranch=function() {
            vm.serviceCompanyAttribute.serviceCompanyModuleId = '';
        }
        vm.BranchByUser = function () {
              blockUI.start();
            serviceCompanyEmployeeService.getAllBranchByUser(vm.companyUsersId).then(function (res) {
                //Sorting based on displayPosition
                vm.branchList = res.data;
                blockUI.stop();
            });
            blockUI.stop();
        }
        vm.getAllAttribute = function () {
          
            var module = $filter('filter')(vm.moduleList, { serviceCompanyModuleId: parseInt(vm.serviceCompanyAttribute.serviceCompanyModuleId) }, true)[0];
            blockUI.start();
            ServiceCompanyAttributesService.getAllAttributes(vm.serviceCompanyId, module.moduleId, vm.serviceCompanyAttribute.branchId).then(function (res) {
                
                $scope.selected = [];
                if (res.data != null) {
                    vm.attributeList = $filter('orderBy')(res.data, 'displayPosition');
                    if (vm.attributeList!=null) {
                        angular.forEach(vm.attributeList, function (object) {

                            if (object.isChecked === true) {
                                $scope.selected.push(object);
                            }
                            $scope.items = vm.attributeList;
                            blockUI.stop();
                        });
                        
                    }
                  
                    vm.isVisible = true;
                    blockUI.stop();
                }
                blockUI.stop();
            }, function (res) {
                
            });
            blockUI.stop();
        }

        //Save
        function saveAttributes() {
            if ($scope.selected.length !== 0) {
                 blockUI.start();
                for (var i = 0; i < $scope.selected.length; i++) {
                    $scope.selected[i].serviceCompanyId = $rootScope.loggedInCompanyId;
                    $scope.selected[i].serviceCompanyModuleId = vm.serviceCompanyAttribute.serviceCompanyModuleId;
                    $scope.selected[i].ServiceCompanyBranchId = vm.serviceCompanyAttribute.branchId;

                }
                
                ServiceCompanyAttributesService.saveAttribute($scope.selected).then(function (res) {
                    if (res.data.statusCode === 200) {
                        $rootScope.showToast("Company services added successfully", "success");

                        blockUI.stop();

                        vm.isSave = true;
                        $state.reload();
                        //$state.reload();
                    } else {
                        blockUI.stop();
                        $rootScope.showToast("Failed to add Company services", "error");
                    }
                }, function () {
                    blockUI.stop();
                    $rootScope.showToast("Failed to add Company services", "error");
                });
            } else {
                ServiceCompanyAttributesService.desleteAllAttribute(vm.serviceCompanyAttribute.serviceCompanyModuleId, vm.serviceCompanyAttribute.branchId).then(function (res) {
                    if (res.data.statusCode === 200) {
                        $rootScope.showToast("Company services  Updated Successfully", "success");

                        blockUI.stop();

                        vm.isSave = true;
                        $state.reload();
                        //$state.reload();
                    } else {
                        blockUI.stop();
                        $rootScope.showToast("Failed to update Company services ", "error");
                    }
                }, function () {
                    blockUI.stop();
                    $rootScope.showToast("Failed to  update Company services ", "error");
                });
            }
        }
    

        // method
        function formClose() {
            $state.go('app.branch');

        }
        //
        // Selecting Modules
        //======================================================================================================================================================

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        };
        $scope.exists = function (item, list) {
            if (list.indexOf(item) > -1) item.minValue = 0.1; else { item.minValue = 0; item.minCostValue = 0; item.maxCostValue = 0; }
            return list.indexOf(item) > -1;
        };
        $scope.isIndeterminate = function () {
            return ($scope.selected.length !== 0 &&
                $scope.selected.length !== $scope.items.length);
        };
        $scope.isCheckedd = function () {
            return $scope.selected.length === $scope.items.length;
        };
        $scope.toggleAll = function () {
            if ($scope.selected.length === $scope.items.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.items.slice(0);
            }
        };

        //======================================================================================================================================================

    }

})();