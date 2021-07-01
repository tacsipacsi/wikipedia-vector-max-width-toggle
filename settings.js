/**
 * Get the DOM element of an input with the given name.
 * @param {string} name The input to get.
 * @return {HTMLInputElement}
 */
function getInput(name) {
	return document.querySelector(`input[name="${name}"]`);
}

function saveSettings() {
	browser.storage.sync.set({
		defaultOn: getInput('default-on').checked
	});
}

async function loadSettings() {
	const settings = await browser.storage.sync.get({
		defaultOn: false
	});
	getInput('default-on').checked = settings.defaultOn;
}

function initHandlers() {
	const inputs = document.querySelectorAll('input');
	for (let i = 0; i < inputs.length; ++i) {
		inputs[i].addEventListener('change', saveSettings);
	}
}

function initI18n() {
	const elems = document.querySelectorAll('[data-i18n]');
	for (let i = 0; i < elems.length; ++i) {
		elems[i].textContent = browser.i18n.getMessage(elems[i].dataset.i18n);
	}
}

function init() {
	loadSettings();
	initHandlers();
	initI18n();
}

document.addEventListener('DOMContentLoaded', init);