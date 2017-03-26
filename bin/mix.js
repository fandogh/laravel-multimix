const config = require('../lib/config.js');
const path = require('path');

// Load preset
const args = global.process.argv.splice(2);

const preset_name = args[0] || config.defaultPreset;
const preset = config.presets[preset_name];
if (!preset) {
    console.log("Invalid preset", preset_name);
    console.log("Available presets:", Object.keys(config.presets).join(','));
    global.process.exit(1);
}

// Set env
global.process.env.NODE_ENV = preset.env || config.defaultEnv;

// MIX_PACKAGE env
const package_name = args[1] || config.defaultPackage;
global.process.env.MIX_PACKAGE = package_name;

// Set args
global.process.argv = [global.process.argv[0], global.process.argv[1]].concat(config.baseArgs).concat(preset.args);

// 'config' arg
global.process.argv.push('--config=' + (preset.config || config.defaultConfig));

// Debug
console.log("[MIX] Preset: " + preset_name + " Package: " + package_name);

// Require entry
require(path.resolve(config.projectRoot, preset.entry || config.defaultEntry));
