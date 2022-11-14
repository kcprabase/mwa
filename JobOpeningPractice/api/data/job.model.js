const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    city: { type: String },
    state: { type: String },
    zipCode: { type: Number }
});

const jobSchema = mongoose.Schema({
    title: { type: String, required: true },
    salary: { type: String, required: true },
    location: locationSchema,
    description: { type: String },
    experience: { type: Number },
    skill: { type: [String] },
    postDate: {
        type: Date,
        required: true,
        default: Date.now//look this up in meangames
    }
});

mongoose.model(process.env.JobModel, jobSchema, process.env.JobCollection);

