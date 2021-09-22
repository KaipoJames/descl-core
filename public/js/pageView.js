//import JsonBinProcessor from "/backend/api/jsonbin.js"; //Make API CALL to get current data

export class PageView {
    constructor(activeEnvironment, optionValues, selectLabel) {
        this.homeContainer = document.querySelector(".home-container");
        this.selectElement = document.querySelector("#select");
        this.jsonContainer = document.querySelector("#json-data");
        this.selectLabel = selectLabel;
        this.selectOptionValues = optionValues;
        this.activeEnvironment = activeEnvironment.title;
        this.activeEnvColor = activeEnvironment.color;
        this.APICalls = {
            players: "https://api.jsonbin.io/b/613e45124a82881d6c4daa6c/1",
            positions: "https://api.jsonbin.io/b/61465eeaaa02be1d444ad98d",
            moves: "https://api.jsonbin.io/b/61495b64aa02be1d444c1031",
            teams: null,
            events: null
        }
    }

    displayContent() {
        this.addSelectOptions();
        this.removeDynamicContent();
        if (this.activeEnvironment === 'mongo') {
            this.displayMongoContent();
        } else if (this.activeEnvironment === 'jobs') {
            this.displayJobsContent();
            this.selectElement.addEventListener("change", () => {
                this.removeDynamicContent();
                this.displayJobsContent();
            });
        } else if (this.activeEnvironment === 'home') {
            this.displayHomeContent();
        }
    }

    addSelectOptions() {
        document.querySelector("#select-label").innerText = this.selectLabel;
        this.selectElement.innerHTML = "";
        this.selectElement.style.backgroundColor = this.activeEnvColor;
        this.selectOptionValues.forEach(value => {
            if (this.selectElement.childNodes.length < 5) {
                const option = document.createElement("option");
                option.innerHTML = value;
                option.value = value;
                this.selectElement.appendChild(option);
            }
        });
    }

    removeDynamicContent() {
        const children = this.homeContainer.childNodes;
        for (let i = 0; i < children.length; i++) {
            if (children[i].classList) {
                if (children[i].classList.contains("dynamic-content")) {
                    children[i].remove();
                }
            }
        }
    }

    displayMongoContent() {
        const mongoGrid = this.createElement("div", null, "dynamic-content uk-grid-small uk-child-width-1-4@s uk-flex-center uk-text-center", "grid", this.homeContainer);
        mongoGrid.setAttribute("uk-grid", null);

        const primaryHeaderClasses = "uk-card uk-card-primary uk-card-body";
        const defaultHeaderClasses = "uk-card uk-card-default uk-card-body clickable";
        
        const primaryHeaders = ["View/Find", "Create/Add", "Update", "Delete"];
        const view_headers = ["View All Players", "View One Player", "View Players by Field"];
        const create_headers = ["Create Player", "Add One Field", "Add Many Fields"];
        const update_headers = ["Update All Players", "Update One Player"];
        const delete_headers = ["Delete All Players", "Delete One Player"];


        for (let i = 0; i < 4; i++) {
            const gridSection = this.createElement("div", null, "grid-section", null, mongoGrid); 
            this.createElement("div", primaryHeaders[i], primaryHeaderClasses, null, gridSection);
            if (i === 0) {
                this.setRemainingChildren(gridSection, view_headers, defaultHeaderClasses);
            } else if (i === 1) {
                this.setRemainingChildren(gridSection, create_headers, defaultHeaderClasses);
            } else if (i === 2) {
                this.setRemainingChildren(gridSection, update_headers, defaultHeaderClasses);
            } else {
                this.setRemainingChildren(gridSection, delete_headers, defaultHeaderClasses);
            }
        }

    }

    setRemainingChildren(gridSection, headers, defaultHeaderClasses) {
        for (let i = 0; i < headers.length; i++) {
            this.createElement("div", headers[i], defaultHeaderClasses, null, gridSection);
        }
    }

    displayHomeContent() {

    }

    displayJobsContent() {
        const filter = this.selectElement.value;
        const apiCall = this.getURL(filter);
        const buttonsTexts = ["Route", "JSON Data", "Actions"];

        const container = this.createElement("div", null, "container dynamic-content", null, this.homeContainer);
        for (let i = 0; i < 3; i++) {
            const containerChild = this.createElement("div", null, "uk-inline", null, container);
            const button = this.createElement("button", buttonsTexts[i], "uk-button uk-button-default", null, containerChild);
            button.setAttribute("type", "button");

            const ukDropDown = this.createElement("div", null, null, null, containerChild)
            ukDropDown.setAttribute("uk-dropdown", "pos: bottom-justify");
            const dropDown = this.createElement("ul", null, "uk-nav uk-dropdown-nav", null, ukDropDown);
            if (i === 0) { 
                ukDropDown.style.minWidth = "400px"; 
                this.createElement("li", "URL:", "uk-nav-header", null, dropDown);
                const urlText = this.createElement("li", null, null, null, dropDown);
                this.createElement("a", this.getURL(filter), null, null, urlText);
            }
            if (i === 1) {
                const dropDownChild = this.createElement("li", null, "uk-active", null, dropDown);
                const textArea = this.createElement("textarea", null, null, "json-data", dropDownChild);
                textArea.setAttribute("readonly", null);
                textArea.setAttribute("cols", "50");
                textArea.setAttribute("rows", "40");
            }
            if (i === 2) {
                this.createElement("li", "Trigger Job", null, null, dropDown)
            }
        }
        this.updateJSON(apiCall);
    }

    getURL(filter) {
        if (filter === 'Players') {
            return this.APICalls.players;
        } else if (filter === 'Positions') {
            return this.APICalls.positions;
        } else if (filter === 'Moves') {
            return this.APICalls.moves;
        } else if (filter === 'Teams') {
            return this.APICalls.teams;
        } else if (filter === 'Events') {
            return this.APICalls.events;
        }
    }

    createElement(el, content, classlist, id, parent) {
        const element = document.createElement(el);
        if (content) { element.innerText = content; }
        if (classlist) { element.classList = classlist; }
        if (id) { element.setAttribute("id", id); }
        if (parent) { parent.appendChild(element); }
        return element;
    }

    updateJSON(url) {
        if (this.activeEnvironment === 'jobs') { 
            (async () => {
                const jsonContainer = document.querySelector("#json-data");
                jsonContainer.value = "";
                const data = await this.getJsonData(url);
                jsonContainer.value += JSON.stringify(data);
                this.formatJson();
            })();
        }
    }

    // Formats JSON data when populated into TextArea
    formatJson() {
        if (document.querySelector('#json-data')) {
            let ugly = document.querySelector('#json-data').value;
            if (this.IsJsonString(ugly)) {
                let stringedJSON = JSON.parse(ugly);
                const pretty = JSON.stringify(stringedJSON, undefined, 4);
                document.querySelector('#json-data').value = pretty;
            } else {
                console.error("Unable to format TextArea. The Text to be formatted is likely not valid JSON.")
            }
        }
    }

    IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    /** Gets data from API call to insert into DOM Element
     * 
     * @param {*} url | The api call to obtain desired data
     * @param {*} data | The response data from the api
     * @returns 
     */
    async getJsonData(url) {
        const response = await fetch(url, {
        method: 'GET', 
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'secret-key': '$2b$10$aqOjFxyOlWLfgKef0uUsBuAP2tlm8gBhCFSv0oICyBKqrymCGiaCO'
            }
        });
        return await response.json();
    }
}