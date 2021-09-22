import axios from 'axios';

/** 
 * @JsonBinProcessor - A class used to interact with external api's, extract the data, and insert it into this application
 * 
 * @baseUrl - The base url for all api's
 * @playersBinId - The route for players
 * @options - Contains any keys needed to access a whitelisted api
 * @playersBinUrl - The complete api call for the players bin
 */
class JsonBinProcessor {
    constructor() {
        this.baseUrl = "https://api.jsonbin.io/b/";
        this.playersBinId = "613e45124a82881d6c4daa6c/1";
        this.positionsBinId = "61465eeaaa02be1d444ad98d";
        this.options = { "headers": {'secret-key': process.env.PLAYERS_BIN_SECRET_KEY} };
        this.playersBinURL = this.baseUrl + this.playersBinId;
    }

    /**
     * 
     * @param {*} name : A STRING representing the collection you are attempting to retrieve
     * @param {*} id : The id of the JsonBin, the route
     * @returns A JSON object response from API, or null if error.
     */
    async getBinData(name) {
        const url = this.baseUrl + this.getBinId(name);
        console.log(`Attempting to retrieve ${name} data...`);
        return await axios.get(url, this.options)
            .then(response => {
                console.log(`Successfully retrieved ${name} data from ${url}`);
                return response;
            })
            .catch(error => {
                console.log(error);
                return null;
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

    getBinId(name) {
        if (name === 'players') {
            return this.playersBinId;
        } else if (name === 'positions') {
            return this.positionsBinId;
        }
    }
}

export default JsonBinProcessor;