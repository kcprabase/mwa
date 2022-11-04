// const gamesData = require("../data/games.json");
const { ObjectId } = require("mongodb");
const dbConnection = require("../data/dbconnection")

module.exports.getAll = (req, res) => {
    let offset = parseInt(req.query.offset) || 0;
    let limit = Math.min(parseInt(req.query.count) || 4, 7);
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    // console.log("offset", offset, "limit", limit);
    gamesCollection.find().skip(offset).limit(limit).toArray((err, games) => {
        if (err) {
            res.status(500).send("cannot find games");
        } else {
            let st = 200;
            if (!games) st = 404;
            res.status(st).json(games);
        }
    })
    // res.status(200).json(gamesData);
}

module.exports.getOne = (req, res) => {
    const gameId = req.params.gameId;
    console.log(gameId)
    // dbConnection.get().collection("games").findOne({ _id: ObjectId(gameId) }, (err, game) => {
    const db = dbConnection.get()
    const gamesCollection = db.collection("games")
    gamesCollection.findOne({ _id: ObjectId(gameId) }, (err, game) => {
        if (err) {
            res.status(500).send("Error occurred");
        } else {
            console.log(game);
            let st = 200;
            if (!game) st = 404;
            res.status(st).json(game);
        }
    });
    // res.status(200).json(gamesData[gameId]);
}