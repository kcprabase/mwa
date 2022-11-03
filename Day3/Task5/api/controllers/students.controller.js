const studentsData = require("../data/school.json");

module.exports.getAll = (req, res) => {
    res.status(200).json(studentsData);
}

module.exports.getOne = (req, res) => {
    const studentId = req.params.studentId;
    res.status(200).json(studentsData[studentId]);
}