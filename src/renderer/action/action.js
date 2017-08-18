'use strict'

const  IpcRenderer = require('electron').ipcRenderer;
import Util from '../../common/util.js'
import {DbElectron as db} from './db.js'

export default class ActionCreator {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
        this.setRecode = this.setRecode.bind(this);
        this.saveRecode = this.saveRecode.bind(this);
        this.deleteRecode = this.deleteRecode.bind(this);
        this.setForm = this.setForm.bind(this);
    }
    getStorageData(arg){
        return db.select(arg);
    }
    setRecode(){
        let recodes = db.select({});
        this.dispatcher.emit("setRecode", recodes);
    }
    saveRecode(data){
        // console.log(this);
        let val = db.upsert(data);    
        this.setRecode();        
    
    }
    deleteRecode(data) { 
        // console.log(this);
        
        let val =db.delete(data._id);
        this.setRecode();

    }
    setForm(data){
        this.dispatcher.emit("setForm", data);
    }
}