/*jslint browser:true */
"use strict";
var canvas, context, height, width, pixelWidth, field;
var currentCycleCounter=0;

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
		for (var j=0; j<field[i].length; j++){
			field[i][j] = {
				red: (j%2===0&&i%2===0)?255:0,
				green: 0,
				blue: 0,
				cycleCounter: 0
			};
		}
	}
	context = canvas.getContext("2d");
	canvas.addEventListener("mousemove", paint);
	document.getElementById("start").addEventListener("click", startCycle);
}

function paint(event){
	if (event.buttons === 1){// if the left mouse button is pressed
		field[(event.clientX-event.clientX%pixelWidth)/pixelWidth][(event.clientY-event.clientY%pixelWidth)/pixelWidth] = {
			red: 255,
			green: 0,
			blue: 0
		};
		context.fillStyle = "rgb(255,0,0)";
		context.fillRect(event.clientX-event.clientX%pixelWidth, event.clientY-event.clientY%pixelWidth, pixelWidth, pixelWidth);
	}
}

function startCycle(){
	canvas.removeEventListener("mousedown", paint);
	this.hidden = true;
	setInterval(cycle, 1000);
}

function cycle(){
	console.time("cycle duration");
	
	// calculate the lifecycle
	for (var i=0; i<field.length; i++){
		for (var j=0; j<field[i].length; j++){
			//JERRY IS DOING THIS
		}
	}
	
	// draw the field
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (var i=0; i<field.length; i++){
		for (var j=0; j<field[i].length; j++){
			context.fillStyle = "rgb("+field[i][j].red+","+field[i][j].green+","+field[i][j].blue+")";
			context.fillRect(i*pixelWidth, j*pixelWidth, pixelWidth, pixelWidth);
		}
	}
	
	currentCycleCounter++;

	console.timeEnd("cycle duration");
}

//function getRandomColor(){
//	return "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
//}

init();