import { bindKey } from './keyboardHandler';
import Entity from './Entity';

export default class Player extends Entity {
    static speed = 10.0;

    hitArea;

    constructor({x, y, width, height}) {
        super({x, y});

        this.hitArea = new PIXI.Graphics();
        this.hitArea.lineStyle(2, 0xFF00FF, 1);
        this.hitArea.beginFill(0xFF00BB, 0.25);
        this.hitArea.drawRoundedRect(0, 0, width, height, 15);
        this.hitArea.endFill();
        this.addChild(this.hitArea);
        this.addFlag('player');

        bindKey(32).pressed = () => {
            this.pulse();
        };
    }

    pulse() {
        this.parent.children.forEach(sibling => {
            if (sibling instanceof Entity && sibling.hasFlag('note')) {
                if (this.touches(sibling)) {
                    sibling.kill();
                }
            }
        });
    }
}