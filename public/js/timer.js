export class Timer {
    constructor() {
        this.counter = 0;
        this.addDocumentListeners();
    }
    start() {
        this.counter = 0;
        setInterval(() => {
            this.counter++;
            console.log(this.getTimerValue());
            if (this.getTimerValue() >= 300) {
                alert("Your session has timed out due to inactivity. Press OK to refresh the page.");
                this.reset();
                location.reload();
            }
        }, 1000);
    }
    reset() {
        this.counter = 0;
    }
    getTimerValue() {
        return this.counter;
    }
    addDocumentListeners() {
        const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        activityEvents.map(event => document.addEventListener(event, () => { this.reset(); }));
    }

}