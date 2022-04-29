let api_key = "AIzaSyBVTkeDMdxyRLReHgMMUMBrTiYsifecoMk";

const getVideos = async () => {
    try {
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&regionCode=IN&maxResults=50&relevanceLanguage=en&type=video&videoEmbeddable=true&videoLicense=youtube&key=${api_key}`);
        let data = await res.json();

        showVideos(data.items);
        console.log(data);
    }
    catch(err) {
        console.log(err);
    }
}
getVideos()

const showVideos = (video) => {

    video.forEach((data) => {
        let a = document.createElement("a");
        a.addEventListener("click", () =>{
            videoData(data)
        })

        let div = document.createElement("div");
        div.className = "mainDiv";
        let div1 = document.createElement("div");
        div1.className = "videoBox";
        let div2 = document.createElement("div");

        let image = document.createElement("img");
        image.src = data.snippet.thumbnails.medium.url

        let title = document.createElement("h4");
        title.innerText = data.snippet.title;

        let channelName = document.createElement("h5");
        channelName.innerText = data.snippet.channelTitle;

        div1.append(image, title, channelName);
        a.append(div1);
        div.append(a);

        document.getElementById("container").append(div);
    })
}

const videoData = (data) => {
    window.location.href = "main.html";

    localStorage.removeItem("YoutubeVideo");

    localStorage.setItem("YoutubeVideo",JSON.stringify(data));
}

const searchResult = async () => {
    document.getElementById("container").innerHTML = "";


    
    try {
        let input = document.getElementById("search_input").value;

        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${input}&type=video&key=${api_key}`);
        let data = await res.json();

        showVideos(data.items);
        console.log(data.items);
    }
    catch(err) {
        console.log("ERRRRRRROOR",err);
    }
}