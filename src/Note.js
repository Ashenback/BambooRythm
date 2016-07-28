import PIXI from 'pixi.js';
import config from './config';
import Entity from './Entity';

export default class Note extends Entity {
    constructor(props) {
        super(props);

        const sprite = PIXI.Sprite.fromImage('res/bunny.png');
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0;
        this.addChild(sprite);
        this.addFlag('note');
    }

    update(delta) {
        super.update(delta);

        this.y += 100.0 * delta.deltaScale;

        if (this.y > config.height) {
            this.kill();
        }
    }
}