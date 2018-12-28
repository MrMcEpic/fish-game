let enemyImageRight = new Image();
enemyImageRight.src = './sprites/efishR.png';

let enemyImageLeft = new Image();
enemyImageLeft.src = './sprites/efishL.png';

let enemyImageRightSecondary = new Image();
enemyImageRightSecondary.src = './sprites/efishRY.png';

let enemyImageLeftSecondary = new Image();
enemyImageLeftSecondary.src = './sprites/efishLY.png';

const despawn = (i, arr) => {//deletes enemy object from list of enemies and returns list length back
	arr.splice(i, 1);
	return arr.length;
};

function boxBehave() {
	let i,
		l = enemies.length; //speeds code, doesn't have to constantly check length of blocks
	for (i = 0; i < l; i++) { //don't use in because length changes
		let box = enemies[i]; // short hand
		box.x = box.x - box.speed;
		if (box.x > canvasWidth + 60 || box.x + box.size < 0 - (globalEnemyMaximumSize+60)) {
			l = despawn(i, enemies);
			continue;
		}
		if (box.y + box.size * hitBoxOffSetYLow >= player.y + player.size * hitBoxOffSetYHigh && box.y + box.size * hitBoxOffSetYHigh <= player.y + player.size * hitBoxOffSetYLow) { //hit detection 
			if (box.x + box.size * hitBoxOffSetXLow >= player.x + player.size * hitBoxOffSetXHigh && box.x <= player.x + player.size * hitBoxOffSetXLow) {
				l = playerHit(box, i, enemies);
				continue;
			}
		}
		enemies[i] = box;
	}
}

function boxDraw () { //this solves blinking bug
	let i;
	for (i in enemies) {
		let box = enemies[i];
		if (box.size < player.size) {
			if (boxMarker) {
				context.drawImage(box.enemyImageSecondary, 0, 0, 108, 72, box.x, box.y, box.size, box.size * fishDrawOffSet);
			} else {
				context.drawImage(box.enemyImage, 0, 0, 108, 72, box.x, box.y, box.size, box.size * fishDrawOffSet);
			}
		} else {
			context.drawImage(box.enemyImage, 0, 0, 108, 72, box.x, box.y, box.size, box.size * fishDrawOffSet);
		}
	}
}

const boxFunc = () => {
	spawnTime();
	boxBehave();
	boxDraw();
};