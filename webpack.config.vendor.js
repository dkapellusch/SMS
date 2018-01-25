const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");

const treeShakableModules = [
    "@angular/animations",
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms",
    "@angular/http",
    "@angular/platform-browser",
    "@angular/flex-layout",
    "@angular/platform-browser-dynamic",
    "@angular/router",
    "@angular/cdk",
    "@angular/material",
    "zone.js",
    "lodash-es",
    "ng2-charts"
];
const nonTreeShakableModules = [
    "es6-promise",
    "es6-shim",
    "event-source-polyfill",
    "hammerjs",
    "reflect-metadata",
    "@angular/material/prebuilt-themes/deeppurple-amber.css",
    "./wwwroot/styles/css/material-icons.css",
    "rxjs",
];

const allModules = treeShakableModules.concat(nonTreeShakableModules);

module.exports = (env) =>
{
    const extractCSS = new ExtractTextPlugin("vendor.css");
    const isDevBuild = true;
    const sharedConfig = {
        stats: {
            modules: false
        },
        resolve: {
            extensions: [".js"]
        },
        module: {
            rules: [
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/,
                    use: "url-loader?limit=100000"
                }
            ]
        },
        output: {
            publicPath: "dist/",
            filename: "[name].js",
            library: "[name]_[hash]"
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/,
                path.join(__dirname, "./ClientApp")),
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(@angular|esm5)/,
                path.join(__dirname, "./ClientApp")),
            new webpack.IgnorePlugin(/^vertx$/),
        ].concat(isDevBuild
                 ? []
                 : [
                     new webpack.optimize.UglifyJsPlugin({
                         mangle: true,
                         compress: {
                             warnings: false,
                             pure_getters: true,
                             unsafe: true,
                             unsafe_comps: true,
                             screw_ie8: true
                         },
                         output: {
                             comments: false,
                         },
                         exclude: [/\.min\.js$/gi]
                     }),
                     new CompressionPlugin({
                         asset: "[path].gz[query]",
                         algorithm: "gzip",
                         test: /\.js$|\.css$|\.html$/,
                         threshold: 10240,
                         minRatio: 0
                     })
                 ])
    };

    const clientBundleConfig = merge(sharedConfig, {
        entry: {
            vendor: isDevBuild ? allModules : nonTreeShakableModules
        },
        output: {
            path: path.join(__dirname, "wwwroot", "dist")
        },
        module: {
            rules: [
                {
                    test: /\.css(\?|$)/,
                    use: extractCSS.extract({
                        use: isDevBuild ? "css-loader" : "css-loader?minimize"
                    })
                }
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, "wwwroot", "dist", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ]
    });

    const serverBundleConfig = merge(sharedConfig, {
        target: "node",
        resolve: {
            mainFields: ["main"]
        },
        entry: {
            vendor: allModules.concat(["aspnet-prerendering"])
        },
        output: {
            path: path.join(__dirname, "ClientApp", "dist"),
            libraryTarget: "commonjs2",
        },
        module: {
            rules: [
                {
                    test: /\.css(\?|$)/,
                    use: ["to-string-loader", isDevBuild ? "css-loader" : "css-loader?minimize"]
                }
            ]
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, "ClientApp", "dist", "[name]-manifest.json"),
                name: "[name]_[hash]"
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
};