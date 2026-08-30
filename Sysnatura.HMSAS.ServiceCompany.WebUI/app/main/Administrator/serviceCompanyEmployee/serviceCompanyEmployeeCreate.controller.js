/***********************************************************************
 Program Name             : serviceCompanyEmployeeCreate.controller.js
 Purpose                  :
 Creation Date            : 02-03-2017
 Created By               : Anuja
 Last Modified By         :
 Modification Date        :
 Change Request/Bug Nos   :
/***********************************************************************/

(function ()
{
    'use strict';

    angular
        .module('administrator.serviceCompanyEmployee')
        .controller('ServiceCompanyEmployeeCreateController', ServiceCompanyEmployeeCreateController);

    /** @ngInject */
    function ServiceCompanyEmployeeCreateController($scope, $interval, $mdSidenav, serviceCompanyEmployeeService, $filter, $state, $rootScope, $stateParams, branchService, blockUI)
    {
        var vm = this;
        vm.employee = {};
        
        //Method
        vm.saveServiceCompanyEmployee = saveServiceCompanyEmployee;
        vm.updateServiceCompanyEmployee = updateServiceCompanyEmployee;
        vm.getAllBranch=getAllBranch;
        vm.formClose = formClose;
        vm.closeDialog = closeDialog;
        vm.pageUrl = $rootScope.url;
        vm.loggedInCompanyUserType = $rootScope.loggedInCompanyUser.cmpanyUsersDto.roleType;
        vm.companyUsersId = $rootScope.loggedInCompanyUser.cmpanyUsersDto.companyUsersId;
        vm.dummynameValue = "";
        //Save
        function saveServiceCompanyEmployee() {
            blockUI.start();
            vm.employee.serviceCompanyId = $rootScope.loggedInCompanyId;
            serviceCompanyEmployeeService.saveEmployee(vm.employee).then(function (res) {
                if (res.data.statusCode == 200) {
                    $rootScope.showToast("Employee Added Successfully", "success");

                    //$state.reload();
                   
                        vm.isSave = true;
                        $state.go('app.serviceCompanyEmployee');
                    blockUI.stop();
                    //$state.reload();
                   } else {

                    $rootScope.showToast("Failed to add employee", "error");
                    blockUI.stop();
                }
            }, function () {

                $rootScope.showToast("Failed to add employee", "error");
                blockUI.stop();
            });
        }
        /////////////

        // mhod
        function formClose() {
           
                $state.go('app.serviceCompanyEmployee');
          
          
        }
        ////////
        // Close dialog
        function closeDialog() {
            $mdDialog.hide();
        }
        //Get All Branch
        function getAllBranch() {
            //  blockUI.start();
            if (vm.loggedInCompanyUserType===2) {
                branchService.getAllBranch().then(function (res) {
                    vm.branchList = res.data;
                    //blockUI.stop();
                }, function (res) {

                });
            } else {
                serviceCompanyEmployeeService.getAllBranchByUser(vm.companyUsersId).then(function (res) {
                    vm.branchList = res.data;
                    //blockUI.stop();
                }, function (res) {

                });
            }
        }
 
        //single campaign
        if ($stateParams.id != null) {
            getSingleServiceCompanyEmployee();
            vm.isUpdate = true;
            
        }

        function getSingleServiceCompanyEmployee() {
            serviceCompanyEmployeeService.getEmployeeById($stateParams.id).then(function (res) {
                vm.employee = res.data;
                vm.dummynameValue = vm.employee.firstName;
            });
        }
        //Update
        if ($stateParams.editserviceCompanyEmployee != null) {
            vm.employee = $stateParams.editserviceCompanyEmployee;
            vm.isUpdate = true;
          
        }
        function updateServiceCompanyEmployee() {
             blockUI.start();
            if (vm.employee.isGlobalStaff===true) {
                vm.employee.branchId = null;
            }
            serviceCompanyEmployeeService.updateEmployee(vm.employee).then(function (res) {
                if (res.data.statusCode == 200) {
                    getSingleServiceCompanyEmployee();
                    $rootScope.showToast("Employee Detail Updated Successfully", "success");
                    blockUI.stop();
                    $state.go('app.serviceCompanyEmployee');
                }
                else {

                    $rootScope.showToast("Failed to update", "error");
                    blockUI.stop();
                }
            },
            function () {

                $rootScope.showToast("Failed to update", "error");
                blockUI.stop();
            });
        }
    }

})();