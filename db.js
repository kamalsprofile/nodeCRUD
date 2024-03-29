const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbName = "crud_mongodb";
const url = "mongodb://localhost:27017";
const mogoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const state = {
    db: null
};

const connect = (cb) => {
    if (state.db) cb();
    else {
        MongoClient.connect(url, mogoOptions, (err, client) => {
            if (err) cb(err);
            else {
                state.db = client.db(dbName);
                cb();
            }
        });
    }
}
const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}
const getDB = () => {
    return state.db;
}
module.exports = { getDB, connect, getPrimaryKey };