//startBackground music
var backgroundmusic = new Audio("music.mp3");
backgroundmusic.loop= true;

function soundOn() {
    backgroundmusic.play();
backgroundmusic.volume=0.6;
}
