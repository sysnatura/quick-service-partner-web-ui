(function () {
    'use strict';

    angular
        .module('app.core').
        directive('showErrors', function($timeout) {
            return {
                restrict: 'A',
                require: '^form',
                link: function(scope, el, attrs, formCtrl) {
                    // find the text box element, which has the 'name' attribute
                    var inputEl = el[0].querySelector("[name]");
                    // convert the native text box element to an angular element
                    var inputNgEl = angular.element(inputEl);
                    // get the name on the text box
                    var inputName = inputNgEl.attr('name');
                    var helpText = angular.element(el[0].querySelector(".help-block"));
                    var control = angular.element(el[0].querySelector(".form-control"));
                    // only apply the has-error class after the user leaves the text box
                    var blurred = false;
                    inputNgEl.bind('blur', function() {
                        blurred = true;
                        var a = formCtrl[inputName] ? formCtrl[inputName].$valid : false;
                        el.toggleClass('has-error', formCtrl[inputName].$invalid);
                        helpText.toggleClass('hide', a);
                    });

                    scope.$watch(function() {
                        var a = formCtrl[inputName] ? formCtrl[inputName].$invalid : false;
                        return a;
                    }, function(invalid) {
                        // we only want to toggle the has-error class after the blur
                        // event or if the control becomes valid
                        if (!blurred && invalid) {
                            return;
                        }
                        var a = formCtrl[inputName] ? formCtrl[inputName].$invalid : false;
                        el.toggleClass('has-error', invalid);
                        helpText.toggleClass('hide', !a);
                    });

                    scope.$on('show-errors-event', function() {
                        var aa = formCtrl[inputName] ? formCtrl[inputName].$invalid : false;
                        el.toggleClass('has-error', aa);
                        helpText.toggleClass('hide', !aa);
                    });

                    scope.$on('show-errors-reset', function() {

                        $timeout(function() {

                            el.addClass("dirty");
                            el.removeClass('has-error');
                            control.removeClass('ng-dirty');
                            helpText.addClass('hide');
                        }, 0, false);
                    });
                }
            }
        })
        .directive('stringToNumber', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(value) {
                        return '' + value;
                    });
                    ngModel.$formatters.push(function(value) {
                        return parseFloat(value, 10);
                    });
                }
            };
        }).directive('resetDirective', [
            '$parse', function($parse) {
                return function(scope, element, attr) {
                    var fn = $parse(attr.resetDirective);
                    var masterModel = angular.copy(fn(scope));

                    // Error check to see if expression returned a model
                    if (!fn.assign) {
                        throw Error('Expression is required to be a model: ' + attr.resetDirective);
                    }

                    element.bind('reset', function(event) {
                        scope.$apply(function() {
                            fn.assign(scope, angular.copy(masterModel));
                            scope.form.$setPristine();
                        });

                        // TODO: memoize prevention method
                        if (event.preventDefault) {
                            return event.preventDefault();
                        } else {
                            return false;
                        }
                    });
                };

            }
        ]).directive('allowOnlyNumbers', function() {
            return {
                require: 'ngModel',
                link: function (scope, element, attr, ngModelCtrl) {
                    function fromUser(text) {
                        if (text) {
                            var transformedInput = text.replace(/[^0-9]/g, '');

                            if (transformedInput !== text) {
                                ngModelCtrl.$setViewValue(transformedInput);
                                ngModelCtrl.$render();
                            }
                            return transformedInput;
                        }
                        return null;
                    }
                    ngModelCtrl.$parsers.push(fromUser);
                }
            };
        }).directive('allowDecimalNumbers', function() {
            return {
                require: '?ngModel',
                link: function(scope, element, attrs, ngModelCtrl) {
                    if (!ngModelCtrl) {
                        return;
                    }

                    ngModelCtrl.$parsers.push(function(val) {
                        if (angular.isUndefined(val)) {
                            var val = '';
                        }


                        var clean = val.replace(/[^-0-9\.]/g, '');
                        var negativeCheck = clean.split('-');
                        var decimalCheck = clean.split('.');
                        if (!angular.isUndefined(negativeCheck[1])) {
                            negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                            clean = negativeCheck[0] + '-' + negativeCheck[1];
                            if (negativeCheck[0].length > 0) {
                                clean = negativeCheck[0];
                            }


                        }

                        if (!angular.isUndefined(decimalCheck[1])) {
                            decimalCheck[1] = decimalCheck[1].slice(0, 3);
                            clean = decimalCheck[0] + '.' + decimalCheck[1];
                        }

                        if (val !== clean) {
                            ngModelCtrl.$setViewValue(clean);
                            ngModelCtrl.$render();
                        }
                        return clean;
                    });

                    element.bind('keypress', function(event) {
                        if (event.keyCode === 32) {
                            event.preventDefault();
                        }
                    });
                }
            };
        })
        .directive('lowerThan', [
            function() {

                var link = function($scope, $element, $attrs, ctrl) {

                    var validate = function(viewValue) {
                        var comparisonModel = $attrs.lowerThan;

                        if (!viewValue || !comparisonModel) {
                            // It's valid because we have nothing to compare against
                            ctrl.$setValidity('lowerThan', true);
                        }

                        // It's valid if model is lower than the model we're comparing against
                        ctrl.$setValidity('lowerThan', parseFloat(viewValue, 12) < parseFloat(comparisonModel, 12));
                        return viewValue;
                    };

                    ctrl.$parsers.unshift(validate);
                    ctrl.$formatters.push(validate);

                    $attrs.$observe('lowerThan', function(comparisonModel) {
                        return validate(ctrl.$viewValue);
                    });

                };

                return {
                    require: 'ngModel',
                    link: link
                };

            }
        ]).directive('graterThan', [
            function() {

                var link = function($scope, $element, $attrs, ctrl) {

                    var validate = function(viewValue) {
                        var comparisonModel = $attrs.graterThan;

                        if (!viewValue || !comparisonModel) {
                            // It's valid because we have nothing to compare against
                            ctrl.$setValidity('graterThan', true);
                        }

                        // It's valid if model is lower than the model we're comparing against
                        ctrl.$setValidity('graterThan', parseFloat(viewValue, 12) > parseFloat(comparisonModel, 12));
                        return viewValue;
                    };

                    ctrl.$parsers.unshift(validate);
                    ctrl.$formatters.push(validate);

                    $attrs.$observe('graterThan', function(comparisonModel) {
                        return validate(ctrl.$viewValue);
                    });

                };

                return {
                    require: 'ngModel',
                    link: link
                };

            }
        ]).directive('graterThanOrEqualTo', [
            function() {

                var link = function($scope, $element, $attrs, ctrl) {

                    var validate = function(viewValue) {
                        var comparisonModel = $attrs.graterThanOrEqualTo;

                        if (!viewValue || !comparisonModel) {
                            // It's valid because we have nothing to compare against
                            ctrl.$setValidity('graterThanOrEqualTo', true);
                        }

                        // It's valid if model is lower than the model we're comparing against
                        ctrl.$setValidity('graterThanOrEqualTo', parseFloat(viewValue, 12) >= parseFloat(comparisonModel, 12));
                        return viewValue;
                    };

                    ctrl.$parsers.unshift(validate);
                    ctrl.$formatters.push(validate);

                    $attrs.$observe('graterThanOrEqualTo', function(comparisonModel) {
                        return validate(ctrl.$viewValue);
                    });

                };

                return {
                    require: 'ngModel',
                    link: link
                };

            }
        ]).directive('compare', [
            function() {

                var link = function($scope, $element, $attrs, ctrl) {

                    var validate = function(viewValue) {
                        var comparisonModel = $attrs.compare;

                        if (!viewValue || !comparisonModel) {
                            // It's valid because we have nothing to compare against
                            ctrl.$setValidity('compare', true);
                        }

                        // It's valid if model is lower than the model we're comparing against
                        ctrl.$setValidity('compare', viewValue == comparisonModel);
                        return viewValue;
                    };

                    ctrl.$parsers.unshift(validate);
                    ctrl.$formatters.push(validate);

                    $attrs.$observe('compare', function(comparisonModel) {
                        return validate(ctrl.$viewValue);
                    });

                };

                return {
                    require: 'ngModel',
                    link: link
                };

            }
        ])
        .directive('lowercase', [
            function() {
                return {
                    require: 'ngModel',
                    link: function(scope, element, attrs, modelCtrl) {
                        var minimize = function(inputValue) {
                            if (inputValue == undefined) inputValue = '';
                            //var minimized = inputValue.toUpperCase();
                            var minimized = inputValue.toLowerCase();
                            if (minimized != inputValue) {
                                modelCtrl.$setViewValue(minimized);
                                modelCtrl.$render();
                            }
                            return minimized;
                        }
                        modelCtrl.$parsers.push(minimize);
                        minimize(scope[attrs.ngModel]);
                    }
                }
            }
        ])
        .directive('onlyAlphabets', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, element, attrs, ngModel) {
                    if (!ngModel) {
                        return;
                    }
                    ngModel.$parsers.unshift(function (inputValue) {
                        var alphabets = inputValue.split('').filter(function (s) {
                            return (isALetter(s));
                        }).join('');
                        ngModel.$viewValue = alphabets;
                        ngModel.$render();
                        return alphabets;
                    });
                }
            };

            function isALetter(charVal) {
                if (charVal.toUpperCase() != charVal.toLowerCase()) {
                    return true;
                }
                else {
                    return false;
                }
            }
        })
        .directive('starRating', [
            function() {
                return {
                    restrict: 'EA',
                    template: '<ul class="star-rating" >' +
                        ' <li  ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">'
                        + ' <i class="icon-star"></i>' + ' </li>' +
                        '</ul>',
                    scope: {
                        ratingValue: '=ngModel',
                        max: '=?', // optional (default is 5)
                        onRatingSelect: '&?',
                        readonly: '=?'
                    },
                    link: function(scope, element, attributes) {
                        if (scope.max == undefined) {
                            scope.max = 5;
                        }

                        function updateStars() {
                            scope.stars = [];
                            for (var i = 0; i < scope.max; i++) {
                                scope.stars.push({
                                    filled: i < scope.ratingValue
                                });
                            }
                        };

                        scope.toggle = function(index) {
                            if (scope.readonly == undefined || scope.readonly === false) {
                                scope.ratingValue = index + 1;
                                scope.onRatingSelect({
                                    rating: index + 1
                                });
                            }
                        };
                        scope.$watch('ratingValue', function(oldValue, newValue) {
                            if (newValue) {
                                updateStars();
                            }
                        });
                    }
                };
            }
        ]).directive('datepickerLocaldate', [
            '$parse', function($parse) {
                var directive = {
                    restrict: 'A',
                    require: ['ngModel'],
                    link: link
                };
                return directive;

                function link(scope, element, attr, ctrls) {
                    var ngModelController = ctrls[0];

                    // called with a JavaScript Date object when picked from the datepicker
                    ngModelController.$parsers.push(function(viewValue) {
                        // undo the timezone adjustment we did during the formatting
                        viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
                        // we just want a local date in ISO format
                        return viewValue.toISOString().substring(0, 10);
                    });

                    // called with a 'yyyy-mm-dd' string to format
                    ngModelController.$formatters.push(function(modelValue) {
                        if (!modelValue) {
                            return undefined;
                        }
                        // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
                        var dt = new Date(modelValue);
                        // 'undo' the timezone offset again (so we end up on the original date again)
                        dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
                        return dt;
                    });
                } //for datepicker x editable
            }
        ]).directive('editableDatepicker', [
            'editableDirectiveFactory',
            function(editableDirectiveFactory) {
                var myDate = new Date();

                var currentDate = new Date(
                    myDate.getFullYear(),
                    myDate.getMonth() - 2,
                    myDate.getDate());


                return editableDirectiveFactory({
                    directiveName: 'editableDatepicker',
                    inputTpl: '<div></div>',
                    render: function() {
                        this.parent.render.call(this);
                        var lowerEl = '  <md-datepicker  ng-init="datePickerDirectiveModel=' + this.attrs.editableDatepicker + '" datepicker-localdate  ng-model="datePickerDirectiveModel" md-min-date="' + this.attrs.mindate + '" md-max-date="' + this.attrs.maxdate + '" md-autofocus></md-datepicker>';
                        var button = '<md-button class="md-icon-button" ng-click="' + this.attrs.editableDatepicker + '=datePickerDirectiveModel" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>' +
                            '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';
                        this.inputEl.before(lowerEl);
                        this.inputEl.before(button);
                        //          this.inputEl.parent().find('div').remove();
                    },
                    autosubmit: function() {
                        var self = this;
                        self.inputEl.bind('change', function() {
                            self.scope.$apply(function() {
                                self.scope.$form.$submit();
                            });
                        });
                    }
                }); //for autocomplete x editable
            }
        ]).directive('editableAutoComplete', [
            'editableDirectiveFactory',
            function(editableDirectiveFactory) {
                return editableDirectiveFactory({
                    directiveName: 'editableAutoComplete',
                    inputTpl: '<div></div>',
                    render: function() {
                        this.parent.render.call(this);
                        var lowerEl = '<md-autocomplete ng-init="vm.searchText=' + this.attrs.model + '" md-autofocus' +
                            'md-selected-item="selectedItem"' +
                            'md-search-text="vm.searchText"' +
                            'md-items="item in ' + this.attrs.editableAutoComplete + '|filter: vm.searchText"' +
                            'md-item-text="item. ' + this.attrs.key + '"' +
                            'md-min-length="0"' +
                            '<md-item-template>' +
                            '<span md-highlight-text="vm.searchText" md-highlight-flags="^i">{{item.tittle}}</span>' +
                            '</md-item-template>' +
                            '</md-autocomplete>';
                        var button = '<md-button ng-click="' + this.attrs.model + '=vm.searchText" class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>' +
                            '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';

                        this.inputEl.before(lowerEl);
                        this.inputEl.before(button);
                        //          this.inputEl.parent().find('div').remove();
                    },
                    autosubmit: function() {
                        var self = this;
                        self.inputEl.bind('change', function() {
                            self.scope.$apply(function() {
                                self.scope.$form.$submit();
                            });
                        });
                    }
                });
            }
        ]).directive('editableSearchableSelect', [
            'editableDirectiveFactory',
            function(editableDirectiveFactory) {
                return editableDirectiveFactory({
                    directiveName: 'editableSearchableSelect',
                    inputTpl: '<div></div>',
                    render: function() {
                        this.parent.render.call(this);
                        var lowerEl = ' <md-select ng-model="vm.searchSelectModel"  md-on-close="searchTerm="" ng-init=vm.searchSelectModel=' + this.attrs.model + '>' +
                            '<md-select-header class="select-header">' +
                           '<input ng-model="searchTerm"' +
                            'ng-keydown="$event.stopPropagation()"' +
                            'type="search"' +
                            'class="header-searchbox md-text">' +
                            '</md-select-header>' +
                            '<md-option value="{{item.' + this.attrs.key + '}}" ng-repeat="item in  ' + this.attrs.editableSearchableSelect + ' |filter:searchTerm">{{item.' + this.attrs.value + '}}</md-option>' +
                            '</md-optgroup>' +
                            '</md-select>';
                        var button = '<md-button ng-click="' + this.attrs.model + '=vm.searchSelectModel" class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>' +
                            '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';

                        this.inputEl.before(lowerEl);
                        this.inputEl.before(button);
                        //          this.inputEl.parent().find('div').remove();
                    },
                    autosubmit: function() {
                        var self = this;
                        self.inputEl.bind('change', function() {
                            self.scope.$apply(function() {
                                self.scope.$form.$submit();
                            });
                        });
                    }
                });
            }
        ]).directive('editableSearchableSelectGroup', [
            'editableDirectiveFactory',
            function (editableDirectiveFactory) {
                return editableDirectiveFactory({
                    directiveName: 'editableSearchableSelectGroup',
                    inputTpl: '<div></div>',
                    render: function () {
                        this.parent.render.call(this);
                        var lowerEl = '<md-select ng-model="vm.searchSelectGroupModel"' +
                            'md-on-close="clearSearchTerm(vm.assignedTo)"' +
                            'data-md-container-class="selectdemoSelectHeader" >' +
                            '<md-select-header class="demo-select-header">' +
                            '<input ng-model="searchTerm"' +
                            'type="search"' +
                            'placeholder="Search for a User or Team.."' +
                            'class="demo-header-searchbox md-text" ng-keydown="$event.stopPropagation()">' +
                            '</md-select-header>' +
                            '<md-optgroup label="User">' +
                            '<label class="md-container-ignore" translate="'+ this.attrs.userTranslate+'">User</label>' +
                            '<md-option ng-value="userItem" ng-repeat="userItem in ' + this.attrs.userList + ' | filter:searchTerm">' +
                            '{{userItem.' + this.attrs.userKey + '}}</md-option></md-optgroup>' +
                            '<md-optgroup label="Team">' +
                            '<label class="md-container-ignore" translate="' + this.attrs.teamTranslate + '">Team</label>' +
                            '<md-option ng-value="teamItem" ng-repeat="teamItem in ' + this.attrs.teamList + ' | filter:searchTerm">' +
                            '{{teamItem.' + this.attrs.teamKey + '}}' +
                            '</md-option></md-optgroup>' +
                            '</md-select>';
                        var button = '<md-button ng-click="' + this.attrs.model + '=vm.searchSelectGroupModel" class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>' +
                            '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';

                        this.inputEl.before(lowerEl);
                        this.inputEl.before(button);
                        //          this.inputEl.parent().find('div').remove();
                    },
                    autosubmit: function () {
                        var self = this;
                        self.inputEl.bind('change', function () {
                            self.scope.$apply(function () {
                                self.scope.$form.$submit();
                            });
                        });
                    }
                });
            }
        ])
        .directive("pwcheck", function () {
            return {
                require: "ngModel",
                link: function (scope, element, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        var origin = scope.$eval(attrs["pwcheck"]);
                        if (origin !== viewValue) {
                            ctrl.$setValidity("pwcheck", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("pwcheck", true);
                            return viewValue;
                        }
                    });

                }
            };
        }).directive('fileModel', [
     '$parse',
     function ($parse) {

         return {
             restrict: 'A',

             link: function (scope, element, attrs) {

                 var model = $parse(attrs.fileModel);

                 var modelSetter = model.assign;

                 element.bind('change', function () {

                     scope.$apply(function () {

                         modelSetter(scope, element[0].files[0]);

                     });

                 });

             }

         };

     }
        ]);
})();
angular
    .module("app.core").factory("authInterceptorService", [
        "$q", "$location", "$window", function ($q, $location, $window) {

            var authInterceptorServiceFactory = {};


            var _responseError = function (rejection) {
                if (rejection.status === 401 || rejection.status === -1) {
                    $window.location = "/Account/Login";
                }
                return $q.reject(rejection);
            };
            authInterceptorServiceFactory.responseError = _responseError;

            return authInterceptorServiceFactory;
        }
    ]);