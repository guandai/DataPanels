define(["../core","../manipulation"],function(jQuery){function actualDisplay(name,doc){var style,elem=jQuery(doc.createElement(name)).appendTo(doc.body),display=window.getDefaultComputedStyle&&(style=window.getDefaultComputedStyle(elem[0]))?style.display:jQuery.css(elem[0],"display");return elem.detach(),display}function defaultDisplay(nodeName){var doc=document,display=elemdisplay[nodeName];return display||(display=actualDisplay(nodeName,doc),"none"!==display&&display||(iframe=(iframe||jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement),doc=(iframe[0].contentWindow||iframe[0].contentDocument).document,doc.write(),doc.close(),display=actualDisplay(nodeName,doc),iframe.detach()),elemdisplay[nodeName]=display),display}var iframe,elemdisplay={};return defaultDisplay});