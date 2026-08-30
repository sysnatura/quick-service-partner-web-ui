/***********************************************************************
 Program Name             : serviceCompanyEmployee.controller.js
 Purpose                  :
 Creation Date            : 01-03-2017
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
        .controller('ServiceCompanyEmployeeController', ServiceCompanyEmployeeController);

    /** @ngInject */
    function ServiceCompanyEmployeeController($scope, $interval, $mdSidenav, serviceCompanyEmployeeService, $filter, $state, $mdDialog, $rootScope)
    {
        var vm = this;
         var serviceCompanyId = $rootScope.loggedInCompanyId;
         vm.employee = [];
         vm.loggedInCompanyUserType = $rootScope.loggedInCompanyUser.cmpanyUsersDto.roleType;
         vm.companyUsersId = $rootScope.loggedInCompanyUser.cmpanyUsersDto.companyUsersId;
        //Method
        vm.getAllServiceCompanyEmployee = getAllServiceCompanyEmployee;
        vm.getAllServiceCompanyEmpByCompanyId = getAllServiceCompanyEmpByCompanyId;
        vm.editserviceCompanyEmployee = editserviceCompanyEmployee;
        vm.deleteSelectedserviceCompanyEmployee = deleteSelectedserviceCompanyEmployee;
        // method


 

        //Get All OrderSection
        function getAllServiceCompanyEmployee() {
 
          //  blockUI.start();
            serviceCompanyEmployeeService.getAllServiceCompanyEmployee().then(function (res) {
                vm.employee = res.data;
               //blockUI.stop();
            }, function (res) {

            });
        }
        //-----------------------------------------

        function getAllServiceCompanyEmpByCompanyId() {

            //  blockUI.start();
            serviceCompanyEmployeeService.getAllServiceCompanyEmpByCompanyId(serviceCompanyId).then(function (res1) {

                //  blockUI.start();
              
                    if (vm.loggedInCompanyUserType == 2) {
                        vm.employee = res1.data;
                    } else {
                        
                        if (res1.data.length !== 0) {
                            serviceCompanyEmployeeService.getAllBranchByUser(vm.companyUsersId).then(function (res2) {
                                vm.branchList = res2.data;
                                if (vm.branchList !== 0) {
                                   
                                    angular.forEach(vm.branchList, function (branch) {
                                        angular.forEach(res1.data, function (object) {

                                            if (object.isGlobalStaff === false&&object.branchId===branch.branchId) {
                                                vm.employee.push(object);
                                            }

                                        });
                                    });

                                }
                             
                            });
                            angular.forEach(res1.data, function (object) {

                                if (object.isGlobalStaff === true ) {
                                    vm.employee.push(object);
                                }

                            });
                          
                        }

                    }
               
                //blockUI.stop();
            }, function (res) {

            });
        }
 
        //Edit
        function editserviceCompanyEmployee(employee) {
            $state.go('app.serviceCompanyEmployeeEdit', { id: employee.serviceCompanyEmployeeId });
        }
        ////////////
        

        //Delete
        function deleteSelectedserviceCompanyEmployee(serviceCompanyEmployeeId) {

            serviceCompanyEmployeeService.deleteEmployee(serviceCompanyEmployeeId).then(function (res) {


                if (res.data.statusCode == 200) {
                    $rootScope.showToast("Selected Employee Deleted Successfully", "success");
                    getAllServiceCompanyEmpByCompanyId();
                }
                if (res.data.statusCode == 500) {
                    $rootScope.showToast("Failed to delete employee", "error");
                   
                }
                if (res.data.statusCode == 600) {
                    $rootScope.showToast("Cannot delete master data", "error");
                    
                }
            }, function (res) {

                $rootScope.showToast("Failed to delete", "error");
            });
        }
        ///////////
        //Confirm
        //===========================================================================================
        $scope.confirm = function (ev, serviceCompanyEmployeeId) {
            // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show($rootScope.confirm(ev)).then(function () {
                vm.deleteSelectedserviceCompanyEmployee(serviceCompanyEmployeeId);
            }, function () {

            });
        };
        //===========================================================================================
    
        /// table
        vm.dtOptions = {
            dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs: [
              {
                  // Target the id column
                  targets: 0,
                  width: '72px'
              }],
            pagingType: 'simple',
            autoWidth: false,
            responsive: true,
            searching: false
        };
        /// table      
    }

})();