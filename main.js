const MillisToSeconds = 1000;
const whiteoutTargets = document.getElementsByClassName("whiteout-target");
const interestSectionTitle = document.getElementById("section-title-1");
const interestSectionVideo = document.getElementById("interest-section-video");
const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
const interestSectionText = document.getElementById("section-material-1");
const lastAnimation = document.getElementById("last-animation");
let titleFadeInsDone = false;
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


var fadeLandingOnScroll = function() {
  if (titleFadeInsDone) {
    let y = window.scrollY;
    let opacity = 1.5 - (y/200.0);
    for (let item of whiteoutTargets) {
      item.style.opacity = opacity;
      if (getComputedStyle(item).animationFillMode == "forwards") {
        item.style.animationFillMode = "none";
      }
    }
  }
};


var fadeInPhotos = function(element, photoElement) {
  let boundingBox = element.getBoundingClientRect();
  if (boundingBox.top < viewportHeight && boundingBox.top > (viewportHeight *.05)) {
    // Is now in the frame
    photoElement.style.opacity = 1;
    if (photoElement.tagName == "VIDEO") {
      photoElement.play();
    }
    interestSectionText.style.opacity = 0;
  } else {
    photoElement.style.opacity = 0;
    if (photoElement.tagName == "VIDEO" && !photoElement.paused) {
      photoElement.pause();
    }
    interestSectionText.style.opacity = 1;
  }
 }

var applyFade = function() {
  fadeInPhotos(interestSectionTitle, interestSectionVideo);
}

var debouncedFadeLandingOnScroll = debounce(fadeLandingOnScroll);
var debouncedApplyFade = debounce(applyFade);


window.addEventListener('scroll', function(e) {
  debouncedFadeLandingOnScroll();
  debouncedApplyFade();
});


lastAnimation.addEventListener('animationend', () => {
  titleFadeInsDone = true;
});

