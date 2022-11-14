const mongoose = require("mongoose");
const Inspection = mongoose.model("Inspection");


const _newResponse = (status, message) => {
    return { status: status, message: message };
} 

const getAll = (req, res) => {
    let offset = req.query && req.query.offset ? req.query.offset : 0;
    let count = req.query && req.query.count ? req.query.count : 5;
    Inspection.find().skip(offset).limit(count).select("business_name").exec((err, ins) => {
        let response = _newResponse(process.env.OkCode, ins);
        if (err) {
            response = _newResponse(process.env.InternalErrorCode, err);
        } else if (!ins) {
            response = _newResponse(process.env.NotFoundCode, process.env.InspectionNotFound)
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = (req, res) => {
    let inspectionId = req.params.inspectionId;
    Inspection.findById(inspectionId).exec((err, ins) => {
        let response = _newResponse(process.env.OkCode, ins);
        if (err) {
            response = _newResponse(process.env.InternalErrorCode, err);
        } else if (!ins) {
            response = _newResponse(process.env.NotFoundCode, process.env.InspectionIdNotFound);
        }
        res.status(response.status).json(response.message);
    });
}

const deleteOne = (req, res) => {
    let inspectionId = req.params.inspectionId;
    Inspection.findByIdAndDelete(inspectionId).exec((err, ins) => {
        let response = _newResponse(process.env.SuccessNoContentCode, ins);
        if (err) {
            response = _newResponse(process.env.InternalErrorCode, err);
        } else if (!ins) {
            response = _newResponse(process.env.NotFoundCode, process.env.InspectionIdNotFound);
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = { getAll, getOne, deleteOne };