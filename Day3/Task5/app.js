const express = require("express");
const routes = require("./api/routes");
require("dotenv").config();
const app = express();

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.get("/",(req,res)=>{
    res.status(200).send(process.env.DEFAULT_APP_MESSAGE);
});

app.use(process.env.API_ROUTE, routes);

const server = app.listen(parseInt(process.env.PORT), () => {
    console.log(process.env.MSG_SERVER_START, server.address().port);
});
