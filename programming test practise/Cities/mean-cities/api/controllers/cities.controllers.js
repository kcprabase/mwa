const mongoose = require("mongoose");
const City = mongoose.model(process.env.CITY_MODEL);

const _runGeoQuery = function (req, res, offset, count) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const distance = parseFloat(req.query.distance);
    const point = { type: "Point", coordinates: [lng, lat] };
    const query = {
        "location.coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: distance,
                $minDistance: 0
            }
        }
    };
    console.log("here", query, lat, lng, distance);
    City.find(query).skip(offset).limit(count).exec(function (err, cities) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: cities
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        }
        // console.log(cities);
        res.status(response.status).json(response.message);
    });
}

const getAll = function (req, res) {
    let offset = req.query && req.query.offset ? req.query.offset : 0;
    let count = req.query && req.query.count ? req.query.count : 5;
    if (req.query && req.query.lat && req.query.lng && req.query.distance) {
        _runGeoQuery(req, res, offset, count);
        return;
    }
    else if (req.query && req.query.cityName) {
        City.find({ "city": req.query.cityName }).skip(offset).limit(count).exec(function (err, cities) {
            const response = {
                status: parseInt(process.env.REST_API_OK, 10),
                message: cities
            };
            if (err) {
                response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
                response.message = err;
            }
            res.status(response.status).json(response.message);
        });
    } else {
        City.find().skip(offset).limit(count).exec(function (err, cities) {
            const response = {
                status: parseInt(process.env.REST_API_OK, 10),
                message: cities
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
    const cityId = req.params.cityId;
    City.findById(cityId).exec(function (err, city) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: city
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!city) {
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