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
    recodeHistoryInsert(data) {
        this.dispatcher.emit("recodeHistoryInsert", data);
    }
    recodeTagInsert(data,tag) {
        this.dispatcher.emit("recodeTagInsert", data,tag);
    }

    recodeDelete(data) {
        this.dispatcher.emit("recodeDelete", data);
    }
}