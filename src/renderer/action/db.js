const  IpcRenderer = require('electron').ipcRenderer;

// template 
class DbTemplate {
    static select(data){
        throw Error ( " this is abstract template. need to implement");
    }
    static upsert(data){
        throw Error ( " this is abstract template. need to implement");
    }
    static delete(data){
        throw Error ( " this is abstract template. need to implement");
    }

}

// db asscess class  for electron 
export class DbElectron extends DbTemplate{
    static select(data){
        return  IpcRenderer.sendSync('mdb-select',data);        
    }
    static upsert(data){
        return IpcRenderer.sendSync('mdb-upsert',data);
    }
    static delete(data){
        return  IpcRenderer.sendSync('mdb-delete',data);
    }
}