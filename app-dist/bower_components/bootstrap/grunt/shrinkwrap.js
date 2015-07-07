/*!
 * Bootstrap Grunt task for generating npm-shrinkwrap.canonical.json
 * http://getbootstrap.com
 * Copyright 2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

function updateShrinkwrap(grunt){var shrinkwrapData=grunt.file.readJSON(NON_CANONICAL_FILE);grunt.log.writeln("Deleting "+NON_CANONICAL_FILE.cyan+"..."),grunt.file["delete"](NON_CANONICAL_FILE),grunt.file.write(DEST_FILE,canonicallyJsonStringify(shrinkwrapData)),grunt.log.writeln("File "+DEST_FILE.cyan+" updated.")}var canonicallyJsonStringify=require("canonical-json"),NON_CANONICAL_FILE="npm-shrinkwrap.json",DEST_FILE="test-infra/npm-shrinkwrap.canonical.json";module.exports=updateShrinkwrap;