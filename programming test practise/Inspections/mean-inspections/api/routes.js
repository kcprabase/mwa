const express = require("express");
const inspectionsController = require("./controllers/inspections.controller");
const router = express.Router();


router.route("/inspections")
    .get(inspectionsController.getAll);

router.route("/inspections/:inspectionId")
    .get(inspectionsController.getOne)
    .delete(inspectionsController.deleteOne);

module.exports = router;