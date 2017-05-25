

window.addEventListener("webkitfullscreenchange", fullScreenHandler)

/* Called when fullscreen is enabled or disabled, tracks fullscreen state*/
var isFullScreen = false;
function fullScreenHandler(){
	isFullScreen = !isFullScreen;
	sendPings();
}

/* Checks every 5 seconds if we are still in fullscreen mode and triggers a keepAlivePing */
var pingHandle = null;
function sendPings(){
	if(isFullScreen){
		console.log("Fullscreen entered. Requesting ping.")
		keepAlivePing();
		if(pingHandle == null){
			insertNotice();
		}
		pingHandle = window.setTimeout(sendPings, 5000);
	}else{
		window.clearTimeout(pingHandle);
		pingHandle = null;
		console.log("Fullscreen left. Stopping requesting of pings.")
	}
}

/* Inserts a short notice that XScreensaver will be disabled into the website. Fades in and fades out again
*/
function insertNotice(){
	var outerDiv = document.createElement("div");
	outerDiv.style.cssText = "position:fixed; bottom: 80px; width:100%; text-align:center; z-index:99999999999; display:block !important";

	var textElem = document.createElement("div");
	textElem.style.cssText = "display: inline-block; background: white; padding: 5px; border-radius: 3px;";
	textElem.style.cssText += "opacity: 0; transition: opacity 500ms;";
	textElem.innerText = "XScreensaver will be disabled while in full-screen.";

	outerDiv.appendChild(textElem);
	document.body.appendChild(outerDiv);

	window.setTimeout(function(){textElem.style["opacity"]="0.5";}, 0);
	window.setTimeout(function(){textElem.style["opacity"]="0";}, 2000);
	window.setTimeout(function(){document.body.removeChild(outerDiv);}, 2500);
}

/* Sends a message to the background-script in `message-relay.js`, which in turn sends a message to the native
   application, which simply calls `xscreensaver-command --deactivate`
*/
function keepAlivePing(){
	chrome.runtime.sendMessage({requestPing: true});
}