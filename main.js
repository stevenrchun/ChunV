const MillisToSeconds = 1000;
const whiteoutTargets = document.getElementsByClassName("whiteout-target");
const interestSectionDiv = document.getElementById("section-title-1");
const interestSectionVideo = document.getElementById("interest-section-video");
const viewportHeight = (window.innerHeight || document.documentElement.clientHeight);
const interestSectionText = document.getElementById("section-material-1");
const lastAnimation = document.getElementById("last-animation");
const interestsSectionTitle = document.getElementById("section-title-text-1");
const interestsText = document.getElementById("section-text-1");
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
        item.style.animationName = "none"; // Required for safari
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

var applyClass = function(elements, classString) {
  for (element of elements) {
    let boundingBox = element.getBoundingClientRect();
    if (boundingBox.top < viewportHeight && boundingBox.top > (viewportHeight *.05)) {
      console.log("applying class " + classString);
      // Is now in the frame
      element.classList.add(classString);
    }
  }
}

var applyFade = function() {
  fadeInPhotos(interestSectionDiv, interestSectionVideo);
}

var debouncedFadeLandingOnScroll = debounce(fadeLandingOnScroll);
var debouncedApplyFade = debounce(applyFade);
var debouncedApplyClass = debounce(applyClass);


window.addEventListener('scroll', function(e) {
  debouncedFadeLandingOnScroll();
  debouncedApplyFade();
  debouncedApplyClass([interestsSectionTitle], "typewriter");
  applyClass([interestsText], "subtitle-typewriter");
});


lastAnimation.addEventListener('animationend', () => {
  titleFadeInsDone = true;
});

