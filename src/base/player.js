import UUID from "./uuid.js";
const uuidHelper = new UUID();

class Player {
    constructor(dt) {
        this.id = uuidHelper.getUniqueId();
        this.name = dt.name;
        this.nicknames = dt.nicknames;
        this.weight = dt.weight;
        this.frontWheelsSize = dt.front_wheels_size;
        this.backWheelsSize = dt.back_wheels_size;
        this.bodyType = dt.body_type;
        this.yearMade = dt.yearMade;
        this.age = getYear() - dt.yearMade;
        this.homeCountry = dt.country;
        this.sponsors = dt.sponsors;
        this.mattelId = dt.mattelId;
        this.primaryColor = dt.primary_color;
        this.secondaryColor = dt.secondary_color;
        this.racingNumber = dt.racingNumber;
        this.racingCode = dt.racingCode;
    }
}

function getYear() {
    return new Date().getFullYear();
}

export default Player;