//this function has to be executed before reproduction to check for neighbours
function checkNeighbours(x,y){
	//top left
	if (field[x-1][y-1].exists===true) {
		return true;
		//top
	} else if (field[x][y-1].exists===true) {
		return true;
		//top right
	}else if (field[x+1][y-1].exists===true) {
		return true;
		//right
	}else if (field[x+1][y].exists===true) {
		return true;
		//bottom right
	}else if (field[x+1][y+1].exists===true) {
		return true;
		//bottom
	}else if (field[x][y+1].exists===true) {
		return true;
		//bottom left
	}else if (field[x-1][y+1].exists===true) {
		return true;
		//left
	}else if (field[x-1][y].exists===true) {
		return true;
	} else {
		return false;
	}
}