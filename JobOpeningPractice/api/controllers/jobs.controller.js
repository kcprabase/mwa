const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Job = mongoose.model(process.env.JobModel);


const _sendResponse = (res, response) => {
    res.status(parseInt(response.status)).json(response.message);
}

const getAll = (req, res) => {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.offset) {
        count = parseInt(req.query.count, 10);
    }
    if (count > 20) {
        _sendResponse(res, { status: 400, message: "Request count too big" });
        return;
    }

    Job.find().sort("-postDate").skip(offset).limit(count).exec((err, jobs) => {
        const response = { status: 200, message: jobs };
        if (err) {
            response.status = 500,
                response.message = err
        }
        if (!jobs) {
            response.status = 404,
                response.message = "No jobs found"
        }
        _sendResponse(res, response);

    });

}

const addOne = (req, res) => {
    if (req.body.salary) {
        bcrypt.hash(req.body.salary.toString(), 10, (err, salaryHash) => {
            if (err) {
                console.log("error hashing salary", err);
                _sendResponse(res, { status: 500, message: "Some error occured" });
                return;
            }
            const newJob = {
                title: req.body.title,
                salary: salaryHash,
                description: req.body.description,
                experience: req.body.experience,
                postDate: req.body.postDate
            }
            Job.create(newJob, (err, job) => {
                const response = {
                    status: 200,
                    message: job
                };
                if (err) {
                    response.status = 500;
                    response.message = err;
                }
                _sendResponse(res, response);
            });
        });
    }
}

module.exports = { addOne, getAll };