/***********************************************************************
 Program Name             : companyProfile.controller.js
 Purpose                  : 
 Creation Date            : 05-10-2017
 Created By               : Suhail
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/


(function () {
    'use strict';

    angular
        .module('administrator.companyProfile')
        .controller('CompanyProfileController', CompanyProfileController);

    /** @ngInject */

    function CompanyProfileController($scope, $mdDialog, $document, serviceCompanyService, $rootScope, blockUI, $state) {

        var vm = this;
        vm.companyUser = [];

        //Method
        
        //-------------------------------
        vm.serviceCompanyId = $rootScope.loggedInCompanyId;
        vm.getCompanyProfile = getCompanyProfile;
        //Get All Company user
        function getCompanyProfile() {
            blockUI.start();
            serviceCompanyService.getServiceServiceCompnyByServiceCompanyId(vm.serviceCompanyId).then(function (res) {
                vm.company = res.data;
                blockUI.stop();
            }, function (res) {
                blockUI.stop();
            });
        }
        //----------------------------------------

    }
})();