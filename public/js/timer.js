export class Timer {
    constructor() {
        this.counter = 0;
        this.addDocumentListeners();
    }
    start() {
        this.counter = 0;
        setInterval(() => {
            this.counter++;
            //console.log(this.counter);
            if (this.counter >= 300) {
                alert("Your session has timed out due to inactivity. Press OK to refresh the page.");
                this.counter = 0;
                location.reload();
            }
        }, 1000);
    }
    addDocumentListeners() {
        const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        activityEvents.map(event => document.addEventListener(event, () => { this.counter = 0; }));
    }
}