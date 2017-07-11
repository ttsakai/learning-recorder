import Emitter from "../dispatcher/eventemiter.js"
const  IpcRenderer = require('electron').ipcRenderer;
import Util from '../../common/util.js'

export default class Store extends Emitter {

    constructor(dispatcher) { 
        super();
        this.recodes = this.getRecodes({});

        dispatcher.on("recodesChange", this.onRecodesChange.bind(this));
        dispatcher.on("recodeInsert", this.onRecodeInsert.bind(this));
        dispatcher.on("recodeUpdate", this.onRecodeUpdate.bind(this));
        dispatcher.on("recodeDelete", this.onRecodeDelete.bind(this));

    }
    getRecodes(arg){
        return  IpcRenderer.sendSync('mdb-select',arg);        
    }
    onRecodesChange(recodes) {
        this.recodes =  this.getRecodes({});
        this.emit("CHANGE");    
    }
    onRecodeInsert(string) {
        let obj = {value:string,history:[Util.getDateYMD()]}
        let val = IpcRenderer.sendSync('mdb-insert',obj);
        this.emit("CHANGE");    
    }
    onRecodeUpdate(id){
        let val = IpcRenderer.sendSync('mdb-insert2', {_id:id,history:[Util.getDateYMD()]});
        this.emit("CHANGE");
    }
    onRecodeDelete(id){
        let val = IpcRenderer.sendSync('mdb-delete-recode',id);
        this.emit("CHANGE");
    }
}