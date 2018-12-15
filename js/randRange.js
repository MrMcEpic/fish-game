function randRange(min, max, _floor) {
	if (_floor) {
		return Math.floor(Math.random() * (max - min) + min);
	} else {
		return Math.random() * (max - min) + min;
	}
}