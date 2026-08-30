/***********************************************************************
 Program Name             :customerList.service.js
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
        .factory('customerListService', customerListService);
   
    /** @ngInject */

    function customerListService($q, msApi, $http, $rootScope) {

       var url = $rootScope.url;
        var service = {
            getAllCustomerList: getAllCustomerList,
            approveRealestate: approveRealestate
           
            }

        function getAllCustomerList() {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "CustomerAddress/GetAllCustomerList"));
            return deferred.promise;
        }
        function approveRealestate(customerAddressId) {
            // Create a new deferred object
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "CustomerAddress/ApproveCustomerAddress?id=" + customerAddressId));
            return deferred.promise;
        }
       return service;
    }
})();