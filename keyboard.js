const keydownTimestamps = new Map() // String (ev.code) => timestamp
document.body.addEventListener("keydown", e => {
	if (e.repeat) return;
	keydownTimestamps.set(e.code, Date.now());
});
document.body.addEventListener("keyup", (e) => {
	keydownTimestamps.delete(e.code);
});

function isKeyDown(keyCode) {
	return keydownTimestamps.has(keyCode);
}

/**
 * 
 * @param  {...String} keyCodes 
 * @returns String | null
 */
function lastPressed(...keyCodes) {
	let possibleFirstKeyCode = null;
	let possibleFirstKeyCodeTimestamp = -Infinity;
	for (const keyCode of keyCodes) {
		if (!isKeyDown(keyCode)) continue;
		let timestamp = keydownTimestamps.get(keyCode);
		if (timestamp > possibleFirstKeyCodeTimestamp) {
			possibleFirstKeyCode = keyCode;
			possibleFirstKeyCodeTimestamp = timestamp;
		}
	}
	return possibleFirstKeyCode;
}
const Keyboard = {
	isKeyDown,
	lastPressed
};
export default Keyboard;