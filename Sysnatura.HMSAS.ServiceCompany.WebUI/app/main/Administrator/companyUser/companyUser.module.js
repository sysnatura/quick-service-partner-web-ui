

/***********************************************************************
 Program Name             : companyUser.module.js
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
        .module('administrator.companyUser', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {

        // State
        // Translation
        var app = angular.module('administrator.companyUser', []);
        app.controller = $controllerProvider.register;
        app.factory = $provide.factory;
        app.directive = $compileProvider.directive,

        app.filter = $filterProvider.register,
        $stateProvider.state('app.companyUser', {
            url: '/companyUser',
            roleTypes: [ 'Head'],
          views  : {
                'content@app': {
                    templateUrl: '/app/main/Administrator/companyUser/companyUser.html',
                    controller: 'CompanyUserController as vm'
                }
            },
            resolve: {

                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script

                         '/app/main/Administrator/companyUser/companyUser.controller.js',
                        '/app/main/Administrator/companyUser/services/companyUser.service.js',
                       '/app/main/Administrator/companyUser/dialog/companyUser-dialog.controller.js'

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