let imgR = new Image();
imgR.src = './sprites/fishR.png';

let imgL = new Image();
imgL.src = './sprites/fishL.png';

let img = imgR;


const limiter = () => {
	if (player.size >= 150) {
		growthDivider = 20;
		globalEnemyMaximumSize = 300;
		globalEnemyMinimumSize = 130;
	} else if (player.size >= 100) {
		growthDivider = 15;
		globalEnemyMinimumSize = 80;
		globalEnemyMaximumSize = 250;
	} else if (player.size >= 70) {
		globalEnemyMinimumSize = 40;
		limit = 15;
	} else if (player.size >= 60) {
		limit = 14;
		globalEnemyMaximumSize = 200;
	} else if (player.size >= 50) {
		limit = 13;
		globalEnemyMinimumSize = 20;
	} else if (player.size >= 40) {
		limit = 12;
	}
};

const maxer = () => {
	//pass
};

const playerHit = (box, i, arr) => {
	if (player.size > box.size) {
		despawn(i, arr);
		player.size += box.size / growthDivider;
		if (player.size >= 400) {
			winner = true;
			end();
		}
		limiter();
	} else {
		end();
	}
	return arr.length;
};

const sprintLogic = () => {
	if (player.destination.sprint) {
		sprint = true;
	}

	if (sprintBar <= 0) {
		player.destination.sprint = false;
		sprint = false;
	}

	if (sprintBar < 100) {
		sprintDis = true;
	} else if (sprintBar >= 100) {
		sprintDis = false;
	}

	if (!sprint) {
		player.speed = playerSpeedDefault;
		if (sprintBar < 100) {
			sprintBar += 0.3;
		}
	} else if (sprint) {
		player.speed = playerSprintDefault;
		sprintBar -= 1;
	}
};

function mover(x) {
	switch (x) {
		case 'left':
			img = imgL;
			player.x -= player.speed;
			break;
		case 'right':
			img = imgR;
			player.x += player.speed;
			break;
		case 'up':
			player.y -= player.speed;
			break;
		case 'down':
			player.y += player.speed;
	}
}

function pMover() {
	if (keyD && player.x < canvasWidth - player.size) {
		mover('right');
	}
	if (keyS && player.y < canvasHeight - player.size * fishDrawOffSet) {
		mover('down');
	}
	if (keyA && player.x > 0) {
		mover('left');
	}
	if (keyW && player.y > 0) {
		mover('up');
	}
	//\\
	if (!jQuery.isEmptyObject(player.destination)) {//touch/click controls
		if (Math.abs(player.destination.X - (player.x + player.size / 2)) > 5 || Math.abs(player.destination.Y - (player.y + player.size / 2)) > 5) {
			if (player.destination.X - player.size / 2 > player.x + 3) { // move right
				mover('right');
			} else if (player.destination.X - player.size / 2 < player.x - 3) { // move left
				mover('left');
			}
			if (player.destination.Y - player.size / 2 > player.y + 3) { // move down
				mover('down');
			} else if (player.destination.Y - player.size / 2 < player.y - 3) { // move up
				mover('up');
			}
		} else {
			player.destination = {};
			sprint = false;
		}
	}
}

const pDraw = () => {
	context.strokeStyle = 'purple';
	//context.fillRect(player.destination.X - 5, player.destination.Y - 5, 10, 10);
	context.arc(player.destination.X, player.destination.Y, 5, 0, Math.PI * 2);
	context.stroke();
	context.fillRect(player.x - 5, player.y - 5, 10, 10);
	context.drawImage(img, 0, 0, 108, 72, player.x, player.y, player.size, player.size * fishDrawOffSet);
};

function writer() {
	let _size = `Size: ${Math.floor(player.size)}`;
	context.textAlign = "left";
	context.fillStyle = "Black";
	context.font = "30px Roboto";
	context.fillText(_size, 10, 40);
	context.fillText(`Sprint: ${Math.floor(sprintBar)}`, 10, 70);
}

const playerFunc = () => {
	pDraw();
	sprintLogic();
	pMover();
	writer();
};
