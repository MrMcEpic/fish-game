(config = () => {
    //--CONFIG--\\
        pSpeedDe = 2,
        pSprintDe = 6;
        player = {
            x: 400,
            y: 400,
            size: 30,
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
            blocks = [];
    //--END CONFIG --\\
    })();
    
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
    
    //--event listeners--\\
    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);
    document.addEventListener("DOMContentLoaded", domloaded, false);
    //----\\
    
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
            zoom = randRange(0.5, 4.0, false);
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
        let _size = `Size: ${Math.floor(player.size)}`;
        c.textAlign = "left";
        c.fillStyle = "Black";
        c.font = "30px Roboto";
        c.fillText(_size, 10, 40);
        c.fillText(`Sprint: ${Math.floor(sprintbar)}`, 10, 70);
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
    
    pHit = (box, i, arr) => {
        if (player.size > box.size) {
            despawn(i, arr);
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
        return arr.length;
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
                    l = pHit(box, i, blocks);
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
    
    sprintLogic = () => {
        if (sprintbar <= 0) {
            sprint = false;
        }
    
        if (sprintbar < 100) {
            sprintDis = true;
        } else if (sprintbar >= 100) {
            sprintDis = false;
        }
    
        if (!sprint) {
            player.speed = pSpeedDe;
            if (sprintbar < 100) {
                sprintbar += 0.3;
            }
        } else if (sprint) {
            player.speed = pSprintDe;
            sprintbar -= 1;
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
    
    pDraw = () => {
        c.fillStyle = "coral";
        c.fillRect(player.x, player.y, player.size, player.size); //draw player
    };
    
    spawnTime = () => {
        if (blocks.length < limit) {
            setTimeout(spawner, randRange(1000, 10000, false)); // temp?
        }
    };
    
    lose = () => {
        c.fillStyle = "red";
        c.textAlign = "center";
        c.font = "60px Roboto";
        c.fillText("You Lose!", cWidth / 2, cHeight / 2);
        c.strokeText("You Lose!", cWidth / 2, cHeight / 2);
        c.font = "20px Roboto";
        c.fillText("Press R to play again!", cWidth / 2, cHeight / 2 + 100);
        c.strokeText("Press R to play again!", cWidth / 2, cHeight / 2 + 100);
    };
    
    loadOrder = () => {
        if (player.alive) {
            window.requestAnimationFrame(drawStuff);
            checks();
            pDraw();
            mark();
            spawnTime();
            boxBehave();
            boxDraw();
            sprintLogic();
            pMover();
            writer();
        } else {
            lose();
        }
    };
    
    function drawStuff() {
        loadOrder();
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
        <li>lose condition (semi)</li>\
        <li><s>player growth</s></li>\
        <li>win condition</li>\
        <li><s>sprint</s></li>\
        <li>hard mode col spawn</li>\
        </ul>";
    }