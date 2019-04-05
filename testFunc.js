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
    testYoutubeIdFinder("https://www.youtube.com/watch?v=f4Y4naOadlE", "f4Y4naOadlE");
    testYoutubeIdFinder("https://youtu.be/-GkYmMEshVc?t=10", "-GkYmMEshVc")
}

const testYoutubeIdFinder = (input, output) => {
    console.log(youtubeIdFinder(input));
}



main();

