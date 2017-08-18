import Emitter from "../dispatcher/eventemiter.js"
const  IpcRenderer = require('electron').ipcRenderer;
import Util from '../../common/util.js'

export default class Store extends Emitter {

    constructor(dispatcher) { 
        super();
        this.recodes = {};
        this.formData = this.getBaseRecode();

        dispatcher.on("setRecode", this.onChangeRecodes.bind(this));                
        dispatcher.on("setForm", this.onSetForm.bind(this));
     
    }
    getBaseRecode(){
        return {_id:"",value:"",history:[Util.getDateString()],tags:[]};
    }
    onChangeRecodes(recodes){
        this.recodes = recodes;
        this.formData = this.getBaseRecode();
        this.emit("CHANGE");
    }       
    onSetForm(recode){
        if ( JSON.stringify(recode) === JSON.stringify({})){
            this.formData = this.getBaseRecode();
        }else{
            this.formData = recode;
        }
        this.emit("FORMCHANGE");
    }
}