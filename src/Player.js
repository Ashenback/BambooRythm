import config from './config';
import bindKey from './keyboardHandler';
import Entity from './Entity';
import getEngine from './Engine';
import { touches } from './collisionUtil';

export default class Player extends Entity {
	constructor({ x, y }) {
		super({ x, y });

		const width = (config.width / 4.0) - 2;

		this.hitAreaA = this.createHitArea(1, 0, width, 100, 0xFF00FF, 0xFF00BB);
		this.addChild(this.hitAreaA);
		this.hitAreaD = this.createHitArea(width + 3, 0, width, 100, 0xFF00FF, 0xFF00BB);
		this.addChild(this.hitAreaD);
		this.hitAreaJ = this.createHitArea((width * 2) + 5, 0, width, 100, 0xFF00FF, 0xFF00BB);
		this.addChild(this.hitAreaJ);
		this.hitAreaL = this.createHitArea((width * 3) + 7, 0, width, 100, 0xFF00FF, 0xFF00BB);
		this.addChild(this.hitAreaL);

		this.addFlag('player');

		bindKey(65).pressed = () => this.pulse(this.hitAreaA);
		bindKey(68).pressed = () => this.pulse(this.hitAreaD);
		bindKey(74).pressed = () => this.pulse(this.hitAreaJ);
		bindKey(76).pressed = () => this.pulse(this.hitAreaL);
	}

	createHitArea(x, y, width, height, lineColor, fillColor) {
		const hitArea = new PIXI.Graphics();
		hitArea.lineStyle(2, lineColor, 1);
		hitArea.beginFill(fillColor, 0.25);
		hitArea.drawRoundedRect(x, y, width, height, 15);
		hitArea.endFill();
		return hitArea;
	}

	pulse(hitArea) {
		getEngine().getEntities().forEach(sibling => {
			if (sibling instanceof Entity && sibling.hasFlag('note')) {
				if (touches(hitArea.getBounds(), sibling.getBounds())) {
					sibling.kill();
				}
			}
		});
	}
}
