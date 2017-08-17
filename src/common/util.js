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
        let array =  dateString.split(split).map((x,i)=>{return parseInt(x)});
        return new Date(array[0], array[1] - 1, array[2]);
    }
    static getDateYMD( date = new Date() ){
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    static getColor(learningDate) {
        let defColor = {color:"black"},
            colors = [
                {color:"red"},
                {color:"pink"},
                {color:"orange"},
                {color:"blue"},
                {color:"green"}
            ],
            timing = [1,7,30,90,365],
            dayGap = Math.floor( ( new Date() - new Date(learningDate[0])  ) / 1000 / 60 / 60 / 24 ),   
            idx = timing.indexOf(dayGap);
       
            return  idx >=0 ? colors[idx]  : defColor;
    
        }
}
