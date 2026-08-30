/***********************************************************************
 Program Name             :companyUser.service.js
 Purpose                  : 
 Creation Date            : 05-07-2017
 Created By               : Anuja
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/





(function ()
{
    'use strict';

    angular

        .module('administrator.companyUser')
        .factory('companyUserService', companyUserService);
   
    /** @ngInject */

    function companyUserService($q, msApi, $http, $rootScope) {

       var url = $rootScope.url;
        var service = {
            getAllCompanyUser: getAllCompanyUser,
            saveCompanyUser: saveCompanyUser,
            updateCompanyUser: updateCompanyUser,
            deleteCompanyUser: deleteCompanyUser
            }

        function getAllCompanyUser() {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "CompanyUsers/GetAllLoggedInUsers"));
            return deferred.promise;
        }
        function saveCompanyUser(companyUser) {

            var deferred = $q.defer();
            deferred.resolve($http.post(url + "CompanyUsers/SaveCompanyUsers", companyUser));
            return deferred.promise;
        }

        function updateCompanyUser(companyUser) {
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "CompanyUsers/UpdateCompanyUsers", companyUser));
            return deferred.promise;
        }
        function deleteCompanyUser(companyUsersId) {
            var deferred = $q.defer();

            deferred.resolve($http.get(url + "CompanyUsers/DeleteCompanyUsers/" + companyUsersId));
            return deferred.promise;
        }
        
        return service;
    }
})();