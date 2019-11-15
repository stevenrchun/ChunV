let MillisToSeconds = 1000;
var heroVideo = document.getElementById("hero-video");
var videoCover = document.getElementById("cover");

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
  heroVideo.classList.toggle("fadein-transition");

  let whiteoutTargets = document.getElementsByClassName("whiteout-target");
  for (let item of whiteoutTargets){
    item.classList.toggle("whiteout");
  }

  let fadeToGreyTargets = document.getElementsByClassName("fadeToGrey-target");
  for (let item of fadeToGreyTargets){
    item.classList.toggle("fadeToGrey");
  }
}, 3 * MillisToSeconds);

// An infinite loop, since it restarts the video.
heroVideo.addEventListener("ended", function() {
    // restore colors to normal 
    flipColors();
    // Now there are 20 seconds between showings.
    setTimeout(function(){
      heroVideo.play();
      flipColors();
    }, 3 * MillisToSeconds);
}, true);

window.addEventListener('scroll', function(e) {
  //aim for 200px to be enough to fade out
  heroVideo.classList.toggle("fadein-transition");
  let y = window.scrollY;
  let opacity = 1 - (y/200.0);
  console.log("scroll: " + y);
  console.log("opacity: " +  opacity);
  heroVideo.style.opacity = opacity;
  heroVideo.classList.toggle("fadein-transition");
});

