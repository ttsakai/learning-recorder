'use strict'
const  IpcRenderer = require('electron').ipcRenderer;
import Util from '../../common/util.js'

export default class ActionCreator {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
     _getStorageData(arg){
        return  IpcRenderer.sendSync('mdb-select',arg);        
    }
    saveRecode(data) {
        console.log("action:saveRecode",data);
        let val = IpcRenderer.sendSync('mdb-upsert',data);
        let recodes = this._getStorageData({});     
        this.dispatcher.emit("saveRecode", recodes);
    }
    deleteRecode(data) {
        let val = IpcRenderer.sendSync('mdb-delete',data._id);
        let recodes = this._getStorageData({});     
        this.dispatcher.emit("deleteRecode", recodes);
    }
    setForm(data){
      this.dispatcher.emit("setForm", data);
    }
}