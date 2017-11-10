const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackShellPlugin = require('./WebpackPlugins/WebpackShellPlugin');

module.exports = (env) => {
    // Configuration in common to both client-side and server-side bundles
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: [ '.js', '.ts','.scss' ] },
        output: {
            filename: '[name].js',
            publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                { test: /\.ts$/, include: /ClientApp/, use: isDevBuild ? ['awesome-typescript-loader?silent=true&useCache=true', 'angular2-template-loader', 'angular2-router-loader'] : '@ngtools/webpack' },
                { test: /\.html$/, use: 'html-loader?minimize=false' },
                {test: /\.scss$/, use: ['to-string-loader', 'css-loader', 'sass-loader']},
                { test: /\.css$/, use: [ 'to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize' ] },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [new CheckerPlugin()]
    };

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig, {
        entry: { 'main-client': './ClientApp/boot.browser.ts' },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
            // new ManifestPlugin({path:clientBundleOutputDir})
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new AotPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: path.join(__dirname, 'ClientApp/app/app.module.browser#AppModule'),
                exclude: ['./**/*.server.ts']
            })
        ])
    });

    const serviceWorkerBundle = {
        stats: { modules: false },
        entry: { 'service-worker': './ClientApp/app/service-workers/service-worker.ts' },
        context: __dirname,
        resolve: { extensions: [ '.js', '.ts','.scss' ] },
        output: { 
            path: path.join(__dirname, './wwwroot'),
            filename:'service-worker.js',
            publicPath: 'dist/'
         },
        module: {
            rules: [
                { test: /\.ts$/, include: path.resolve(__dirname,"ClientApp/app/service-workers"), use: ['awesome-typescript-loader?silent=true&useCache=true', 'angular2-template-loader', 'angular2-router-loader'] }]
            },
        plugins: []
    };

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig, {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './ClientApp/boot.server.ts' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./ClientApp/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        //     ,new WebpackShellPlugin({ 
        //         onBuildStart: [], 
        //         onBuildEnd: ['del ' + path.join(__dirname,"ClientApp/service-worker.js")] 
        //    })
        ].concat(isDevBuild ? [] : [
            // Plugins that apply in production builds only
            new AotPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: path.join(__dirname, 'ClientApp/app/app.module.server#AppModule'),
                exclude: ['./**/*.browser.ts']
            })
        ]),
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'eval-cheap-module-source-map'
    });
    return [clientBundleConfig,serverBundleConfig,serviceWorkerBundle];
};
