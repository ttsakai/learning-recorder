'use strict';

// const  {ipcMain,app, BrowserWindow} = require('electron');
import  {ipcMain,app, BrowserWindow} from 'electron';

// const path  = require( 'path');
import path from 'path';

// const url = require( 'url');
// const Datastore  = require('nedb');
import url  from 'url';
import Datastore  from 'nedb';
import Dbaccess from '../../common/dbaccess.js';

let db = new Dbaccess( './master.db');
let tdb = new Dbaccess( './tag.db');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  //[TODO] __dirname は予約変数的な奴
  //　loadURLのラッパー作ってルーティングさせたほうがいいかもしれない。
  // slashesってなに？
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/../public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.

  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }

})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//[TODO] separate db logic from here 
ipcMain.on('mdb-insert',(e,arg)=>{
  db.insertUniq(arg,'value',(err)=>{
    db.selectAll( (r)=>{
      e.returnValue = 'OK';
      win.webContents.send('mdb-insert',r);
    });
  });
});

ipcMain.on('mdb-upsert',(e,arg)=>{
  db.upsert(arg,(err)=>{
    // console.log(err);   
    e.returnValue = 'OK';
  });
});

ipcMain.on('mdb-delete',(e,id)=>{
  db.deleteRecodeById(id,(err, numRemoved)=>{
    e.returnValue="OK";
  });

});

ipcMain.on('mdb-select',(e,arg)=>{
  db.selectAll((err,doc)=>{
    e.returnValue = doc;
  });
});
