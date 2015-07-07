/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function($){"use strict";function ScrollSpy(element,options){var href,process=$.proxy(this.process,this);this.$element=$($(element).is("body")?window:element),this.$body=$("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",process),this.options=$.extend({},ScrollSpy.DEFAULTS,options),this.selector=(this.options.target||(href=$(element).attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=$([]),this.targets=$([]),this.activeTarget=null,this.refresh(),this.process()}ScrollSpy.DEFAULTS={offset:10},ScrollSpy.prototype.refresh=function(){var offsetMethod=this.$element[0]==window?"offset":"position";this.offsets=$([]),this.targets=$([]);{var self=this;this.$body.find(this.selector).map(function(){var $el=$(this),href=$el.data("target")||$el.attr("href"),$href=/^#./.test(href)&&$(href);return $href&&$href.length&&$href.is(":visible")&&[[$href[offsetMethod]().top+(!$.isWindow(self.$scrollElement.get(0))&&self.$scrollElement.scrollTop()),href]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){self.offsets.push(this[0]),self.targets.push(this[1])})}},ScrollSpy.prototype.process=function(){var i,scrollTop=this.$scrollElement.scrollTop()+this.options.offset,scrollHeight=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,maxScroll=scrollHeight-this.$scrollElement.height(),offsets=this.offsets,targets=this.targets,activeTarget=this.activeTarget;if(scrollTop>=maxScroll)return activeTarget!=(i=targets.last()[0])&&this.activate(i);if(activeTarget&&scrollTop<=offsets[0])return activeTarget!=(i=targets[0])&&this.activate(i);for(i=offsets.length;i--;)activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(!offsets[i+1]||scrollTop<=offsets[i+1])&&this.activate(targets[i])},ScrollSpy.prototype.activate=function(target){this.activeTarget=target,$(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var selector=this.selector+'[data-target="'+target+'"],'+this.selector+'[href="'+target+'"]',active=$(selector).parents("li").addClass("active");active.parent(".dropdown-menu").length&&(active=active.closest("li.dropdown").addClass("active")),active.trigger("activate.bs.scrollspy")};var old=$.fn.scrollspy;$.fn.scrollspy=function(option){return this.each(function(){var $this=$(this),data=$this.data("bs.scrollspy"),options="object"==typeof option&&option;data||$this.data("bs.scrollspy",data=new ScrollSpy(this,options)),"string"==typeof option&&data[option]()})},$.fn.scrollspy.Constructor=ScrollSpy,$.fn.scrollspy.noConflict=function(){return $.fn.scrollspy=old,this},$(window).on("load",function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this);$spy.scrollspy($spy.data())})})}(jQuery);