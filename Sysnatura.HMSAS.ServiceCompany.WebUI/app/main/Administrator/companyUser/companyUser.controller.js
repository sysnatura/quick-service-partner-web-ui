/***********************************************************************
 Program Name             : companyUser.controller.js
 Purpose                  : 
 Creation Date            : 05-07-2017
 Created By               : Anuja
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/


(function ()
{
    'use strict';

    angular
        .module('administrator.companyUser')
        .controller('CompanyUserController', CompanyUserController);

    /** @ngInject */

    function CompanyUserController($scope, $mdDialog, $document, companyUserService, $rootScope, blockUI, $state)
    {

        var vm = this;
        vm.companyUser = [];

        //Method
        vm.getAllCompanyUser = getAllCompanyUser;
        vm.openCompanyUserDialog = openCompanyUserDialog;
        vm.deleteSelectedCompanyUser = deleteSelectedCompanyUser;
       //-------------------------------

        //Open Dialog
        function openCompanyUserDialog(ev, companyUser) {
            $mdDialog.show({
                controller: 'CompanyUserDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/main/administrator/companyUser/dialog/companyUser-dialog.html',
                parent: angular.element($document.find('#content-container')),
                targetEvent: ev,
                clickOutsideToClose: false,
                locals: {
                    CompanyUser: companyUser,
                    CompanyUsers: vm.companyUser
                }
            });
        }
        //---------------------------------

        //Get All Company user
        function getAllCompanyUser() {
            blockUI.start();
            companyUserService.getAllCompanyUser().then(function (res) {
                vm.companyUser = res.data;
                blockUI.stop();
            }, function (res) {
                blockUI.stop();
            });
        }
   //----------------------------------------
        
        vm.dtOptions = {
            dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs: [
              {
                  // Target the id column
                  targets: 0
                
              }],
            pagingType: 'simple',
            autoWidth: false,
            responsive: true,
            searching: false
        };

        //Delete
        function deleteSelectedCompanyUser(companyUsersId) {
            blockUI.start();
            companyUserService.deleteCompanyUser(companyUsersId).then(function (res) {


                if (res.data.statusCode == 200) {
                    $rootScope.showToast("company User Deleted Successfully", "success");
                    $state.reload();
                }
                else if (res.data.statusCode == 600) {
                    $rootScope.showToast("Failed to delete  master data", "error");

                }
                else {

                    $rootScope.showToast("Failed to delete", "error");
                }
                blockUI.stop();
            }, function (res) {

                $rootScope.showToast("Failed to delete", "error");
                blockUI.stop();
            });
        }
        //--------------------------------------------

        //Confirm
        //===========================================================================================
        $scope.confirm = function (ev, companyUsersId) {
            // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show($rootScope.confirm(ev)).then(function () {
                vm.deleteSelectedCompanyUser(companyUsersId);
            }, function () {

            });
        };
        //===========================================================================================
        
    }
})();