const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://e4cadmin:4ICXqpSg8T7W8v7e@cluster0.lu0kf.mongodb.net/e4c?retryWrites=true&w=majority"
const client = new MongoClient(uri);
client.connect();
e4c = client.db("e4c");

module.exports = e4c;