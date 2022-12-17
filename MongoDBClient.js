const { MongoClient } = require("mongodb");
let db = null;

class MongoDB {
    static connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, function (err, client) {
                if (err) reject(err);
                console.log("connected successfull to mongodb server");
                db = client.db("practice");
                resolve();
            });
        })
    }
    static items() {
        return db.collection("items");
    }
    static users(){
        return db.collection("users");
    }
}

module.exports = MongoDB;