const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: String,
    year: Number,
    type: String,
    releaseDate: Date,
    genres: [String],
    directors: [String],
    poster: String
});

mongoose.model(
    process.env.MovieModel,
    movieSchema,
    process.env.MovieCollection);
