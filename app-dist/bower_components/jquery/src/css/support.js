define(["../core","../var/support"],function(jQuery,support){return function(){function computeStyleTests(){var div,body,container,contents;body=document.getElementsByTagName("body")[0],body&&body.style&&(div=document.createElement("div"),container=document.createElement("div"),container.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",body.appendChild(container).appendChild(div),div.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",pixelPositionVal=boxSizingReliableVal=!1,reliableMarginRightVal=!0,window.getComputedStyle&&(pixelPositionVal="1%"!==(window.getComputedStyle(div,null)||{}).top,boxSizingReliableVal="4px"===(window.getComputedStyle(div,null)||{width:"4px"}).width,contents=div.appendChild(document.createElement("div")),contents.style.cssText=div.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",contents.style.marginRight=contents.style.width="0",div.style.width="1px",reliableMarginRightVal=!parseFloat((window.getComputedStyle(contents,null)||{}).marginRight),div.removeChild(contents)),div.innerHTML="<table><tr><td></td><td>t</td></tr></table>",contents=div.getElementsByTagName("td"),contents[0].style.cssText="margin:0;border:0;padding:0;display:none",reliableHiddenOffsetsVal=0===contents[0].offsetHeight,reliableHiddenOffsetsVal&&(contents[0].style.display="",contents[1].style.display="none",reliableHiddenOffsetsVal=0===contents[0].offsetHeight),body.removeChild(container))}var div,style,a,pixelPositionVal,boxSizingReliableVal,reliableHiddenOffsetsVal,reliableMarginRightVal;div=document.createElement("div"),div.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=div.getElementsByTagName("a")[0],style=a&&a.style,style&&(style.cssText="float:left;opacity:.5",support.opacity="0.5"===style.opacity,support.cssFloat=!!style.cssFloat,div.style.backgroundClip="content-box",div.cloneNode(!0).style.backgroundClip="",support.clearCloneStyle="content-box"===div.style.backgroundClip,support.boxSizing=""===style.boxSizing||""===style.MozBoxSizing||""===style.WebkitBoxSizing,jQuery.extend(support,{reliableHiddenOffsets:function(){return null==reliableHiddenOffsetsVal&&computeStyleTests(),reliableHiddenOffsetsVal},boxSizingReliable:function(){return null==boxSizingReliableVal&&computeStyleTests(),boxSizingReliableVal},pixelPosition:function(){return null==pixelPositionVal&&computeStyleTests(),pixelPositionVal},reliableMarginRight:function(){return null==reliableMarginRightVal&&computeStyleTests(),reliableMarginRightVal}}))}(),support});