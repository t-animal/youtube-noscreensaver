

window.addEventListener("webkitfullscreenchange", fullScreenHandler)

var isFullScreen = false;
function fullScreenHandler(){
	isFullScreen = !isFullScreen;
	sendPings();
}

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

function keepAlivePing(){
	chrome.runtime.sendMessage({requestPing: true});
}