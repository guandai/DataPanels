function checkString(file,string,done){var character="",matchFound=!1,matchedPositions=0,readStream=fs.createReadStream(file,{encoding:"utf8"});readStream.on("close",done),readStream.on("error",done),readStream.on("readable",function(){for(;matchFound!==!0&&null!==(character=readStream.read(1));)character===string.charAt(matchedPositions)?matchedPositions+=1:matchedPositions=0,matchedPositions===string.length&&(matchFound=!0);assert.equal(!0,matchFound),this.close()})}function runTests(){var dir=dirs.dist;describe('Test if the files from the "'+dir+'" directory have the expected content',function(){it('".htaccess" should have the "ErrorDocument..." line uncommented',function(done){var string="\n\nErrorDocument 404 /404.html\n\n";checkString(path.resolve(dir,".htaccess"),string,done)}),it('"index.html" should contain the correct jQuery version in the CDN URL',function(done){var string="ajax.googleapis.com/ajax/libs/jquery/"+pkg.devDependencies.jquery+"/jquery.min.js";checkString(path.resolve(dir,"index.html"),string,done)}),it('"index.html" should contain the correct jQuery version in the local URL',function(done){var string="js/vendor/jquery-"+pkg.devDependencies.jquery+".min.js";checkString(path.resolve(dir,"index.html"),string,done)}),it('"main.css" should contain a custom banner',function(done){var string="/*! HTML5 Boilerplate v"+pkg.version+" | "+pkg.license.type+" License | "+pkg.homepage+" */\n\n/*\n";checkString(path.resolve(dir,"css/main.css"),string,done)})})}var assert=require("assert"),fs=require("fs"),path=require("path"),pkg=require("./../package.json"),dirs=pkg["h5bp-configs"].directories;runTests();