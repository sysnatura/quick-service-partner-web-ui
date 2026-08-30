(function ()
{
    'use strict';

    angular
        .module('app.core')
.factory('permissions', function ($rootScope, $filter, localStorageService) {
    var permissionList;
    return {
        setPermissions: function (permissions) {
        
          //  permissionList = JSON.parse(permissions);
            $rootScope.$broadcast('permissionsChanged');
        },
        hasPermission: function (permissions) {
            if (!permissionList) {
                  permissionList = localStorageService.get("roleType");
            }
          
           // permissions = JSON.parse(permissions);
            //var tty = JSON.parse(permissions);
            permissions = permissions;
           
            var count = 0;
           // for (var i = 0; i < permissions.length; i++) {
                angular.forEach(permissions, function (value) {
                    if (value === permissionList) {
                        count = count + 1;
                    }
                });
           // }
           
            return count !== 0;
            //       return count===0 ? true :false;
        }
    };
});
}());