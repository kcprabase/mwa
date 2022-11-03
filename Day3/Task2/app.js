const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

app.use("/css", function (req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.get("/json", function (req, res) {
    res.send({ "test": "test" });
});

app.use(express.static(path.join(__dirname,process.env.PUBLIC_FOLDER)));

const server = app.listen(parseInt(process.env.PORT), () => {
    console.log(process.env.APP_START_MSG, server.address().port);
})