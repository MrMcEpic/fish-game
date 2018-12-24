//--event listeners--\\
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
myCanvas.addEventListener("mousedown", onMouseDown, false);
myCanvas.addEventListener("touchstart", touchHandler, false);
document.addEventListener("DOMContentLoaded", domloaded, false);
//----\\
let lastTap;
function touchHandler(event) {
	event.preventDefault();
	if (!player.alive) {
		config();
		loadOrder();
	}
	let rect = canvas.getBoundingClientRect();
	let now = new Date().getTime();
	let timeSince = now - lastTap;
	if (timeSince < 300 && timeSince > 0) {
		if (!sprintDis) {
			player.destination.sprint = true;
		} else {
			player.destination.sprint = false;
			sprint = false;
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
	if ([68, 39, 40, 83, 37, 65, 38, 87].indexOf(event.keyCode) > -1) {
		player.destination = {};//stop click movement if using keys
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
	event.preventDefault();
	let rect = canvas.getBoundingClientRect();
	let now = new Date().getTime();
	let timeSince = now - lastTap;
	if (timeSince < 300 && timeSince > 0) {
		if (!sprintDis) {
			player.destination.sprint = true;
		} else {
			player.destination.sprint = false;
			sprint = false;
		}
	}
	lastTap = now;
	player.destination.X = event.clientX-rect.left;
	player.destination.Y = event.clientY-rect.top;
}

function domloaded() { //once canvas is loaded, start animation
	drawStuff();
}