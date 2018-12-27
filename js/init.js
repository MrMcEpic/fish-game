let config;
(config = (played) => {
	winW = window.innerWidth;
	winY = window.innerHeight;
//--CONFIG--\\
	pSpeedDe = 2,
		pSprintDe = 6,
		limit = 10,
		wtfMode = false,
		paint = false,
		markers = true,
		boxMarker = true,
		geMin = 5,
		geMax = 150,
		cWidth = winW - winW / 9.45,
		cHeight = winY - winY / 8.9,
		keyW = false,
		keyA = false,
		keyS = false,
		keyD = false,
		sprint = false,
		sprintbar = 100,
		blocks = [],
		winner = false;
	if (!played) {
		started = false;
	}
		player = {
			x: cWidth / 2,
			y: cHeight / 2,
			size: 30,
			alive: true,
			speed: pSpeedDe,
			destination: {},
			lastDirect: 'R'
		};
//--END CONFIG --\\
})();
let preinit;
(preinit = () => { //function autocalls itself
	let infoText = "<p>WASD, arrow keys or tap to move, Shift or double tap to dash (double tap to cancel), H for wtfmode, P to paint</p>";
	var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	$("#info").html(infoText);
	canvas = document.createElement('canvas'), //create canvas
		canvas.id = "myCanvas",
		canvas.width = cWidth,
		canvas.height = cHeight,
		canvas.style.background = "aqua",
		div = document.getElementById("canvashold"); //get canvas placeholder
		div.appendChild(canvas); //put canvas in placeholder
	c = document.getElementById("myCanvas").getContext("2d"); //not using var,let,const makes it global
})();