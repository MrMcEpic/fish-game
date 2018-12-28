async function end() {
	player.alive = false;
	c.textAlign = "center";
	c.font = "60px Roboto";
	if (!winner) {
		c.fillStyle = "red";
		c.fillText("You Lose!", cWidth / 2, cHeight / 2);
		c.strokeText("You Lose!", cWidth / 2, cHeight / 2);
	} else {
		c.fillStyle = "green";
		c.fillText("You Win!", cWidth / 2, cHeight / 2);
		c.strokeText("You Win!", cWidth / 2, cHeight / 2);
	}
	c.font = "20px Roboto";
	c.fillText("Press R or touch to play again!", cWidth / 2, cHeight / 2 + 100);
	c.strokeText("Press R or touch to play again!", cWidth / 2, cHeight / 2 + 100);
	await restarter;
}

function starter() {
	return new Promise(resolve => {
		if (started) {
			resolve();
		}
	});
}

function restarter() {
	return new Promise(resolve => {
		if (player.alive) {
			resolve();
		}
	});
}

async function waiter() {
	window.requestAnimationFrame(drawStuff);
	checks();
	c.textAlign = "center";
	c.fillStyle = 'black';
	c.font = '40px Roboto';
	c.fillText('Press 1 or tap to start with normal difficulty', cWidth / 2, cHeight / 2);
	await starter;
}

function loadOrder() {
	if (!started) {
		waiter();
	} else {
		if (player.alive) {
			window.requestAnimationFrame(drawStuff);
			checks();
			spawnTime();
			boxBehave();
			boxDraw();
			playerFunc();
		} else {
			end();
		}
	}
}

function drawStuff() {
	loadOrder();
}