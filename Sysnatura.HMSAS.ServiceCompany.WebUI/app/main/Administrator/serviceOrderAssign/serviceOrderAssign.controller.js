/***********************************************************************
 Program Name             : serviceOrderAssign.controller.js
 Purpose                  :
 Creation Date            : 28-02-2017
 Created By               : Finson
 Last Modified By         :
 Modification Date        :
 Change Request/Bug Nos   :
/***********************************************************************/

(function ()
{
    'use strict';

    angular
        .module('administrator.serviceOrderAssign')
        .controller('ServiceOrderAssignController', ServiceOrderAssignController);

    /** @ngInject */
    function ServiceOrderAssignController($scope, $interval, $mdSidenav, serviceOrderAssignService, $filter, $state, $rootScope, blockUI)
    {
        var vm = this;
        vm.head = false;
        //vm.companyUsersId = $rootScope.loggedInCompanyId;        
        vm.companyId = $rootScope.loggedInCompanyId;

        //SignalR
        //var connection = $.hubConnection();
        //connection.url = "http://localhost:36365/signalr";
        //var hMSASHub = connection.createHubProxy('hMSASHub');

        //var hMSASHub = $rootScope.hMSASHub;
        
        //Method
        vm.initProcess = initProcess;
        vm.getMyServiceOrders = getMyServiceOrders;        
        vm.orderDetail = orderDetail;
        vm.myOrderDetail = myOrderDetail;
        //vm.processOrder = processOrder;
        vm.getAllServiceOrders = getAllServiceOrders;
        vm.getAllOrderCount = getAllOrderCount;
        vm.getAllNewOrders = getAllNewOrders;
        vm.getAllAcceptedOrders = getAllAcceptedOrders;
        vm.getAllTimedOutOrders = getAllTimedOutOrders;
        vm.getAllRejectedOrders = getAllRejectedOrders;
        vm.getAllCompletedOrders = getAllCompletedOrders;
        vm.getAllCancelledOrders = getAllCancelledOrders;
        vm.getOrderAssignStatusEnum = getOrderAssignStatusEnum;

        function initProcess() {
            if ($rootScope.loggedInCompanyUser != null) {
                if ($rootScope.loggedInCompanyUser.cmpanyUsersDto != null) {
                    vm.companyUsersId = $rootScope.loggedInCompanyUser.cmpanyUsersDto.companyUsersId;
                    if (($rootScope.loggedInCompanyUser.cmpanyUsersDto.serviceCompanyDto.isRealEstate) && ($rootScope.loggedInCompanyUser.cmpanyUsersDto.roleType == 2)) {
                        vm.head = true;
                    }
                    if ($rootScope.loggedInCompanyUser.cmpanyUsersDto.serviceCompanyDto.realEstateId != null) {
                        vm.realEstateId = $rootScope.loggedInCompanyUser.cmpanyUsersDto.serviceCompanyDto.realEstateId;
                    }
                    getAllOrderCount();
                    initSignalR();
                }
            }
            else {
                console.log("Not Ready!");
            }
        }
                
        function initSignalR() {
            if ($rootScope.hMSASHub) {
                //SignalR method for updating dashboard when order status is modified by Customer Care
                $rootScope.hMSASHub.on("updateCompanyOrderCount", function () {
                    //Update dashboard order count
                    vm.getAllOrderCount();
                    //Update the selected order section data
                    if (vm.myServiceOrders != null) {
                        if (vm.new) {
                            vm.getAllNewOrders(vm.companyUsersId);
                        }
                        else if (vm.accepted) {
                            vm.getAllAcceptedOrders(vm.companyUsersId);
                        }
                        else if (vm.timedout) {
                            vm.getAllTimedOutOrders(vm.companyUsersId);
                        }
                        else if (vm.rejected) {
                            vm.getAllRejectedOrders(vm.companyUsersId);
                        }
                        else if (vm.cancelled) {
                            vm.getAllCancelledOrders(vm.companyUsersId);
                        }
                    }
                    $rootScope.showToast("Order list updated...", "info");
                });

                //SignalR method for updating dashboard when order status is modified by other *Company* users
                $rootScope.hMSASHub.on("updateCompanyOrderData", function () {
                    //Update dashboard order count
                    vm.getAllOrderCount();
                    //Update the selected order section data
                    if (vm.myServiceOrders != null) {
                        if (vm.new) {
                            vm.getAllNewOrders(vm.companyUsersId);
                        }
                        else if (vm.accepted) {
                            vm.getAllAcceptedOrders(vm.companyUsersId);
                        }
                        else if (vm.timedout) {
                            vm.getAllTimedOutOrders(vm.companyUsersId);
                        }
                        else if (vm.completed) {
                            vm.getAllCompletedOrders(vm.companyUsersId);
                        }
                        else if (vm.rejected) {
                            vm.getAllRejectedOrders(vm.companyUsersId);
                        }
                        else if (vm.cancelled) {
                            vm.getAllCancelledOrders(vm.companyUsersId);
                        }
                    }
                    $rootScope.showToast("Order list updated...", "info");
                });

                //SignalR method for updating Service Order Section when new *Real Estate* order is placed by Customer
                $rootScope.hMSASHub.on("updateCompanyRealEstateOrders", function () {
                    vm.getAllServiceOrders();
                    $rootScope.showToast("Service Order list updated...", "info");
                });
            }
        }

        //Get All Service Orders
        function getAllServiceOrders()
        {            
            //serviceOrderAssignService.getAllServiceOrders(vm.realEstateId).then(function (res) {
            serviceOrderAssignService.getAllServiceOrders(vm.companyId).then(function (res) {
                vm.tempServiceOrders = res.data;
                //vm.AllserviceOrder = res.data;
                if (vm.tempServiceOrders != null) {
                    if (vm.tempServiceOrders.length != 0) {
                        getAllCompanyBranch();
                    }                   
                }
            }, function (res) {

            });
        }
 
        //Get My Service Orders
        function getMyServiceOrders() { 
          //  blockUI.start();
            serviceOrderAssignService.getMyServiceOrders(vm.companyUsersId).then(function (res) {
                vm.myServiceOrders = res.data;
                //vm.AllserviceOrder = res.data;
                //blockUI.stop();
            }, function (res) {

            });
        }

        function getAllCompanyBranch() {
            serviceOrderAssignService.getAllBranch().then(function (res) {
                vm.companyBranchList = res.data;
                if (vm.companyBranchList != null) {
                    if (vm.companyBranchList.length == 1) {
                        angular.forEach(vm.tempServiceOrders, function (value, key) {
                            getSingleServiceOrder(value.serviceOrderId);
                        });
                    }
                    else {
                        vm.serviceOrders = vm.tempServiceOrders;
                    }
                }
                else {
                    vm.serviceOrders = vm.tempServiceOrders;
                }
            });
        }

        function getSingleServiceOrder(sOrderId) {
            blockUI.start();
            serviceOrderAssignService.getSingleServiceOrder(sOrderId).then(function (res) {
                vm.serviceOrderAssign = {};
                vm.serviceOrderAssign.serviceOrderDto = res.data;
                if (vm.serviceOrderAssign.serviceOrderDto != null) {
                    vm.serviceOrderAssign.branchId = vm.companyBranchList[0].branchId;
                    vm.serviceOrderAssign.assignedBy = null;
                    assignToDefaultBranch();
                }
                blockUI.stop();
            }, function (err) {
                blockUI.stop();
            });
        }

        function assignToDefaultBranch() {
            vm.serviceOrderAssign.serviceOrderId = vm.serviceOrderAssign.serviceOrderDto.serviceOrderId;
            blockUI.start();
            serviceOrderAssignService.saveServiceOrderAssign(vm.serviceOrderAssign).then(function (res) {
                if (res.data.statusCode == "200") {
                    vm.serviceOrders = null;
                    getAllNewOrders();
                    getAllOrderCount();
                    $rootScope.showToast("My Orders list updated...", "info");
                }
                else {
                    console.log('Automatic assigning of service order to default branch failed. Plz do it manually.');
                }
                blockUI.stop();
            }, function (err) {
                blockUI.stop();
            });
        }

        function orderDetail($event, order) {
            $state.go("app.serviceOrderAssignDetail", { orderId: order.serviceOrderId });
        }

        function myOrderDetail($event, order) {
            $state.go("app.serviceOrderAssignDetail", { assignId: order.serviceOrderAssignId });
        }

        //function processOrder($event, order) {
        //    $state.go("app.serviceOrderAssign", { serviceOrderAssignId: order.serviceOrderAssignId });
        //}

        //Get All Service Order Count
        function getAllOrderCount() {
            //  blockUI.start();
            serviceOrderAssignService.getAllOrderCount(vm.companyUsersId).then(function (res) {
                vm.serviceOrderCountList = res.data;
                //blockUI.stop();
            }, function (res) {

            });
        }

        //Get All New Service Orders
        function getAllNewOrders() {
            vm.dataTableTitle = "New Service Orders";
            vm.new = true;
            vm.accepted = false;
            vm.timedout = false;
            vm.completed = false;
            vm.rejected = false;
            vm.cancelled = false;
            vm.widgetSelect = 1;
            //  blockUI.start();
            serviceOrderAssignService.getAllNewOrders(vm.companyUsersId).then(function (res) {
                vm.myServiceOrders = res.data;
                vm.orderHistory = res.data;
                //blockUI.stop();
            }, function (res) {

            });
        }

        //Get All Accepted Service Orders
        function getAllAcceptedOrders() {
            vm.dataTableTitle = "Accepted Service Orders";
            vm.new = false;
            vm.accepted = true;
            vm.timedout = false;
            vm.completed = false;
            vm.rejected = false;
            vm.cancelled = false;
            vm.widgetSelect = 2;
            //  blockUI.start();
            serviceOrderAssignService.getAllAcceptedOrders(vm.companyUsersId).then(function (res) {
                vm.myServiceOrders = res.data;
                vm.orderHistory = res.data;
                //blockUI.stop();
            }, function (res) {

            });
        }

        //Get All Timed-out Service Orders
        function getAllTimedOutOrders() {
            vm.dataTableTitle = "Timed out Service Orders";
            vm.new = false;
            vm.accepted = false;
            vm.timedout = true;
            vm.completed = false;
            vm.rejected = false;
            vm.cancelled = false;
            vm.widgetSelect = 3;
            //  blockUI.start();
            serviceOrderAssignService.getAllTimedOutOrders(vm.companyUsersId).then(function (res) {
                vm.myServiceOrders = res.data;
                vm.orderHistory = res.data;
                //blockUI.stop();
            }, function (res) {

            });
        }

        //Get All Rejected Service Orders
        function getAllRejectedOrders() {
            vm.dataTableTitle = "Rejected Service Orders";
            vm.new = false;
            vm.accepted = false;
            vm.timedout = false;
            vm.completed = false;
            vm.rejected = true;
            vm.cancelled = false;
            vm.widgetSelect = 4;
            //  blockUI.start();
            serviceOrderAssignService.getAllRejectedOrders(vm.companyUsersId).then(function (res) {
                vm.myServiceOrders = res.data;
                vm.orderHistory = res.data;
                //blockUI.stop();
            }, function (res) {

            });
        }

        function getAllCompletedOrders() {
            vm.dataTableTitle = "Completed Service Orders";
            vm.new = false;
            vm.accepted = false;
            vm.timedout = false;
            vm.completed = true;
            vm.rejected = false;
            vm.cancelled = false;
            //  blockUI.start();
            serviceOrderAssignService.getAllCompletedOrders(vm.companyUsersId).then(function (res) {
                vm.myServiceOrders = null;
                vm.orderHistory = res.data;
                //blockUI.stop();
            }, function (res) {

            });
        }

        function getAllCancelledOrders()
        {
            vm.dataTableTitle = "Cancelled Service Orders";
            vm.new = false;
            vm.accepted = false;
            vm.timedout = false;
            vm.completed = false;
            vm.rejected = false;
            vm.cancelled = true;
            //  blockUI.start();
            serviceOrderAssignService.getAllCancelledOrders(vm.companyUsersId).then(function (res) {
                vm.myServiceOrders = null;
                vm.orderHistory = res.data;
                //blockUI.stop();
            }, function (res) {

            });
        }

        //Get OrderAssignStatus Enum
        function getOrderAssignStatusEnum() {
            //  blockUI.start();
            serviceOrderAssignService.getOrderAssignStatusEnum().then(function (res) {
                vm.serviceOrderEnum = res.data;
                //blockUI.stop();
            }, function (res) {

            });

        }
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
    
        //Conncet to Hub: Code block must be placed at the bottom
        //SignalR Connection States: { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' }
        //if (connection.state != 1) {
        //    connection.start({ jsonp: true })
        //         .done(function () {
        //             hMSASHub.invoke("Connect", $rootScope.loggedInCompanyId, $rootScope.loggedInServiceCompanyName, "S");
        //         })
        //     .fail(function (ex) {
        //         console.log('Could not connect: ' + ex);
        //     });
        //}
    }
})();