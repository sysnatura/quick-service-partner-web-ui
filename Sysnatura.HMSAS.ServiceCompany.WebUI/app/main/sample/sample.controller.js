
(function ()
{
    'use strict';

    angular
        .module('app.sample')
        .controller('SampleController', SampleController);

    /** @ngInject */
    function SampleController( $mdDialog,$rootScope,$scope)
    {
        var vm = this;

        // Data
       // vm.helloText = SampleData.data.helloText;
        vm.helloText = "hi";
        // Methods


    }
})();
