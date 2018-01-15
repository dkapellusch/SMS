const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const ManifestPlugin = require("webpack-manifest-plugin");
const WebpackShellPlugin = require("./WebpackPlugins/WebpackShellPlugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require("fork-ts-checker-notifier-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = env => {
  const isDevBuild = false;
  const sharedConfig = {
    stats: {
      modules: false,
      errorDetails: true
    },
    context: __dirname,
    resolve: {
      extensions: [".js", ".ts", ".scss"]
    },
    output: {
      filename: "[name].js",
      publicPath: "dist/"
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /ClientApp/,
          use: isDevBuild
            ? [
                "ts-loader?happyPackMode=true",
                "angular2-template-loader",
                "angular2-router-loader"
              ]
            : ["@ngtools/webpack"]
        },
        {
          test: /\.html$/,
          use: "html-loader?minimize=false"
        },
        {
          test: /\.scss$/,
          use: ["to-string-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.css$/,
          use: [
            "to-string-loader",
            isDevBuild ? "css-loader" : "css-loader?minimize"
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: "url-loader?limit=25000"
        }
      ]
    },
    plugins: isDevBuild
      ? [
          new ForkTsCheckerWebpackPlugin(),
          new ForkTsCheckerNotifierWebpackPlugin()
        ]
      : []
  };

  const clientBundleOutputDir = "./wwwroot/dist";
  const clientBundleConfig = merge(sharedConfig, {
    entry: {
      "main-client": "./ClientApp/boot.browser.ts"
    },
    output: {
      path: path.join(__dirname, clientBundleOutputDir)
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("./wwwroot/dist/vendor-manifest.json")
      })
    ].concat(
      isDevBuild
        ? [
            new webpack.SourceMapDevToolPlugin({
              filename: "[file].map",
              moduleFilenameTemplate: path.relative(
                clientBundleOutputDir,
                "[resourcePath]"
              )
            })
          ]
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
                comments: false
              }
            }),
            new AngularCompilerPlugin({
              tsConfigPath: "./tsconfig.json",
              entryModule: path.join(
                __dirname,
                "ClientApp/app/modules/app.module.browser#AppModule"
              ),
              exclude: ["./**/*.server.ts"]
            }),
            new CompressionPlugin({
              asset: "[path].gz[query]",
              algorithm: "gzip",
              test: /\.js$|\.css$|\.html$/,
              threshold: 10240,
              minRatio: 0
            })
          ]
    )
  });

  const serviceWorkerBundle = {
    stats: {
      modules: false
    },
    entry: {
      "service-worker": "./ClientApp/app/service-workers/service-worker.ts"
    },
    devtool: "none",
    context: __dirname,
    resolve: {
      extensions: [".js", ".ts", ".scss"]
    },
    output: {
      path: path.join(__dirname, "./wwwroot"),
      filename: "service-worker.js",
      publicPath: "dist/"
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: path.resolve(__dirname, "ClientApp/app/service-workers"),
          use: [
            "ts-loader?happyPackMode=true",
            "angular2-template-loader",
            "angular2-router-loader"
          ]
        }
      ]
    },
    plugins: []
  };

  const serverBundleConfig = merge(sharedConfig, {
    resolve: {
      mainFields: ["main"]
    },
    entry: {
      "main-server": "./ClientApp/boot.server.ts"
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("./ClientApp/dist/vendor-manifest.json"),
        sourceType: "commonjs2",
        name: "./vendor"
      })
    ].concat(
      isDevBuild
        ? []
        : [
            new AngularCompilerPlugin({
              tsConfigPath: "./tsconfig.json",
              entryModule: path.join(
                __dirname,
                "ClientApp/app/modules/app.module.server#AppModule"
              ),
              exclude: ["./**/*.browser.ts"]
            })
          ]
    ),
    output: {
      libraryTarget: "commonjs",
      path: path.join(__dirname, "./ClientApp/dist")
    },
    target: "node",
    devtool: "eval-cheap-module-source-map"
  });
  return [clientBundleConfig, serverBundleConfig].concat(
    isDevBuild ? [] : [serviceWorkerBundle]
  );
};
