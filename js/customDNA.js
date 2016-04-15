/*jslint browser:true */
//Custom playground
"use strict";
var canvas, context, height, width, pixelWidth, field, age;
var currentCycleCounter=0;
var tempX;
var tempY;
var aliveCounter;
var theInterval;

var showOff = 3;
/**PARAMETERS*/
//BOOL this makes children dna more random. strainGenetics act like min value, old value being the min
var randChildren =0;
//value added to main strain when child is created
var strainGeneticsPowerMajor = 25;
//value taken from secondary strains when child is created
var strainGeneticsPowerMinor = 185;
//once a cell becomes very strong it looses some of the weaker strains DNA value
//var residue defines how many % will stay from the weaker strains
var residue=12;
//var opCell defines when a Cell is considered over powered
//this will trigger over powered cells to be weakened - put it to 256 to disable
var opCell=20;
//these define the minimum and maximum mutation vaues a cell can have when not moving
var minMutate =151;
var maxMutate =200;
//maturityAge is the age a cell must have to become an active adult
var maturityAge=0;
//var mode allows several modes influencing the op cells
//mode 0 = no over powered cell handling
//mode 1 = weakening not so dominant strains in the over powered cell leaving $residue % behind
//mode 2 = setting dominant strain to residue
//mode 3 = setting dominant strain to residue and delaying it by $delayCell
//mode 4 = if a cell has values over $opCell in every strain, then modulo residue all of them
var mode =4;
//this is used for mode 3 to deayy op cells because they become slow
var delayCell = 50;
//This defines the mating zone in which cellls can reproduce
//The bigger the number -> the smaller the mating zone
var matingZone = 1;
//1 means no trail //0 = cells leave trail behind
var removeDead =0;

//if true = meltMode disable killing cells - effect makes RGB group with black border, but melts screen after some time
var meltMode = true;
if (meltMode){matingZone=500;}

switch (showOff){
	case 0:
		break;
	case 1:
		//custom
		var $_GET = $_GET();
		//TODO randChildren = $_GET['name'];
		randChildren = 0;
		strainGeneticsPowerMajor = $_GET['sMaj'];
		strainGeneticsPowerMinor = $_GET['sMin'];
		console.log("Strain Power: " +strainGeneticsPowerMinor+"-"+strainGeneticsPowerMajor);
		residue = $_GET['rVal'];
		console.log("resiue " +residue);
		opCell = $_GET['op'];
		console.log("opCell " +opCell);
		minMutate = $_GET['minM'];
		maxMutate = $_GET['maxM'];
		console.log("mutate " +minMutate+"/"+maxMutate);
		maturityAge = $_GET['mAge'];
		console.log("maturity age " +maturityAge);
		delayCell = $_GET['delay'];
		console.log("delayCell " +delayCell);
		removeDead = $_GET['trail'];
		console.log("removeDead " +removeDead);
		break;
	case 2:
		//all life gets a chance // very diversified setting
		randChildren =1;
		strainGeneticsPowerMajor=1;
		strainGeneticsPowerMinor=1;
		residue=12;
		opCell=100;
		minMutate=150;
		maxMutate=200;
		maturityAge=50;
		mode=4;
		delayCell=20;
		//matingZone=1;
		removeDead =0;
		break;
	case 3:
		//white wins
		randChildren =0;
		strainGeneticsPowerMajor=0;
		strainGeneticsPowerMinor=0;
		residue=0;
		opCell=250;
		minMutate=10;
		maxMutate=200;
		maturityAge=10;
		mode=0;
		delayCell=50;
		//matingZone=1;
		removeDead =0;
		break;
	case 4:
		//no trails
		randChildren =1;
		strainGeneticsPowerMajor=150;
		strainGeneticsPowerMinor=30;
		residue=120;
		opCell=50;
		minMutate=10;
		maxMutate=40;
		maturityAge=getRand(1,100);
		mode=4;
		delayCell=getRand(1,100);
		//matingZone=1;
		removeDead =1;
		break;
	default:
		break;
}

