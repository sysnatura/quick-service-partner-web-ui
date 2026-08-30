/***********************************************************************
 Program Name             : branch.service.js
 Purpose                  : Service file for branch
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
        .factory('branchService', branchService);
   
    /** @ngInject */

    function branchService($q, $http, $rootScope) {

       var url = $rootScope.url;
        var service = {
            getAllBranch: getAllBranch,     
            saveBranch: saveBranch,
            getBranchById: getBranchById,
            updateBranch: updateBranch,
            deleteBranch: deleteBranch
        }

        function getAllBranch() {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "Branch/GetAllLoggedInServiceCompaniesBranches"));
            return deferred.promise;
        }
     
        function saveBranch(branchDto) {

            // Create a new deferred object
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "Branch/SaveBranch", branchDto));
            return deferred.promise;
        }
        function getBranchById(id) {
            var deferred = $q.defer();

            deferred.resolve($http.get(url + "Branch/GetSingleBranch/" + id));
            return deferred.promise;
        }
        function updateBranch(employee) {
            // Create a new deferred object
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "Branch/UpdateBranch", employee));
            return deferred.promise;
        }
        function deleteBranch(id) {
            // Create a new deferred object
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "Branch/DeleteBranch/" + id));
            return deferred.promise;
        }
        return service;
    }
})();