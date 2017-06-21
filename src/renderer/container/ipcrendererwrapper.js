// import {ipcRenderer} from 'electron';
//[TODO] need to know how it works 
// const remote = window.require('electron').remote;
// import {IpcRenderer} from 'electron';
//[TODO] is this module truly needed?
const  IpcRenderer = require('electron').ipcRenderer;

export default class IpcRendererWrapper  {
    sendSync (tag,data) {
        return  IpcRenderer.sendSync(tag,data);
    
    }
    sendAsync(tag,data){
        ipcRenderer.on(tag,(e,arg)=>{
          console.log(arg);
        });
        ipcRenderer.send(tag,data);
    }
    // createListener(tag,data){
    //     console.log('createListner1',tag);
    //     IpcRenderer.on(tag, (e, msg) => {
    //         console.log(msg);
    //     });
    // }

}
