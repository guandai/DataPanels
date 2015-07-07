/*!
 * Bootstrap Grunt task for Glyphicons data generation
 * http://getbootstrap.com
 * Copyright 2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

var fs=require("fs");module.exports=function(){for(var glyphiconsFile=fs.readFileSync("less/glyphicons.less","utf8"),glpyhiconsLines=glyphiconsFile.split("\n"),iconClassName=/^\.(glyphicon-[^\s]+)/,glyphiconsData="# This file is generated via Grunt task. **Do not edit directly.**\n# See the 'build-glyphicons-data' task in Gruntfile.js.\n\n",i=0,len=glpyhiconsLines.length;len>i;i++){var match=glpyhiconsLines[i].match(iconClassName);null!==match&&(glyphiconsData+="- "+match[1]+"\n")}fs.existsSync("docs/_data")||fs.mkdirSync("docs/_data"),fs.writeFileSync("docs/_data/glyphicons.yml",glyphiconsData)};