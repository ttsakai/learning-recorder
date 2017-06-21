export default class Util {
    static  getDateString( date = new Date() , split='-')
    {   
        return [
            date.getFullYear(),
            ("0" + (date.getMonth() + 1).toString() ).slice(-2),
            ("0" + date.getDate().toString() ).slice(-2),
            ].join( split ) 
    }
    static getDate(dateString,split='-'){
        let array =  dateString.split(split).map((x,i)=>{parseInt(x)});;
        return new Date(array[0], array[1] - 1, array[2]);
    }
    static getDateYMD( date = new Date() ){
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
}
