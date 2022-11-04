const gamesData = require("../data/games.json");

module.exports.getAll = (req, res) => {
    res.status(200).json(gamesData);
}

module.exports.getOne = (req, res) => {
    const gameId = req.params.gameId;
    res.status(200).json(gamesData[gameId]);
}

module.exports.getPage = (req, res) => {
    let offset = parseInt(req.query.offset) || 0;
    let count = parseInt(req.query.count) || 5;
    console.log(offset, count);
    res.status(200).json(gamesData.slice(offset, offset + count));
}