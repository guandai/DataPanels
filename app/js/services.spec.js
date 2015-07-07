/*global module, inject */
'use strict';

define(['boot', 'js/app' , 'angularMocks'], function(app) {
	describe('widgetServices module', function() {

		beforeEach(module('widgetServices'));

		describe('widgetServices module', function() {
			it('should ..', inject(function( resourceExample ) {
				//spec body
				resourceExample.get({apiid:123})
				expect(true).toBeDefined();
			}));
		});
	});
});