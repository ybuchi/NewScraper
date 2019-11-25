//Variable that will create the date

var makeDate = function(){
    var d = new Date();
    var formattedDate = "";
    
//counts month as at a 0 index so we add plus 1
    formattedDate += (d.getMonth() + 1) + "_";
    formattedDate += d.getDate() + "_";
    formattedDate += d.getFullYear + "_";
    
    return formattedDate;

};
module.exports = makeDate;