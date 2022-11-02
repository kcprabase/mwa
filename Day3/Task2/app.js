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

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(parseInt(process.env.PORT), () => {
    console.log("App is running on port ", server.address().port);
})