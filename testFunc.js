var moment = require('moment');

const youtubeIdFinder = (url) => {
    console.log(url);
    var id
    if (url.includes("youtube.com")) {
         id = url.split("?v=")[1]
        
        
    } else if (url.includes("youtu.be")) {
         id = url.split("youtu.be/").find((arr) => {
            return !arr.includes("http")
        })
    }
    return id.match(".{11}")[0]
}

const main = () => {
   console.log(moment().format())
}





main();

