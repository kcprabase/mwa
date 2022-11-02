const express = require("express");
const app = express();
const schoolData= require("../data/school.json");

app.get();

module.exports.gamesGetAll= function(req, res) {
console.log("GET all games");
res.status(200).json(gamesData);
}


app.listen(3000, () => {
    console.log("App is listening to port ", 3000);
});
