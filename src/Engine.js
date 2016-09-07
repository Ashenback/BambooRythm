import Timer from './Timer';

let stage;
let time;
let entities;
let timers;
let simulationSpeed;

const Engine = {
	init(theStage) {
		stage = theStage;
		time = Date.now();
		entities = [];
		timers = [];
		simulationSpeed = 1000.0;

		return this;
	},

	add(entity) {
		if (!entities.includes(entity)) {
			entities.push(entity);
			stage.addChild(entity);
		}
	},

	remove(entity) {
		if (entities.splice(entities.indexOf(entity), 1).length) {
			stage.removeChild(entity);
		}
	},

	getEntities() {
		return entities;
	},

	setSimulationSpeed(speed) {
		simulationSpeed = speed;
	},

	createTimer(func, interval) {
		const timer = new Timer(func, interval);
		timer.end = () => {
			timer.alive = false;
		};
		timers.push(timer);
		return timer;
	},

	update() {
		const now = Date.now();
		const deltaTime = now - time;
		const deltaScale = deltaTime / simulationSpeed;
		time = now;

		const delta = {
			deltaTime,
			deltaScale
		};

		entities.concat(timers).forEach(updatable => {
			if (updatable.update) {
				updatable.update(delta);
			}
		});

		entities
			.filter(entity => !entity.alive)
			.forEach(deadEntity => {
				this.remove(deadEntity);
			});

		timers = timers.filter(timer => !!timer.alive);
	}
};

export default () => Engine;
