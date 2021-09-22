import Player from "./base/player.js";
import JsonBinProcessor from "./api/jsonbin.js";
//import { MongoUtil } from "./db/mongoUtil.js";
import { MongoBase } from "./db/mongoBase.js";

const jsonBinProcessor = new JsonBinProcessor();
//const mongoUtil = new MongoUtil();
const mongoBase = new MongoBase();
const CARS_COLLECTION = "Cars";

const Parser = {
    init() {
        (async () => {
            mongoBase.connectToDB();
            const players = await this.getPlayersData();
            for (const player of players.data) {
                const playerName = player.name;
                if (!mongoBase.nameExists(CARS_COLLECTION, playerName)) {
                    const pl = new Player(player).assignDesclId();
                    this.addPlayerToMongo(pl);
                    console.log(`Added player ${playerName} into ${CARS_COLLECTION} collection.`);
                } else {
                    console.log(`Player ${playerName} already exists in ${CARS_COLLECTION} collection. DB not affected.`);
                }
            }
        })();
    },

    // Retrieving External Data from JsonBin API
    async getPlayersData() {
        return await jsonBinProcessor.getBinData("players");
    },

    async addPlayerToMongo(playerData) {
        await mongoBase.addCarToCarsCollection(playerData);
    }
}

export default Parser;