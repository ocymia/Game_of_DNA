"use strict";
function load(){
	var parameters = location.search;
	var script = document.createElement("script");
	script.src = "js/customDNA.js";
	document.body.appendChild(script);
}

load();