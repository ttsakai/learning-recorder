export default class ActionCreator {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    recodesChange(data) {
        this.dispatcher.emit("recodesChange", data);
    }
    recodeInsert(data) {
        this.dispatcher.emit("recodeInsert", data);
    }
    recodeUpdate(data) {
        this.dispatcher.emit("recodeUpdate", data);
    }
    recodeDelete(data) {
        this.dispatcher.emit("recodeDelete", data);
    }
}