/**
 * Handler for page action click.
 * @param {chrome.tabs.Tab} tab The tab the page action was clicked in.
 */
function onPageActionClick(tab) {
	console.log('click', arguments);
	chrome.tabs.sendMessage(tab.id, null);
}

/**
 * Perform the default action on a page, that is, make it full width
 *  if the user requested it in the settings.
 * @param {number} tabId The tab ID to perform default action on.
 */
async function defaultAction(tabId) {
	const settings = await browser.storage.sync.get({
		defaultOn: false
	});
	chrome.tabs.sendMessage(tabId, settings.defaultOn);
}

/**
 * Listener for messages coming from the content script.
 * @param {boolean} msg Whether the page uses new Vector.
 * @param {chrome.runtime.MessageSender} sender The sender.
 */
function msgListener(msg, sender) {
	if (msg) {
		chrome.pageAction.show(sender.tab.id);
		defaultAction(sender.tab.id);
	} else {
		chrome.pageAction.hide(sender.tab.id);
	}
}

chrome.pageAction.onClicked.addListener(onPageActionClick);
chrome.runtime.onMessage.addListener(msgListener);