let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.flac');

let currentSong = 1;


play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0){
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    }
    else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
}) 

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #177200ff ${progress}% , #333 ${progress}%)`;
})

progressBar.addEventListener('input', function (){
    let value =this.value;
    this.style.background = `linear-gradient(to right, #177200ff ${value}% , #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) /100;
})


let playMusic = Array.from(document.getElementsByClassName('playMusic'));

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        currentSong = index;
        index = parseInt(e.target.id);
        audio.src = `Audio/${index}.flac`;
        audio.currentTime=0;
        audio.play();
    })
})

playNextSong = () => {
    let nexSong = (currentSong + 1) % playMusic.length;
    currentSong = nexSong == 0 ?18 : nexSong;
    audio.src = `Audio/${currentSong}.flac`;
    audio.currentTime=0;
    audio.play();
}

playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ?18 : prevSong;
    audio.src = `Audio/${currentSong}.flac`;
    audio.currentTime=0;
    audio.play();
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
})

audio.addEventListener('ended', () => {
    playNextSong();
})

backward.addEventListener('click', () => {
    playPrevSong();
})

