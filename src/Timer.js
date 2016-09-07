export default class Timer extends PIXI.Container {
	constructor(func, interval) {
		super();

		this.interval = interval;
		this.func = func;
		this.active = false;
		this.elapsedTime = 0;
		this.alive = true;
	}

	start() {
		this.active = true;
		return this;
	}

	pause() {
		this.active = false;
		return this;
	}

	toggle() {
		this.active = !this.active;
		return this;
	}

	update(delta) {
		if (this.active) {
			this.elapsedTime += delta.deltaTime;

			while (this.elapsedTime >= this.interval) {
				this.elapsedTime -= this.interval;
				this.func();
			}
		}
		return this;
	}
}
