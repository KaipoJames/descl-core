import { MongoUtil, getDb } from "./mongoUtil.js";

export class MongoBase {

    constructor() {
        this.mongoUtil = new MongoUtil();
        this.db = getDb();
    }

    connectToDB() {
        this.mongoUtil.connectToMongo();
    }

    async nameExists(collectionName, value) {
        try {
            await this.db().collection(collectionName).findOne({ name: value }).count() > 0 ? true : false;
        } catch (e) {
            console.error(e);
        }
    }

    async listDatabases() {
        const databasesList = await this.db().admin().listDatabases();
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };

    async listAllDatabases() {
        try {
            await this.listDatabases();
        } catch (e) {
            console.error(e);
        } 
    }

    async addCarToCarsCollection(carData){
        try {
            const result = await this.db("descl-core").collection("Cars").insertOne(carData);
            console.log(`New Car created with the following mongo id: ${result.insertedId}`);
        } catch (e) {
            console.error(e);
        }
    }
}

export default MongoBase;