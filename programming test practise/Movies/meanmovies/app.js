const express = require("express");
require("dotenv").config();
require("./api/data/db");
const routes = require("./api/routes");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
    console.log("RECEIVED", req.method, req.url);
    next();
});

app.use("/api", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, DELETE")
    next();
});
app.use("/api", routes);

const server = app.listen(process.env.Port, function () {
    console.log(process.env.StartMsg, server.address().port);
});