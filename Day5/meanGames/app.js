const express = require("express");
const path = require("path");
const routes = require("./api/routes");
require("dotenv").config();
const app = express();

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, process.env.publicFolder)));
app.use(process.env.apiRoute, routes);
const server = app.listen(process.env.port, () => {
    console.log(process.env.msgServerStart, server.address().port);
});