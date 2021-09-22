import pkg from 'mongodb';
const { MongoClient } = pkg;
import assert from 'assert';
import dotenv from 'dotenv';
dotenv.config();

let _db;

export class MongoUtil {
    constructor() {
        this.connectionUrl = process.env.MONGO_CONNECTION_URI;
        this.mongoClient = new MongoClient(this.connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    connectToMongo() {
        this.mongoClient.connect((err, client) => {
            assert.equal(null, err);
            this.setClient(client);
            _db = client.db('descl-core');
            console.log("Connected successfully to server");
        });
    }

    setClient(client) {
        this.client = client;
    }

    async closeClient(ms) {
        setTimeout(() => {
            this.client.close();
        }, ms)
    }
}

export const getDb = () => {
    return _db;
}