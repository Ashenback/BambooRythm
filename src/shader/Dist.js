import PIXI from 'pixi.js';
import fragSrc from '../../res/shader/Dist.frag';

function Dist(uniforms) {
    PIXI.AbstractFilter.call(this,
        null,
        fragSrc,
        uniforms
    );
}

Dist.prototype = Object.create(PIXI.AbstractFilter.prototype);
Dist.prototype.constructor = Dist;

export default Dist;