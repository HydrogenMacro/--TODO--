import Player from "../gameObjs/player.js";
import { Container, Ticker } from "/deps/pixi.mjs";

export class Level extends Container {
	player = new Player();
	playerSpawnpoint = [0, 0];
	constructor() {
		super();
		this.addChild(this.player);
	}
	update() {
		for (const child of this.children) {
			child.update();
			child.x += child.velocity[0];
			child.y += child.velocity[1];
			child.velocity[0] = child.acceleration[0];
			child.velocity[1] = child.acceleration[1];
			child.acceleration[1] = (5 - child.acceleration[1]) * .8;// gravity
			child.velocity[0] *= 0.99; // friction
			child.velocity[1] *= 0.99;
			child.updateDisplay();
		}
	}
	_setup() {
		this.player.x = this.playerSpawnpoint[0];
		this.player.y = this.playerSpawnpoint[1];
		this.setup();
	}
	setup() {}
}

export class LevelManager extends Container {
	ticker = new Ticker();
	constructor(levels) {
		super();
		this.levels = levels
		this.currentLevelIndex = 0;
		this.currentLevel = new this.levels[this.currentLevelIndex]();
		this.currentLevel._setup();
		this.player = this.currentLevel.player;
		this.addChild(this.currentLevel);
		this.ticker.add(() => {
			this.currentLevel.update();
		}, this);
		this.ticker.start()
	}
	nextLevel() {
		this.removeChild(this.currentLevel);
		this.currentLevelIndex += 1;
		this.currentLevel = new this.levels[this.currentLevelIndex]();
		this.player = this.currentLevel.player;
		this.currentLevel._setup();
		this.addChild(this.currentLevel);
	}
	toggleDebugMode() {}
}


