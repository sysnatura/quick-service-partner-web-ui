/***********************************************************************
 Program Name             : address.service.js
 Purpose                  : Service file for address
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
        .factory('addressService', addressService);
   
    /** @ngInject */
    function addressService($q, $http, $rootScope) {

       var url = $rootScope.url;
        var service = {
            getAllCountry: getAllCountry, 
            getAllStateByCountry: getAllStateByCountry,
            getAllCityByState: getAllCityByState
           
        }

          function getAllCountry() {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "Country/GetAllCountry"));
            return deferred.promise;
        }
        function getAllStateByCountry(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "State/GetAllStateByCountry?id=" + id));      
            return deferred.promise;
        }
          function getAllCityByState(id) {
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "City/GetAllCityByStateId/" + id));
            return deferred.promise;
        }
  
        return service;
    }
})();