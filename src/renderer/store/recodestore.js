import Emitter from "../dispatcher/eventemiter.js"
const  IpcRenderer = require('electron').ipcRenderer;
import Util from '../../common/util.js'

export default class Store extends Emitter {

    constructor(dispatcher) { 
        super();
        this.recodes = this._getStorageData({});
        this.formData = this._getBaseRecode();
        // dispatcher.on("saveRecode", this.onSaveRecode.bind(this));
        // dispatcher.on("deleteRecode", this.onDeleteRecode.bind(this));
        dispatcher.on("saveRecode", this.onChangeRecodes.bind(this));
        dispatcher.on("deleteRecode", this.onChangeRecodes.bind(this));
     
        dispatcher.on("setForm", this.onSetForm.bind(this));
     
    }
    _getBaseRecode(){
        return {_id:"",value:"",history:[Util.getDateString()],tags:[]};
    }
    _getStorageData(arg){
        return  IpcRenderer.sendSync('mdb-select',arg);        
    }
    getRecodes(){
        return this.recodes;
    }
    onChangeRecodes(recodes){
        this.recodes = recodes;
        this.formData = this._getBaseRecode();
        this.emit("CHANGE");

    }    
    onSetForm(recode){
        if ( JSON.stringify(recode) === JSON.stringify({})){
            this.formData = this._getBaseRecode();
        }else{
            this.formData = recode;
        }
        this.emit("FORMCHANGE");
    }
}