function init(){
	var parameters = location.search;
	pixelWidth = +parameters.substring(parameters.indexOf("pixsize=")+"pixsize=".length, parameters.indexOf("&", parameters.indexOf("pixsize=")));
	age = 1;
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
				red: 0,
				green: 0,
				blue: 0,
				cycleCounter: 0,
				exists: false
			};
		}
	}
	context = canvas.getContext("2d");
	var numberOfPoitsToGenerate = +parameters.substring(parameters.indexOf("rndpoints=")+"rndpoints=".length, parameters.indexOf("&"));
	generateRandomPoints(numberOfPoitsToGenerate);
	canvas.addEventListener("mousedown", paint);
	canvas.addEventListener("mousemove", paint);
	document.getElementById("start").addEventListener("click", startCycle);
}


function generateRandomPoints(numberOfPoints){
	numberOfPoints = Math.min(numberOfPoints, field.length*field[0].length);
	var i=1;
	while (i<=numberOfPoints/3){
		var randomX = Math.floor(Math.random()*field.length);
		var randomY = Math.floor(Math.random()*field[0].length);
		if (!field[randomX][randomY].exists){
			field[randomX][randomY].red = 255;
			field[randomX][randomY].exists = true;
			context.fillStyle = "rgb(255,0,0)";
			context.fillRect(randomX*pixelWidth, randomY*pixelWidth, pixelWidth, pixelWidth);
			i++;
		}
	}
	while (i<=2*numberOfPoints/3){
		 randomX = Math.floor(Math.random()*field.length);
		 randomY = Math.floor(Math.random()*field[0].length);
		if (!field[randomX][randomY].exists){
			field[randomX][randomY].green = 255;
			field[randomX][randomY].exists = true;
			context.fillStyle = "rgb(0,255,0)";
			context.fillRect(randomX*pixelWidth, randomY*pixelWidth, pixelWidth, pixelWidth);
			i++;
		}
	}
	while (i<=numberOfPoints){
		 randomX = Math.floor(Math.random()*field.length);
		 randomY = Math.floor(Math.random()*field[0].length);
		if (!field[randomX][randomY].exists){
			field[randomX][randomY].blue = 255;
			field[randomX][randomY].exists = true;
			context.fillStyle = "rgb(0,0,255)";
			context.fillRect(randomX*pixelWidth, randomY*pixelWidth, pixelWidth, pixelWidth);
			i++;
		}
	}
}

function paint(event){
	if (event.buttons === 1){// if the left mouse button is pressed
		var currentField = field[(event.clientX-event.clientX%pixelWidth)/pixelWidth][(event.clientY-event.clientY%pixelWidth)/pixelWidth];
		currentField.red = 255;
		currentField.green = 0;
		currentField.blue = 0;
		currentField.exists = true;
		context.fillStyle = "rgb(255,0,0)";
		context.fillRect(event.clientX-event.clientX%pixelWidth, event.clientY-event.clientY%pixelWidth, pixelWidth, pixelWidth);
	}
}

function startCycle(){
	this.hidden = true;
	theInterval=setInterval(cycle, 100);
}

function cycle(){
	//console.time("cycle duration");

	// calculate the lifecycle
	/*for (var i=0; i<field.length; i++){
	 for (var j=0; j<field[i].length; j++){
	 //JERRY IS DOING THIS
	 field[i][j].green+=10;
	 }
	 }*/

	updateTable();

	//clear field before next draw
	context.clearRect(0, 0, canvas.width, canvas.height);
	//reset alive counter
	aliveCounter=0;

	// draw the field
	for (var i=0; i<field.length; i++){
		for (var j=0; j<field[i].length; j++){
			//counting alive cells
			if (field[i][j].exists) {
				aliveCounter++;
				checkForPartnerCell(i,j);
				//killing cells that are nearly dead
				if (field[i][j].red<10 && field[i][j].green<10 && field[i][j].blue<10){
					field[i][j].red=0;
					field[i][j].green=0;
					field[i][j].blue=0;
					field[i][j].exists=false;
					//console.log("black cell killed");
				}
			}
			//if values are to low then kill it

			context.fillStyle = "rgb("+field[i][j].red+","+field[i][j].green+","+field[i][j].blue+")";
			context.fillRect(i*pixelWidth, j*pixelWidth, pixelWidth, pixelWidth);
		}
	}
	//stop if no cells alive
	if (aliveCounter===0){clearInterval(theInterval);console.log("All cells are dead. Turns:"+currentCycleCounter);}
	//console.log("turn:"+currentCycleCounter+" Cells alive:"+aliveCounter);
	currentCycleCounter++;
    //stop after 100 if meltMode is on is true
    if (currentCycleCounter>105 && meltMode==true){
        clearInterval(theInterval);
        alert("The Cells have become stable. No major exchanges will be made.");
    }

	//console.timeEnd("cycle duration");
}

