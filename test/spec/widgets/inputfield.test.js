'use strict';

describe('MODULE ar:inputfield', function() {

    describe('DIRECTIVE inputfield', function() {

        it('should exist', function() {
            module('ar:inputfield');
            inject([
                '$compile',
                '$rootScope',
                function($compile, $rootScope) {
                    var testVal = 'test';

                    // prepare scope
                    var scope = $rootScope.$new();
                    scope.test = testVal;

                    // prepare and compile directive, update scope
                    var html = '<inputfield value="test"></inputfield>';
                    var compiled = $compile(html)(scope);
                    scope.$digest();

                    // test expectations that child exists
                    expect(compiled).toBeDefined();
                    expect(compiled.children().length).toBe(1);

                    // test that child is a span, has testval as contents
                    var child = angular.element(compiled.children()[0]);
                    expect(child.is('span')).toBe(true);
                    expect(child.text()).toBe(testVal);
                }
            ]);
        });

        it('should have two-way data binding to "value"', function() {
            module('ar:inputfield');
            inject([
                '$compile',
                '$rootScope',
                function($compile, $rootScope) {
                    var testVal1 = 'test1';
                    var testVal2 = 'test2';

                    // prepare scope
                    var scope = $rootScope.$new();
                    scope.test = testVal1;

                    // prepare and compile directive, update scope
                    var html = '<inputfield value="test"></inputfield>';
                    var compiled = $compile(html)(scope);
                    scope.$digest();

                    // expect that the child element has a value of testVal1
                    var child = angular.element(compiled.children()[0]);
                    expect(child.text()).not.toBe(testVal2);
                    expect(child.text()).toBe(testVal1);

                    // update outer scope
                    scope.test = testVal2;
                    scope.$digest();

                    // expect that chile now has update value
                    expect(child.text()).not.toBe(testVal1);
                    expect(child.text()).toBe(testVal2);
                }
            ]);
        });

        it('should throw an exception if the input value is not a string', function() {
            module(function($exceptionHandlerProvider) {
                // prevent the exception from throwing and breaking the test
                $exceptionHandlerProvider.mode('log');
            });

            module('ar:inputfield');

            inject([
                '$compile',
                '$rootScope',
                '$exceptionHandler',
                'inputfield:exceptionStrings',
                function($compile, $rootScope, $exceptionHandler, inputfieldExceptionStrings) {
                    var testVal1 = {
                        not: 'a string'
                    };

                    // prepare scope
                    var scope = $rootScope.$new();
                    scope.test = testVal1;

                    expect($exceptionHandler.errors.length).toBe(0);

                    // prepare and compile directive, update scope
                    var html = '<inputfield value="test"></inputfield>';
                    $compile(html)(scope);
                    scope.$digest();

                    expect($exceptionHandler.errors.length).toBe(1);
                    expect($exceptionHandler.errors[0][0]).toBe(inputfieldExceptionStrings.invalidInput.exception);
                    expect($exceptionHandler.errors[0][1]).toBe(inputfieldExceptionStrings.invalidInput.cause);
                }
            ]);
        });

        it('should change to an input tag when clicked', function() {
            module('ar:inputfield');
            inject([
                '$compile',
                '$rootScope',
                function($compile, $rootScope) {
                    var testVal1 = 'test';

                    // prepare scope
                    var scope = $rootScope.$new();
                    scope.test = testVal1;

                    // prepare and compile directive, update scope
                    var html = '<inputfield value="test"></inputfield>';
                    var compiled = $compile(html)(scope);
                    scope.$digest();

                    var child = angular.element(compiled.children()[0]);
                    expect(child.is('span')).toBe(true);

                    compiled.triggerHandler('click');

                    child = angular.element(compiled.children()[0]);
                    expect(child.is('span')).toBe(false);
                    expect(child.is('input')).toBe(true);
                    expect(child.val()).toBe(testVal1);
                }
            ]);
        });

        it('should update scope when input text is changed and submitted with enter key', function() {
            module('ar:inputfield');
            inject([
                '$compile',
                '$rootScope',
                function($compile, $rootScope) {
                    var testVal1 = 'test1';
                    var testVal2 = 'test2';

                    // prepare scope
                    var scope = $rootScope.$new();
                    scope.test = testVal1;

                    // prepare and compile directive, update scope
                    var html = '<inputfield value="test"></inputfield>';
                    var compiled = $compile(html)(scope);
                    scope.$digest();

                    compiled.triggerHandler('click');
                    var child = angular.element(compiled.children()[0]);
                    expect(child.val()).toBe(testVal1);
                    expect(scope.test).toBe(testVal1);

                    child.val(testVal2); // update the input value
                    child.trigger('input'); // trigger the input complete

                    expect(child.val()).toBe(testVal2);
                    expect(scope.test).toBe(testVal2);
                }
            ]);
        });

        it('should not update scope when input text is changed and submitted with escape key', function() {
            module('ar:inputfield');
            inject([
                '$compile',
                '$rootScope',
                function($compile, $rootScope) {
                    var testVal1 = 'test1';
                    var testVal2 = 'test2';

                    // prepare scope
                    var scope = $rootScope.$new();
                    scope.test = testVal1;

                    // prepare and compile directive, update scope
                    var html = '<inputfield value="test"></inputfield>';
                    var compiled = $compile(html)(scope);
                    scope.$digest();

                    compiled.triggerHandler('click');
                    var child = angular.element(compiled.children()[0]);
                    expect(child.val()).toBe(testVal1);
                    expect(scope.test).toBe(testVal1);

                    child.val(testVal2); // update the input value
                    child.trigger('keydown', {which:27}); // trigger the input cancelled

                    expect(child.val()).toBe(testVal2);
                    expect(scope.test).toBe(testVal1);
                }
            ]);
        });

    }); //DIRECTIVE inputfield

}); //MODULE ar:inputfield
