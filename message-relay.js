/* this file merely acts as a relay for messages from the content script to the native application
   because they can't talk directly.*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
	chrome.runtime.sendNativeMessage("de.t_animal.ytnoscreensaver", message);
});