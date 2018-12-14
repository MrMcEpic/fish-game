//--CONFIG--\\
let player = {
  x: 400,
  y: 400,
  size: 30
},
  mySpeed = 3, // speed of my box
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

(preinit= () => {//function autocalls itself
  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
  document.getElementById("info").innerHTML = "WASD To move, X to spawn box, R for wtfmode, P to paint, M for markers";
  canvas = document.createElement('canvas'),//create canvas
    canvas.id = "myCanvas",
    canvas.width = cWidth,
    canvas.height = cHeight,
    canvas.style.background = "aqua",
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
    //size = geSize,
    size = Math.floor(Math.random() * (geMax - geMin) + geMin),
    y = Math.abs(Math.floor(Math.random() * (cHeight - size))),
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
    l = `player pos: x ${player.x}, y ${player.y}`,
    k = `block pos: x ${x}, y ${y}`;
  hdebug.innerHTML = t+"<br/>"+l+"<br/>"+k;//It's faster to cache the location once
}

function mark() {
  if (markers) {
    c.fillStyle = "orangered";
    // c.strokeStyle = "orangered";
    // c.rect(player.x, player.y, player.size, player.size);
    // c.stroke();
    c.fillRect(player.x + player.size - player.size / 10, player.y, player.size / 10, player.size);
    c.fillRect(player.x, player.y, player.size / 10, player.size);
    c.fillRect(player.x, player.y, player.size, player.size / 10);
    c.fillRect(player.x, player.y + player.size - player.size / 10, player.size, player.size / 10);
  }
}//

despawn = (i, arr) => {
  arr.splice(i, 1);
  return arr.length;
};

function boxBehave() {
  let i,
    l = blocks.length;//speeds code, doesn't have to constantly check length of blocks
  for (i = 0; i < l; i++) {//don't use in because length changes
    let box = blocks[i];// short hand
    box.x = box.x - box.speed;
    if (box.x > cWidth || box.x + box.size < 0) {
      l = despawn(i, blocks);
      continue;
    }
    if (box.y + box.size - box.size / 10 >= player.y && box.y <= player.y + player.size) { //hit detection 
      if (box.x + box.size - box.size / 10 >= player.x && box.x <= player.x + player.size) {
        writer(box.x, box.y);
        l = despawn(i, blocks);
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
    player.x += mySpeed;
  }
  if (keyS && player.y < cHeight - player.size) {
    player.y += mySpeed;
  }
  if (keyA && player.x > 0) {
    player.x -= mySpeed;
  }
  if (keyW && player.y > 0) {
    player.y -= mySpeed;
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

pDraw = () => {//using arrow notation a bit to get the hang of it
  c.fillStyle = "coral";
  c.fillRect(player.x, player.y, player.size, player.size);  //draw player
};

loadOrder = () => { checks(); pDraw(); mark(); boxBehave(); boxDraw(); pMover();};

//main animation function
function drawStuff() {
  window.requestAnimationFrame(drawStuff);
  loadOrder();
}

function domloaded(){//once canvas is loaded, start animation
  drawStuff();
  document.getElementById("goals").innerHTML = "Goals:<ul class='nobul ull'><li><s>random fish location</s></li><li><s>x hit detection</s></li><li><s>y hit detection</s></li><li><s>border bounds</s></li><li>random fish spawn/timing & <s>size</s></li><li>lose condition</li><li>player growth</li></ul>";
}