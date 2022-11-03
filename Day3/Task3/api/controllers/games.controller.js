const gamesData = require("../data/games.json");

module.exports.getAll = (req, res) => {
    res.status(200).json(gamesData);
}

module.exports.getOne = (req, res) => {
    const gameId = req.params.gameId;
    res.status(200).json(gamesData[gameId]);
}