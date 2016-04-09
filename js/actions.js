//this function has to be executed before reproduction to check for neighbours
function checkNeighbours(x,y){
	//top left
	if (field[x-1][y-1].exists) {
		return 7;
		//top
	} else if (field[x][y-1].exists) {
		return 8;
		//top right
	}else if (field[x+1][y-1].exists) {
		return 9;
		//right
	}else if (field[x+1][y].exists) {
		return 6;
		//bottom right
	}else if (field[x+1][y+1].exists) {
		return 3;
		//bottom
	}else if (field[x][y+1].exists) {
		return 2;
		//bottom left
	}else if (field[x-1][y+1].exists) {
		return 1;
		//left
	}else if (field[x-1][y].exists) {
		return 4;
	} else {
		return false;
	}
}

function procreate(x,y){
	
}

function mutate(x,y){
	function randomIntFromInterval(min,max) {
    	return Math.floor(Math.random()*(max-min+1)+min);
	}

	field[x][y].red = field[x][y].red + randomIntFromInterval(1,10)-5;
	field[x][y].green = field[x][y].green + randomIntFromInterval(1,10)-5;
	field[x][y].blue = field[x][y].blue + randomIntFromInterval(1,10)-5;
}