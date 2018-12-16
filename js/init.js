let config;
(config = () => {
//--CONFIG--\\
	pSpeedDe = 2,
	pSprintDe = 6;
	player = {
		x: 400,
		y: 400,
		size: 300,
		alive: true,
		speed: pSpeedDe
	},
		limit = 10,
		wtfMode = false,
		paint = false,
		markers = true,
		geMin = 5,
		geMax = 150,
		cWidth = 800,
		cHeight = 800,
		keyW = false,
		keyA = false,
		keyS = false,
		keyD = false,
		sprint = false,
		sprintbar = 100,
		blocks = [],
		winner = false;
//--END CONFIG --\\
})();
let preinit;
(preinit = () => { //function autocalls itself
	var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	document.getElementById("info").innerHTML = "WASD or arrow keys to move, Shift to sprint, H for wtfmode, P to paint, M for markers";
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