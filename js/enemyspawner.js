function spawner() { // create enemies
	let x,
		enemyImage,
		enemyImageSecondary,
		speed,
		size = randRange(globalEnemyMinimumSize, globalEnemyMaximumSize, true),
		y = Math.abs(randRange(0, canvasHeight - size, false)),
		side = Math.random(),
		zoom = randRange(0.5, 4.0, false);
	if (side >= 0.499999) {
		x = canvasWidth + 60;
		speed = zoom;
		enemyImage = enemyImageLeft;
		enemyImageSecondary = enemyImageLeftSecondary;
	} else {
		x = 0 - (300+60);
		speed = -zoom;
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

function spawnTime() {
	if (enemies.length < limit) {
		setTimeout(spawner, randRange(1000, 10000, false)); // temp?
	}
}