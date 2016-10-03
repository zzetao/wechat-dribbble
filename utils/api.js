const HOST = "https://api.dribbble.com/v1/"; 
const TOKEN = "f580a93a3cacd178bf7d2f2a7e79f3982c7990d908a008f7ee5cf50388f00877";

function objectToUri(obj) {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
}



module.exports = {
    /*
        page
        per_page
    */
    getShots: HOST + 'shots?access_token=' + TOKEN
}