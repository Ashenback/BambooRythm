import Entity from './Entity';

export default class Player extends Entity {
    constructor() {
        super();

        const sprite = PIXI.Sprite.fromImage('res/bunny.png');
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        this.addChild(sprite);
    }
}