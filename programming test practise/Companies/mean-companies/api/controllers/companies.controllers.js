const mongoose = require("mongoose");
const Company = mongoose.model(process.env.COMPANY_MODEL);

const getAll = function (req, res) {
    let count = process.env.DEFAULT_FIND_COUNT;
    let offset = process.env.DEFAULT_FIND_OFFSET;
    if (req.query) {
        count = parseInt(req.query.count || count);
        offset = parseInt(req.query.offset || offset);
        console.log(count, offset)
    }
    if (count > process.env.DEFAULT_MAX_FIND_LIMIT) {
        res.status(400).json("Count cannot be greater than " + process.env.DEFAULT_MAX_FIND_LIMIT);
        return;
    }
    if (req.query && req.query.employeeName) {
        const name = req.query.employeeName;
        const reg = new RegExp(name);
        Company.aggregate([
            { $match: { 'relationships.person.first_name': reg } }
        ]).skip(offset).limit(count).exec(function (err, companies) {
            const response = {
                status: parseInt(process.env.REST_API_OK, 10),
                message: companies
            };
            if (err) {
                response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    }
    else if (req.query && req.query.sort) {
        Company.find().sort("name").skip(offset).limit(count).exec(function (err, companies) {
            const response = {
                status: parseInt(process.env.REST_API_OK, 10),
                message: companies
            };
            if (err) {
                response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    }
    else {
        Company.find().skip(offset).limit(count).exec(function (err, companies) {
            const response = {
                status: parseInt(process.env.REST_API_OK, 10),
                message: companies
            };
            if (err) {
                response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    }
}

const getOne = function (req, res) {
    const companyId = req.params.companyId;
    Company.findById(companyId).exec(function (err, company) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: company
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!company) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};