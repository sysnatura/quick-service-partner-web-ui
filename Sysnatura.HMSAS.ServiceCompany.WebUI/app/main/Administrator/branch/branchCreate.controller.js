/***********************************************************************
 Program Name             : branchCreate.controller.js
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
        .controller('BranchCreateController', BranchCreateController);

    /** @ngInject */
    function BranchCreateController($scope, $interval, $mdSidenav, branchService, $filter, $state, $rootScope, $stateParams, addressService, companyUserService, blockUI)
    {
        var vm = this;     
        
        //Method
        vm.saveBranch = saveBranch;
        vm.updateBranch = updateBranch;
        vm.formClose = formClose;
        vm.getAllCountries = getAllCountries;
        vm.getAllStateByCountry = getAllStateByCountry;
        vm.getAllCityByState = getAllCityByState;
        vm.closeDialog = closeDialog;
        vm.transformChip = transformChip;
        vm.onChipRemoved = onChipRemoved;
        vm.loadData = loadData;
 
 


        vm.pageUrl = $rootScope.url;
        vm.dummynameValue = "";
 
       
        //---
        //chips
        vm.loadCompanyUsers = getAllCompanyUsers();
        vm.querySearchCompanyUser = querySearchCompanyUser;
      //  vm.newUser = newUser;
        vm.simulateQueryUser = false;
        vm.isDisabledUser= false;
        vm.autocompleteDemoRequireMatch = true;
        vm.readonly = true;
        vm.selectedChip = [];
        vm.selectedChipCopy = [];        
        vm.selectedCompanyUser = [];
        vm.selectedChips = [];
        vm.isSave

  
        vm.resultUsers = []
        var companyUserList = [];       
        var newUser = null;    
        var noUser = null;
 
        //--


        vm.isUpdate = false;

        // Edit user data  

        function loadData()
        {

            if ($stateParams.branchId != null) {
                blockUI.start();
                branchService.getBranchById($stateParams.branchId).then(function (res) {
                    if (res.data !== null) {
                        vm.branch = res.data;
                        vm.isUpdate = true;
                        vm.title = "Edit Branch";
                        vm.getAllCountries();
                        vm.selectedChip = angular.copy(vm.branch.branchUserDtoList);
                        vm.branchUserDtoListTemp = angular.copy(vm.branch.branchUserDtoList);
                        vm.dummynameValue = vm.branch.name;                
                        vm.branch.addressDto.countryId = vm.branch.addressDto.countryId.toString();
                        vm.branch.addressDto.stateId = vm.branch.addressDto.stateId.toString();
                        vm.getAllCityByState()
                        vm.branch.addressDto.cityId = vm.branch.addressDto.cityId.toString();
                        vm.temporaryAddress = angular.copy(vm.branch.addressDto);
                        getAllCompanyUsers();
                        vm.lastGeoLocation = vm.branch.addressDto.geoLocation;
                        blockUI.stop();

                    }
                   
                }, function (res) {
                    blockUI.stop();
                })
            }

            else {

                vm.title = "Add Branch"
                vm.getAllCountries();
            }

        }


        //Save
        function saveBranch() {
         

            // push branchUserDto
            var newObject = vm.searchText;
            var userObjectList = vm.selectedCompanyUser;
            var test = vm.selectedChip;
            fillInnerObjects();    
            vm.branch.serviceCompanyId = $rootScope.loggedInCompanyId;
      
            if (validateGeoLocation()) {
                blockUI.start();
                branchService.saveBranch(vm.branch).then(function (res) {
                    if (res.data.statusCode == 200) {
                        $rootScope.showToast("Branch Added Successfully", "success");
                        //$state.reload();                   
                        vm.isSave = true;
                        blockUI.stop();
                        $state.go('app.branch');
                        //$state.reload();
                    } else {

                        $rootScope.showToast("failed", "error");
                        blockUI.stop();
                    }
                }, function () {

                    $rootScope.showToast("Failed to add", "error");
                    blockUI.stop();
                });
            }
            else
            {
                $rootScope.showToast("Please enter a valid Geo Location...", "error");
                vm.branch.addressDto.geoLocation = null;
                vm.branch.addressDto.latitude = null;
                vm.branch.addressDto.longitude = null;
            }

        }
        /////////////

        // method
        function formClose() {           
                $state.go('app.branch');         
          
        }
        //
        function fillInnerObjects() {
            // push company user to branchuserTable
            var branchUserDtoList = [];
            angular.forEach(vm.selectedChip, function (userObject, key) {
                var branchUserDto = {};
                branchUserDto.companyUsersId = userObject.companyUsersId;
                branchUserDtoList.push(branchUserDto);

            });
            vm.branch.branchUserDtoList = angular.copy(branchUserDtoList);
            //-----------

        }
        //get all countries

        function getAllCountries() {
            //  blockUI.start();
            addressService.getAllCountry().then(function (res) {
                vm.countryList = res.data;
                if (!vm.isUpdate) setActiveCountry();
                else getAllStateByCountry(vm.branch.addressDto.countryId);
            }, function (res) {
                //   blockUI.stop();
            });
        }
        //----------

      

        ///--

        ////---

        function getAllCompanyUsers() {

            companyUserService.getAllCompanyUser().then(function (result) {
                if (result.data == null || result.data == undefined || result.data.length == 0) {
                    //  alert("No skills Found");
                }
                else {
                    vm.selectedChipCopy = angular.copy(vm.selectedChip);

                    for (var i = 0; i < vm.selectedChipCopy.length; i++) {
                        if (vm.companyUserList != null) {
                            for (var j = 0; j < vm.companyUserList.length; j++) {
                                if (vm.selectedChipCopy[i].companyUsersId == vm.companyUserList[j].companyUsersId) {
                                    vm.companyUserList.splice(j, 1);
                                }
                            }
                        }

                    }
                    vm.companyUserList = result.data;  /// remove Company user that has already added in chips
                    if (vm.branch != null) {
                        if (vm.branch.branchUserDtoList != null) {
                            for (var i = 0; i < vm.branch.branchUserDtoList.length; i++) {
                                if (vm.companyUserList != null) {
                                    for (var j = 0; j < vm.companyUserList.length; j++) {
                                        if (vm.branch.branchUserDtoList[i].companyUsersId == vm.companyUserList[j].companyUsersId) {
                                            vm.companyUserList.splice(j, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (vm.companyUserList != null) {
                        for (var i = 0; i < vm.companyUserList.length; i++) {
                            vm.companyUserList[i].value = vm.companyUserList[i].name.toLowerCase();
                        }
                    }
                }
            }, function (result) {

            })
        }
        //----

        // search function
        function querySearchCompanyUser(query) {
              getAllCompanyUsers();
              if (query == null || query == "" || query.length == 0) {
                  newUser = "";
                  if (vm.companyUserList != null) {
                      companyUserList = query ? vm.companyUserList.filter(createFilterFor(query)) : vm.companyUserList; //,
                  }
              }

              else {
                  if (vm.companyUserList != null) {
                      companyUserList = query ? vm.companyUserList.filter(createFilterFor(query)) : vm.companyUserList; //,
                  }
              }

            // deferred;    
            if (vm.simulateQueryUser) {
                $log.info('Text changed to ');
            } else {
                if (newUser == null || newUser == "") {
                    return companyUserList;
                } else if (newUser == "" && noUser == "") {
                    newUser = null;
                    return newUser;
                }
                else {
                    return newUser;
                }
            }
        }

        //--
        // Create filter function for a query string
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            var temp;
            vm.resultUsers = [];
            angular.forEach(vm.companyUserList, function (obj) {
                if (obj.value != null) {
                    temp = obj.value.includes(lowercaseQuery)
                    if (temp) {
                        vm.resultUsers.push(obj)
                    }
                }
            });
            if (vm.resultUsers.length == 0) {               
                newUser = "";
            }
            else {
                newUser = angular.copy(vm.resultUsers);
            }
            return function filterFn() {
                return (newUser);
            };
        }
        ///**
        //
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {

                for (var i = 0; i < vm.companyUserList.length; i++) {
                    if (chip.companyUsersId == vm.companyUserList[i].companyUsersId) {
                             vm.companyUserList.splice(i, 1);
                    }
                }
                return chip;
            }
        }


        function onChipRemoved(chip, $index) {
             
              if (vm.branch.branchUserDtoList != null) {
                  for (var i = 0; i < vm.branch.branchUserDtoList.length; i++) {
                      if (chip.companyUsersId == vm.branch.branchUserDtoList[i].companyUsersId) {
                          vm.branch.branchUserDtoList.splice(i, 1);
                    }
                }
              }
              getAllCompanyUsers();
        }

        //--

        //get states
        function getAllStateByCountry() {
            if (vm.branch.addressDto != null)
                addressService.getAllStateByCountry(vm.branch.addressDto.countryId).then(function (res) {
                    vm.stateList = res.data;
                     

                }, function (res) {

                });
        }
        //-----------
        //get cities
        function getAllCityByState() {
            if(vm.branch!=null)
            addressService.getAllCityByState(vm.branch.addressDto.stateId).then(function (res) {
                vm.cityList = res.data;
                clearDropdownmenus();
            }, function (res) {

            });
            if (angular.isDefined(vm.states)) {
                var state = {};
                state = $filter('filter')(vm.states, { stateId: parseInt(vm.branch.addressDto.stateId) }, true)[0];
                var emirate = state.name;
                $scope.labelName = $rootScope.dynamicLabel(emirate);
            }
        }
        //----------
        // clear sub dropdowns
        function clearDropdownmenus() {            
                //if (vm.branch.addressDto.addressId == null) {                  
                //    vm.branch.addressDto.cityId = null;
                //}
            if (!vm.isUpdate) {
                vm.branch.addressDto.cityId = null;
            }
            else if ((vm.temporaryAddress.stateId !== vm.branch.addressDto.stateId)) 
            {
                   vm.branch.addressDto.cityId = null;
                }                   
           
               
            }
       
        //-------------------
        // set active countries
        function setActiveCountry() {
              {
                  var activeCountry = $filter('filter')(vm.countryList, { recordStatus: 0 })[0];
                  if (vm.branch==null){
                      vm.branch = {};
                      if (vm.branch.addressDto == null) {
                          vm.branch.addressDto = {};
                      }
                      }
                vm.branch.addressDto.countryId = activeCountry.countryId.toString();
                getAllStateByCountry(activeCountry.countryId)
            }
        }
        //-----------------

        ////////
        // Close dialog
        function closeDialog() {
            $mdDialog.hide();
        }

      
 

        //======================================================================================================================================================


        function updateBranch() {      
            var newObject = vm.searchText;
            var userObjectList = vm.selectedCompanyUser;         

            fillInnerObjects();
            vm.branch.serviceCompanyId = $rootScope.loggedInCompanyId;
  
            if (validateGeoLocation()) {
                blockUI.start();
                branchService.updateBranch(vm.branch).then(function (res) {
                    if (res.data.statusCode == 200) {
                        blockUI.stop();
                        $rootScope.showToast("Branch Detail Updated Successfully", "success");

                        $state.go('app.branch');
                    }
                    else {

                        $rootScope.showToast("failed", "error");
                        blockUI.stop();
                    }
                },
          function () {

              $rootScope.showToast("Failed to update", "error");
              blockUI.stop();
          });
            }
            else
            {
                $rootScope.showToast("Please enter a valid Geo Location...", "error");
                vm.branch.addressDto.geoLocation = null;
                vm.branch.addressDto.latitude = null;
                vm.branch.addressDto.longitude = null;
            }
          
        }


        // Geo Location
        //Location ngAutocomplete
        //======================================================================================================================================================

        vm.locationFilters = $rootScope.locationFilters;
        vm.locationDetails = $rootScope.locationDetails;

        //added by Amal ============================================================================================
        //validating geolocation/ 04/12/2017
        function validateGeoLocation() {
            var bRet = true;
            if ((vm.branch.addressDto.geoLocation == null) || (vm.branch.addressDto.geoLocation == null) || (vm.branch.addressDto.geoLocation == null)) {
                bRet = false;
            } else if (vm.branch.addressDto.geoLocation !== vm.lastGeoLocation) {
                bRet = false;
            }
            return bRet;
        }

        $scope.$watch('vm.locationDetails', function () {
            if (vm.locationDetails != null  ) {
                if (vm.locationDetails.geometry != null) {
                    vm.branch.addressDto.latitude = vm.locationDetails.geometry.location.lat();
                    vm.branch.addressDto.longitude = vm.locationDetails.geometry.location.lng();
                    vm.lastGeoLocation = vm.branch.addressDto.geoLocation;
                }
            }
        });

        //$scope.$watch('vm.branch.addressDto.geoLocation', function () {
        //    if (vm.locationDetails != null && vm.addressDto != null) {
        //        if (vm.locationDetails.formatted_address !== vm.addressDto.geoLocation) {
        //            vm.locationDetails = null;
        //            vm.addressDto.latitude = null;
        //            vm.addressDto.longitude = null;
        //        }
        //    }
        //});

        //======================================================================================================================================================



    }

})();