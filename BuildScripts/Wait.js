const http = require('http');
const path = require('path');
const configurations = require(path.join(__dirname, "../.vscode/launch.json")).configurations;


function ExtractConfiguration(name) {
    for (let section of configurations) {
        if (section.name === name) return section;
    }
}

const debugUrl = ExtractConfiguration("Client").url;

let host = debugUrl.split('//')[1].split(':')[0];
let port = debugUrl.split(':')[2];

http.get({
    host: host,
    port: port,
    path: '/',
    timeout: 5000
}, (res) => {
    console.log(res.headers);
});