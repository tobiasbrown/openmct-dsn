const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/dsn/src/plugin.js'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.xml$/,
                use: 'raw-loader'
            }
        ]
    },
    output: {
        filename: 'openmct-dsn-bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
