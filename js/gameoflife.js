/*jslint browser:true */
"use strict";
var canvas, context, height, width, pixelWidth, field;

function init(){
	pixelWidth = 5;
	canvas = document.querySelector("canvas");
	height = document.body.clientHeight;
	width = document.body.clientWidth;
	canvas.height = height;
	canvas.width = width;
	field = new Array((width-width%pixelWidth)/pixelWidth);
	for (var i=0; i<field.length; i++){
		field[i]=new Array((height-height%pixelWidth)/pixelWidth);
	}
	for (var i=0; i<field.length; i++){
		for (var j=0; j<field[i].length; j++){
			field[i][j] = {
				color: getRandomColor(),
				shown: false
			};
		}
	}
	context = canvas.getContext("2d");
	setInterval(cycle, 1000);
}

function cycle(){
	console.time("cycle duration");
	
	// calculate the lifecycle
	for (var i=0; i<field.length; i++){
		for (var j=0; j<field[i].length; j++){
			field[i][j].shown = Math.random()>0.9;// replace with actual condition
		}
	}
	
	// draw the field
	for (var i=0; i<field.length; i++){
		for (var j=0; j<field[i].length; j++){
			if (field[i][j].shown){
				context.fillStyle = field[i][j].color;
			}else{
				context.fillStyle = "rgb(255,255,255)";
			}
			context.fillRect(i*pixelWidth, j*pixelWidth, pixelWidth, pixelWidth);
		}
	}
	
	console.timeEnd("cycle duration");
}

function getRandomColor(){
	return "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
}

init();