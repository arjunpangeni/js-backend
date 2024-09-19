const http = require('http')
const fs = require('fs');
const { error } = require('console');

const myServer = http.createServer((req, res) => {
    const log = `${Date.now().toLocaleString()}:${req.url} new req received`;
    fs.appendFile('log.txtt', log, (error, data) => {
        switch (req.url) {
            case '/':
                res.end("homepage");
                break;
            case '/about':
                res.end('about page');
                break;
            default:
                res.end('404 not found')

        }
    })
})