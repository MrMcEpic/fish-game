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
  gpSize = 100, // global player size
  cWidth = 800,
  cHeight = 800;
//--END CONFIG --\\

(function preinit() {//function autocalls itself
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  document.getElementById("info").innerHTML = "WASD To move, X to spawn box, R for wtfmode, P to paint, M for markers";
  canvas = document.createElement('canvas'),//create canvas
    canvas.id = "myCanvas",
    canvas.width = cWidth,
    canvas.height = cHeight,
    canvas.style.border = "1px solid",
    div = document.getElementById("canvashold");//get canvas placeholder
  div.appendChild(canvas);//put canvas in placeholder
  c = document.getElementById("myCanvas").getContext("2d");//not using var,let,const makes it global
  hdebug = document.getElementById("hitdebug");//speeds code to not constantly grab from dom
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
    case "x":
      spawner();
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
    default:
      break;
  }
}

function spawner() { // create enemies
  let x, speed,
    size = geSize,
    y = Math.abs(Math.floor(Math.random() * (800 - size))),
    side = Math.random(),
    zoom = Math.floor(Math.random() * 2 + 1);

  if (side >= 0.499999) {
    x = cWidth;
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
  let t = `debug: hit`,
    l = `player pos: x ${playPos.x}, y ${playPos.y}`,
    k = `block pos: x ${x}, y ${y}`;
  hdebug.innerHTML = t+"<br/>"+l+"<br/>"+k;//It's faster to cache the location once
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
  let i,
    l = blocks.length;//speeds code, doesn't have to constantly check length of blocks
  for (i = 0; i < l; i++) {
    try {//fixes error from undefined x and solves blinking
      c.fillStyle = "purple";
      blocks[i].x = blocks[i].x - blocks[i].speed;
      c.fillRect(blocks[i].x, blocks[i].y, blocks[i].size, blocks[i].size);
      if (blocks[i].x > cWidth || blocks[i].x < 0) {
        blocks.splice(i, 1);
        l = blocks.length;
      }
      if (blocks[i].y + geSize - geSize / 10 >= playPos.y && blocks[i].y <= playPos.y + gpSize) { //hit detection 
        if (blocks[i].x + geSize - geSize / 10 >= playPos.x && blocks[i].x <= playPos.x + gpSize) {
          writer(blocks[i].x, blocks[i].y);
        }
      }
    }
    catch (error) {
      continue;
    }
  }
}

function pMover() {
  if (keyD && playPos.x < cWidth - gpSize) {
    playPos.x += mySpeed;
  }
  if (keyS && playPos.y < cHeight - gpSize) {
    playPos.y += mySpeed;
  }
  if (keyA && playPos.x > 0) {
    playPos.x -= mySpeed;
  }
  if (keyW && playPos.y > 0) {
    playPos.y -= mySpeed;
  }
}

function checks() {
  if (!paint) {
    c.clearRect(0, 0, cWidth, cHeight);
  }
  if (wtfMode) {
    c.fillStyle = "red";
    c.fillRect(playPos.y, playPos.x, gpSize, gpSize);
  }
}

pDraw = () => {//using arrow notation a bit to get the hang of it
  c.fillStyle = "blue";
  c.fillRect(playPos.x, playPos.y, gpSize, gpSize);  //draw player
};

loadOrder = () => {checks(); pDraw(); mark(); boxBehave(); pMover();};

//main animation function
function drawStuff() {
  window.requestAnimationFrame(drawStuff);
  loadOrder();
}

function domloaded(){//once canvas is loaded, start animation
  window.requestAnimationFrame(drawStuff);
  document.getElementById("goals").innerHTML = "Goals:<ul class='nobul ull'><li><s>random fish location</s></li><li><s>x hit detection</s></li><li><s>y hit detection</s></li><li><s>border bounds</s></li><li>random fish spawn/timing</li><li>lose condition</li></ul>";
}