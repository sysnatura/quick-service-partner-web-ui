/***********************************************************************
 Program Name             : Customer List.controller.js
 Purpose                  : 
 Creation Date            : 06-07-2017
 Created By               : Anuja
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/


(function ()
{
    'use strict';

    angular
        .module('administrator.customerList')
        .controller('CustomerListController', CustomerListController);

    /** @ngInject */

    function CustomerListController($scope, $mdDialog, $document, customerListService, $rootScope, blockUI, $state)
    {

        var vm = this;
        vm.customerList = [];

        //Method
        vm.getAllCustomerList = getAllCustomerList;
        vm.approveRealestate = approveRealestate;
       
       //-------------------------------
       
        //Get All Customer
        function getAllCustomerList() {
            blockUI.start();
            customerListService.getAllCustomerList().then(function (res) {
                vm.customerList = res.data;
                blockUI.stop();
            }, function (res) {
                blockUI.stop();
            });
        }
   //----------------------------------------
        //Approve real Estate
        function approveRealestate(customerAddressId) {
            blockUI.start();
            customerListService.approveRealestate(customerAddressId).then(function (res) {
                $rootScope.showToast("Real estate Approved", "success");
                $state.reload();
                blockUI.stop();
            }, function () {
                //error msg
                blockUI.stop();
            });
        }
        /////////
        //-----------------------------------------
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
      
        //Confirm approve
        //===========================================================================================
        $scope.confirmApprove = function (ev, realEstateId) {
            // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show($rootScope.confirmWithData(ev, 'Approve...', 'Do you want to Approve this real estate?', 'Yes', 'No')).then(function () {
                vm.approveRealestate(realEstateId);
            }, function () {

            });
        };
        //===========================================================================================
    }
})();