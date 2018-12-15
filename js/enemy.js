const despawn = (i, arr) => {
	arr.splice(i, 1);
	return arr.length;
};

function boxBehave() {
	let i,
		l = blocks.length; //speeds code, doesn't have to constantly check length of blocks
	for (i = 0; i < l; i++) { //don't use in because length changes
		let box = blocks[i]; // short hand
		box.x = box.x - box.speed;
		if (box.x > cWidth + 80 || box.x + box.size < 0 - 160) {
			l = despawn(i, blocks);
			continue;
		}
		if (box.y + box.size >= player.y && box.y <= player.y + player.size) { //hit detection 
			if (box.x + box.size >= player.x && box.x <= player.x + player.size) {
				l = pHit(box, i, blocks);
				continue;
			}
		}
		blocks[i] = box;
	}
}

const boxDraw = () => { //this solves blinking bug
	let i;
	for (i in blocks) {
		let box = blocks[i];
		c.fillStyle = "red";
		c.fillRect(box.x, box.y, box.size, box.size); //this part updates/draws boxes
	}
};