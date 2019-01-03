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
		let enemy = enemies[i]; // short hand
		enemy.x = enemy.x - enemy.speed;
		if (enemy.x > canvasWidth + 60 || enemy.x + enemy.size < 0 - (globalEnemyMaximumSize+60)) {
			l = despawn(i, enemies);
			continue;
		}
		if (enemy.speed > 0) {
			if (enemy.y + enemy.size * hitBoxOffSetYLow >= player.y + player.size * hitBoxOffSetYHigh &&
				enemy.y + enemy.size * hitBoxOffSetYHigh <= player.y + player.size * hitBoxOffSetYLow) { //hit detection 
				if (enemy.x + enemy.size * hitBoxOffSetXLow >= player.x + player.size * hitBoxOffSetXHigh &&
					enemy.x <= player.x + player.size * hitBoxOffSetXLow) {
					l = playerHit(enemy, i, enemies);
					continue;
				}
			}
		} else {
			if (enemy.y + enemy.size * hitBoxOffSetYLow >= player.y + player.size * hitBoxOffSetYHigh &&
				enemy.y + enemy.size * hitBoxOffSetYHigh <= player.y + player.size * hitBoxOffSetYLow) { //hit detection 
				if (enemy.x + enemy.size * hitBoxOffSetXLow + enemy.size / 100 * 13 >= player.x + player.size * hitBoxOffSetXHigh &&
					enemy.x + enemy.size / 100 * 13 <= player.x + player.size * hitBoxOffSetXLow) {
					l = playerHit(enemy, i, enemies);
					continue;
				}
			}
		}
		enemies[i] = enemy;
	}
}

function boxDraw () { //this solves blinking bug
	for (let enemy of enemies) {
		if (enemy.size < player.size) {
			if (boxMarker) {
				context.drawImage(enemy.enemyImageSecondary, 0, 0, 108, 72, enemy.x, enemy.y, enemy.size, enemy.size * fishDrawOffSet);
			} else {
				context.drawImage(enemy.enemyImage, 0, 0, 108, 72, enemy.x, enemy.y, enemy.size, enemy.size * fishDrawOffSet);
			}
		} else {
			context.drawImage(enemy.enemyImage, 0, 0, 108, 72, enemy.x, enemy.y, enemy.size, enemy.size * fishDrawOffSet);
		}
		// if (enemy.speed > 0) {
		// 	context.fillRect(enemy.x, enemy.y + enemy.size * hitBoxOffSetYHigh, 10, 10);
		// 	context.fillRect(enemy.x, enemy.y + enemy.size * hitBoxOffSetYLow, 10, 10);
		// 	context.fillRect(enemy.x + enemy.size * hitBoxOffSetXLow, enemy.y + enemy.size * hitBoxOffSetYHigh, 10, 10);
		// 	context.fillRect(enemy.x + enemy.size * hitBoxOffSetXLow, enemy.y + enemy.size * hitBoxOffSetYLow, 10, 10);
		// } else {
		// 	context.fillRect(enemy.x+(enemy.size/100 *13), enemy.y + enemy.size * hitBoxOffSetYHigh, 10, 10);
		// 	context.fillRect(enemy.x+(enemy.size/100 *13), enemy.y + enemy.size * hitBoxOffSetYLow, 10, 10);
		// 	context.fillRect(enemy.x+(enemy.size/100 *13) + enemy.size * hitBoxOffSetXLow, enemy.y + enemy.size * hitBoxOffSetYHigh, 10, 10);
		// 	context.fillRect(enemy.x+(enemy.size/100 *13) + enemy.size * hitBoxOffSetXLow, enemy.y + enemy.size * hitBoxOffSetYLow, 10, 10);
		// }
	}
}

const boxFunc = () => {
	spawnTime();
	boxBehave();
	boxDraw();
};