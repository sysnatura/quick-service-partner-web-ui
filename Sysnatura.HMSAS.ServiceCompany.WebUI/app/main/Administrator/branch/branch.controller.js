/***********************************************************************
 Program Name             : branch.controller.js
 Purpose                  :
 Creation Date            : 05-07-2017
 Created By               : Amal
 Last Modified By         :
 Modification Date        :
 Change Request/Bug Nos   :
/***********************************************************************/

(function ()
{
    'use strict';

    angular
        .module('administrator.branch')
        .controller('BranchController', BranchController);

    /** @ngInject */
    function BranchController($scope, $interval, $mdSidenav, branchService, $filter, $state, $mdDialog, $rootScope, blockUI)
    {
        var vm = this;
         var serviceCompanyId = $rootScope.loggedInCompanyId;
        
        //Method
        vm.getAllBranch = getAllBranch;
        vm.editBranch = editBranch;
        vm.createBranch = createBranch;
        vm.deleteSelectedbranch = deleteSelectedbranch;
        // method


 

        //Get All Branch
        function getAllBranch() { 
            blockUI.start();
            branchService.getAllBranch().then(function (res) {
                vm.branchList = res.data;
               blockUI.stop();
            }, function (res) {

            });
        }
        //-----------------------------------------
  
 
        //Edit
        function editBranch(branch) {
            $state.go('app.branchEdit', { branchId: branch.branchId });
        }

        ////////////   
        function createBranch() {
            $state.go('app.branchCreate');
        }

        //////////// 

        //Delete
        function deleteSelectedbranch(branchId) {
            branchService.deleteBranch(branchId).then(function (res) {
                if (res.data.statusCode == 200) {
                    $rootScope.showToast("Selected Branch Deleted Successfully", "success");
                    getAllBranch();
                }
                else {

                    $rootScope.showToast("failed","error");
                }
            }, function (res) {

                $rootScope.showToast("Failed to delete", "error");
            });
        }
        ///////////
        //Confirm
        //===========================================================================================
        $scope.confirm = function (ev, branchId) {
            // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show($rootScope.confirm(ev)).then(function () {
                vm.deleteSelectedbranch(branchId);
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