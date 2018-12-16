const pHit = (box, i, arr) => {
	if (player.size > box.size) {
		despawn(i, arr);
		player.size += box.size / 10;
		if (player.size >= 400) {
			player.alive = false;
			winner = true;
		}
		if (player.size >= 70 && limit <= 15) {
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

const sprintLogic = () => {
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

const pDraw = () => {
	c.fillStyle = "coral";
	c.fillRect(player.x, player.y, player.size, player.size); //draw player
};

function mark() {
	if (markers) {
		c.fillStyle = "orangered";
		c.fillRect(player.x + player.size - player.size / 10, player.y, player.size / 10, player.size);
		c.fillRect(player.x, player.y, player.size / 10, player.size);
		c.fillRect(player.x, player.y, player.size, player.size / 10);
		c.fillRect(player.x, player.y + player.size - player.size / 10, player.size, player.size / 10);
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