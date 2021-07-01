/**
 * Toggle the full width.
 * @param {boolean|null} force Force to turn full width on or off.
 */
function clickHandler(force) {
	const classes = document.body.classList;
	switch (force) {
		case true:
		case false:
			// .skin-vector-disable-max-width disables *forcing*
			// a maximum width
			classes.toggle('skin-vector-disable-max-width', force);
			break;
		default:
			classes.toggle('skin-vector-disable-max-width');
	}
}

function onloadListener() {
	const classes = document.body.classList;
	chrome.runtime.sendMessage(classes.contains('skin-vector') && !classes.contains('skin-vector-legacy'));
}

document.addEventListener('DOMContentLoaded', onloadListener);
// In case the DOM is already loaded
onloadListener();

chrome.runtime.onMessage.addListener(clickHandler);
