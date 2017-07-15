import Emitter from "../dispatcher/eventemiter.js"
const  IpcRenderer = require('electron').ipcRenderer;
import Util from '../../common/util.js'

export default class Store extends Emitter {

    constructor(dispatcher) { 
        super();
        this.recodes = this._getStorageData({});
        this.formData = this._getBaseRecode();
        dispatcher.on("recodesChange", this.onRecodesChange.bind(this));
        dispatcher.on("recodeInsert", this.onRecodeInsert.bind(this));
        dispatcher.on("recodeDelete", this.onRecodeDelete.bind(this));
        dispatcher.on("recodeHistoryInsert", this.onRecodeHistoryInsert.bind(this));
        dispatcher.on("recodeTagInsert", this.onRecodeTagInsert.bind(this));
        
    }
    _getBaseRecode(){
        return {_id:"",value:"",history:[],tags:[]};
    }
    _getStorageData(arg){
        return  IpcRenderer.sendSync('mdb-select',arg);        
    }
    getFormData(){
        return this.formData;
    }
    getRecodes(){
        return this.recodes;
    }
    onRecodesChange(recodes) {
        this.recodes = this._getStorageData({});
        this.emit("CHANGE");    
    }
    onRecodeInsert(string) {
        let obj = {value:string,history:[Util.getDateYMD()]}
        let val = IpcRenderer.sendSync('mdb-insert',obj);
        this.emit("CHANGE");    
    }
    onRecodeHistoryInsert(recode){
        let val = IpcRenderer.sendSync('mdb-insert2', {_id:recode._id,history:[Util.getDateYMD()]});
        this.recodes = this._getStorageData({});
        this.emit("CHANGE");
    }
    onRecodeTagInsert(recode,tag){
        console.log(recode,tag);
        // this.emit("CHANGE");
    }
    onRecodeDelete(recode){
        let val = IpcRenderer.sendSync('mdb-delete-recode',recode._id);
        this.recodes = this._getStorageData({});
        this.emit("CHANGE");
    }
}