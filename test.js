(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

//--event listener--\\
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
//--\\

var para = document.createElement("P");
var t = document.createTextNode(
  "WASD To move, X to spawn box, R for wtfmode, P to paint, M for markers"
);
para.appendChild(t);
document.getElementById("heh").appendChild(para);

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

/*
//--CONFIG--\\
*/
var playPos = {
  x: 400,
  y: 400
};
var mySpeed = 3; // speed of my box
var wtfMode = false;
var paint = false;
var markers = true;
var geSize = 30; // global enemy size
var gpSize = 100; // global player size
/*
//--END CONFIG --\\
*/


var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;
var blocks = [];

function doer() { // create enemies
  var x, speed;
  let size = geSize;
  let y = Math.abs(Math.floor(Math.random() * (800 - size)));
  let side = Math.random();
  let zoom = Math.floor(Math.random() * 2 + 1);

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
  var para = document.createElement("P");
  var linebreak1 = document.createElement("br");
  var linebreak2 = document.createElement("br");
  var t = document.createTextNode(
    `xhit`
  );
  var l = document.createTextNode(
    `player pos: x${playPos.x},y${playPos.y}`
  );
  var k = document.createTextNode(
    `block pos: x${x},y${y}`
  );
  para.appendChild(t);
  para.appendChild(linebreak1);
  para.appendChild(l);
  para.appendChild(linebreak2);
  para.appendChild(k);
  document.getElementById("hitdebug").appendChild(para);
  var item = document.getElementById("hitdebug");
  item.replaceChild(para, item.childNodes[0]);
}

function mark() {
  if (markers) {
    c.fillStyle = "red";
    c.fillRect(playPos.x + gpSize - gpSize / 10, playPos.y, 10, 100);
    c.fillRect(playPos.x, playPos.y, 10, gpSize);
    c.fillRect(playPos.x, playPos.y, gpSize, 10);
    c.fillRect(playPos.x, playPos.y + gpSize - gpSize / 10, gpSize, 10);
  }
}

function boxBehave() {
  for (let i = 0; i < blocks.length; i++) {
    //console.log(blocks);
    c.fillStyle = "purple";
    blocks[i].x = blocks[i].x - blocks[i].speed;
    c.fillRect(blocks[i].x, blocks[i].y, blocks[i].size, blocks[i].size);

    if (blocks[i].x > 800 || blocks[i].x < 1) { //todo set up edge variables
      blocks.splice(i, 1);
    } else if (blocks[i].x + geSize-geSize/10 >= playPos.x && blocks[i].x <= playPos.x + gpSize-gpSize/10){ //hit detection x
      console.log(`xhit pc: x${playPos.x},y${playPos.y}, bc: x${blocks[i].x},y${blocks[i].y}`);//todo y hit detection
      writer(blocks[i].x, blocks[i].y);
    }
  }
}

//var canvas, c;
(function init() {
  canvas = document.getElementById("myCanvas");
  c = canvas.getContext("2d");
})();

//main animation function
function drawStuff() {
  window.requestAnimationFrame(drawStuff);


  if (!paint) {
    c.clearRect(0, 0, 800, 800);
  }

  c.fillStyle = "blue";
  c.fillRect(playPos.x, playPos.y, gpSize, gpSize);

  if (wtfMode) {
    c.fillStyle = "red";
    c.fillRect(playPos.y, playPos.x, gpSize, gpSize);
  }
  mark();
  boxBehave();

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
window.requestAnimationFrame(drawStuff);