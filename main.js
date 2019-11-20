let MillisToSeconds = 1000;
var heroVideo = document.getElementById("hero-video");
var videoCover = document.getElementById("cover");
var currentlyPlaying = false;

/**
 * Debounce functions for better performance
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} fn The function to debounce
 */
var debounce = function (fn) {
	// Setup a timer
	var timeout;
	// Return a function to run debounced
	return function () {
		// Setup the arguments
		var context = this;
		var args = arguments;
		// If there's a timer, cancel it
		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}
		// Setup the new requestAnimationFrame()
		timeout = window.requestAnimationFrame(function () {
			fn.apply(context, args);
		});
	}
};

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

  // Current bug: if more than 200 when vid starts, then fadein isn't applied.
  // If you get to top and video should be playing, add fadein
  if (window.scrollY < 200) {
    heroVideo.classList.toggle("fadein");
  }
}
// Initial delay then play
setTimeout(function(){
  heroVideo.play();
  currentlyPlaying = true;
  // fadeOnScroll();
  if (window.scrollY < 200) {
    heroVideo.classList.toggle("fadein");
    heroVideo.classList.toggle("fadein-transition");
  }

  let whiteoutTargets = document.getElementsByClassName("whiteout-target");
  for (let item of whiteoutTargets){
    item.classList.toggle("whiteout");
  }

  let fadeToGreyTargets = document.getElementsByClassName("fadeToGrey-target");
  for (let item of fadeToGreyTargets){
    item.classList.toggle("fadeToGrey");
  }
}, 8 * MillisToSeconds);

// An infinite loop, since it restarts the video.
heroVideo.addEventListener("ended", function() {
    // Override scroll opacity
    heroVideo.style.opacity = null; 
    // restore colors to normal 
    flipColors();
    currentlyPlaying = false;
    // Now there are 20 seconds between showings.
    setTimeout(function(){
      heroVideo.play();
      currentlyPlaying = true;
      flipColors();
    }, 20 * MillisToSeconds);
}, true);

var fadeOnScroll = function() {
  heroVideo.classList.toggle("fadein-transition");
  let y = window.scrollY;
  let opacity = 1 - (y/200.0);
  console.log("scroll: " + y);
  console.log("opacity: " +  opacity);
  if (y == 0) {
    heroVideo.style.opacity = null;
  } else {
    heroVideo.style.opacity = opacity;
  }
  heroVideo.classList.toggle("fadein-transition");
};

var debouncedFadeOnScroll = debounce(fadeOnScroll);

window.addEventListener('scroll', function(e) {
  //aim for 200px to be enough to fade out
  if (currentlyPlaying){
    //debouncedFadeOnScroll();
    fadeOnScroll();
  }
});

