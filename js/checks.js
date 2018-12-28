function checks() {
	if (!paint) {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		context.beginPath();
	}
	if (wtfMode) {
		context.fillStyle = "orangered";
		context.fillRect(player.y, player.x, player.size, player.size);
	}
}