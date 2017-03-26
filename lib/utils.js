/*
 Laravel mix utils
 */

exports.MIX_PACKAGE = global.process.env.MIX_PACKAGE;

exports.NPM = './node_modules/';
exports.VENDOR = './resources/assets/vendor/';

exports.output = function (package_name) {
    return 'public/assets/' + package_name + '/'
};

exports.OUTPUT = exports.output(exports.MIX_PACKAGE);