const mongoose = require("mongoose");
require("./inspection.model");

mongoose.connect(process.env.DbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to ", process.env.DbName);
});