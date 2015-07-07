'use strict';

define([
    'angular'
], function(angular) {
     
    /* Controllers */
    var widgetAnimations = angular.module('widgetAnimations', []);

    widgetAnimations.animation('.slideup', ["anifn", "value", function(anifn, value) {
        smt.tr("initial slideup")
        return anifn.animateReview({
            top: "-=" + value.reviewHeight
        })
    }]);

    widgetAnimations.animation('.slidedown', ["anifn", "value", function(anifn, value) {
        smt.tr("initial slidedown")
        return anifn.animateReview({
            top: "+=" + value.reviewHeight
        })
    }]);

    widgetAnimations.animation('.slideleft', ["anifn", "value", function(anifn, value) {
        smt.tr("initial slideleft")
        return anifn.animateReview({
            left: "-=" + value.reviewWidth
        })
    }]);

    widgetAnimations.animation('.slideright', ["anifn", "value", function(anifn, value) {
        smt.tr("initial slideright")
        return anifn.animateReview({
            left: "+=" + value.reviewWidth
        })
    }]);


});
