module.exports=function(grunt){grunt.initConfig({pkg:grunt.file.readJSON("package.json"),banner:'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',concat:{options:{banner:"<%= banner %>",stripBanners:!0},dist:{src:["src/<%= pkg.name %>.js","src/**/*.js"],dest:"dist/<%= pkg.name %>.js"}},uglify:{options:{banner:"<%= banner %>",sourceMap:!0},dist:{src:"<%= concat.dist.dest %>",dest:"dist/<%= pkg.name %>.min.js"}},jshint:{options:{curly:!0,eqeqeq:!0,immed:!0,latedef:!0,newcap:!0,noarg:!0,sub:!0,undef:!1,unused:!1,boss:!0,eqnull:!0,browser:!0,globals:{jQuery:!0}},gruntfile:{src:"Gruntfile.js"},lib_test:{src:["src/**/*.js","spec/**/*.js","!src/main.js"]}},qunit:{files:["spec/**/*.html"],urls:["http://tempwork.dz/smt/spec/qunit_spec.html"]},jasmine:{src:["src/**/*.js","!src/main.js"],options:{specs:"spec/*jasmine_spec.js",helpers:"spec/*Helper.js"}},watch:{gruntfile:{files:"<%= jshint.gruntfile.src %>",tasks:["jshint:gruntfile"]},lib_test:{files:"<%= jshint.lib_test.src %>",tasks:["jshint:lib_test","qunit"]}},jasmine_node:{options:{forceExit:!0,match:".*",match_is_prefix_all_ignore_case:"",matchall:!1,extensions:"js",specNameMatcher:"jasmine_node_Spec",specNameMatcher_is_suffix_all_ignore_case:"",coffee:!1,specFolders:[],onComplete:null,isVerbose:!0,showColors:!0,teamcity:!1,useRequireJs:!1,regExpSpec:null,based_on_other_options_:"match + specNameMatcher + extensions (ignore case)",gowl:!1,junitreport:{report:!1,savePath:"./reports/",useDotNotation:!0,consolidate:!0},includeStackTrace:!1,growl:!1},all:["spec/"]}}),grunt.loadNpmTasks("grunt-jasmine-node-new"),grunt.loadNpmTasks("grunt-contrib-concat"),grunt.loadNpmTasks("grunt-contrib-uglify"),grunt.loadNpmTasks("grunt-contrib-qunit"),grunt.loadNpmTasks("grunt-contrib-jshint"),grunt.loadNpmTasks("grunt-contrib-watch"),grunt.loadNpmTasks("grunt-contrib-requirejs"),grunt.loadNpmTasks("grunt-contrib-jasmine"),grunt.registerTask("default",["jshint","qunit:files","concat","uglify"]),grunt.registerTask("jasbr",["jasmine"]),grunt.registerTask("jasnd",["jasmine_node"]),grunt.registerTask("qu",["qunit"])};