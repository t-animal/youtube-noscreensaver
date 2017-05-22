chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
	chrome.runtime.sendNativeMessage("de.t_animal.ytnoscreensaver", message);
});