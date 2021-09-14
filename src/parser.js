import Player from "./base/player.js";
import JsonBinProcessor from "./api/jsonbin.js";
import MongoUtil from "./db/mongoUtil.js";

const jsonBinProcessor = new JsonBinProcessor();
const mongoUtil = new MongoUtil();

const playerObjects = [];

const Parser = {
    init() {
        (async () => {
            const players = await this.getPlayersData();
            for (const player of players.data) {
                const pl = new Player(player);
                this.addPlayerToMongo(pl);
                playerObjects.push(pl);
            }
            console.log(playerObjects);
        })();
    },

    async getPlayersData() {
        const data = await jsonBinProcessor.getPlayersBinData();
        return data;
    },

    async addPlayerToMongo(playerData) {
        await mongoUtil.addCarToCarsCollection(playerData);
    }
}

export default Parser;