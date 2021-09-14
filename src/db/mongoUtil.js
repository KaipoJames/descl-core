class MongoUtil {
    constructor() {
        this.connectionUrl = process.env.MONGO_URI;
    }
}