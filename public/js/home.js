import { Timer } from "./timer.js";
import { PageView } from "./pageView.js";

const getActiveEnvrionmentsEnum = () => {
    return Object.freeze({
        "Home": {
            "title": "home",
            "color": "#7c79a8"
        },
        "Mongo": {
            "title": "mongo",
            "color": "#68794f"
        },
        "Jobs": {
            "title": "jobs",
            "color": "#e1b061"
        }
    });
}

let activeEnvironment = getActiveEnvrionmentsEnum().Home.title;
const collectionNames = ["Players", "Positions", "Moves", "Events", "Teams"];

const setActiveEnvironment = (activeTabName) => {
    if (activeTabName === 'home') {
        const view = new PageView(getActiveEnvrionmentsEnum().Home, ["API Links", "Photos", "Other"]);
        view.displayContent();
    } else if (activeTabName === 'mongo') {
        const view = new PageView(getActiveEnvrionmentsEnum().Mongo, collectionNames);
        view.displayContent();
    } else {
        const view = new PageView(getActiveEnvrionmentsEnum().Jobs, collectionNames);
        view.displayContent();
    }
}

const setActiveTabContent = () => {
    document.querySelectorAll(".tab-child").forEach(tab => {
        tab.addEventListener("click", () => {
            const activeTabName = tab.classList[0];
            setActiveEnvironment(activeTabName);
            console.log(`Switching To ${activeEnvironment} Environment`);
        });
    });
}

const main = () => {
    const timer = new Timer();
    timer.start();
    setActiveTabContent();
}

setActiveEnvironment(activeEnvironment);
main();