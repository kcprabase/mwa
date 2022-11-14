const mongoose = require("mongoose");
require("./movies.model")
mongoose.connect(process.env.DbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("mongoose connected to", process.env.DbName);
});

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("mongoose disconncted. sigint");
        process.exit(0);
    });
});

process.on("SIGTERM", () => {
    mongoose.connection.close(() => {
        console.log("mongoose dis. app term");
        process.exit(0);
    });
});