import PIXI from 'pixi.js';
import fragSrc from '../../res/shader/BurningShip.frag';

function BurningShip(uniforms) {
    PIXI.AbstractFilter.call(this,
        null,
        fragSrc,
        uniforms
    );
}

BurningShip.prototype = Object.create(PIXI.AbstractFilter.prototype);
BurningShip.prototype.constructor = BurningShip;

export default BurningShip;