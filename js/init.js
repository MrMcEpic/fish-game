let config;
(config = (played) => {
	winW = window.innerWidth;
	winY = window.innerHeight;
//--CONFIG--\\
	hitBoxOffSetYLow = 0.43,
		hitBoxOffSetYHigh = 0.18,
		hitBoxOffSetXLow = 0.80,
		hitBoxOffSetXHigh = 0,
		fishDrawOffSet = 0.667,
		playerSpeedDefault = 2,
		playerSprintDefault = 6,
		growthDivider = 10;
		limit = 10,
		wtfMode = false,
		paint = false,
		boxMarker = true,
		globalEnemyMinimumSize = 5,
		globalEnemyMaximumSize = 150,
		canvasWidth = winW - winW / 9.45,
		canvasHeight = winY - winY / 8.9,
		keyW = false,
		keyA = false,
		keyS = false,
		keyD = false,
		sprint = false,
		sprintBar = 100,
		enemies = [],
		winner = false;
	if (!played) {
		started = false;
	}
		player = {
			x: canvasWidth / 2,
			y: canvasHeight / 2,
			size: 30,
			alive: true,
			speed: playerSpeedDefault,
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
		canvas.width = canvasWidth,
		canvas.height = canvasHeight,
		canvas.style.background = "aqua",
		div = document.getElementById("canvashold"); //get canvas placeholder
		div.appendChild(canvas); //put canvas in placeholder
	context = document.getElementById("myCanvas").getContext("2d"); //not using var,let,const makes it global
})();