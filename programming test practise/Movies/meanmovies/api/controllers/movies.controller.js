const mongoose = require("mongoose");
const Movie = mongoose.model(process.env.MovieModel);

const _sendResponse = function (res, response) {
    res.status(response.status).json(response.message);
}

const getOne = function (req, res) {
    let movieId = req.params.movieId;
    if (mongoose.isValidObjectId(movieId)) {
        Movie.findById(movieId).exec(function (err, movie) {
            const response = {
                status: 200,
                message: movie
            };
            if (err) {
                response.status = 500;
                response.message = "Some error occured";
            }
            else if (!movie) {
                response.status = 404;
                response.message = "Movie id doesnot exist";
            }
            _sendResponse(res, response);
        })
    } else {
        _sendResponse(res, {
            status: 400,
            message: "invalid movie id"
        });
    }
}

const getAll = function (req, res) {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (count > 50) {
        _sendResponse(res, { status: 400, message: "request count cannot be more than 20" });
        return;
    }
    Movie.find({ $or: [{ "title": /^A/ }, { "title": /z$/ }] }).sort("-year").skip(offset).limit(count).select("title poster year").exec(function (err, movies) {
        const response = {
            status: 200,
            message: movies
        };
        if (err) {
            response.status = 500,
                message = err;
        }
        if (!movies) {
            response.status = 404,
                message = "Movies not found"
        }
        _sendResponse(res, response);
    })
}

const deleteOne = function (req, res) {
    let movieId = req.params.movieId;
    if (mongoose.isValidObjectId(movieId)) {
        Movie.findByIdAndDelete(movieId).exec(function (err, movie) {
            const response = {
                status: 204,
                message: movie
            };
            if (err) {
                response.status = 500;
                response.message = "Some error occured";
            }
            else if (!movie) {
                response.status = 404;
                response.message = "Movie id doesnot exist";
            }
            _sendResponse(res, response);
        })
    } else {
        _sendResponse(res, {
            status: 400,
            message: "invalid movie id"
        });
    }
}

module.exports = { getAll, getOne, deleteOne }
