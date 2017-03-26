const fs = require('fs');
const _ = require('lodash');
const path = require('path');

const defaultConfig = {
    defaultEnv: 'development',
    defaultPackage: 'app',
    defaultPreset: 'dev',
    baseArgs: ['--progress', '--hide-modules'],
    defaultEntry: './node_modules/webpack/bin/webpack.js',
    defaultConfig: './node_modules/laravel-mix/setup/webpack.config.js',
    projectRoot: global.process.cwd(),
    presets: {
        dev: {
            args: []
        },
        watch: {
            args: ['--watch']
        },
        poll: {
            args: ['--watch', '--watch-poll']
        },
        hot: {
            entry: 'node_modules/webpack-dev-server/bin/webpack-dev-server.js',
            args: ['--hot', '--inline']
        },
        production: {
            env: 'production',
            args: []
        }
    }
};

// Base config
const config = Object.assign({}, defaultConfig);

// Extend config
const userConfigPath = path.resolve(config.projectRoot, 'mix.config.js');
if (fs.existsSync(userConfigPath)) {
    const userConfig = require(userConfigPath);
    _.defaultsDeep(config, userConfig);
}

module.exports = config;