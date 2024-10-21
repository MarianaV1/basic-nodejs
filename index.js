const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to serve HTML files
const serveFile = (filePath, contentType, response) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end('<h1>Server Error</h1>', 'utf-8');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data, 'utf-8');
        }
    });
};

// Create the server
http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url + '.html');
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    // Check the route and serve the appropriate HTML file
    if (req.url === '/') {
        serveFile('./index.html', contentType, res);
    } else if (req.url === '/about.html') {
        serveFile('./about.html', contentType, res);
    } else if (req.url === '/contact-me.html') {
        serveFile('./contact-me.html', contentType, res);
    } else {
        // Serve the 404 page if the route is not found
        serveFile('./404.html', contentType, res);
    }
}).listen(8080);
