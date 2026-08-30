(function () {
    'use strict';

    angular
        .module('administrator.serviceCompanyAtttribute')
        .factory('ServiceCompanyAttributesService', ServiceCompanyAttributesService);

    /** @ngInject */
    function ServiceCompanyAttributesService($q, $http, $rootScope) {
        var url = $rootScope.url;
        var service = {
            getSingleAttribute: getSingleAttribute,
            getAllAttributes: getAllAttributes,
            getAllModule: getAllModule,
            saveAttribute: saveAttribute,
            desleteAllAttribute: desleteAllAttribute
           
        };



        //Single attribute by Attribute Id
        function getSingleAttribute(id) {
            var deferred = $q.defer();

            deferred.resolve($http.get(url + "Attribute/GetSingleAttribute/" + id));
            return deferred.promise;
        }

        //All attributes by Module Id
        function getAllAttributes(compId, modId, branchId) {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompanyAttribute/GetAllAttribute?compId=" + compId + "&modId=" + modId + "&brId=" + branchId));
            return deferred.promise;
        }
        function getAllModule(id) {

            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompanyAttribute/GetAllServiceCompanyModule/" + id));
            return deferred.promise;
        }
        function saveAttribute(attributeDtos) {
            var deferred = $q.defer();
            deferred.resolve($http.post(url + "ServiceCompanyAttribute/SaveServiceCompanyAttribute", attributeDtos));
            return deferred.promise;
        }
        function desleteAllAttribute(serCompId, serBrId) {
            // Create a new deferred object
            var deferred = $q.defer();
            deferred.resolve($http.get(url + "ServiceCompanyAttribute/DeleteServiceCompanyAttribute?serCompId=" + serCompId + "&serBrId=" + serBrId));
            return deferred.promise;
        }
        return service;
    }
})();