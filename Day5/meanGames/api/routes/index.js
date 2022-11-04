const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/games.controller");

router.route("/games").get(gamesController.getAll);

router.route("/games/:gameId")
    .get(gamesController.getOne);

router.route("/games/add")
    .post(gamesController.addOne);

router.route("/games/delete/:gameId")
    .delete(gamesController.deleteOne);

router.route("/games/update/:gameId")
    .put(gamesController.updateOne);

module.exports = router;