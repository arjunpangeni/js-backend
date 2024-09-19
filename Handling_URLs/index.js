const http = require('http')
const fs = require('fs');
const url = require('url')

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();
    const log = `${date()}:${req.url} new req received \n`;
    const myurl = url.parse(req.url, true)  // parsing url from request 
    // the second parameter 'true' will parse the query parameters also
    console.log(myurl)
    fs.appendFile('log.txtt', log, (error, data) => {
        switch (myurl.pathname) {
            case '/':
                res.end("homepage");
                break;
            case '/about':
                res.end('about page');
                break;
            case '/favicon.ico':
                break;
            default:
                res.end('404 not found')

        }
    })
})

myServer.listen(5000, () => {
    console.log('server is running on port 5000')
})









function date() {
    const now = new Date();

    // Helper function to format numbers to two digits
    const pad = num => num.toString().padStart(2, '0');

    const month = pad(now.getMonth() + 1); // Months are zero-indexed
    const day = pad(now.getDate());
    const year = now.getFullYear();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate


}