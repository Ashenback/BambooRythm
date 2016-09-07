const bindKey = (keyCode) => {
	const key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = false;
	key.pressed = () => {};
	key.released = () => {};

	key.handleDown = event => {
		if (event.keyCode === key.code) {
			if (key.isUp) {
				key.pressed();
			}
			key.isDown = true;
			key.isUp = false;
			event.preventDefault();
		}
	};

	key.handleUp = event => {
		if (event.keyCode === key.code) {
			if (key.isDown) {
				key.released();
			}
			key.isDown = false;
			key.isUp = true;
			event.preventDefault();
		}
	};

	key.bind = kc => (key.code = kc);

	window.addEventListener(
		'keydown',
		key.handleDown,
		false
	);

	window.addEventListener(
		'keyup',
		key.handleUp,
		false
	);

	return key;
};

export default bindKey;
