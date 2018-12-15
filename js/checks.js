function checks() {
	if (!paint) {
		c.clearRect(0, 0, cWidth, cHeight);
	}
	if (wtfMode) {
		c.fillStyle = "orangered";
		c.fillRect(player.y, player.x, player.size, player.size);
	}
}