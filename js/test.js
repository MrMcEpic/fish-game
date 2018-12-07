//--CONFIG--\\
let playPos = {
  x: 400,
  y: 400
},
  mySpeed = 3, // speed of my box
  wtfMode = false,
  paint = false,
  markers = true,
  geSize = 30, // global enemy size
  gpSize = 100; // global player size
//--END CONFIG --\\

(function aninit() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

//--event listener--\\
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
//----\\

document.getElementById("heh").innerHTML = "WASD To move, X to spawn box, R for wtfmode, P to paint, M for markers";

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
    case "x":
      doer();
      break;
    case "r":
      wtfMode = !wtfMode;
      break;
    case "p":
      paint = !paint;
      break;
    case "m":
      markers = !markers;
      break;
  }
}

var keyW = false,
  keyA = false,
  keyS = false,
  keyD = false,
  blocks = [];

function doer() { // create enemies
  let x, speed,
    size = geSize,
    y = Math.abs(Math.floor(Math.random() * (800 - size))),
    side = Math.random(),
    zoom = Math.floor(Math.random() * 2 + 1);

  if (side >= 0.499999) {
    x = 800;
    speed = zoom;
  } else {
    x = 0;
    speed = -zoom;
  }

  blocks.push({
    size: size,
    x: x,
    y: y,
    speed: speed
  });
}

function writer(x, y) {
  let t = `debug: xhit`,
    l = `player pos: x ${playPos.x}, y ${playPos.y}`,
    k = `block pos: x ${x}, y ${y}`;
  document.getElementById("hitdebug").innerHTML = t+"<br/>"+l+"<br/>"+k;
}

function mark() {
  if (markers) {
    c.fillStyle = "red";
    c.fillRect(playPos.x + gpSize - gpSize / 10, playPos.y, gpSize / 10, gpSize);
    c.fillRect(playPos.x, playPos.y, gpSize / 10, gpSize);
    c.fillRect(playPos.x, playPos.y, gpSize, gpSize / 10);
    c.fillRect(playPos.x, playPos.y + gpSize - gpSize / 10, gpSize, gpSize / 10);
  }
}

function boxBehave() {
  for (let i = 0; i < blocks.length; i++) {
    c.fillStyle = "purple";
    blocks[i].x = blocks[i].x - blocks[i].speed;
    c.fillRect(blocks[i].x, blocks[i].y, blocks[i].size, blocks[i].size);

    if (blocks[i].x > 800 || blocks[i].x < 1) { //todo set up edge variables
      blocks.splice(i, 1);
    } else if (blocks[i].x + geSize-geSize/10 >= playPos.x && blocks[i].x <= playPos.x + gpSize-gpSize/10){ //hit detection x
      //console.log(`xhit pc: x${playPos.x},y${playPos.y}, bc: x${blocks[i].x},y${blocks[i].y}`);//todo y hit detection
      writer(blocks[i].x, blocks[i].y);
    }
  }
}

function pMover() {
  if (keyD) {
    playPos.x += mySpeed;
  }
  if (keyS) {
    playPos.y += mySpeed;
  }
  if (keyA) {
    playPos.x -= mySpeed;
  }
  if (keyW) {
    playPos.y -= mySpeed;
  }
}

function checks() {
  if (!paint) {
    c.clearRect(0, 0, 800, 800);
  }
  if (wtfMode) {
    c.fillStyle = "red";
    c.fillRect(playPos.y, playPos.x, gpSize, gpSize);
  }
}

const pDraw = () => {//using arrow notation a bit to get the hang of it
  c.fillStyle = "blue";
  c.fillRect(playPos.x, playPos.y, gpSize, gpSize);  //draw player
};

const loadOrder= () => {checks(); pDraw(); mark(); boxBehave(); pMover();};

(function init() {//Notice notation... This makes a function automatically call itself
  c = document.getElementById("myCanvas").getContext("2d");//Apparently in javascript defining a var in a function without var,let,const creates a global var
})();

//main animation function
function drawStuff() {
  window.requestAnimationFrame(drawStuff);
  loadOrder();
}
window.requestAnimationFrame(drawStuff);