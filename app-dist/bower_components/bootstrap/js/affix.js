/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function($){"use strict";var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options),this.$window=$(window).on("scroll.bs.affix.data-api",$.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",$.proxy(this.checkPositionWithEventLoop,this)),this.$element=$(element),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};Affix.RESET="affix affix-top affix-bottom",Affix.DEFAULTS={offset:0},Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(Affix.RESET).addClass("affix");var scrollTop=this.$window.scrollTop(),position=this.$element.offset();return this.pinnedOffset=position.top-scrollTop},Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)},Affix.prototype.checkPosition=function(){if(this.$element.is(":visible")){var scrollHeight=$(document).height(),scrollTop=this.$window.scrollTop(),position=this.$element.offset(),offset=this.options.offset,offsetTop=offset.top,offsetBottom=offset.bottom;"top"==this.affixed&&(position.top+=scrollTop),"object"!=typeof offset&&(offsetBottom=offsetTop=offset),"function"==typeof offsetTop&&(offsetTop=offset.top(this.$element)),"function"==typeof offsetBottom&&(offsetBottom=offset.bottom(this.$element));var affix=null!=this.unpin&&scrollTop+this.unpin<=position.top?!1:null!=offsetBottom&&position.top+this.$element.height()>=scrollHeight-offsetBottom?"bottom":null!=offsetTop&&offsetTop>=scrollTop?"top":!1;if(this.affixed!==affix){this.unpin&&this.$element.css("top","");var affixType="affix"+(affix?"-"+affix:""),e=$.Event(affixType+".bs.affix");this.$element.trigger(e),e.isDefaultPrevented()||(this.affixed=affix,this.unpin="bottom"==affix?this.getPinnedOffset():null,this.$element.removeClass(Affix.RESET).addClass(affixType).trigger($.Event(affixType.replace("affix","affixed"))),"bottom"==affix&&this.$element.offset({top:scrollHeight-offsetBottom-this.$element.height()}))}}};var old=$.fn.affix;$.fn.affix=function(option){return this.each(function(){var $this=$(this),data=$this.data("bs.affix"),options="object"==typeof option&&option;data||$this.data("bs.affix",data=new Affix(this,options)),"string"==typeof option&&data[option]()})},$.fn.affix.Constructor=Affix,$.fn.affix.noConflict=function(){return $.fn.affix=old,this},$(window).on("load",function(){$('[data-spy="affix"]').each(function(){var $spy=$(this),data=$spy.data();data.offset=data.offset||{},data.offsetBottom&&(data.offset.bottom=data.offsetBottom),data.offsetTop&&(data.offset.top=data.offsetTop),$spy.affix(data)})})}(jQuery);