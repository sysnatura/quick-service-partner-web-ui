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
        .module('administrator.dashboard', [])
        .config(config);

	/** @ngInject */
	function config($stateProvider, msApiProvider, msNavigationServiceProvider, $controllerProvider, $provide, $compileProvider, $filterProvider) {

		// State
		// Translation
	    var app = angular.module('administrator.dashboard', []);
		app.controller = $controllerProvider.register;
		app.factory = $provide.factory;
		app.directive = $compileProvider.directive,

        app.filter = $filterProvider.register,
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
        	roleTypes: ['Head'],
        	views: {
        		'content@app': {
        		    templateUrl: '/app/main/Administrator/Dashboard/dashboard.html',
        		    controller: 'DashboardController as vm'
        		}
        	},
        	resolve: {

        		deps: function ($q, $rootScope) {
        			var deferred = $q.defer();
        			var dependencies =
                    [
                        //Extra pagewise script

                         '/app/main/Administrator/Dashboard/dashboardController.js',
                        '/app/main/Administrator/Dashboard/services/dashboardServices.js'


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