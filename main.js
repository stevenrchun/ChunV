let MillisToSeconds = 1000;
var heroVideo = document.getElementById("hero-video");

function flipColors() {
  console.log("FLIPPING COLORS");
  let whiteoutTargets = document.getElementsByClassName("whiteout-target");
  for (let item of whiteoutTargets){
    item.classList.toggle("whiteout");
  }

  let fadeToGreyTargets = document.getElementsByClassName("fadeToGrey-target");
  for (let item of fadeToGreyTargets){
    item.classList.toggle("fadeToGrey");
  }

  heroVideo.classList.toggle("fadein");
}
// Initial delay then play
setTimeout(function(){
  heroVideo.play();
  heroVideo.classList.toggle("fadein");

  let whiteoutTargets = document.getElementsByClassName("whiteout-target");
  for (let item of whiteoutTargets){
    item.classList.toggle("whiteout");
  }

  let fadeToGreyTargets = document.getElementsByClassName("fadeToGrey-target");
  for (let item of fadeToGreyTargets){
    item.classList.toggle("fadeToGrey");
  }
}, 7 * MillisToSeconds);

// An infinite loop, since it restarts the video.
heroVideo.addEventListener("ended", function() {
    // restore colors to normal 
    flipColors();
    // Now there are 20 seconds between showings.
    setTimeout(function(){
      heroVideo.play();
      flipColors();
    }, 30 * MillisToSeconds);
}, true);

