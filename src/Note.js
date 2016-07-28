import PIXI from 'pixi.js';

export default class Note extends PIXI.Container {
    constructor() {
        super();

        const sprite = PIXI.Sprite.fromImage('res/bunny.png');
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0;
        this.addChild(sprite);
    }

    update(delta) {
        this.position.y += 100.0 * delta.deltaScale;
    }
}