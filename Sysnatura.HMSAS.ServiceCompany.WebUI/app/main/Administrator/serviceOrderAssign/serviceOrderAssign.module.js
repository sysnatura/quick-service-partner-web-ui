(function ()
{
    'use strict';

    angular
        .module('administrator.serviceOrderAssign',
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
        $translatePartialLoaderProvider.addPart('app/main/Administrator/serviceOrderAssign');
 
        msNavigationServiceProvider.saveItem('administrator.serviceOrderAssign', {
            title: 'Service Orders',        
            icon: 'icon-vector-square',
            state: 'app.serviceOrderAssign',
            roleTypes: ['CompanyUsers', 'Head'],
            weight: 1
        });

        var app = angular.module('administrator.serviceOrderAssign', []);
        app.controller = $controllerProvider.register;
        app.factory = $provide.factory;
        app.directive = $compileProvider.directive,

        app.filter = $filterProvider.register,
        // State
        $stateProvider.state('app.serviceOrderAssign', {
            url: '/serviceOrderAssign',
            roleTypes: ['CompanyUsers', 'Head'],
            views    : {
                'content@app': {
                    templateUrl: 'app/main/Administrator/serviceOrderAssign/serviceOrderAssign.html',
                    controller : 'ServiceOrderAssignController as vm'
                }
            },
            resolve  : {            
                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script                       
                       '/app/main/Administrator/serviceOrderAssign/services/serviceOrderAssign.service.js',
                        '/app/main/Administrator/serviceOrderAssign/serviceOrderAssign.controller.js'

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
        $stateProvider.state('app.serviceOrderAssignDetail', {      
            url: '/serviceOrderAssignDetail/:assignId/:orderId',
            roleTypes: ['CompanyUsers', 'Head'],
            params: {
                assignId: null,
                orderId: null
            },
            views: {
                'content@app': {
                    templateUrl: 'app/main/Administrator/serviceOrderAssign/views/serviceOrderAssignDetail.html',                 
                    controller: 'ServiceOrderAssignDetailController as vm'
                }
            },
            resolve: {
                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        //Extra pagewise script                       
                       '/app/main/Administrator/serviceOrderAssign/services/serviceOrderAssign.service.js',
                       '/app/main/Administrator/serviceCompanyEmployee/services/serviceCompanyEmployee.service.js',
                       '/app/main/Administrator/serviceOrderAssign/services/serviceCompanySchedule.service.js',
                        '/app/main/Administrator/serviceOrderAssign/views/serviceOrderAssignDetail.controller.js'

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