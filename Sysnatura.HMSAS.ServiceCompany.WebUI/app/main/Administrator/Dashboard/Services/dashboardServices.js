/***********************************************************************
 Program Name             : serviceCompany.service.js
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

        .module('administrator.dashboard')
        .factory('dashboardService', dashboardService);

    /** @ngInject */

    function dashboardService($q, msApi, $http, $rootScope) {

        var url = $rootScope.url;


        //function getAllServiceCompany() {

        //    var deferred = $q.defer();
        //    deferred.resolve($http.get(url + "ServiceCompany/GetAllServiceCompany"));
        //    return deferred.promise;
        //}
        function getServiceServiceCompnyByServiceCompanyId(id, today) {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompany/GetSingleServiceCompanyforPaymentDetails?id=" + id + "&curDate=" + today));
            return deferred.promise;
        }
        function getSingleAttributeAfterCompanyCreateDate(id, createdDate) {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "Attribute/GetSingleAttributeAfterCompanyCreateDate?id=" + id + "&curDate=" + createdDate));
            return deferred.promise;
        }
        var service = {
            getSingleAttributeAfterCompanyCreateDate: getSingleAttributeAfterCompanyCreateDate,
            getServiceServiceCompnyByServiceCompanyId: getServiceServiceCompnyByServiceCompanyId,

        }
        return service;
    }
})();