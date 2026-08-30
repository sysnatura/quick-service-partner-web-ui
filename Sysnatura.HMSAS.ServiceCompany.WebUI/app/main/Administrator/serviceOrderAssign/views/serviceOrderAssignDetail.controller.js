/***********************************************************************
 Program Name             : serviceOrderAssignDetail.controller.js
 Purpose                  : 
 Creation Date            : 28-02-2017
 Created By               : Finson
 Modified By              : 
 Modification Date        :  
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/

(function () {
    'use strict';

    angular
        .module('administrator.serviceOrderAssign')
        .controller('ServiceOrderAssignDetailController', ServiceOrderAssignDetailController);

    /** @ngInject */
    function ServiceOrderAssignDetailController($scope, $state, $stateParams, $mdSidenav, msUtils, $mdDialog, $document, serviceOrderAssignService, $window, $mdToast, $rootScope, $filter, uiGmapGoogleMapApi, serviceCompanyEmployeeService, serviceCompanyScheduleService, blockUI) {
        var vm = this;
        vm.allowAssign = false;
        vm.allowReschedule = false;
        vm.allowComplete = false;
        vm.allowReject = false;
        vm.orderRejected = false;
        vm.currentDate = new Date();
        vm.sDateModified = false; //For identifying service/alternate date modification

        //SignalR
        //var connection = $.hubConnection();
        //connection.url = "http://localhost:36365/signalr";
        //var hMSASHub = connection.createHubProxy('hMSASHub');

        //var hMSASHub = $rootScope.hMSASHub;

        //Method
        vm.initProcess = initProcess;
        vm.showIndex = showIndex;
        vm.getSingleServiceOrderAssign = getSingleServiceOrderAssign;
        vm.getServiceCompanyEmpList = getServiceCompanyEmpList;
        vm.showEmpDetails = showEmpDetails;
        vm.assignEmp = assignEmp;
        vm.rejectOrder = rejectOrder;
        vm.completeOrder = completeOrder;
        vm.showBranchdetails = showBranchdetails;
        vm.assignBranch = assignBranch;
        vm.updateServiceDate = updateServiceDate;

        function initProcess() {
            if ($rootScope.loggedInCompanyUser != null) {
                if ($rootScope.loggedInCompanyUser.cmpanyUsersDto != null) {
                    vm.companyUsersId = $rootScope.loggedInCompanyUser.cmpanyUsersDto.companyUsersId;
                    initSignalR();
                }
            }
            //Load Service Order Assign Details
            if ($stateParams.assignId) {
                vm.aOrderId = $stateParams.assignId;
                getOrderAssignStatusEnum();
                getSingleServiceOrderAssign();
            }

            //Load Service Order Details (Real Estate Orders)
            if ($stateParams.orderId) {
                vm.sOrderId = $stateParams.orderId;
                getSingleServiceOrder();
                getAllBranch();
            }
        }

        //Go to index page
        function showIndex() {
            $state.go("app.serviceOrderAssign");
        }        
                
        function initSignalR() {
            if ($rootScope.hMSASHub) {
                //SignalR method for updating order details when an order is modified by other *Company* users
                $rootScope.hMSASHub.on("updateCompanyOrderData", function () {
                    //Refresh order details
                    vm.getSingleServiceOrderAssign();
                    vm.sDateModified = false;
                    $rootScope.showToast("Order list updated...", "info");
                });
                //SignalR method for updating order details when an order is modified by Customer Care
                $rootScope.hMSASHub.on("UpdateCompanyOrderCount", function () {
                    //Refresh order details
                    vm.getSingleServiceOrderAssign();
                    vm.sDateModified = false;
                    $rootScope.showToast("Order list updated...", "info");
                });
            }
        }

        function getSingleServiceOrder() {
            serviceOrderAssignService.getSingleServiceOrder(vm.sOrderId).then(function (res) {
                vm.serviceOrderAssign = {};
                vm.serviceOrderAssign.serviceOrderDto = res.data;
                if (vm.serviceOrderAssign.serviceOrderDto.serviceOrderAddressDto != null) {
                    vm.custAddress = vm.serviceOrderAssign.serviceOrderDto.serviceOrderAddressDto;
                    setLocationMap();
                }
            });
        }

        function getAllBranch()
        {
            serviceOrderAssignService.getAllBranch().then(function (res) {
                vm.companyBranchList = res.data;
            });
        }

        function showBranchdetails(branch) {
            vm.branch = branch;
        }

        function assignBranch()
        {
            vm.serviceOrderAssign.serviceOrderId = vm.serviceOrderAssign.serviceOrderDto.serviceOrderId;
            blockUI.start();
            serviceOrderAssignService.saveServiceOrderAssign(vm.serviceOrderAssign).then(function (res) {
                if (res.data.statusCode == "200") {
                    $rootScope.showToast("Service order assigned successfully...", "success");
                    $state.go("app.serviceOrderAssign");
                }
                else {
                    $rootScope.showToast("Failed to assign service order", "error");
                }
                blockUI.stop();
            }, function (err) {
                blockUI.stop();
            });
        }

        function getSingleServiceOrderAssign() {
            blockUI.start();
            serviceOrderAssignService.getSingleServiceOrderAssign(vm.aOrderId).then(function (res) {
                vm.serviceOrderAssign = res.data;
                vm.serviceOrderAssign.serviceOrderDto.serviceDate = new Date(vm.serviceOrderAssign.serviceOrderDto.serviceDate);
                vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate = new Date(vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate);

                $scope.serviceDate = vm.serviceOrderAssign.serviceOrderDto.serviceDate; //To use in $scope.$watch
                $scope.alternativeServiceDate = vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate; //To use in $scope.$watch                

                if (vm.serviceOrderAssign.orderAssignStatusText == "Orderrejected")
                {
                    vm.serviceOrderAssign.orderAssignStatusText = "Cancelled";
                }

                if (vm.orderStatusTextEnum != null) {
                    //Allow user to assign the new order to an employee
                    if (vm.serviceOrderAssign.orderAssignStatus == vm.orderStatusTextEnum.indexOf("ASSIGNED")) {
                        vm.allowAssign = true;
                        vm.allowReschedule = false;
                        vm.allowReject = true;
                        vm.allowComplete = false;
                    }

                    //Allow user to mark the order as Complete (To show the Complete Buttom)
                    if (vm.serviceOrderAssign.orderAssignStatus == vm.orderStatusTextEnum.indexOf("ACCEPTED")) {
                        vm.allowAssign = false;
                        vm.allowReschedule = true;
                        vm.allowReject = true;
                        vm.allowComplete = true;
                        serviceCompanyScheduleService.getScheduleByOrderAssignId(vm.serviceOrderAssign.serviceOrderAssignId).then(function (rslt) {
                            vm.serviceCompanySchedule = rslt.data;
                        });
                    }

                    //For orders that are Cancelled by Customer Care after Assigning to Service Company
                    if (vm.serviceOrderAssign.orderAssignStatus == vm.orderStatusTextEnum.indexOf("ORDERREJECTED")) {
                        vm.allowAssign = false;
                        vm.allowReschedule = false;
                        vm.allowReject = false;
                        vm.allowComplete = false;
                        vm.orderCancelled = true;
                    }

                    //For orders that are Timedout Assigning to Service Company
                    if (vm.serviceOrderAssign.orderAssignStatus == vm.orderStatusTextEnum.indexOf("TIMEDOUT")) {
                        vm.allowAssign = false;
                        vm.allowReschedule = false;
                        vm.allowReject = false;
                        vm.allowComplete = false;
                        vm.orderTimedOut = true;
                    }

                    //For orders that are Rejected by Service Company
                    if (vm.serviceOrderAssign.orderAssignStatus == vm.orderStatusTextEnum.indexOf("REJECTED")) {
                        vm.allowAssign = false;
                        vm.allowReschedule = false;
                        vm.allowReject = false;
                        vm.allowComplete = false;
                        vm.orderRejected = true;
                    }

                    //For orders that are Completed by Service Company
                    if (vm.serviceOrderAssign.orderAssignStatus == vm.orderStatusTextEnum.indexOf("COMPLETED")) {
                        vm.allowAssign = false;
                        vm.allowReschedule = false;
                        vm.allowReject = false;
                        vm.allowComplete = false;
                        vm.orderCompleted = true;
                    }
                }
                //Get Service Company Employee List
                getServiceCompanyEmpList($rootScope.loggedInCompanyId, vm.companyUsersId);

                //Get the Customer address selected for this Service Order 
                if (vm.serviceOrderAssign.serviceOrderDto.serviceOrderAddressDto != null)
                {
                    vm.custAddress = vm.serviceOrderAssign.serviceOrderDto.serviceOrderAddressDto;
                    setLocationMap();                                
                }
                blockUI.stop();
            }, function (res) {
                blockUI.stop();
            })
        }

        $scope.$watch('vm.serviceOrderAssign.serviceOrderDto.serviceDate', function (ev) {
            if ($scope.serviceDate != null) {
                if (vm.serviceOrderAssign != null) {
                    if (vm.serviceOrderAssign.serviceOrderDto != null) {
                        if ($scope.serviceDate != vm.serviceOrderAssign.serviceOrderDto.serviceDate) {
                            vm.sDateModified = true;
                        }
                    }
                }
            }
        });

        $scope.$watch('vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate', function (ev) {
            if ($scope.alternativeServiceDate != null) {
                if (vm.serviceOrderAssign != null) {
                    if (vm.serviceOrderAssign.serviceOrderDto != null) {
                        if ($scope.alternativeServiceDate != vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate) {
                            vm.sDateModified = true;
                        }
                    }
                }
            }
        });

        function updateServiceDate(ev) {
            $mdDialog.show($rootScope.confirmWithData(ev, 'Confirm', 'Would you like to update service/alternate date?', 'Yes', 'No')).then(function () {
                vm.sDateModified = false;
                if (vm.serviceOrderAssign != null) {
                    if (vm.serviceOrderAssign.orderAssignStatus == 0) {
                        if (vm.serviceOrderAssign.serviceOrderDto != null) {
                            if (($scope.serviceDate != vm.serviceOrderAssign.serviceOrderDto.serviceDate)
                                || ($scope.alternativeServiceDate != vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate)) {
                                blockUI.start();
                                serviceOrderAssignService.updateServiceOrderDate(vm.serviceOrderAssign).then(function (res) {
                                    if (res.data.statusCode == "200") {
                                        if (($scope.serviceDate != vm.serviceOrderAssign.serviceOrderDto.serviceDate)
                                            && ($scope.alternativeServiceDate != vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate)) {
                                            $rootScope.showCustomToast("Service date & alternate date updated...");
                                        }
                                        else if ($scope.serviceDate != vm.serviceOrderAssign.serviceOrderDto.serviceDate) {
                                            $rootScope.showCustomToast("Service date updated...");
                                            $scope.serviceDate = vm.serviceOrderAssign.serviceOrderDto.serviceDate;
                                        }
                                        else {
                                            $rootScope.showCustomToast("Alternate service date updated...");
                                            $scope.alternativeServiceDate = vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate;
                                        }
                                    }
                                    else {
                                        if (($scope.serviceDate != vm.serviceOrderAssign.serviceOrderDto.serviceDate)
                                           && ($scope.alternativeServiceDate != vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate)) {
                                            $rootScope.showCustomToast("Failed to update service date & alternate date...");
                                        }
                                        else if ($scope.serviceDate != vm.serviceOrderAssign.serviceOrderDto.serviceDate) {
                                            $rootScope.showCustomToast("Failed to update service date...");
                                            vm.serviceOrderAssign.serviceOrderDto.serviceDate = $scope.serviceDate;
                                        }
                                        else {
                                            $rootScope.showCustomToast("Alternate service date updated...");
                                            vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate = $scope.alternativeServiceDate;
                                        }
                                        vm.serviceOrderAssign.serviceOrderDto.serviceDate = $scope.serviceDate;
                                        vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate = $scope.alternativeServiceDate;
                                    }
                                    blockUI.stop();
                                }, function (err) {
                                    blockUI.stop();
                                });
                            }
                        }
                    }
                }
            }, function () {
                vm.sDateModified = false;
                vm.serviceOrderAssign.serviceOrderDto.serviceDate = $scope.serviceDate;
                vm.serviceOrderAssign.serviceOrderDto.alternativeServiceDate = $scope.alternativeServiceDate;
                $rootScope.showCustomToast("Service/alternate date changes reverted...");
            });
        }


            //function calculateAge(birthday) { // birthday is a date
            //    var ageDifMs = Date.now() - birthday.getTime();
            //    var ageDate = new Date(ageDifMs); // miliseconds from epoch
            //    return Math.abs(ageDate.getUTCFullYear() - 1970);
            //}

            //Get OrderAssignStatus Enum
            function getOrderAssignStatusEnum() {
            serviceOrderAssignService.getOrderAssignStatusEnum().then(function (res) {
                vm.orderStatusTextEnum = res.data;
            }, function (res) { 

            })
        }

            //Set Location on map
            function setLocationMap() {
            if (vm.custAddress != null) {
                //To show the customer location on Google Map
                $scope.map = { center: { latitude: vm.custAddress.latitude, longitude: vm.custAddress.longitude }, zoom: 10
            };
                $scope.options = { draggable: true, scrollwheel: true
            }; //Map

                //Marker----Start
                vm.marker = {
                        id: 2,
                        coords: {
                                latitude: vm.custAddress.latitude,
                                longitude: vm.custAddress.longitude
                },
                        content: vm.custAddress.geoLocation,
                        options: {
                                draggable: false,
                            //labelContent: 'You are here',
                            //labelClass: "marker-labels"
                },
                        events: {
                                click: function () {
                                    //Info Window----Start
                            vm.infoWin = {
                                    coords: {
                                            latitude: vm.marker.coords.latitude,
                                            longitude: vm.marker.coords.longitude
                            },

                                    infoWinOptions: {
                                            visible: true,
                                            pixelOffset: { height: -32, width: 0
                                    }
                            }
                                }
                                    //Info Window----End
                        }
                }
            };
                //Marker----End
            }
        }

            function getServiceCompanyEmpList(companyId, companyUserId) {
            blockUI.start();
            serviceCompanyEmployeeService.getAllServiceCompanyEmp(companyId, companyUserId).then(function (res) {
                vm.serviceCompanyEmpList = res.data;
                //vm.serviceCompanyEmpList = $filter('filter')(vm.CompanyEmpList, { branchId: vm.serviceOrderAssign.branchId , isGlobalStaff : false});
                //angular.forEach(vm.CompanyEmpList, function (employee) {

                //    if (employee.isGlobalStaff === true) {
                //        vm.serviceCompanyEmpList.push(employee);
                //    }

                //});
                if (vm.serviceCompanySchedule != null) {
                    if (vm.serviceCompanySchedule.companyEmployeeId != null) {
                        showEmpDetails(vm.serviceCompanyEmpList.getById(vm.serviceCompanySchedule.companyEmployeeId));
                }
            }
                blockUI.stop();
            }, function (res) {
                blockUI.stop();
            })
        }

        $scope.filterEmployee = function (employee) {
            return employee.branchId == vm.serviceOrderAssign.branchId || employee.isGlobalStaff;
        }

            function showEmpDetails(emp) {
            vm.emp = {
            };
            vm.emp.empId = emp.serviceCompanyEmployeeId;
            vm.emp.fName = emp.firstName;
            vm.emp.lName = emp.lastName;
            vm.emp.desig = emp.designation;
            vm.emp.isGlobalStaff = emp.isGlobalStaff;
        }

            function assignEmp() {
            vm.serviceOrderAssign.orderAssignStatus = vm.orderStatusTextEnum.indexOf("ACCEPTED");
            vm.serviceCompanySchedule.serviceOrderAssignId = vm.aOrderId;
            vm.serviceCompanySchedule.serviceCompanyId = vm.serviceOrderAssign.branchDto.serviceCompanyId;
                //vm.serviceCompanySchedule.serviceOrderAssignDto = vm.serviceOrderAssign;
            blockUI.start();
            serviceCompanyScheduleService.saveCompanySchedule(vm.serviceCompanySchedule).then(function (res) {
                if (res.status == "200") {
                    //vm.allowComplete = true;
                    if ($rootScope.hMSASHub) {
                        //For updating Admin side count when data is updated in Company side data
                        $rootScope.hMSASHub.invoke("UpdateAdminOrderCount");
                        //For updating Company side data for all connected *Company* users
                        $rootScope.hMSASHub.invoke("UpdateCompanyOrderData", $rootScope.loggedInCompanyId);
                        //For updating Customer side Order List page data
                        $rootScope.hMSASHub.invoke("CustomerOrderDataUpdateByCompany", vm.serviceOrderAssign.serviceOrderDto.customerId);
                }
                    $rootScope.showToast("Service order assigned to " + vm.emp.fName + (vm.emp.lName != null ? " " + vm.emp.lName : ''), "info");
                    getSingleServiceOrderAssign();
                }
                else {
                    $rootScope.showToast("Failed to assign service order", "error");
            }
                blockUI.stop();
            }, function (res) {
                blockUI.stop();
            })
        }

            function rejectOrder(ev) {
            $mdDialog.show($rootScope.confirmWithData(ev, 'Reject Order', 'Reject this Service Order?', 'Yes', 'No')).then(function () {
                vm.serviceOrderAssign.orderAssignStatus = vm.orderStatusTextEnum.indexOf("REJECTED");
                blockUI.start();
                serviceOrderAssignService.updateServiceOrderAssign(vm.serviceOrderAssign).then(function (res) {
                    if (res.status == "200") {
                        if ($rootScope.hMSASHub) {
                            //For updating Admin side count when data is updated in Company side data
                            $rootScope.hMSASHub.invoke("UpdateAdminOrderCount");
                            //For updating Company side data for all connected *Company* users
                            $rootScope.hMSASHub.invoke("UpdateCompanyOrderData", $rootScope.loggedInCompanyId);
                            if (vm.serviceOrderAssign.serviceOrderDto.isRealEstate) {
                                //For updating Customer side Order List page data
                                $rootScope.hMSASHub.invoke("CustomerOrderDataUpdateByCompany", vm.serviceOrderAssign.serviceOrderDto.customerId);
                        }
                    }
                        $rootScope.showCustomToast("Service order Rejected");

                        vm.allowAssign = false;
                        vm.allowReschedule = false;
                        vm.allowReject = false;
                        vm.allowComplete = false;
                        vm.orderRejected = false;
                        getSingleServiceOrderAssign();
                    }
                    else {
                        $rootScope.showToast("Failed to reject service order", "error");
                }
                    blockUI.stop();
                }, function (res) {
                    blockUI.stop();
                })
            }, function () { 

            });
        }

            function completeOrder() {
            vm.serviceOrderAssign.orderAssignStatus = vm.orderStatusTextEnum.indexOf("COMPLETED");
            blockUI.start();
            serviceOrderAssignService.updateServiceOrderAssign(vm.serviceOrderAssign).then(function (res) {
                if (res.status == "200") {
                    if ($rootScope.hMSASHub) {
                        //For updating Admin side count when data is updated in Company side data
                        $rootScope.hMSASHub.invoke("UpdateAdminOrderCount");
                        //For updating Company side data for all connected *Company* users
                        $rootScope.hMSASHub.invoke("UpdateCompanyOrderData", $rootScope.loggedInCompanyId);
                        //For updating Cusomer side Order List page data
                        $rootScope.hMSASHub.invoke("CustomerOrderDataUpdateByCompany", vm.serviceOrderAssign.serviceOrderDto.customerId);
                }
                    $rootScope.showCustomToast("Service order status updated as Complete");

                    vm.allowAssign = false;
                    vm.allowReschedule = false;
                    vm.allowReject = false;
                    vm.allowComplete = false;
                    vm.orderCompleted = true;
                    getSingleServiceOrderAssign();
                }
                else {
                    $rootScope.showToast("Failed to update service order status", "error");
            }
                blockUI.stop();
            }, function (res) {
                blockUI.stop();
            })
        }

            //function sentenceCase(str) {
            //    if ((str === null) || (str === ''))
            //        return false;
            //    else
            //        str = str.toString();

            //    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            //}

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

            //Array prototype: Get by id
        Array.prototype.getById = function (value) {
            return this.filter(function (x) {
                return x.serviceCompanyEmployeeId === parseInt(value);
            })[0];
        };
    }
})();