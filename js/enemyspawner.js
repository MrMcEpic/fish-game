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
			size,//itll auto define speed = speed (speed: speed) because both have the same name
			x,
			y,
			speed
		});
	}
}

function spawnTime() {
	if (blocks.length < limit) {
		setTimeout(spawner, randRange(1000, 10000, false)); // temp?
	}
}