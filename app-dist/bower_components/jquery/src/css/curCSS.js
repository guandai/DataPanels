define(["exports","../core","./var/rnumnonpx","./var/rmargin","../selector"],function(exports,jQuery,rnumnonpx,rmargin){var getStyles,curCSS,rposition=/^(top|right|bottom|left)$/;window.getComputedStyle?(getStyles=function(elem){return elem.ownerDocument.defaultView.opener?elem.ownerDocument.defaultView.getComputedStyle(elem,null):window.getComputedStyle(elem,null)},curCSS=function(elem,name,computed){var width,minWidth,maxWidth,ret,style=elem.style;return computed=computed||getStyles(elem),ret=computed?computed.getPropertyValue(name)||computed[name]:void 0,computed&&(""!==ret||jQuery.contains(elem.ownerDocument,elem)||(ret=jQuery.style(elem,name)),rnumnonpx.test(ret)&&rmargin.test(name)&&(width=style.width,minWidth=style.minWidth,maxWidth=style.maxWidth,style.minWidth=style.maxWidth=style.width=ret,ret=computed.width,style.width=width,style.minWidth=minWidth,style.maxWidth=maxWidth)),void 0===ret?ret:ret+""}):document.documentElement.currentStyle&&(getStyles=function(elem){return elem.currentStyle},curCSS=function(elem,name,computed){var left,rs,rsLeft,ret,style=elem.style;return computed=computed||getStyles(elem),ret=computed?computed[name]:void 0,null==ret&&style&&style[name]&&(ret=style[name]),rnumnonpx.test(ret)&&!rposition.test(name)&&(left=style.left,rs=elem.runtimeStyle,rsLeft=rs&&rs.left,rsLeft&&(rs.left=elem.currentStyle.left),style.left="fontSize"===name?"1em":ret,ret=style.pixelLeft+"px",style.left=left,rsLeft&&(rs.left=rsLeft)),void 0===ret?ret:ret+""||"auto"}),exports.getStyles=getStyles,exports.curCSS=curCSS});