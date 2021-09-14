import pkg from 'mongodb';
const { MongoClient } = pkg;
import dotenv from 'dotenv';
dotenv.config();

class MongoUtil {
    constructor() {
        this.connectionUrl = process.env.MONGO_CONNECTION_URI;
        this.client = this.getMongoClient();
    }

    getMongoClient() {
        return new MongoClient(this.connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async listDatabases() {
        this.databasesList = await this.client.db().admin().listDatabases();
        console.log("Databases:");
        this.databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };

    async listAllDatabases() {
        try {
            await this.client.connect();
            await this.listDatabases();
        } catch (e) {
            console.error(e);
        } finally {
            await this.client.close();
        }
    }
}

// Test Lines - Remove Later
const mongoUtil = new MongoUtil();
mongoUtil.listAllDatabases();