//function getRandomColor(){
//	return "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
//}

init();

//duumping


/* moving all cells and checking for trample instances  */
function updateTable(){
	/* Check all table */
	//console.log("update table started");
	for (var x=0;x<field.length;x++){
		for (var y=0;y<field[0].length;y++) {
			tempX=x;
			tempY=y;
			//console.log("checking x"+x+" y "+y);
			// if current cell is alive (exists) AND counter is equal to current turn then move the cell
			if (field [x][y].exists===true && field[x][y].cycleCounter==currentCycleCounter) {
				//assure residue is at least 1
				if (residue==0){residue=1;}
				//WEAKEN OP CELLS
                if (field[x][y].red > opCell && field[x][y].green > opCell && field[x][y].blue > opCell) {
                    field[x][y].red = Math.floor(field[x][y].red % residue);
                    field[x][y].green = Math.floor(field[x][y].green % residue);
                    field[x][y].blue = Math.floor(field[x][y].blue % residue);
                }
				var thisR =    field[x][y].red;
				var thisG =    field[x][y].green;
				var thisB =    field[x][y].blue;


				//inc is the cycleCounterValue of the next iteration - to be used to set the cycleCounter for a moved cell in order to not move it again this turn
				var inc = currentCycleCounter+1;
				//determin direction in wich to move
				var d = randDirection();
				//console.log("cell x"+x+" y"+y);
				//depending on direction do the move accordingly
				switch (d){
					//down left
					case 1:
						//set target cell to current values and increment cycleCounter so it will not be targeted again this iteration
						if (updateCellsNewHome(x-1,y+1,thisR,thisG,thisB,inc)) {
							killCurrentCell (x,y);
						} else {
							//even if move can not be dne we need to increment the counter to keep cell movable next turn
							field[x][y].cycleCounter=inc;
						}
						break;
					//down
					case 2:
						if (updateCellsNewHome(x,y+1,thisR,thisG,thisB,inc)) {
							killCurrentCell (x,y);
						} else {
							field[x][y].cycleCounter=inc;
						}
						break;
					//down right
					case 3:
						if (updateCellsNewHome(x+1,y+1,thisR,thisG,thisB,inc)) {
							killCurrentCell (x,y);
						} else {
							field[x][y].cycleCounter=inc;
						}
						break;
					//left
					case 4:
						if (updateCellsNewHome(x-1,y,thisR,thisG,thisB,inc)) {
							killCurrentCell (x,y);
						} else {
							field[x][y].cycleCounter=inc;
						}
						break;
					//stay
					case 5:
						//this is still done to update and age cell
						mutate(x,y);
						field[x][y].cycleCounter=inc;
						//console.log("mutated");
						break;
					//right
					case 6:
						if (updateCellsNewHome(x+1,y,thisR,thisG,thisB,inc)) {
							killCurrentCell (x,y);
						} else {
							field[x][y].cycleCounter=inc;
						}
						break;
					//up left
					case 7:
						if (updateCellsNewHome(x-1,y-1,thisR,thisG,thisB,inc)) {
							killCurrentCell (x,y);
						} else {
							field[x][y].cycleCounter=inc;
						}
						break;
					//up
					case 8:
						if (updateCellsNewHome(x,y-1,thisR,thisG,thisB,inc)) {
							killCurrentCell (x,y);
						} else {
							field[x][y].cycleCounter=inc;
						}
						break;
					//up right
					case 9:
						if (updateCellsNewHome(x+1,y-1,thisR,thisG,thisB,inc)) {
							killCurrentCell (x,y);
						} else {
							field[x][y].cycleCounter=inc;
						}
						break;
					default:
						break;
				}
				//TODO Make this cell white

				//TODO Check if next cell is a free space (white)
				//IF FREE
				//TODO Update direction target with color
				//ELSE MERGE? MUTATE?
				//TODO MUTATE
			} //else this cell is empty

		}
	}
	//once everything is moved, reset all flags to zero
}


/*
 random 1 to 9 for directions
 789 LEFT  UP  RIGHT
 456 LEFT  --  RIGHT
 123 LEFT DOWN RIGHT
 */
