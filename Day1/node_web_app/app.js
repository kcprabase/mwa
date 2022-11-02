const http = require("http");
const fs = require("fs");
const serveAllRequests = function (req, res) {
    if (req.method === 'POST') {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end("{'message' : 'Hello World!'}");
    } else {
        switch (req.url) {
            case "/":
            case "/index":
                readFileAndServe(res, "index"); break;
            case "/page1":
                readFileAndServe(res, "page1"); break;
            case "/page2":
                readFileAndServe(res, "page2"); break;
            default:
                res.setHeader("Content-Type", "text/html");
                res.writeHead(404);
                res.end("Page not found");
                break;
        }
    }
}

const server =
    http.createServer(serveAllRequests);
server.listen(3000, "localhost",
    function () {
        console.log("Server isrunning onhttp://localhost:3000");
    });

const readFileAndServe = (res, fileName) => {
    res.setHeader("Content-Type", "text/html");
    let statusCode;
    let fileBuffer;
    fs.readFile(`${__dirname}\\${fileName}.html`,
        function (err, buffer) {
            if (err) {
                statusCode = 404;
                fileBuffer = "File not Found";
            } else {
                statusCode = 200;
                fileBuffer = buffer;
            }
            res.writeHead(statusCode);
            res.end(fileBuffer);
        });
}