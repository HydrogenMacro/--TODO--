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
			child._update();
		}
	}
	normalizeObjects() {
		for (const child of this.children) {
			if (!child.isEntity) return;
			child.x += this.velocity[0];
			child.y += this.velocity[1];
			child.velocity[0] += this.acceleration[0] + this.gravity[0];
			child.velocity[1] += this.acceleration[1] + this.gravity[1];
			child.acceleration[0] /= 2;
			child.acceleration[1] /= 2;
			child.velocity[0] *= 0.7;
			child.velocity[1] *= 0.7;
			for (const child2 of this.children) {
				if (child === child2) continue;
				
			}
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


