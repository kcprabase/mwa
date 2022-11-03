const express = require("express");
const app = express();


app.get("/:first", (req, res) => {
    const second = parseFloat(req.query.second);
    const first = parseFloat(req.params.first);
    if (second == 0) {
        res.status(404).send("cannot divide by zero");
    } else {
        res.status(200).send(`${first} divided by ${second} is ${first / second}`);
    }
});

app.listen(3000, () => {
    console.log("App is listening to port ", 3000);
});