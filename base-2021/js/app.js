
/*Toggle header colours*/
var scrollpos = window.scrollY;
var header = document.getElementById("header");
var navcontent = document.getElementById("nav-content");
var navaction = document.getElementById("navAction");
var brandname = document.getElementById("brandname");
var toToggle = document.querySelectorAll(".toggleColour");

document.addEventListener('scroll', function() {

/*Apply classes for slide in bar*/
scrollpos = window.scrollY;

  if(scrollpos > 10){
    header.classList.add("bg-white");
  header.classList.remove("text-white");
  header.classList.add("text-black");
  //Use to switch toggleColour colours
    for (var i = 0; i < toToggle.length; i++) {
     toToggle[i].classList.add("text-black");
     toToggle[i].classList.remove("text-white");
  }
  header.classList.add("shadow");

  }
  else {
  header.classList.remove("bg-white");
  header.classList.remove("text-black");
  header.classList.add("text-white");

  //Use to switch toggleColour colours
    for (var i = 0; i < toToggle.length; i++) {
     toToggle[i].classList.add("text-white");
   toToggle[i].classList.remove("text-gray-800");
  }
  
  header.classList.remove("shadow");

  
  }

});



/*Toggle dropdown list*/
/*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

var navMenuDiv = document.getElementById("nav-content");
var navMenu = document.getElementById("nav-toggle");

document.onclick = check;
function check(e){
  var target = (e && e.target) || (event && event.srcElement);
  
  //Nav Menu
  if (!checkParent(target, navMenuDiv)) {
  // click NOT on the menu
  if (checkParent(target, navMenu)) {
    // click on the link
    if (navMenuDiv.classList.contains("hidden")) {
    navMenuDiv.classList.remove("hidden");
    } else {navMenuDiv.classList.add("hidden");}
  } else {
    // click both outside link and outside menu, hide menu
    navMenuDiv.classList.add("hidden");
  }
  }
  
}
function checkParent(t, elm) {
  while(t.parentNode) {
  if( t == elm ) {return true;}
  t = t.parentNode;
  }
  return false;
}


/* Progress bar */
		//Source: https://alligator.io/js/progress-bar-javascript-css-variables/
		var h = document.documentElement,
			b = document.body,
			st = 'scrollTop',
			sh = 'scrollHeight',
			progress = document.querySelector('#progress'),
			scroll;
		var scrollpos = window.scrollY;
		var header = document.getElementById("header");
		var navcontent = document.getElementById("nav-content");

		document.addEventListener('scroll', function () {

			/*Refresh scroll % width*/
			scroll = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
			progress.style.setProperty('--scroll', scroll + '%');

			/*Apply classes for slide in bar*/
			scrollpos = window.scrollY;

			if (scrollpos > 10) {
				header.classList.add("bg-white");
				header.classList.add("shadow");
			} else {
				header.classList.remove("bg-white");
				header.classList.remove("shadow");
			}

		});