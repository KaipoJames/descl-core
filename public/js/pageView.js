export class PageView {
    constructor(activeEnvironment, optionValues) {
        this.selectElement = document.querySelector("#select");
        this.selectOptionValues = optionValues;
        this.activeEnvironment = activeEnvironment.title;
        this.activeEnvColor = activeEnvironment.color;
    }

    displayContent() {
        this.addSelectOptions();
    }

    addSelectOptions() {
        this.selectElement.innerHTML = "";
        this.selectElement.style.backgroundColor = this.activeEnvColor;
        this.selectOptionValues.forEach(value => {
            console.log("adding " + value);
            if (this.selectElement.childNodes.length < 5) {
                const option = document.createElement("option");
                option.innerHTML = value;
                option.value = value;
                this.selectElement.appendChild(option);
            }
        });
    }
}