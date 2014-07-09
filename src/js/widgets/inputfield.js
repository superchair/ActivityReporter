'use strict';
(function(undefined) {
    var inputfield = angular.module('ar:inputfield', []);

    inputfield.constant('inputfield:exceptionStrings', {
        'invalidInput': {
            exception: 'Invalid Input',
            cause: 'The "value" field must be of type <string>'
        }
    });

    inputfield.directive('inputfield', [
        '$compile',
        '$exceptionHandler',
        'inputfield:exceptionStrings',
        function($compile, $exceptionhandler, inputfieldExceptionStrings) {
            var linkFn = function(scope, elem) {
                if(typeof(scope.value) !== 'string') {
                    $exceptionhandler(
                        inputfieldExceptionStrings.invalidInput.exception,
                        inputfieldExceptionStrings.invalidInput.cause
                    );
                }
                var isInput = false;
                var textHtml = '<span>{{value}}</span>';
                var inputHtml = '<input type="text" ng-model="value" />';
                var originalInput = scope.value;

                var text = $compile(textHtml)(scope);
                elem.append(text);

                elem.on('click', function() {
                    if(!isInput) {
                        originalInput = scope.value;
                        var input = $compile(inputHtml)(scope);
                        elem.empty();
                        elem.append(input);
                        input.focus();
                        elem.on('keydown', function(eventObj) {
                            switch(eventObj.which) {
                                case 27: // escape
                                    scope.$apply(function(scope) {
                                        scope.value = originalInput;
                                    });

                                case 13: // enter
                                    var text = $compile(textHtml)(scope);
                                    elem.empty();
                                    elem.append(text);
                                    isInput = false;
                                    break;
                            }
                            scope.$digest();
                        });
                        scope.$digest();
                        isInput = true;
                    }
                });
            };

            return {
                restrict: 'E',
                scope: {
                    value: '='
                },
                link: linkFn
            };
        }
    ]);
})();
