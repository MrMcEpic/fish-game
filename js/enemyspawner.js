function spawner() { // create enemies
	const picker = () => Math.random() >= 0.4999999 ? -1 : 1;
	let x,
		enemyImage,
		enemyImageSecondary,
		size = randRange(globalEnemyMinimumSize, globalEnemyMaximumSize, true),
		y = Math.abs(randRange(0, canvasHeight - size, false)),
		side = picker();
		speed = side * randRange(0.5, 4.0, false);
	if (side === 1) {
		x = canvasWidth + 60;
		enemyImage = enemyImageLeft;
		enemyImageSecondary = enemyImageLeftSecondary;
	} else {
		x = 0 - (globalEnemyMaximumSize+60);
		enemyImage = enemyImageRight;
		enemyImageSecondary = enemyImageRightSecondary;
	}
	if (enemies.length < limit) {
		enemies.push({
			size,//itll auto define speed = speed (speed: speed) because both have the same name
			x,
			y,
			speed,
			enemyImage,
			enemyImageSecondary
		});
	}
}

function queue() {
	return new Promise(resolve => {
		if (enemies.length < limit) {
			resolve();
		}
	});
}

async function spawnTime() {
	await queue();
	spawner();
}