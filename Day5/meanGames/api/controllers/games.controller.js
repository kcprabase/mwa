// const gamesData = require("../data/games.json");
const dbConnection = require("../data/dbconnection")

module.exports.getAll = (req, res) => {
    let offset = parseInt(req.query.offset) || 0;
    let limit = Math.min(parseInt(req.query.count) || 4, 7);
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    // console.log("offset", offset, "limit", limit);
    gamesCollection.find().skip(offset).limit(limit).toArray((err, games) => {
        if (err) {
            res.status(404).send("Cannot find data");
        } else {
            res.status(200).json(games);
        }
    })
    // res.status(200).json(gamesData);
}

module.exports.getOne = (req, res) => {
    const gameId = req.params.gameId;
    res.status(200).json(gamesData[gameId]);
}