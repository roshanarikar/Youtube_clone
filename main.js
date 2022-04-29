
let appendTo = document.getElementById("video");

let videoData = JSON.parse(localStorage.getItem("YoutubeVideo"));
// console.log(videoData.id.videoId)

document.querySelector("title").innerText = videoData.snippet.title;

let videoId = videoData.id.videoId;

const video = () => {

    let frame = document.createElement("iframe");
    frame.src = `https://www.youtube.com/embed/${videoId}`;
    frame.allowFullscreen = true;
    frame.width = "100%";
    frame.height = "350px";
    frame.autoplay = true;

    let title = document.createElement("h2");
    title.innerText = videoData.snippet.title;


    let line = document.createElement("hr");
    let line2 = document.createElement("hr");

    let button = document.createElement("button");
    button.innerText = "Subscribe";

    let channelName = document.createElement("h4");
    channelName.innerText = videoData.snippet.channelTitle;

    let div = document.createElement("div");

    let description = document.createElement("h5");
    description.id = "description"
    description.innerText = videoData.snippet.description;

    div.append(channelName,button);
    appendTo.append(frame,title,line,div,line2,description);
}
video();

let api_key = "AIzaSyBaIyvdoCW2fJV7AOE4Cc4AmCvY5iGR1T4";

const relatedVideos = async () => {
    
    try {
    let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&relatedToVideoId=${videoId}&type=video&videoEmbeddable=true&key=${api_key}`);

    let data = await res.json();
    appendData(data.items);
    console.log(data)
    }
    catch(err) {
        console.log("ERROR",err);
    }
}

relatedVideos();

const appendData = (video) => {

    
    video.forEach((data) => {
        if(data.snippet === undefined) {
            console.log("Tata")
        }
        else {
            // console.log(data)
            let div = document.createElement("div");
            div.className = "box";

            let a = document.createElement("a");
            a.addEventListener("click", () =>{
                videoDatatoLocal(data)
            })

            let image = document.createElement("img");
            image.src = data.snippet.thumbnails.medium.url;

            let title = document.createElement("h5");
            title.innerText = data.snippet.title;
            title.className = "title"

            let channelName = document.createElement("h6");
            channelName.innerText = data.snippet.channelTitle;
            channelName.className = "name"

            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            div2.className = "details"

            div2.append(title,channelName);
            div1.append(image,div2);
            a.append(div1);
            div.append(a);

            document.getElementById("video_column").append(div)
        }
        
    })
}

const videoDatatoLocal = (data) => {
    localStorage.removeItem("YoutubeVideo");

    localStorage.setItem("YoutubeVideo",JSON.stringify(data));
    relatedVideos();

    window.location.href = "main.html";
}