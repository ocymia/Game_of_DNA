/*jslint browser:true */
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
	context.fillStyle = getRandomColor();
	var x = Math.random()*width;
	var y = Math.random()*height;
	x -= x%pixelWidth;
	y -= y%pixelWidth;
	context.fillRect(x, y, pixelWidth, pixelWidth);
}

function getRandomColor(){
	return "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
}

init();