let eimgR = new Image();
eimgR.src = './sprites/efishR.png';

let eimgL = new Image();
eimgL.src = './sprites/efishL.png';

let eimgRS = new Image();
eimgRS.src = './sprites/efishRY.png';

let eimgLS = new Image();
eimgLS.src = './sprites/efishLY.png';

const despawn = (i, arr) => {//deletes enemy object from list of enemies and returns list length back
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
		if (box.y + box.size * 0.40 >= player.y && box.y + box.size * 0.23 <= player.y + player.size * 0.667) { //hit detection 
			if (box.x + box.size * 0.90 >= player.x && box.x <= player.x + player.size) {
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
		if (box.size < player.size) {
			if (boxMarker) {
				c.drawImage(box.eimgS, 0, 0, 108, 72, box.x, box.y, box.size, box.size * 0.667);
			} else {
				c.drawImage(box.eimg, 0, 0, 108, 72, box.x, box.y, box.size, box.size * 0.667);
			}
		} else {
			c.drawImage(box.eimg, 0, 0, 108, 72, box.x, box.y, box.size, box.size * 0.667);
		}
	}
};