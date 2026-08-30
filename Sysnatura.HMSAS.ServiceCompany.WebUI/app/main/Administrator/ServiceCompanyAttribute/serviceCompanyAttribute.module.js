/***********************************************************************
 Program Name             : Branch.module.js
 Purpose                  :
 Creation Date            : 5-07-2017
 Created By               : Suhail
 Last Modified By         :
 Modification Date        :
 Change Request/Bug Nos   :
/***********************************************************************/

(function () {
    'use strict';

    angular
        .module('administrator.serviceCompanyAtttribute',
            [
                // 3rd Party Dependencies
                //'nvd3'                
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {

        var app = angular.module('administrator.serviceCompanyAtttribute', []);
        app.controller = $controllerProvider.register;
        app.factory = $provide.factory;
        app.directive = $compileProvider.directive,

        app.filter = $filterProvider.register,
        // State
        $stateProvider.state('app.serviceCompanyAtttribute', {
            url: '/serviceCompanyAtttribute',
            roleTypes: ['CompanyUsers', 'Head'],
            views: {
                'content@app': {
                    templateUrl: '/app/main/Administrator/ServiceCompanyAttribute/ServiceCompanyAttribute.html',
                    controller: 'serviceCompanyAtttributeController as vm'
                }
            },
            resolve: {
                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script                       
                      '/app/main/Administrator/ServiceCompanyAttribute/Services/serviceCompanyAttributes.sevice.js',
                       '/app/main/Administrator/ServiceCompanyAttribute/ServiceCompanyAttribute.controller.js',
                       '/app/main/Administrator/serviceCompanyEmployee/services/serviceCompanyEmployee.service.js'
                      
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

            // bodyClass: 'serviceOrderAssign'
        });
     

    }

})();