/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function($){"use strict";function transitionEnd(){var el=document.createElement("bootstrap"),transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var name in transEndEventNames)if(void 0!==el.style[name])return{end:transEndEventNames[name]};return!1}$.fn.emulateTransitionEnd=function(duration){var called=!1,$el=this;$(this).one($.support.transition.end,function(){called=!0});var callback=function(){called||$($el).trigger($.support.transition.end)};return setTimeout(callback,duration),this},$(function(){$.support.transition=transitionEnd()})}(jQuery);