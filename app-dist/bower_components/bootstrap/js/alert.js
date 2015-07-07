/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function($){"use strict";var dismiss='[data-dismiss="alert"]',Alert=function(el){$(el).on("click",dismiss,this.close)};Alert.prototype.close=function(e){function removeElement(){$parent.trigger("closed.bs.alert").remove()}var $this=$(this),selector=$this.attr("data-target");selector||(selector=$this.attr("href"),selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,""));var $parent=$(selector);e&&e.preventDefault(),$parent.length||($parent=$this.hasClass("alert")?$this:$this.parent()),$parent.trigger(e=$.Event("close.bs.alert")),e.isDefaultPrevented()||($parent.removeClass("in"),$.support.transition&&$parent.hasClass("fade")?$parent.one($.support.transition.end,removeElement).emulateTransitionEnd(150):removeElement())};var old=$.fn.alert;$.fn.alert=function(option){return this.each(function(){var $this=$(this),data=$this.data("bs.alert");data||$this.data("bs.alert",data=new Alert(this)),"string"==typeof option&&data[option].call($this)})},$.fn.alert.Constructor=Alert,$.fn.alert.noConflict=function(){return $.fn.alert=old,this},$(document).on("click.bs.alert.data-api",dismiss,Alert.prototype.close)}(jQuery);