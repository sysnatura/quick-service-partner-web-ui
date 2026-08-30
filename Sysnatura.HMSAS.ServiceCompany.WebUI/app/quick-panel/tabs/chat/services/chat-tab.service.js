

(function ()
{
    'use strict';

    angular
        .module('app.quick-panel')
        .factory('ChatTabService', ChatTabService);

    /** @ngInject */
    function ChatTabService($q, msApi, $rootScope, $http)
    {
        var url = $rootScope.url;

        var service = {
            
        };

    

        ///**
        // * Get contact chat from the server
        // *
        // * @param contactId
        // * @returns {*}
        // */
        //function getChatsByUserId(contactId)
        //{
        //    // Create a new deferred object
        //    var deferred = $q.defer();

        //    deferred.resolve($http.get(url + "PrivateChat/GetChatsByUserId/"+ contactId));

        //    return deferred.promise;
        //}

        /**
         * Array prototype
         *
         * Get by id
         *
         * @param value
         * @returns {T}
         */
        Array.prototype.getById = function (value)
        {
            return this.filter(function (x)
            {
                return x.id === value;
            })[0];
        };
        return service;
    }
})();