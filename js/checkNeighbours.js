function checkNeighbours(x,y){
	if (field[x-1][y-1].exists===true) {
		return true;
	} else if (field[x][y-1].exists===true) {
		return true;
	}else if (field[x+1][y-1].exists===true) {
		return true;
	}else if (field[x+1][y].exists===true) {
		return true;
	}else if (field[x+1][y+1].exists===true) {
		return true;
	}else if (field[x][y+1].exists===true) {
		return true;
	}else if (field[x-1][y+1].exists===true) {
		return true;
	}else if (field[x-1][y].exists===true) {
		return true;
	} else {
		return false;
	}
}