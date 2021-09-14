import Player from "./base/player.js";
import JsonBinProcessor from "./api/jsonbin.js";
const jsonBinProcessor = new JsonBinProcessor();
const playerObjects = [];

const Parser = {
    init() {
        (async () => {
            const players = await this.getPlayersData();
            for (const player of players.data) {
                const pl = new Player(player);
                playerObjects.push(pl);
            }
            console.log(playerObjects);
        })();
    },

    async getPlayersData() {
        const data = await jsonBinProcessor.getPlayersBinData();
        return data;
    },
}

export default Parser;