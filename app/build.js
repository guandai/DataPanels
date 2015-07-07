({
    appDir: "./",
    baseUrl: "./",
    removeCombined: true,
    mainConfigFile: "require-config.js",
    fileExclusionRegExp: /^(r|build)\.js$/,
    modules: [{
        name: 'boot'
    }],
    findNestedDependencies: true,
    dir: "../app-dist",
    preserveLicenseComments: true,
    generateSourceMaps: false,
    optimize: 'uglify2',
    uglify2: {
        mangle: false
    },
    optimizeCss: "standard"
})
