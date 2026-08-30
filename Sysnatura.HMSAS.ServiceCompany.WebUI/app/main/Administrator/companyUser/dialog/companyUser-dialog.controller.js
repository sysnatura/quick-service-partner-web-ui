

/***********************************************************************
 Program Name             : companyUser-dialog.controller.js
 Purpose                  : 
 Creation Date            : 05-07-2017
 Created By               : Anuja
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/




(function () {
    'use strict';

    angular
        .module('administrator.companyUser')
        .controller('CompanyUserDialogController', CompanyUserDialogController);

    /** @ngInject */
    function CompanyUserDialogController($mdDialog, CompanyUser, companyUserService, $state, $rootScope, $stateParams, blockUI) {
        var vm = this;

        // Data
        vm.pageUrl = $rootScope.url;
        vm.dummynameValue = "";
        vm.title = 'Edit Company User';
        vm.companyUser = angular.copy(CompanyUser);
        vm.newlanguage = false;
        vm.allFields = false;
        vm.isSave = false;
        if (!vm.companyUser) {
            vm.companyUser = {};
            vm.isSave = true;
            vm.title = 'New Company User';
            vm.newlanguage = true;
        }
        else
        {
            vm.dummynameValue = vm.companyUser.username;
        }
        ///////

        // Methods
        
        vm.closeDialog = closeDialog;
        vm.saveCompanyUser = saveCompanyUser;
        vm.updateCompanyUser = updateCompanyUser;
      
        //////////

        //Save
        function saveCompanyUser() {
            if (!vm.companyUserForm.$invalid) {
                 blockUI.start();
                 companyUserService.saveCompanyUser(vm.companyUser).then(function (res) {

                     if (res.data.statusCode == 200) {
                         $rootScope.showToast("Company User Added Successfully", "success");
                             vm.isSave = true;
                             $state.reload();
                             closeDialog();
                             //}
                     } else {

                         $rootScope.showToast("Failed to add", "error");
                     }
                     blockUI.stop();
                 }, function() {

                     $rootScope.showToast("Failed to add", "error");
                     blockUI.stop();
                 });
                 
                
             }
         }
        /////////


        //Update
        function updateCompanyUser() {
            if (!vm.companyUserForm.$invalid) {
                 blockUI.start();
                 companyUserService.updateCompanyUser(vm.companyUser).then(function (res) {
                     if (res.data.statusCode == 200) {
                         $rootScope.showToast("Company User Updated Successfully","success");
                         closeDialog();
                         $state.reload();
                     } else {
                         $rootScope.showToast("Failed to update", "error");
                     }
                     blockUI.stop();
                 }, function() {
                     $rootScope.showToast("Failed to update", "error");
                     blockUI.stop();
                 });

             }
         }
        /////////


       // Close dialog
        function closeDialog() {
            $mdDialog.hide();
        }
        /////////

    }
})();