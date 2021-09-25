const browsers = [process.env.NODE_ENV === 'debug' ? 'FirefoxDebugging' : 'FirefoxHeadless'];

module.exports = (config) => {
    const webpackConfig = require('./webpack.config.js');
    delete webpackConfig.output;

    config.set({
        autoWatch: true,
        basePath: '',
        browserConsoleLogOptions: {
            format: "%b %T: %m",
            level: "error",
            terminal: true
        },
        browsers: browsers,
        client: {
            jasmine: {
                random: false
            }
        },
        colors: true,
        concurrency: 1,
        customLaunchers: {
            FirefoxDebugging: {
                base: 'Firefox',
                debug: true
            }
        },
        files: ['testContext.js'],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        port: 9876,
        preprocessors: {
            'testContext.js': ['webpack', 'sourcemap']
        },
        reporters: ['progress'],
        singleRun: true,
        webpack: webpackConfig,
        webpackMiddleware: {
            logLevel: 'warn',
            stats: 'errors-only'
        }
    });
};