function randDirection (){
	var randDir = Math.floor((Math.random() * 9)+1);
	return randDir;
}

//update cell that current cell moved to // also returns true if it moved
function updateCellsNewHome (targetX,targetY,thisR,thisG,thisB,inc){
	//TODO remove the if below when merged
	if (age===null){age=1;}
	//age simulated a cell aging. looses pigment
	//check if target is located in the visible field AND is not occupied by another cell
	if (notOutOfBoundsAndNotAlive(targetX,targetY,thisR,thisG,thisB,inc)){
		field[targetX][targetY].red=thisR-age;
		field[targetX][targetY].green=thisG-age;
		field[targetX][targetY].blue=thisB-age;
		field[targetX][targetY].cycleCounter=inc;
		field[targetX][targetY].exists=true;
		//console.log("moving to x"+targetX+" y"+targetY);
		return true;
	} else {
		//this never happens
		// /console.log("cant move");
		return false;
	}
}


//kill the object that was formerly occupied by a cell that just moved away
function killCurrentCell (targetX,targetY){
	//console.log("kill"+targetX+"/"+targetY);
    if(meltMode==false) {
        if (removeDead == 1) {
            field[targetX][targetY].red = 0;
            field[targetX][targetY].green = 0;
            field[targetX][targetY].blue = 0;
        }
        field[targetX][targetY].cycleCounter = null;
        field[targetX][targetY].exists = false;
    }
}

//check if target is out of the visible field
function notOutOfBoundsAndNotAlive (x,y,thisR,thisG,thisB,inc){
	//console.log("target is x"+x+"/"+field.length+" and y"+y+"/"+field[0].length);
	if (x<0 || y<0 || x>=field.length || y>=field[0].length){
		//target cell is out the bounds
		//console.log("out of bounds");
		return 0;
	} else {
		//target cell is in the bounds
		if (notAlive(x,y,thisR,thisG,thisB,inc)){
			return 1;
		}
		return 0;
	}
}

//checks if target is not alive
function notAlive (x,y,thisR,thisG,thisB,inc){
	if (!field[x][y].exists){
		//its true, target is not alive
		return true;
	}else{
		//its false target is alive
		//TODO MUTATE!!! -> set also the cycleCounter of the mutated cell to next because we dont want it to move this turn
		fusion (x,y,thisR,thisG,thisB,inc);
		//
		//console.log("target cell is alive - should mutate");
		return false;
	}
}

function fusion(x,y,thisR,thisG,thisB,inc){
	var lastR=thisR;
	var lastG=thisG;
	var lastB=thisB;
	var targetR=field[x][y].red;
	var targetG=field[x][y].green;
	var targetB=field[x][y].blue;
	var newR=lastR+targetR;
	var newG=lastG+targetG;
	var newB=lastB+targetB;
	if (newR>255){newR=255;}
	if (newG>255){newG=255;}
	if (newB>255){newB=255;}
	//set the fused cell
	field[x][y].red=newR;
	field[x][y].green=newG;
	field[x][y].blue=newB;
	field[x][y].exists=true;
	field[x][y].cycleCounter=inc;
	//kill old cell
	killCurrentCell(tempX,tempY);
}

