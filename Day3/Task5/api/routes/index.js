const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/students.controller");
router.route("/students")
    .get(studentsController.getAll);

router.route("/students/:studentId")
    .get(studentsController.getOne);

module.exports = router;