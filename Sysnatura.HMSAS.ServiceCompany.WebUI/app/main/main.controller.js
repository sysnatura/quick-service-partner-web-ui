(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, $rootScope,$state)
    {
        // Data
        var vm = this;

        //// Methods
        vm.companyProfile = companyProfile;
        //************SUHAIL COMPANY PROFILE VIEW*****************
        function companyProfile() {

            $state.go('app.companyProfile');
        }
        //*********************************************
        // Remove the splash screen
        $scope.$on('$viewContentAnimationEnded', function (event)
        {
            if ( event.targetScope.$id === $scope.$id )
            {
                $rootScope.$broadcast('msSplashScreen::remove');
            }
        });
    }
})();