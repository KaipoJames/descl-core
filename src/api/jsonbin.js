import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

class JsonBinProcessor {
    constructor() {
        this.baseUrl = "https://api.jsonbin.io/b/";
        this.playersBinId = "613e45124a82881d6c4daa6c/1";
        this.options = { "headers": {'secret-key': process.env.PLAYERS_BIN_SECRET_KEY} };
        this.playersBinURL = this.baseUrl + this.playersBinId;
    }

    async getPlayersBinData() {
        return await axios.get(this.playersBinURL, this.options)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
                return false;
            }
        );
    }

    printPlayersBinData(response) {
        console.log("\nExecuted API call at " + this.playersBinURL);
        console.log("Method: GET");
        console.log("STATUS CODE: " + response.status + " " + response.statusText);
        console.log("Response DATA:");
        for (const record of response.data) { console.log(record); }
    }
}

export default JsonBinProcessor;