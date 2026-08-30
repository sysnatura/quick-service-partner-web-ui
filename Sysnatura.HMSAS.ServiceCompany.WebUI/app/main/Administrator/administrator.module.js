(function () {
    'use strict';




    angular.module('app.administrator', ['administrator.serviceOrderAssign', 'administrator.serviceCompanyEmployee', 'administrator.branch', 'administrator.companyUser', 'administrator.customerList', 'administrator.serviceCompanyAtttribute', 'administrator.companyProfile', 'administrator.dashboard'])
        .config(config);


    /** @ngInject */

    function config($stateProvider, msNavigationServiceProvider) {
        // Navigation

        msNavigationServiceProvider.saveItem('administrator', {

            title: 'Administrator',
            group:true,
            roleTypes: ['CompanyUsers', 'Head'],
            
        });
        msNavigationServiceProvider.saveItem('administrator.dashboard', {

            title : 'Dashboard',                
            state: 'app.dashboard',
            icon: 'icon-tile-four',
            roleTypes: ['CompanyUsers', 'Head'],
            weight: 1
        });
         
     
      
        msNavigationServiceProvider.saveItem('administrator.serviceOrderAssign', {
            title: 'Orders',
            icon: 'icon-vector-square',
            state: 'app.serviceOrderAssign',
            roleTypes: ['CompanyUsers', 'Head'],
            weight: 2
        });
        msNavigationServiceProvider.saveItem('administrator.companyUser', {

            title: 'User',
            icon: 'icon-account',
            state: 'app.companyUser',
            roleTypes: ['Head'],
            weight: 3
        });
        msNavigationServiceProvider.saveItem('administrator.branch', {
            title: 'Branch',
            icon: 'icon-package',
            state: 'app.branch',
            roleTypes: ['Head'],
            weight: 4
        });
     
        msNavigationServiceProvider.saveItem('administrator.serviceCompanyEmployee', {

            title: 'Employees',

            icon: 'icon-worker',
            state: 'app.serviceCompanyEmployee',
            roleTypes: ['CompanyUsers', 'Head'],
            weight: 5
        });

        msNavigationServiceProvider.saveItem('administrator.serviceCompanyAtttribute', {

            title: 'Company Services',
            icon: 'icon-cog',
            state: 'app.serviceCompanyAtttribute',
            roleTypes: ['CompanyUsers', 'Head'],
            weight: 6
        });
        msNavigationServiceProvider.saveItem('administrator.customerList', {

            title: 'Customer List',
            icon: 'icon-library-books',
            state: 'app.customerList',

            roleTypes: ['CompanyUsers', 'Head'],
            weight: 7
            
        });
    }
})();
