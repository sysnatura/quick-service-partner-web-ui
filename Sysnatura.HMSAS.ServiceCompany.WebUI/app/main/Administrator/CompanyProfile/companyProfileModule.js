

/***********************************************************************
 Program Name             : companyProfile.module.js
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
        .module('administrator.companyProfile', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {

        // State
        // Translation
        var app = angular.module('administrator.companyProfile', []);
        app.controller = $controllerProvider.register;
        app.factory = $provide.factory;
        app.directive = $compileProvider.directive,

        app.filter = $filterProvider.register,
        $stateProvider.state('app.companyProfile', {
            url: '/companyProfile',
            roleTypes: ['Head'],
            views: {
                'content@app': {
                    templateUrl: '/app/main/Administrator/CompanyProfile/companyProfile.html',
                    controller: 'CompanyProfileController as vm'
                }
            },
            resolve: {

                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script

                         '/app/main/Administrator/CompanyProfile/companyProfileController.js',
                        '/app/main/Administrator/CompanyProfile/services/serviceCompanyServices.js'
                     

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