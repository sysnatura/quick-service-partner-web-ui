/***********************************************************************
 Program Name             : ServiceCompanyEmployee.module.js
 Purpose                  :
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
        .module('administrator.serviceCompanyEmployee',
            [
                // 3rd Party Dependencies
                //'nvd3',
                'datatables'
            ]
        )
        .config(config);

    /** @ngInject */
    //function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {

    function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {

    // translate
        $translatePartialLoaderProvider.addPart('app/main/Administrator/serviceCompanyEmployee');

        var app = angular.module('administrator.serviceCompanyEmployee', []);
        app.controller = $controllerProvider.register;
        app.factory = $provide.factory;
        app.directive = $compileProvider.directive,

        app.filter = $filterProvider.register,
        // State
        $stateProvider.state('app.serviceCompanyEmployee', {
            url: '/serviceCompanyEmployee',
            roleTypes: ['CompanyUsers', 'Head'],
            views    : {
                'content@app': {
                    templateUrl: 'app/main/Administrator/serviceCompanyEmployee/serviceCompanyEmployee.html',
                    controller: 'ServiceCompanyEmployeeController as vm'
                }
            },
            resolve  : {            
                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script                       
                       '/app/main/Administrator/serviceCompanyEmployee/services/serviceCompanyEmployee.service.js',
                        '/app/main/Administrator/serviceCompanyEmployee/serviceCompanyEmployee.controller.js'

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
        $stateProvider.state('app.serviceCompanyEmployeeCreate', {
            url: '/addserviceCompanyEmployee',
            roleTypes: ['CompanyUsers', 'Head'],
            params: {

                editBranch: null,
                isBase: true
            },
            views: {
                'content@app': {
                    templateUrl: '/app/main/Administrator/serviceCompanyEmployee/serviceCompanyEmployeeCreate.html',
                    controller: 'ServiceCompanyEmployeeCreateController as vm'
                }
            },
            resolve: {

                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script



                          '/app/main/Administrator/serviceCompanyEmployee/ServiceCompanyEmployee.Controller.js',
                          '/app/main/Administrator/serviceCompanyEmployee/ServiceCompanyEmployeeCreate.Controller.js',
                       '/app/main/Administrator/serviceCompanyEmployee/services/serviceCompanyEmployee.service.js',
                       '/app/main/Administrator/branch/services/branch.service.js'
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
        $stateProvider.state('app.serviceCompanyEmployeeEdit', {
            url: '/addserviceCompanyEmployee/:id',
            roleTypes: ['CompanyUsers', 'Head'],
            params: {

                editserviceCompanyEmployee: null,
                isBase: true
            },
            views: {
                'content@app': {
                    templateUrl: '/app/main/Administrator/serviceCompanyEmployee/serviceCompanyEmployeeCreate.html',
                    controller: 'ServiceCompanyEmployeeCreateController as vm'
                }
            },
            resolve: {

                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script


                        '/app/main/Administrator/serviceCompanyEmployee/ServiceCompanyEmployee.Controller.js',
                          '/app/main/Administrator/serviceCompanyEmployee/ServiceCompanyEmployeeCreate.Controller.js',
                       '/app/main/Administrator/serviceCompanyEmployee/services/serviceCompanyEmployee.service.js',
                       '/app/main/Administrator/branch/services/branch.service.js',
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