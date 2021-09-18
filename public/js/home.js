import { Timer } from "./timer.js";

let activeEnvironment = null;

const getActiveEnvrionmentsEnum = () => {
    return Object.freeze({
        "Home": "home",
        "Mongo": "mongo",
        "Jobs": "jobs"
    });
}

const setActiveEnvironment = (activeTabName) => {
    if (activeTabName === 'home') {
        activeEnvironment = getActiveEnvrionmentsEnum().Home;
    } else if (activeTabName === 'mongo') {
        activeEnvironment = getActiveEnvrionmentsEnum().Mongo;
    } else {
        activeEnvironment = getActiveEnvrionmentsEnum().Jobs;
    }
}

const setActiveTabContent = () => {
    document.querySelectorAll(".tab-child").forEach(tab => {
        tab.addEventListener("click", () => {
            const activeTabName = tab.classList[0];
            document.querySelector("#title").innerHTML = `Showing the ${activeTabName} content.`;
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

main();
