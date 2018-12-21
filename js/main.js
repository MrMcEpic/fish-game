function end() {
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
	c.fillText("Press R to play again!", cWidth / 2, cHeight / 2 + 100);
	c.strokeText("Press R to play again!", cWidth / 2, cHeight / 2 + 100);
}

const loadOrder = () => {
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
};

function drawStuff() {
	loadOrder();
}

