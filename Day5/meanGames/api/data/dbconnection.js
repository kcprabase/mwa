const { get } = require("../routes");

const MongoClient = require("mongodb").MongoClient;

let _connection = null;

const open = function(){
   if(get() == null){
    MongoClient.connect();
   }
}

const get = function(){
    return _connection;
}