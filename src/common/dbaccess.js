'use strict';
import  Datastore from 'nedb';

export default class Dbaccess{
  constructor(filepath='./default.db'){
    this.db = new Datastore({ 
      filename: filepath,
      autoload: true
    }); 
  }
  _pickObj(obj,field){
    let rVal = {};
    if ( field !== '' ){ 
       rVal[field] = obj[field] ;
    }else {
       rVal = obj ;
    }
    return  rVal;
  }
  select(obj={},field='',callback){
    let searchKeyObj = this._pickObj(obj,field);
    this.db.find(searchKeyObj, (e,doc)=>{
      callback(doc);
    });
  }
  selectAll(callback){
    this.select({},'',callback);
  }
  count(obj={},field='',callback){
    let countKeyObj = this._pickObj(obj,field);

    this.db.count(countKeyObj,(e,count)=>{
      callback(count);
    })
  }
  insertUniq(obj, field='', callback){
    this.count(obj, field, (count)=>{
      if ( count === 0 ){
         this.db.insert(obj,callback);
      }else {
        //  this.update(obj,field,callback);
         this.updatePush(obj,field,callback);
      }
    });
  }
  update(obj,field='',callback){
    let fieldObj = this._pickObj(obj,field);    
    this.db.update(fieldObj,{ $set: obj },{},callback);
  }
  updatePushById(id,obj,field='',callback){
      let fieldObj = this._pickObj(obj,field);
 
      this.db.update({_id:id},{ $addToSet: fieldObj },callback);
      
  }
  updatePush(obj,field='',callback){
    let fieldObj = this._pickObj(obj,field);
    Object.keys(obj).forEach(    
      (item)=>{
        let updObj = {}
        if ( Array.isArray( obj[item] ) ){
          obj[item].forEach((val)=>{  
            updObj[item] = val;
            this.db.update(fieldObj,{ $addToSet : updObj } ,{});
         
         });
        }else{
          updObj[item] = obj[item];
          this.db.update(fieldObj,{ $addToSet : updObj },{});
        } 
        callback();
      }
    );
  }

  delete(obj){
  }
}