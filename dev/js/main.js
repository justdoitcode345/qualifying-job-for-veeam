;
'use strict';
window.onload = function() {
	// foreach fix
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function (fn, scope) {
			for (var i = 0; i < this.length; ++i) {
				fn.call(scope, this[i], i, this);
			}
		};
	}

	function hasClass(ele,cls) {
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	function removeClass(ele,cls) {
		if (hasClass(ele,cls)) {
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			ele.className=ele.className.replace(reg,' ');
		}
	}
	
	function arr(nodeList) {
		return Array.apply(null, nodeList);
	}

	function showPopup(event) {
		 event.preventDefault();
		 liteModal.open('#popup');
	}

	// handle clicking on label
	function tabclick(e) {
		var el = e ? e.target : window.event.srcElement;
		if (el.tagName == "LABEL" && !el.classList.contains('label_active')) {
			arr(document.querySelectorAll(".related-content")).forEach(function (element) {
				
				if (element.classList.contains(el.id) && !hasClass(element, "display-block"))  { 
					
					arr(document.querySelectorAll(".related-content__label")).
					forEach(function(tab) {tab.classList.remove("label_active");});
					el.classList.add("label_active");
					element.classList.add("display-block");

				} else { 

					removeClass(element, "display-block");
				}	
			});
		}
	}

	arr(document.querySelectorAll(".related-content__label")).forEach(function (tab) {tab.onclick = tabclick;});

	arr(document.querySelectorAll(".show-popup")).forEach(function (link) {link.onclick = showPopup;});

	document.getElementById('video').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
};