//--event listeners--\\
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
myCanvas.addEventListener("mousedown", onMouseDown, false);
myCanvas.addEventListener("touchstart", touchHandler, false);
document.addEventListener("DOMContentLoaded", domloaded, false);
//----\\
let lastTap;
function touchHandler(event) {
	if (!player.alive) {
		config();
		loadOrder();
	}
	event.preventDefault();
	let rect = canvas.getBoundingClientRect();
	let now = new Date().getTime();
	let timeSince = now - lastTap;
	if (timeSince < 600 && timeSince > 0) {
		if (!sprintDis) {
			player.destination.sprint = true;
		} else {
			player.destination.sprint = false;
		}
	}
	lastTap = now;
	player.destination.X = event.touches[0].clientX-rect.left;
	player.destination.Y = event.touches[0].clientY - rect.top;
}

function onKeyDown(event) {
	if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) { //disables arrow key scrolling
      event.preventDefault();
    }
	switch (event.which) {
		case 39:
		case 68:
			keyD = true;
			break;
		case 40:
		case 83:
			keyS = true;
			break;
		case 37:
		case 65:
			keyA = true;
			break;
		case 38:
		case 87:
			keyW = true;
			break;
		case 16:
			if (!sprintDis) {
				sprint = true;
			}
			break;
		default:
			break;
	}
}

function onKeyUp(event) {
	switch (event.which) {
		case 39:
		case 68: //d
			keyD = false;
			break;
		case 40:
		case 83: //s
			keyS = false;
			break;
		case 37:
		case 65: //a
			keyA = false;
			break;
		case 38:
		case 87: //w
			keyW = false;
			break;
		case 72: //h
			wtfMode = !wtfMode;
			break;
		case 80: //p
			paint = !paint;
			break;
		case 77: //m
			markers = !markers;
			break;
		case 82: //r
			if (!player.alive) {
				config();
				loadOrder();
				//preinit();
			}
			break;
		case 16:
			sprint = false;
			break;
		case 71: //g
			boxMarker = !boxMarker;
			break;
		default:
			break;
	}
}

function onMouseDown(event) {
	let rect = canvas.getBoundingClientRect();
	let now = new Date().getTime();
	let timeSince = now - lastTap;
	if (timeSince < 600 && timeSince > 0) {
		if (!sprintDis) {
			player.destination.sprint = true;
		} else {
			player.destination.sprint = false;
		}
	}
	lastTap = now;
	player.destination.X = event.clientX-rect.left;
	player.destination.Y = event.clientY-rect.top;
}

function isMobileDevice() {
	return typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1;
}

function domloaded() { //once canvas is loaded, start animation
	drawStuff();
	document.getElementById("goals").innerHTML = 
	"Goals:\
	<ul class='nobul ull'>\
	<li><s>random fish location</s></li>\
	<li><s>x hit detection</s></li>\
	<li><s>y hit detection</s></li>\
	<li><s>border bounds</s></li>\
	<li><s>random fish spawn/timing & size</s></li>\
	<li><s>lose condition</s> (semi)</li>\
	<li><s>player growth</s></li>\
	<li><s>win condition</s> (semi)</li>\
	<li><s>sprint</s></li>\
	<li>hard mode col spawn</li>\
	<li>sprites</li>\
	<li><s>dynamic rez</s></li>\
	<li>different fish types</li>\
	<li>(Basic) <s>mobile controls</s></li>\
	</ul>";
	if (isMobileDevice()) {
		window.scroll(0, winY / 7.5);
	} else {
		window.scroll(0, winY / 6.5);
	}
}