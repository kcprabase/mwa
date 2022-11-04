const MongoClient = require("mongodb").MongoClient;

let _connection = null;

const open = function () {
    if (get() == null) {
        MongoClient.connect(process.env.dbUrl, (err, client) => {
            if (err) {
                console.error("DB Connection failed. ", err);
                return;
            }
            _connection = client.db(process.env.dbName);
            console.log("DB Connection open", _connection);
        });
    }
}

const get = function () {
    return _connection;
}

module.exports = { open, get };