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

        .module('administrator.companyProfile')
        .factory('serviceCompanyService', serviceCompanyService);

    /** @ngInject */

    function serviceCompanyService($q, msApi, $http, $rootScope) {

        var url = $rootScope.url;


        //function getAllServiceCompany() {

        //    var deferred = $q.defer();
        //    deferred.resolve($http.get(url + "ServiceCompany/GetAllServiceCompany"));
        //    return deferred.promise;
        //}
        function getServiceServiceCompnyByServiceCompanyId(id) {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "Branch/GetDefaultBranch/" + id));
            return deferred.promise;
        }
       
        var service = {
            //getAllServiceCompany: getAllServiceCompany,
            getServiceServiceCompnyByServiceCompanyId: getServiceServiceCompnyByServiceCompanyId,
           
        }
        return service;
    }
})();