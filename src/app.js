import config from './config';
import getEngine from './Engine';
import Player from './Player';
import Note from './Note';
import bindKey from './keyboardHandler';

PIXI.utils._saidHello = true;

const renderer = PIXI.autoDetectRenderer(config.width, config.height, { backgroundColor: 0x0 });

renderer.view.style = 'display: block; margin: auto;';

document.body.appendChild(renderer.view);

// create the root of the scene graph
const stage = new PIXI.Container();
const engine = getEngine().init(stage);

const bg = PIXI.Sprite.fromImage('res/pal.png');
bg.width = config.width;
bg.height = config.height;
stage.addChild(bg);

const player = new Player({
	x: 0,
	y: config.height * 0.75
});

engine.add(player);

const noteSpawner = engine.createTimer(() => {
	const note = new Note({
		x: Math.random() * config.width,
		y: 0
	});
	engine.add(note);
}, 1000);

noteSpawner.start();

bindKey(13).pressed = () => {
	noteSpawner.toggle();
};

const animate = () => {
	requestAnimationFrame(animate);

	engine.update();

	renderer.render(stage);
};

animate();
