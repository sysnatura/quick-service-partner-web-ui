(function ()
{
    'use strict';

    angular
        .module('fuse')
        .run(runBlock);

    /** @ngInject */


    function runBlock($rootScope, $timeout, $state, $mdToast, $mdDialog,localStorageService, $http, editableOptions, editableThemes)
    {
        $rootScope.isReady = false;
        $rootScope.$$listeners.$stateChangeStart = [];
        editableThemes['angular-material'] = {
            formTpl: '<form class="editable-wrap"></form>',
            noformTpl: '<span class="editable-wrap"></span>',
            controlsTpl: '<md-input-container class="editable-controls" ng-class="{\'md-input-invalid\': $error}"></md-input-container>',
            inputTpl: '',
            errorTpl: '<div ng-messages="{message: $error}"><div class="editable-error" ng-message="message">{{$error}}</div></div>',
            buttonsTpl: '<span class="editable-buttons"></span>',
            submitTpl: '<md-button class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>',
            cancelTpl: '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>'
        };
      editableOptions.theme = 'angular-material';
       // editableOptions.theme = 'bs2';
        // Activate loading indicator
    
      var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (scope, next, current)
        {
            // sessionTest();
            $rootScope.loadingProgress = true;
            var counter = 0;
            var roleTypeList = next.roleTypes; 
            if ($rootScope.roleTypeName == null) // first case
            {
                $http.get("/Account/GetAllSessionValues", { headers: { 'Cache-Control': 'no-cache' } }).then(function (resl) {
                    if (resl.data.userId !== 0) {
                        $rootScope.loggedInCompanyUser.cmpanyUsersDto.roleTypeName = resl.data.loggedInCompanyUser.cmpanyUsersDto.roleTypeName;
                        localStorageService.set("roleType", resl.data.loggedInCompanyUser.cmpanyUsersDto.roleTypeName);

                        angular.forEach(roleTypeList, function (item) {
                            if (item == $rootScope.loggedInCompanyUser.cmpanyUsersDto.roleTypeName) {
                                counter++;
                            }
                        });
                    }
                });
            }
            else {
                angular.forEach(roleTypeList, function (item) {
                    if (item == $rootScope.roleTypeName) {
                        counter++;
                        //break;
                    }
                });
            }         

            if (counter == 0 && $rootScope.roleTypeName != null) {
                scope.preventDefault();
                //$window.location = "/Account/Login";
             //   $state.go('app.sample');
                $rootScope.loadingProgress = false;

            }

        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });
        $rootScope.showCustomToast = function (message) {
            $mdToast.show($mdToast.simple().textContent(message).hideDelay(5000).position('top right'));

        }
        // Store state in the root scope for easy access
        $rootScope.state = $state;

        $rootScope.url = "http://localhost:36365/Api/";
        $rootScope.imgurl = "http://localhost:36365/";


      //  $rootScope.url = "https://aqsapi.aspiromtech.com/Api/";
        //$rootScope.imgurl = "https://aqsapi.aspiromtech.com/";

        $rootScope.locationFilters = { country: 'in' };
        $rootScope.locationDetails = { watchEnter: true };
      
        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });




        $rootScope.showToast = function (message, type) {
            var div = '';
            if (type === "success") {
              div = '<md-toast class="md-toast success"><i class="icon-checkbox-marked-circle success-text"></i><h3>Success..!</h3><span>' + message + '</span></md-toast>';

            } else if (type === "info") {
                div = '<md-toast class="md-toast info"><i class="icon-information-outline info-text"></i><h3></h3><span>' + message + '</span></md-toast>';
            } else {
              div = '<md-toast class="md-toast error"><i class="icon-close-circle error-text"></i><h3>Error..!</h3><span>' + message + '</span></md-toast>';
        }
            $mdToast.show({




                template: div,
                hideDelay: 7000,
                position: 'top right'
            });
         //   $mdToast.show($mdToast.simple().textContent(message).hideDelay(7000).position('top right'));

        }

    
        
     
        //=======================================Alert dialog=========================================
        $rootScope.confirm = function (ev) {
            return $mdDialog.confirm()
                  .title('Delete..!')
                  .textContent('Are you sure. Do you want to delete this record?')
                  .ariaLabel('')
                  .targetEvent(ev)
                  .ok('Yes')
                  .cancel('NO');
        }
        $rootScope.confirmWithData = function (ev, title, textContent, yes, no) {
            return $mdDialog.confirm()
                  .title(title)
                  .textContent(textContent)
                  .ariaLabel('')
                  .targetEvent(ev)
                  .ok(yes)
                  .cancel(no);
        }
       
      $rootScope.alertData = function ( title, textContent, ok) {
            return $mdDialog.show(
                          $mdDialog.alert()
                          .clickOutsideToClose(true)
                          .title(title)
                          .textContent(textContent)
                          .ariaLabel('')
                          .ok(ok));
            }

        //============================================================================================



        //Nishad
        //4 Mar 2017
        //session Management===========================================================================

      function getTimezone() {
          //var now = new Date().toString();
          //var timeZone = now.replace(/.*[(](.*)[)].*/, '$1');//extracts the content between parenthesis
          //  var timezone=String(new Date());
          //return timezone.substring(timezone.lastIndexOf('(')+1).replace(')','').trim();
          return new Date().getTimezoneOffset();

      }
      var logType = null;

      $rootScope.sessionTest = function () {
          $rootScope.isReady = false;
          $http.get("/Account/GetAllSessionValues", { headers: { 'Cache-Control': 'no-cache' } }).then(function (result) {
             
              if (result.data == null) {

                  $window.location = "/";
                  $rootScope.openToast("error", "Failed", "Your current session expired. Please login again...");
              } else {
                  $http.defaults.headers.common.Authorization = 'BearerCompany ' + result.data.token + '_' + getTimezone();

                  $rootScope.loggedInServiceCompanyId = result.data.serviceCompanyId;
                  //$rootScope.loggedInServiceCompanyName = 'BearerCompany';
                  $rootScope.token = result.data.token;
                  $rootScope.loggedInCompanyId = result.data.serviceCompanyId;
                  $rootScope.loggedInCompanyUser = result.data.loggedInCompanyUser;
                  $rootScope.loggedInCompanyUserName = result.data.loggedInCompanyUser.username;
                  $rootScope.url = result.data.url + "Api/";
                  $rootScope.imgurl = result.data.url;
                  $rootScope.roleTypeName = result.data.loggedInCompanyUser.cmpanyUsersDto.roleTypeName;
                  logType = result.data.loggedInCompanyUser.cmpanyUsersDto.roleTypeName;
                  localStorageService.set("roleType", result.data.loggedInCompanyUser.cmpanyUsersDto.roleTypeName);
                  //Connecting to Hub
                  connectHub($rootScope.loggedInCompanyId, $rootScope.loggedInCompanyUserName);
              }
              $rootScope.isReady = true;
          });
      }
      $rootScope.sessionTest();
        //============================================================================================
      function connectHub(userId, userName) {
          var connection = $.hubConnection();
          connection.url = $rootScope.imgurl + "signalr";
          $rootScope.hMSASHub = connection.createHubProxy('hMSASHub');
          $rootScope.hMSASHub.on("Hello", function () {
              //Dont delete this function...
              //If you want to register some event handlers after establishing the connection, you can do that; 
              //but you must register atleast one of ypur event handler.
          });
          connection.start({ jsonp: true })
              .done(function () {
                  $rootScope.hMSASHub.invoke("Connect", userId, userName, "S");
              })
          .fail(function (ex) {
              console.log('Could not connect: ' + ex);
          });
      }
        //SignalR Connection States: { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' }
      if ($.hubConnection().state != 1 && $rootScope.imgurl) {
          if ($rootScope.isReady) {
              connectHub($rootScope.loggedInCompanyId, $rootScope.loggedInCompanyUserName);
          }
      }
        //===============================================================================================
    }
})();