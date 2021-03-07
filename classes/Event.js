export class Event {
    constructor(name) {
        this.name = name;
        this.actions = [];
    }

    addAction(action) {
        this.actions.push(action);      // Into actions array, push passed in action
    }
}