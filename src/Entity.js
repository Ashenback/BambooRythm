import { touches } from './collisionUtil';

export default class Entity extends PIXI.Container {
	alive = true;
	flags = [];

	constructor({ x, y }) {
		super();
		this.x = x;
		this.y = y;
	}

	addFlag(flag) {
		if (!this.hasFlag(flag)) {
			this.flags.push(flag);
		}
	}

	removeFlag(remove) {
		this.flags = this.flags.filter(flag => flag !== remove);
	}

	hasFlag(flag) {
		return this.flags.includes(flag);
	}

	// Dummy method, should be overridden by child
	update(delta) {}

	touches(other) {
		return touches(this.getBounds(), other.getBounds());
	}

	kill() {
		this.alive = false;
	}
}
