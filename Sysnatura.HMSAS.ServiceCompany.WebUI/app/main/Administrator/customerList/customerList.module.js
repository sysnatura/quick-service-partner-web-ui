

/***********************************************************************
 Program Name             : Customer List.module.js
 Purpose                  : 
 Creation Date            : 06-07-2017
 Created By               : Anuja
 Last Modified By         : 
 Modification Date        : 
 Change Request/Bug Nos   :
/***********************************************************************/


(function ()
{
    'use strict';

    angular
        .module('administrator.customerList', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {

        // State
        // Translation
        var app = angular.module('administrator.customerList', []);
        app.controller = $controllerProvider.register;
        app.factory = $provide.factory;
        app.directive = $compileProvider.directive,

        app.filter = $filterProvider.register,
        $stateProvider.state('app.customerList', {
            url: '/customerList',
            roleTypes: ['CompanyUsers', 'Head'],
          views  : {
                'content@app': {
                    templateUrl: '/app/main/Administrator/customerList/customerList.html',
                    controller: 'CustomerListController as vm'
                }
            },
            resolve: {

                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script

                         '/app/main/Administrator/customerList/customerList.controller.js',
                        '/app/main/Administrator/customerList/services/customerList.service.js'
                     ];

                    // Load the dependencies
                    $script(dependencies, function () {
                        // all dependencies have now been loaded by so resolve the promise
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });

                    return deferred.promise;
                }
            }
        });

    }

})();