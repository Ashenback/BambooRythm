import PIXI from 'pixi.js';
import config from './config';
import Entity from './Entity';
import Note from './Note';
import Player from './Player';

PIXI.utils._saidHello = true;

const renderer = PIXI.autoDetectRenderer(config.width, config.height, { backgroundColor : 0x0 });

renderer.view.style = 'display: block; margin: auto;';

document.body.appendChild(renderer.view);

// create the root of the scene graph
const stage = new PIXI.Container();

const bg = PIXI.Sprite.fromImage('res/pal.png');
bg.width = config.width;
bg.height = config.height;

const player = new Player({
    x: 0,
    y: config.height * 0.75,
    width: config.width,
    height: 100
});

stage.addChild(bg);
stage.addChild(player);
let time = Date.now();
let timeElapsed = 0;

setInterval(() => {
    const note = new Note({
        x: config.width / 2.0 + Math.random() * config.width / 2.0 - config.width / 4.0,
        y: 0
    });
    stage.addChild(note);
}, 1000);

const animate = () => {
    requestAnimationFrame(animate);

    const now = Date.now();
    const deltaTime = now - time;
    time = now;
    timeElapsed += deltaTime;

    const delta = {
        deltaTime,
        deltaScale: deltaTime / 1000.0
    };

    const deadNotes = [];

    if (timeElapsed >= 1000) {
        timeElapsed -= 1000;
    }

    stage.children.forEach(child => {
        if (child instanceof Entity) {
            child.update(delta);

            if (!child.alive) {
                stage.removeChild(child);
            }
        }
    });

    renderer.render(stage);
};

animate();