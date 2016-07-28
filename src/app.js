import PIXI from 'pixi.js';
import * as Shader from './shader';
import Player from './Player';

PIXI.utils._saidHello = true;

const
    VIEW_WIDTH = 800,
    VIEW_HEIGHT = 600;

const renderer = PIXI.autoDetectRenderer(VIEW_WIDTH, VIEW_HEIGHT, { backgroundColor : 0x0 });

renderer.view.style = 'display: block; margin: auto;';

document.body.appendChild(renderer.view);

// create the root of the scene graph
const stage = new PIXI.Container();

const player = new Player();
player.position.x = (VIEW_WIDTH - player.width) / 2;
player.position.y = (VIEW_HEIGHT - player.height) / 2;

const uniforms = {
    time: {
        type: 'f',
        value: 0.5
    },
    range: {
        type: 'f',
        value: 0.04
    },
    center: {
        type: '2f',
        value: [1.755, 0.03]
    },
    maxDist: {
        type: 'f',
        value: 10.0
    },
    iter: {
        type: 'f',
        value: 255.0
    }
};
/*
 Create the burning ship fractal
 Whole ship        -w 1.7 -c 0.45 0.5
 First small ship  -w 0.04 -c 1.755 0.03
 Second small ship -w .04 -c 1.625 0.035
 Tiny ship in tail -w 0.005 -c 1.941 0.004
 Another small one -w 0.008 -c 1.861 0.005
*/

const bg = PIXI.Sprite.fromImage('res/pal.png');
bg.filters = [ new Shader.BurningShip(uniforms) ];
bg.width = VIEW_WIDTH;
bg.height = VIEW_HEIGHT;

stage.addChild(bg);
stage.addChild(player);

const animate = () => {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    //player.rotation += 0.1;

    uniforms.time.value += 0.01;

    uniforms.iter.value = 45.0 + Math.sin(uniforms.time.value * 5.0) * 10.0;

    // render the container
    renderer.render(stage);
};

animate();