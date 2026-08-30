/***********************************************************************
 Program Name             : serviceCompanyEmployee.service.js
 Purpose                  : Service file for serviceCompanyEmployee
 Creation Date            : 01-03-2017
 Created By               : Anuja
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/

(function ()
{
    'use strict';

    angular

        .module('administrator.serviceCompanyEmployee')
        .factory('serviceCompanyEmployeeService', serviceCompanyEmployeeService);
   
    /** @ngInject */

    function serviceCompanyEmployeeService($q, $http, $rootScope) {

       var url = $rootScope.url;
        var service = {
            getAllServiceCompanyEmployee: getAllServiceCompanyEmployee,
            getAllServiceCompanyEmpByCompanyId: getAllServiceCompanyEmpByCompanyId,
            saveEmployee: saveEmployee,
            getEmployeeById: getEmployeeById,
            updateEmployee: updateEmployee,
            deleteEmployee: deleteEmployee,
            getAllBranchByUser: getAllBranchByUser,
            getAllServiceCompanyEmp: getAllServiceCompanyEmp
        }

        function getAllServiceCompanyEmployee() {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompanyEmployee/GetAllServiceCompanyEmployee"));
            return deferred.promise;
        }
        function getAllServiceCompanyEmpByCompanyId(id) {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompanyEmployee/GetAllServiceCompanyEmpByCompanyId/" + id));
            return deferred.promise;
        }
        function getAllServiceCompanyEmp(cId, cuId) {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompanyEmployee/GetAllServiceCompanyEmp?companyId=" + cId + "&companyUserId=" + cuId));
            return deferred.promise;
        }
        function saveEmployee(serviceCompanyEmployeeDto) {

            // Create a new deferred object
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "ServiceCompanyEmployee/SaveServiceCompanyEmployee", serviceCompanyEmployeeDto));
            return deferred.promise;
        }
        function getEmployeeById(id) {
            var deferred = $q.defer();

            deferred.resolve($http.get(url + "ServiceCompanyEmployee/GetSingleServiceCompanyEmployee/" + id));
            return deferred.promise;
        }
        function updateEmployee(employee) {
            // Create a new deferred object
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "ServiceCompanyEmployee/UpdateServiceCompanyEmployee", employee));
            return deferred.promise;
        }
        function deleteEmployee(id) {
            // Create a new deferred object
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompanyEmployee/DeleteServiceCompanyEmployee/" + id));
            return deferred.promise;
        }
        function getAllBranchByUser(id) {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "Branch/GetAllBranchByUserId/" + id));
            return deferred.promise;
        }
        return service;
    }
})();