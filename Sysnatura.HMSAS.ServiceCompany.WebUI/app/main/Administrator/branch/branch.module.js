/***********************************************************************
 Program Name             : Branch.module.js
 Purpose                  :
 Creation Date            : 5-07-2017
 Created By               : Amal
 Last Modified By         :
 Modification Date        :
 Change Request/Bug Nos   :
/***********************************************************************/

(function ()
{
    'use strict';

    angular
        .module('administrator.branch',
            [
                // 3rd Party Dependencies
                //'nvd3'                
            ]
        )
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, msNavigationServiceProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) { 

        var app = angular.module('administrator.branch', []);
        app.controller = $controllerProvider.register;
        app.factory = $provide.factory;
        app.directive = $compileProvider.directive,

        app.filter = $filterProvider.register,
        // State
        $stateProvider.state('app.branch', {    
            url: '/branch',
            roleTypes: [ 'Head'],   
            views    : {
                'content@app': {
                    templateUrl: '/app/main/Administrator/branch/branch.html',              
                    controller: 'BranchController as vm'
                }
            },
            resolve  : {            
                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script                       
                      '/app/main/Administrator/branch/services/branch.service.js',
                       '/app/main/Administrator/branch/services/address.service.js',   
                      '/app/main/Administrator/branch/branch.controller.js',
                       '/app/main/Administrator/branch/branchCreate.controller.js'

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
        $stateProvider.state('app.branchCreate', {
            url: '/addbranch',
            roleTypes: [ 'Head'],
            params: {

                editBranch: null,
                isBase: true
            },
            views: {
                'content@app': {
                    templateUrl: '/app/main/Administrator/branch/branchCreate.html',                
                    controller: 'BranchCreateController as vm'
                }
            },
            resolve: {

                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                           '/app/main/Administrator/companyUser/services/companyUser.service.js',
                        '/app/main/Administrator/branch/services/branch.service.js',
                     '/app/main/Administrator/branch/services/address.service.js',   
                    '/app/main/Administrator/branch/branch.controller.js',
                  '/app/main/Administrator/branch/branchCreate.controller.js'
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
        $stateProvider.state('app.branchEdit', {
            url: '/editbranch/:branchId',
            roleTypes: [ 'Head'],
            params: {

                branchId: null,
                isBase: true
            },
            views: {
                'content@app': {
                    templateUrl: '/app/main/Administrator/branch/branchCreate.html',
                    controller: 'BranchCreateController as vm'
                }
            },
            resolve: {

                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script
                           '/app/main/Administrator/companyUser/services/companyUser.service.js',
                        '/app/main/Administrator/branch/services/branch.service.js',
                        '/app/main/Administrator/branch/services/address.service.js',
                        '/app/main/Administrator/branch/branch.controller.js'  ,                   
                       '/app/main/Administrator/branch/branchCreate.controller.js'
                       
                    
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