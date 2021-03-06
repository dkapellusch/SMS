"use strict";
const { exec } = require("child_process");

function puts(error, stdout, stderr)
{
    console.log(stdout);
}

function WebpackShellPlugin(options)
{
    const defaultOptions = {
        onBuildStart: [],
        onBuildEnd: []
    };

    this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function(compiler)
{
    const options = this.options;

    compiler.plugin("compilation", compilation =>
    {
        if (options.onBuildStart.length)
        {
            console.log("Executing pre-build scripts");
            options.onBuildStart.forEach(script => exec(script, puts));
        }
    });

    compiler.plugin("emit", (compilation, callback) =>
    {
        if (options.onBuildEnd.length)
        {
            setTimeout(() =>
            {
                console.log("Executing post-build scripts");
                options.onBuildEnd.forEach(script => exec(script, puts));
            }, 500);
        }
        callback();
    });
};
module.exports = WebpackShellPlugin;