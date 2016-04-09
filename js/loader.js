"use strict";
function load(){
	var parameters = location.search;
	var scriptNr = parameters.substring(parameters.indexOf("selscript=")+"selscript=".length);
	var script = document.createElement("script");
	script.src = "js/gameoflifePlayMe"+scriptNr+".js";
	document.body.appendChild(script);
}
load();