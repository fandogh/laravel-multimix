<p align="center">
<a href="#">
    <img src="https://github.com/pi0/laravel-multimix/raw/master/mulinex.png" width="300px" alt="Laravel MultiMix">
</a>
<a href="https://www.npmjs.com/package/laravel-multimix">
    <img alt="" src="https://img.shields.io/npm/v/laravel-multimix?style=flat-square">
</a>
</p>

> [Laravel-Mix](https://github.com/JeffreyWay/laravel-mix) helper for projects with complex & multi assets.

## 🔥 Getting started
Since laravel-mix introduced in laravel 5.4 it is recommended to use this package for laravel >= 5.4 projects only.

Open your `package.json` and replace ugly scrips section with this:

```json
  {
    "scripts": {
      "mix": "node node_modules/laravel-multimix/bin/mix"
    }
  }
```

Then you can run your tasks with this single command: 

```bash
    # Usage syntax: npm mix [preset=dev] [package=app]
    
    # Example: run preset hot (with package app)
    npm mix hot
    
    # Example: run preset watch on package bootstrap
    npm mix watch bootstrap
```

### 🎌 Presets
presets are just different sets of flags and envs passed to webpack.
They are basically same as default laravel package.json commands.

**Available Presets**

- dev
- watch
    - args: `--watch`
- poll
    - args: `--watch --watch-poll`
- hot
    - args: `--hot --inline`
    - entry: `webpack-dev-server`
- production
    - env: `production`
    
### 📦 Packages
Package is optional and available via `MIX_PACKAGE` env. It will do nothing by default.
 
### 💁 Utils
Laravel multimix exposes some utils constant and functions.

**MIX_PACKAGE** : is same as package name argument
**NPM** : is relative path to `node_modules`
**VENDOR** : is relative path to `resources/assets/vendor`
**output(package_name)**: generates path to public with this template: `public/assets/{package}/`  
**OUTPUT**: is output for current MIX_PACKAGE

See example below for better understanding.

### 📚 Example**

```js
// webpack.mix.js

const {mix} = require('laravel-mix');
const {MIX_PACKAGE, NPM, VENDOR, OUTPUT, output} = require('laravel-multimix');

/*
 |--------------------------------------------------------------------------
 | Bootstrap
 | @package bootstrap
 |--------------------------------------------------------------------------
 */
if (MIX_PACKAGE === 'bootstrap') {
    // Bootstrap + RTL
    // generates public/assets/bootstrap/bootstrap.css
    mix.sass('resources/assets/sass/bootstrap.scss', OUTPUT).options({
        postCss: [require('postcss-rtl')()]
    });
}

/*
 |--------------------------------------------------------------------------
 | App
 | @package app
 |--------------------------------------------------------------------------
 */
if (MIX_PACKAGE === 'app') {
       // JS
       // generates public/assets/app/app.js and public/assets/app/manifest.js
       mix.js('resources/assets/js/app.js', OUTPUT).extract([
           'jquery',
           'nprogress',
           'swiper'
       ]);
   
       // CSS
       // generates public/assets/app/app.css
        mix.styles([
           output('bootstrap') + 'bootstrap.css',
           NPM + 'swiper/dist/css/swiper.min.css'
       ], OUTPUT + 'app.css');
}
```

## 💡 Former related projects

- [laravel-elixir-packager](https://github.com/pi0/laravel-elixir-packager)
- [laravel-elixir-rtl](https://github.com/pi0/laravel-elixir-rtl)
- [laravel-elixirx (deprecated)](https://github.com/pi0/laravel-elixirx)

## 🗝 License
The MIT License (MIT) - Copyright (c) 2017 Fandogh - Pooya Parsa

