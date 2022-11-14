const mongoose = require("mongoose");


const addressSchema = mongoose.Schema({
    city: String,
    zip: Number,
    street: String,
    number: Number
});
const inspectionSchema = mongoose.Schema({
    id: String,
    certificate_number: Number,
    business_name: String,
    date: Date,
    result: String,
    sector: String,
    address: addressSchema
});

mongoose.model("Inspection", inspectionSchema, "inspections");