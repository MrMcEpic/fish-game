async function end() {
	player.alive = false;
	context.textAlign = "center";
	context.font = "60px Roboto";
	context.strokeStyle = 'black';
	if (!winner) {
		context.fillStyle = "red";
		context.fillText("You Lose!", canvasWidth / 2, canvasHeight / 2);
		context.strokeText("You Lose!", canvasWidth / 2, canvasHeight / 2);
	} else {
		context.fillStyle = "green";
		context.fillText("You Win!", canvasWidth / 2, canvasHeight / 2);
		context.strokeText("You Win!", canvasWidth / 2, canvasHeight / 2);
	}
	context.font = "20px Roboto";
	context.fillText("Press R or touch to play again!", canvasWidth / 2, canvasHeight / 2 + 100);
	context.strokeText("Press R or touch to play again!", canvasWidth / 2, canvasHeight / 2 + 100);
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
	context.textAlign = "center";
	context.fillStyle = 'black';
	context.font = '40px Roboto';
	context.fillText('Press 1 or tap to start with normal difficulty', canvasWidth / 2, canvasHeight / 2);
	await starter;
}

function loadOrder() {
	if (!started) {
		waiter();
	} else {
		if (player.alive) {
			window.requestAnimationFrame(drawStuff);
			checks();
			boxFunc();
			playerFunc();
		} else {
			end();
		}
	}
}

function drawStuff() {
	loadOrder();
}