function mutate(x,y){
	function randomIntFromInterval(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	//current values
	var cR =field[x][y].red;
	var cG =field[x][y].green;
	var cB =field[x][y].blue;
	var mutateValue = randomIntFromInterval(minMutate,maxMutate);
	if (cR >= cB && cR >= cG){
		// Red is strongest
		field[x][y].red = field[x][y].red - mutateValue;
		if (cB>=cG){
			//if blue is stronger then green then give to blue
			//second strongest gene wins over weakest
			field[x][y].blue = field[x][y].blue + mutateValue;
		} else {
			//green is second
			field[x][y].green = field[x][y].green + mutateValue;
		}
	} else if(cG >= cR && cG >= cB){
		// Green is strongest
		field[x][y].green = field[x][y].green - mutateValue;
		if (cB>=cG){
			//blue is second
			field[x][y].blue = field[x][y].blue + mutateValue;
		} else {
			//red is second
			field[x][y].red = field[x][y].red + mutateValue;
		}
	} else {
		// Blue ist strongest
		field[x][y].blue = field[x][y].blue - mutateValue;
		if (cR>=cG){
			//red is second
			field[x][y].red = field[x][y].red + mutateValue;
		} else {
			//green is second
			field[x][y].green = field[x][y].green + mutateValue;
		}

	}
}

function checkForPartnerCell (thisX,thisY){
	if (thisX < matingZone || thisY < matingZone || thisX >field.length-matingZone || thisY>field[0].length-matingZone){
		//cell is on some north or west border, its to cold to reproduce here ;)
	}else{
		//get these rgb (of the cell that will mate with partner cell
		var tR=field[thisX][thisY].red;
		var tG=field[thisX][thisY].green;
		var tB=field[thisX][thisY].blue;

		if(field[thisX-1][thisY].exists){
			//left has partner
			//get partner rgb
			var pR=field[thisX-1][thisY].red;
			var pG=field[thisX-1][thisY].green;
			var pB=field[thisX-1][thisY].blue;

			//define strongest score values
			var strongestRed,strongestGreen,strongestBlue;
			if (pR>=tR){strongestRed = pR;}else{strongestRed = tR;}
			if (pG>=tG){strongestGreen = pG;}else{strongestGreen = tG;}
			if (pB>=tB){strongestBlue = pB;}else{strongestBlue = tB;}
			//now the strongest of the three will be the main strain passed on to the child
			var mainStrain,strainColor,rest1,rest2;
			if (strongestRed>=strongestGreen&&strongestRed>=strongestBlue){
				mainStrain=strongestRed;
				strainColor="red";
				//determin others rest 1 and 2 are always the in order RGB - the strainColor
				rest1=strongestGreen;
				rest2=strongestBlue;
			} else if (strongestGreen>=strongestRed&&strongestGreen>=strongestBlue){
				mainStrain=strongestGreen;
				strainColor="green";
				rest1=strongestRed;
				rest2=strongestBlue;
			} else {
				mainStrain=strongestBlue;
				strainColor="blue";
				rest1=strongestRed;
				rest2=strongestGreen;
			}
			//creeate random direction
			var rX =Math.floor(Math.random()*2);
			var rY=Math.floor(Math.random()*2);
            var birthControl = Math.floor(Math.random()*10);
			if (rX==2){rX=thisX-1;}else if (rX==1){rX=thisX+1;}else{rX=thisX;} ;
			if (rY==2){rY=thisY-1;}else if (rY==1){rY=thisY+1;}else{rY=thisY;};
			//create child (target X & Y , strain color , strain value)
            if (rX<field.length-1 && rY<field[0].length-1 && rX>1 && rY>1) {
                createChild(rX, rY, strainColor, mainStrain, rest1, rest2);
            }
		}else if (field[thisX][thisY-1].exists){
			//partner top
			//get partner rgb
			pR=field[thisX][thisY-1].red;
			pG=field[thisX][thisY-1].green;
			pB=field[thisX][thisY-1].blue;

			//define strongest score values
			//strongestRed,strongestGreen,strongestBlue;
			if (pR>=tR){strongestRed = pR;}else{strongestRed = tR;}
			if (pG>=tG){strongestGreen = pG;}else{strongestGreen = tG;}
			if (pB>=tB){strongestBlue = pB;}else{strongestBlue = tB;}
			//now the strongest of the three will be the main strain passed on to the child
			//mainStrain,strainColor,rest1,rest2;
			if (strongestRed>=strongestGreen&&strongestRed>=strongestBlue){
				mainStrain=strongestRed;
				strainColor="red";
				//determin others rest 1 and 2 are always the in order RGB - the strainColor
				rest1=strongestGreen;
				rest2=strongestBlue;
			} else if (strongestGreen>=strongestRed&&strongestGreen>=strongestBlue){
				mainStrain=strongestGreen;
				strainColor="green";
				rest1=strongestRed;
				rest2=strongestBlue;
			} else {
				mainStrain=strongestBlue;
				strainColor="blue";
				rest1=strongestRed;
				rest2=strongestGreen;
			}
			//createChild(thisX-1,thisY-1,strainColor,mainStrain,rest1,rest2);
			//creeate random direction
            var rX =Math.floor(Math.random()*2);
            var rY=Math.floor(Math.random()*2);
			if (rX==2){
                rX=thisX-1;
            }else if (rX==1){
                rX=thisX+1;
            }else{rX=thisX;}
			if (rY==2){
                rY=thisY-1;
            }else if (rY==1){
                rY=thisY+1;
            }else{rY=thisY;}
            birthControl = Math.floor(Math.random()*10);
			//create child (target X & Y , strain color , strain value)
            if (rX<field.length-1 && rY<field[0].length-1 && rX>1 && rY>1) {
                createChild(rX, rY, strainColor, mainStrain, rest1, rest2);
            }
		}// else no partners left or top
	}
}

//r1 and r2 are the rest values that are not the strongest strain
function createChild (x,y,c,v,r1,r2){
	//strongest strain gets stronger on the expense of weaker ones
	if (randChildren ==0){
		switch (c){
			case "red":
				field[x][y].red=v+strainGeneticsPowerMajor;
				field[x][y].green=r1+strainGeneticsPowerMinor;
				field[x][y].blue=r2-strainGeneticsPowerMinor;
				field[x][y].exists=true;
				field[x][y].cycleCounter=currentCycleCounter+1+maturityAge;
				break;
			case "green":
				field[x][y].red=r1+strainGeneticsPowerMinor;
				field[x][y].green=v+strainGeneticsPowerMajor;
				field[x][y].blue=r2-strainGeneticsPowerMinor;
				field[x][y].exists=true;
				field[x][y].cycleCounter=currentCycleCounter+1+maturityAge;
				break;
			case "blue":
				field[x][y].red=r1+strainGeneticsPowerMinor;
				field[x][y].green=r2-strainGeneticsPowerMinor;
				field[x][y].blue=v+strainGeneticsPowerMajor;
				field[x][y].exists=true;
				field[x][y].cycleCounter=currentCycleCounter+1+maturityAge;
				break;
		}
	}else{
		switch (c){
			case "red":
				field[x][y].red=getRand(strainGeneticsPowerMajor,v);
				field[x][y].green=getRand(strainGeneticsPowerMinor,r1);
				field[x][y].blue=getRand(strainGeneticsPowerMinor,r2);
				field[x][y].exists=true;
				field[x][y].cycleCounter=currentCycleCounter+1+maturityAge;
				break;
			case "green":
				field[x][y].red=getRand(strainGeneticsPowerMinor,r1);
				field[x][y].green=getRand(strainGeneticsPowerMajor,v);
				field[x][y].blue=getRand(strainGeneticsPowerMinor,r2);
				field[x][y].exists=true;
				field[x][y].cycleCounter=currentCycleCounter+1+maturityAge;
				break;
			case "blue":
				field[x][y].red=getRand(strainGeneticsPowerMinor,r1);
				field[x][y].green=getRand(strainGeneticsPowerMinor,r2);
				field[x][y].blue=getRand(strainGeneticsPowerMajor,v);
				field[x][y].exists=true;
				field[x][y].cycleCounter=currentCycleCounter+1+maturityAge;
				break;
		}
	}
}

//gets 3 values that represent rgb in that order, returns stronest
//also performs special task if multiple cases apply
function determinStrongest(r,g,b){
	//check if multiple strains caused this to trigger and random choos one of the op strains to be dominant
	//rgb 1-3  // rg 1-2 // gb 2-3 // rb 3-4
	if (r==g==b){
		return getRandomStrain(1,3);
	} else if (r==g) {
		return getRandomStrain(1,2);
	} else if (g==b) {
		return getRandomStrain(2,3);
	} else if (r==b) {
		return getRandomStrain(3,4);
	} else if (r>g && r>b){
		return "red";
	}else if (g>r && g>b){
		return "green";
	}else if (b>r && b>g){
		return "blue";
	}else{
		alert("this should not happen "+r+","+g+","+b);
		return "blue";
	}
}

function getRandomStrain(min, max) {
	var rStrain = Math.floor(Math.random() * (max - min) + min);
	switch(rStrain){
		//rgb 1-3  // rg 1-2 // gb 2-3 // rb 3-4
		case 1:
			return "red";
			break;
		case 2:
			return "green";
			break;
		case 3:
			return "blue";
			break;
		//
		case 4:
			return "red";
			break;
	}
}
function getRand(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

//function to parse url for GET variables (used for custom settings)
function $_GET(customParam) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( customParam ) {
		return vars[customParam] ? vars[customParam] : null;
	}
	return vars;
}