const express = require("express");
require("dotenv").config();
require("./api/data/db");
const routes = require("./api/routes");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    console.log("Rec", req.method, req.url);
    next();
});

app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    next();
});

app.use("/api", routes);

const server = app.listen(3000, () => {
    console.log("App listening to port ", server.address().port);
})