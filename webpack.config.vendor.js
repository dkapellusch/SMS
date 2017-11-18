const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');

const treeShakableModules = [
    '@angular/animations',
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/flex-layout',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/cdk',
    '@angular/material',
    'zone.js',
    'ng2-charts',
    "isomorphic-fetch",
    
];
const nonTreeShakableModules = [
    'es6-promise',
    'es6-shim',
    'event-source-polyfill',
    'hammerjs',
    'reflect-metadata',
    '@angular/material/prebuilt-themes/purple-green.css',
    "./wwwroot/styles/css/material-icons.css",
    'rxjs',
    

];
const allModules = treeShakableModules.concat(nonTreeShakableModules);

module.exports = (env) => {
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = true; //  !(env && env.prod);
    const sharedConfig = {
        stats: {
            modules: false
        },
        resolve: {
            extensions: ['.js']
        },
        module: {
            rules: [{
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
                use: 'url-loader?limit=100000'
            }]
        },
        output: {
            publicPath: 'dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/11580
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/14898
            new webpack.IgnorePlugin(/^vertx$/), // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
        ]
    };

    const clientBundleConfig = merge(sharedConfig, {
        entry: {
            // To keep development builds fast, include all vendor dependencies in the vendor bundle.
            // But for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
            vendor: isDevBuild ? allModules : nonTreeShakableModules
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'dist')
        },
        module: {
            rules: [{
                test: /\.css(\?|$)/,
                use: extractCSS.extract({
                    use: isDevBuild ? 'css-loader' : 'css-loader?minimize'
                })
            }]
        },
        plugins: [
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin(),
            new CompressionPlugin({
                asset: '[path].gz[query]'
            })
        ])
    });

    const serverBundleConfig = merge(sharedConfig, {
        target: 'node',
        resolve: {
            mainFields: ['main']
        },
        entry: {
            vendor: allModules.concat(['aspnet-prerendering'])
        },
        output: {
            path: path.join(__dirname, 'ClientApp', 'dist'),
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [{
                test: /\.css(\?|$)/,
                use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize']
            }]
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
}