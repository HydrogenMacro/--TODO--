import RAPIER from "https://cdn.skypack.dev/@dimforge/rapier2d-compat";
import { Graphics, Ticker } from "/deps/pixi.mjs";
window.RAPIER = RAPIER;
await RAPIER.init();

export const world = new RAPIER.World({ x: 0.0, y: -9.81 });
const { vertices, colors } = world.debugRender();
export const debugRender = new Graphics();
Ticker.shared.add(() => {
	debugRender.clear();
	const { vertices, colors } = world.debugRender();
	console.log(vertices.length / 2, colors.length / 4);
	for (let i = 0; i < colors.length / 4; i++) {
		let p1x = vertices[i * 4];
		let p1y = vertices[i * 4 + 1];
		let p2x = vertices[i * 4 + 2];
		let p2y = vertices[i * 4 + 3];
		debugRender
			.moveTo(p1x, p1y)
			.lineTo(p2x, p2y)
			.stroke({
				width: 2,
				color: new Float32Array([
					colors[i * 4],
					colors[i * 4 + 1],
					colors[i * 4 + 2],
					colors[i * 4 + 3]
				]),
			});
	}
});
