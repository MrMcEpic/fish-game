function writer() {
	let _size = `Size: ${Math.floor(player.size)}`;
	c.textAlign = "left";
	c.fillStyle = "Black";
	c.font = "30px Roboto";
	c.fillText(_size, 10, 40);
	c.fillText(`Sprint: ${Math.floor(sprintbar)}`, 10, 70);
}

function lose() {
	c.fillStyle = "red";
	c.textAlign = "center";
	c.font = "60px Roboto";
	c.fillText("You Lose!", cWidth / 2, cHeight / 2);
	c.strokeText("You Lose!", cWidth / 2, cHeight / 2);
	c.font = "20px Roboto";
	c.fillText("Press R to play again!", cWidth / 2, cHeight / 2 + 100);
	c.strokeText("Press R to play again!", cWidth / 2, cHeight / 2 + 100);
}

const loadOrder = () => {
	if (player.alive) {
		window.requestAnimationFrame(drawStuff);
		checks();
		pDraw();
		mark();
		spawnTime();
		boxBehave();
		boxDraw();
		sprintLogic();
		pMover();
		writer();
	} else {
		lose();
	}
};

function drawStuff() {
	loadOrder();
}

