const mongoose = require("mongoose");
const Ship = mongoose.model(process.env.SHIP_MODEL);


const _runGeoQuery = function (req, res) {
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    let distance = req.query.distance || 10000;
    const point = { type: "POINT", coordinates: [lng, lat] };
    const query = {
        "coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: distance,
                $minDistance: 0
            }
        }
    }
    Ship.find(query).limit(20).exec(function (err, ships) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            console.log("here we are", err);
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

const getAll = function (req, res) {
    let offset = 0;
    let count = 5;
    if (req.query) {
        if (req.query.offset) {
            offset = req.query.offset;
        }
        if (req.query.count) {
            count = req.query.count;
        }
        //check count > 20 here.
        if (req.query.lat && req.query.lng) {
            _runGeoQuery(req, res);
            return;
        }
    }
    Ship.find().skip(offset).limit(count).exec(function (err, ships) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const shipId = req.params.shipId;
    Ship.findById(shipId).exec(function (err, ship) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ship
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!ship) {
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