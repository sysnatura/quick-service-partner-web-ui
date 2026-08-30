/***********************************************************************
 Program Name             : serviceCompanySchedule.service.js
 Purpose                  : Service file for ServiceCompanySchedule
 Creation Date            : 02-03-2017
 Created By               : Finson
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/

(function () {
    'use strict';

    angular

        .module('administrator.serviceOrderAssign')
        .factory('serviceCompanyScheduleService', serviceCompanyScheduleService);

    /** @ngInject */

    function serviceCompanyScheduleService($q, $http, $rootScope) {

        var url = $rootScope.url;
        var service = {
            getSingleCompanySchedule: getSingleCompanySchedule,
            getScheduleByOrderAssignId: getScheduleByOrderAssignId,
            saveCompanySchedule: saveCompanySchedule,
            updateCompanySchedule: updateCompanySchedule,
        }

        function getSingleCompanySchedule(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompanySchedule/GetSingleServiceCompanySchedule/" + id));
            return deferred.promise;
        }

        function getScheduleByOrderAssignId(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompanySchedule/GetScheduleByOrderAssignId/" + id));
            return deferred.promise;
        }

        function saveCompanySchedule(companySchedule) {
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "ServiceCompanySchedule/SaveServiceCompanySchedule", companySchedule));
            return deferred.promise;
        }

        function updateCompanySchedule(companySchedule) {
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "ServiceCompanySchedule/UpdateServiceCompanySchedule", companySchedule));
            return deferred.promise;
        }

        return service;
    }
})();