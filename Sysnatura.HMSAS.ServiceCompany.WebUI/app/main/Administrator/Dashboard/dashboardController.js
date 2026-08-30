/***********************************************************************
 Program Name             : dashboard.controller.js
 Purpose                  : 
 Creation Date            : 06-10-2017
 Created By               : Suhail
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/


(function () {
    'use strict';

    angular
        .module('administrator.dashboard')
        .controller('DashboardController', DashboardController);

    /** @ngInject */

    function DashboardController($scope, $mdDialog, $document, dashboardService, $rootScope, blockUI, $state, $filter) {

        var vm = this;
        vm.companyUser = [];
        vm.company = {};
        vm.imageUrl = $rootScope.imgurl + "ModuleImages/";
        vm.imageUrl2 = $rootScope.imgurl + "AttributeImages/";
        //Method

        //-------------------------------
        vm.serviceCompanyId = $rootScope.loggedInCompanyId;
        vm.getCompanyProfile = getCompanyProfile;
        vm.getUnselectedAttributes = getUnselectedAttributes;

        $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    if (toState.name != 'app.dashboard' && toState.name != 'app.companyProfile') {
                        if (vm.company != null) {
                            if (vm.company.paymentStatusEnumValue == 'Free') {
                                if (vm.company.initalPaymentDate != null) {
                                    if (new Date(vm.company.initalPaymentDate) < new Date()) {
                                        $rootScope.showToast("Your account expired. Please contact Netizen.", "info");
                                        $rootScope.loadingProgress = false;
                                        event.preventDefault();
                                    }
                                }
                            }
                            else if (vm.company.paymentStatusEnumValue == 'Active') {
                                if (vm.company.lastPaymentDto != null) {
                                    if (new Date(vm.company.lastPaymentDto.paymentTo) < new Date()) {
                                        $rootScope.showToast("Your account expired. Please contact Netizen.", "info");
                                        $rootScope.loadingProgress = false;
                                        event.preventDefault();
                                    }
                                }
                            }
                            else {
                                $rootScope.loadingProgress = false;
                                event.preventDefault();
                            }
                        }
                    }
                })

        //Get All Company user
        function getCompanyProfile() {
            blockUI.start();
            $scope.todayDate = new Date();
            var todaydate = $filter('date')($scope.todayDate, 'dd-MM-yyyy');
            dashboardService.getServiceServiceCompnyByServiceCompanyId($rootScope.loggedInCompanyId, todaydate).then(function (res) {
                vm.company = res.data;
                vm.getUnselectedAttributes();
                blockUI.stop();
            }, function (res) {
                blockUI.stop();
            });
        }

        function getUnselectedAttributes() {
            blockUI.start();
            var createdDate = $filter('date')(vm.company.createdOn, 'dd-MM-yyyy');
            dashboardService.getSingleAttributeAfterCompanyCreateDate($rootScope.loggedInCompanyId, createdDate).then(function (res) {
                vm.attributeList = res.data;
                vm.count = vm.attributeList.length;
                blockUI.stop();
            }, function (res) {
                blockUI.stop();
            });
        }
        //----------------------------------------

    }
})();