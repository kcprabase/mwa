const express = require("express");
const router = express.Router();
const movieController = require("./controllers/movies.controller");

router.route("/movies")
    .get(movieController.getAll);

router.route("/movies/:movieId")
    .get(movieController.getOne)
    .delete(movieController.deleteOne);

module.exports = router;