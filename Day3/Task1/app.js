const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));


const server = app.listen(3000, () => {
    console.log("App is listening to port", server.address().port);
});