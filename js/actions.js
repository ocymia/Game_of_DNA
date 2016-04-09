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

}