import { Application, Sprite, Assets } from "/deps/pixi.mjs";
import "/console.js";
import "/assets.js";
import LevelManager from "./levels/levelManager.js";

const app = new Application();
await app.init({
	canvas: document.getElementById("game"),
	resizeTo: document.body,
	antialias: true,
	resolution: devicePixelRatio,
	autoDensity: true,
});

await new Promise(res => {
	const cb = () => {
		res();
		document.body.removeEventListener("click", cb)
	};
	document.body.addEventListener("click", cb);
});

const levelManager = new LevelManager();
app.stage.addChild(levelManager);