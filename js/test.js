//--CONFIG--\\
let player = {
		x: 400,
		y: 400,
		size: 30,
		alive: true,
		speed: 3
	},
	limit = 10,
	wtfMode = false,
	paint = false,
	markers = true,
	markers2 = false,
	geSize = 30, // global enemy size
	geMin = 5,
	geMax = 150,
	cWidth = 800,
	cHeight = 800;
//--END CONFIG --\\

(preinit = () => { //function autocalls itself
	var requestAnimationFrame = window.requestAnimationFrame ||
								window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame ||
								window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	document.getElementById("info").innerHTML = "WASD To move, R for wtfmode, P to paint, M for markers";
	canvas = document.createElement('canvas'), //create canvas
		canvas.id = "myCanvas",
		canvas.width = cWidth,
		canvas.height = cHeight,
		canvas.style.background = "aqua",
		div = document.getElementById("canvashold"); //get canvas placeholder
	div.appendChild(canvas); //put canvas in placeholder
	c = document.getElementById("myCanvas").getContext("2d"); //not using var,let,const makes it global
	hdebug = document.getElementById("hitdebug"); //speeds code to not constantly grab from dom
})();

//--event listeners--\\
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
document.addEventListener("DOMContentLoaded", domloaded, false);
//----\\

//--needed--\\
let keyW = false,
	keyA = false,
	keyS = false,
	keyD = false,
	blocks = [];
//----\\

function onKeyDown(event) {
	switch (event.key) {
		case "d":
			keyD = true;
			break;
		case "s":
			keyS = true;
			break;
		case "a":
			keyA = true;
			break;
		case "w":
			keyW = true;
			break;
	}
}

function onKeyUp(event) {
	switch (event.key) {
		case "d":
			keyD = false;
			break;
		case "s":
			keyS = false;
			break;
		case "a":
			keyA = false;
			break;
		case "w":
			keyW = false;
			break;
		// case "x":
		// 	setTimeout(spawner, Math.floor(Math.random() * (10000-1000)+1000));
		// 	break;
		case "r":
			wtfMode = !wtfMode;
			break;
		case "p":
			paint = !paint;
			break;
		case "m":
			markers = !markers;
			break;
		default:
			break;
	}
}

function randRange(min, max, _floor) {
	if (_floor) {
		return Math.floor(Math.random() * (max - min) + min);
	} else {
		return Math.random() * (max - min) + min;
	}
}

function spawner() { // create enemies
	let x,
		speed,
		size = randRange(geMin, geMax, true),
		y = Math.abs(randRange(0, cHeight - size, false)),
		side = Math.random(),
		zoom = Math.random() * 2 + 1;

	if (side >= 0.499999) {
		x = cWidth + 70;
		speed = zoom;
	} else {
		x = 0 - 160;
		speed = -zoom;
	}
	if (blocks.length < limit) {
		blocks.push({
			size: size,
			x: x,
			y: y,
			speed: speed
		});
	}
}

function writer() {
	let o = `Size: ${Math.floor(player.size)}`;
	c.fillStyle = "Black";
	c.font = "30px Roboto";
	c.fillText(o, 10, 40);
}

function mark() {
	if (markers) {
		c.fillStyle = "orangered";
		c.fillRect(player.x + player.size - player.size / 10, player.y, player.size / 10, player.size);
		c.fillRect(player.x, player.y, player.size / 10, player.size);
		c.fillRect(player.x, player.y, player.size, player.size / 10);
		c.fillRect(player.x, player.y + player.size - player.size / 10, player.size, player.size / 10);
	}
}

pHit = (box, i) => {
	if (player.size > box.size) {
		despawn(i, blocks);
		player.size += box.size / 10;
		if (player.size >= 70 && limit < 15) {
			limit = 15;
		} else if (player.size >= 60 && limit < 14) {
			limit = 14;
		} else if (player.size >= 50 && limit < 13) {
			limit = 13;
		} else if (player.size >= 40 && limit < 12) {
			limit = 12;
		}
	} else {
		player.alive = false;
	}
};

despawn = (i, arr) => {
	arr.splice(i, 1);
	return arr.length;
};

function boxBehave() {
	let i,
		l = blocks.length; //speeds code, doesn't have to constantly check length of blocks
	for (i = 0; i < l; i++) { //don't use in because length changes
		let box = blocks[i]; // short hand
		box.x = box.x - box.speed;
		if (box.x > cWidth + 80 || box.x + box.size < 0 - 160) {
			l = despawn(i, blocks);
			continue;
		}
		if (box.y + box.size >= player.y && box.y <= player.y + player.size) { //hit detection 
			if (box.x + box.size >= player.x && box.x <= player.x + player.size) {
				pHit(box, i);
				continue;
			}
		}
		blocks[i] = box;
	}
}

boxDraw = () => { //this solves blinking bug
	let i;
	for (i in blocks) {
		let box = blocks[i];
		c.fillStyle = "red";
		c.fillRect(box.x, box.y, box.size, box.size); //this part updates/draws boxes
	}
};

function pMover() {
	if (keyD && player.x < cWidth - player.size) {
		player.x += player.speed;
	}
	if (keyS && player.y < cHeight - player.size) {
		player.y += player.speed;
	}
	if (keyA && player.x > 0) {
		player.x -= player.speed;
	}
	if (keyW && player.y > 0) {
		player.y -= player.speed;
	}
}

function checks() {
	if (!paint) {
		c.clearRect(0, 0, cWidth, cHeight);
	}
	if (wtfMode) {
		c.fillStyle = "orangered";
		c.fillRect(player.y, player.x, player.size, player.size);
	}
}

pDraw = () => { //using arrow notation a bit to get the hang of it
	c.fillStyle = "coral";
	c.fillRect(player.x, player.y, player.size, player.size); //draw player
};

spawnTime = () => {
	if (blocks.length < limit) {
		setTimeout(spawner, randRange(1000,10000,false)); // temp?
	}
};

loadOrder = () => {
	if (player.alive) {
		checks();
		pDraw();
		mark();
		spawnTime();
		boxBehave();
		boxDraw();
		pMover();
		writer();
	} else {
		//draw lose condition
	}
};

//main animation function
function drawStuff() {
	window.requestAnimationFrame(drawStuff);
	loadOrder();
}

function domloaded() { //once canvas is loaded, start animation
	drawStuff();
	document.getElementById("goals").innerHTML = "Goals:<ul class='nobul ull'><li><s>random fish location</s></li><li><s>x hit detection</s></li><li><s>y hit detection</s></li><li><s>border bounds</s></li><li><s>random fish spawn/timing & size</s></li><li>lose condition (semi)</li><li><s>player growth</s></li><li>win condition</li></ul>";
}