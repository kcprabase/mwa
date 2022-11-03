const studentsData = require("../data/school.json");

module.exports.getAll = (req, res) => {
    res.status(200).json(studentsData);
}

module.exports.getOne = (req, res) => {
    const studentId = req.params.studentId;
    if (studentId < 1 || studentId > studentsData.length) {
        res.status(404).send("RESOURCE NOT FOUND");
    } else {
        res.status(200).json(studentsData[studentId - 1]);
    }
}