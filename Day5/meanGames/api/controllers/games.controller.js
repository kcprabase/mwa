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
    dbConnection.get().collection("games").findOne({ _id: ObjectId(gameId) }, (err, game) => {
        if (err) {
            res.status(500).send("Error occurred");
        } else {
            console.log(game);
            let st = 200;
            if (!game) st = 404;
            res.status(st).json(game);
        }
    });
}

module.exports.addOne = (req, res) => {
    console.log("body", req.body);
    const db = dbConnection.get()
    const gamesCollection = db.collection("games");
    if (req.body && req.body.title && req.body.price && (
        req.body.minPlayers >= 1 && req.body.minPlayers <= 11
    ) && (
            req.body.minAge >= 6 && req.body.minAge <= 99
        )) {
        let newGame = {
            title: req.body.title,
            price: parseFloat(req.body.price),
            minPlayers: parseInt(req.body.minPlayers),
            minAge: parseInt(req.body.minAge)
        };
        gamesCollection.insertOne(newGame, (err, insertedGame) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                console.log(insertedGame);
                res.status(200).json(insertedGame);
            }
        });
    } else {
        console.log("Data missing from form");
        res.status(400).json({ error: "Required data missing" });
    }

}


module.exports.deleteOne = (req, res) => {
    const gameId = req.params.gameId;
    console.log(gameId)
    dbConnection.get().collection("games").deleteOne({ _id: ObjectId(gameId) }, (err, count) => {
        if (err) {
            res.status(500).send("Error occurred");
        } else {
            res.status(200).json(count);
        }
    });
}

module.exports.updateOne = (req, res) => {
    const gameId = req.params.gameId;
    if (req.body) {
        console.log(gameId)
        dbConnection.get().collection("games")
            .updateOne({ _id: ObjectId(gameId) },
                { $set: req.body },
                (err, count) => {
                    console.log(err);
                    console.log(count);
                    if (err) {
                        res.status(500).send("Error occurred");
                    } else {
                        res.status(200).json(count);
                    }
                });
    }

}