class UUID {
    constructor() {
        this.chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        this.isCaps = false;
        this.id_length = 14;
    }

    createUsedIdsArray() {
        if (!this.usedIds) { this.usedIds = []; }
    }

    addtoUsedIds(id) {
        if (this.usedIds) { this.usedIds.push(id); }
    }

    getUsedIds() {
        !this.usedIds ? false : this.usedIds;
    }

    getRandomNum(max) {
        return Math.floor(Math.random() * max);
    }
    
    setIsCaps(rand) {
        rand === 1 ? true : false;
    }
    
    appendNewCharacter() {
        const charArray = Array.from(this.chars);
        if (this.isCaps !== null && this.isCaps) {
            return charArray[this.getRandomNum(charArray.length)].toUpperCase();
        } else {
            return charArray[this.getRandomNum(charArray.length)];
        }
    }
    
    getUniqueId() {
        let id = "";
        for (let i = 0; i < this.id_length; i++) {
            this.isCaps = this.setIsCaps(this.getRandomNum(2));
            if (i !== null && i === 2 || i !== null && i === 6) {
                id += '-';
            } else {
                id += this.appendNewCharacter(this.chars, this.isCaps);
            } 
        }
        this.createUsedIdsArray();
        while (true) {
            if (this.usedIds !== null && !this.usedIds.includes(id)) {
                this.addtoUsedIds(id);
                return id;
            } else {
                return this.getUniqueId();
            }
        }
    }
}

export default UUID;