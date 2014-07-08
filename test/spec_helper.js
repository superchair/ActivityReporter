'use strict';

beforeEach(function() {
    this.addMatchers({
        toBeInstanceOf: function(expected) {
            var isInstanceOf = this.actual instanceof expected && this.actual.length > 0;
            this.message = function() {
                if(!isInstanceOf) {
                    return 'Expected ' + this.actual + ' to be instanceof ' + expected + ', found ' + typeof this.actual;
                }
            };
            return isInstanceOf;
        },

        toBeA: function(expected) {
            var isA = typeof this.actual === expected;
            this.message = function() {
                if(!isA) {
                    return 'Expected typeof ' + this.actual + ' to be ' + expected + ', found ' + typeof this.actual;
                }
            };
            return isA;
        }
    });
});
