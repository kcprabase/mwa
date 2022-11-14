const express = require('express');
const app = express();


app.use((req, res, next)=>{
    console.log("received", req.method, req.url);
    next();
});

app.get("/", (req, res)=>{
    res.send("Rquest receved");
});

const server = app.listen(3000, () => {
    console.log("listening to port", server.address().port);
})