/***********************************************************************
 Program Name             : serviceOrderAssign.service.js
 Purpose                  : Service file for ServiceOrderAssign
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
        .factory('serviceOrderAssignService', serviceOrderAssignService);
   
    /** @ngInject */

    function serviceOrderAssignService($q,  $http, $rootScope) {

       var url = $rootScope.url;
        var service = {
            getMyServiceOrders: getMyServiceOrders,            
            getSingleServiceOrderAssign: getSingleServiceOrderAssign,
            getSingleServiceOrder: getSingleServiceOrder,
            saveServiceOrderAssign: saveServiceOrderAssign,
            updateServiceOrderAssign: updateServiceOrderAssign,
            updateServiceOrderDate: updateServiceOrderDate,
            getAllServiceOrders: getAllServiceOrders,
            getAllOrderCount: getAllOrderCount,
            getAllNewOrders: getAllNewOrders,
            getAllAcceptedOrders: getAllAcceptedOrders,            
            getAllTimedOutOrders: getAllTimedOutOrders,
            getAllRejectedOrders: getAllRejectedOrders,
            getAllCompletedOrders: getAllCompletedOrders,
            getAllCancelledOrders: getAllCancelledOrders,
            getOrderAssignStatusEnum: getOrderAssignStatusEnum,
            getServiceOrderPublicLog: getServiceOrderPublicLog,
            getAllBranch: getAllBranch
        }

        function getMyServiceOrders(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetAllServiceOrderAssignByCompanyId/" + id));
            return deferred.promise;
        }

        //function getAllServiceOrders(id) {
        //    var deferred = $q.defer();
        //    deferred.resolve($http.get(url + "ServiceOrder/GetAllServiceOrderByRealEstateId/" + id));
        //    return deferred.promise;
        //}

        function getAllServiceOrders(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrder/GetAllRealEstServiceOrderByComp/" + id));
            return deferred.promise;
        }

        function getSingleServiceOrderAssign(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetSingleServiceOrderAssign/" + id));
            return deferred.promise;
        }

        function getSingleServiceOrder(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrder/GetSingleServiceOrder/" + id));
            return deferred.promise;
        }

        function saveServiceOrderAssign(serviceOrder)
        {
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "ServiceOrderAssign/SaveServiceOrderAssign", serviceOrder));
            return deferred.promise;
        }

        function updateServiceOrderAssign(serviceOrderAssign) {
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "ServiceOrderAssign/UpdateServiceOrderAssign", serviceOrderAssign));
            return deferred.promise;
        }

        function updateServiceOrderDate(serviceOrderAssign) {
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "ServiceOrder/UpdateServiceOrderDate", serviceOrderAssign));
            return deferred.promise;
        }

        function getAllOrderCount(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetAllOrderCount/" + id));
            return deferred.promise;
        } 
   
        function getAllNewOrders(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetAllNewOrders?companayUserId=" + id));
            return deferred.promise;
        }

        function getAllAcceptedOrders(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetAllAcceptedOrders/" + id));
            return deferred.promise;
        }        

        function getAllTimedOutOrders(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetAllTimedOutOrders/" + id));
            return deferred.promise;
        }

        function getAllRejectedOrders(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetAllRejectedOrders/" + id));
            return deferred.promise;
        }

        function getAllCompletedOrders(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetAllCompletedOrders/" + id));
            return deferred.promise;
        }

        function getAllCancelledOrders(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetAllCancelledOrders/" + id));
            return deferred.promise;
        }

        //Get OrderAssignStatus Enum
        function getOrderAssignStatusEnum() {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetOrderAssignStatusEnum"));
            return deferred.promise;
        }

        function getServiceOrderPublicLog(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceOrderAssign/GetServiceOrderPublicLog/" + id));
            return deferred.promise;
        }

        function getAllBranch() {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "Branch/GetAllLoggedInServiceCompaniesBranches"));
            return deferred.promise;
        }

        return service;
    }
})();