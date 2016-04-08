"use strict";
var canvas, context, height, width, pixelWidth;

function init(){
	pixelWidth = 5;
	canvas = document.querySelector("canvas");
	height = document.body.clientHeight;
	width = document.body.clientWidth;
	canvas.height = height;
	canvas.width = width;
	context = canvas.getContext("2d");
	setInterval(cycle, 100);
}

function cycle(){
	context.fillStyle = "rgb(200, 0, 0)";
	var x = Math.random()*width;
	var y = Math.random()*height;
	x -= x%pixelWidth;
	y -= y%pixelWidth;
	context.fillRect(x, y, pixelWidth, pixelWidth);
}

init();