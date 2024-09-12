// Create web server
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var comments = [];

// Create server
http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(data);
                res.end();
            }
        });
    } else if (pathname === '/getComments') {
        var json = JSON.stringify(comments);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(json);
        res.end();
    } else if (pathname === '/addComment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end();
    } else {
        var filePath = path.join(__dirname, pathname);
        fs.readFile(filePath, function(err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(data);
                res.end();
            }
        });
    }
}).listen(9090, function() {
    console.log('web server running at http://localhost:9090');
});