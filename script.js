const playButton = document.querySelector(".playButton");

console.log(playButton);

let isPlaying = false;
playButton.addEventListener("click", function () {
    if (isPlaying === false) {
        playButton.src = "svg/pause-svgrepo-com.svg";
        isPlaying = true;
    } else {

        playButton.src = "svg/play-svgrepo-com.svg";
        isPlaying = false;
    }
});

async function getSongs() {
    let res = await fetch("http://127.0.0.1:3000/song/");
    let html = await res.text();

    let div = document.createElement("div");
    div.innerHTML = html;


    let links = div.getElementsByTagName("a");

    let songs = [];

    for (let link of links) {
        if (link.href.endsWith(".mp3")) {
            songs.push(link.href.split("/song/")[1]);
        }
    }

    return songs;
}


async function main() {
    let songs = await getSongs();
    console.log("Songs found:", songs);

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
            <img class="setSVG invertSVG" src="svg/music-svgrepo-com.svg" alt="">
            <div class="song-info">${song}</div>
            <div class="song-artist">Rockkyy</div>

            <img class="svg-iconHW cP svg-transform" src="svg/play-circle-fill-svgrepo-com.svg" alt="">
          </li> `;
    }
    var audio = new Audio(songs[0]);
    // audio.play();

}

main();
