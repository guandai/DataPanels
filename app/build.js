({
    baseUrl: 'scripts',
    paths: {
        jquery: 'jquery-2.0.0.min',
        ...
        tablesorter: 'jquery.tablesorter-2.0.5.min',
        zeroclipboard: 'zeroclipboard-1.0.7.min'
    },
    modules: [
        {
            name: 'foo/main'
            excludes: ...
        },
        {
            name: 'libraries'
        },
        {
            name: 'plugins'
        }
    ],
    optimize: 'uglify',
    out: 'production/js/foo.js'
})