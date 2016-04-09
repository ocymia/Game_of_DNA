

/* moving all cells and checking for trample instances  */
function updateTable(tableX,tableY){
    /* Check all table */
    for (x=0;x<tableX;x++){
        for (y=0;y<tableY;y++) {
                // if current alive (exists) AND counter is equivalent to current turn then move the cell
                if (field [x][y].exists==true && field[x][y].cycleCounter==currentCycleCounter) {
                    //temp store values
                    thisR =    field[x][y].red;
                    thisG =    field[x][y].green;
                    thisB =    field[x][y].blue;
                    //inc is the cycleCounterValue of the next iteration - to be used to set the cycleCounter for a moved cell in order to not move it again this turn
                    inc = cycleCounter+1;
                    //determin direction in wich to move
                    d = randDirection();
                    //depending on direction do the move accordingly
                    switch (d){
                        //down left
                        case 1:
                            //set target cell to current values and increment cycleCounter so it will not be targeted again this iteration
                            updateCellsNewHome(x-1,y+1,thisR,thisG,thisB,inc);
                            killCurrentCell (x,y);
                            break;
                        //down
                        case 2:
                            updateCellsNewHome(x,y+1,thisR,thisG,thisB,inc);
                            killCurrentCell (x,y);
                            break;
                        //down right
                        case 3:
                            updateCellsNewHome(x+1,y+1,thisR,thisG,thisB,inc);
                            killCurrentCell (x,y);
                            break;
                        //left
                        case 4:
                            updateCellsNewHome(x-1,y,thisR,thisG,thisB,inc);
                            killCurrentCell (x,y);
                            break;
                        //stay
                        case 5:
                            //this is still done to update and age cell
                            updateCellsNewHome(x,y,thisR,thisG,thisB,inc);
                            //no kill cell in this case cuz it did not move
                            break;
                        //right
                        case 6:
                            updateCellsNewHome(x+1,y,thisR,thisG,thisB,inc);
                            killCurrentCell (x,y);
                            break;
                        //up left
                        case 7:
                            updateCellsNewHome(x-1,y-1,thisR,thisG,thisB,inc);
                            killCurrentCell (x,y);
                            break;
                        //up
                        case 8:
                            updateCellsNewHome(x,y-1,thisR,thisG,thisB,inc);
                            killCurrentCell (x,y);
                            break;
                        //up right
                        case 9:
                            updateCellsNewHome(x+1,y-1,thisR,thisG,thisB,inc);
                            killCurrentCell (x,y);
                            break;
                        default:
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
    d = Math.floor((Math.random() * 9)+1);
    return d;
}

function checkTurn (x,y) {
    //TODO DEFINE IF CELL
    //set turn value of cell[x,y] to next turn
    if (field[x][y][4] == thisTurn) {
        //cell has not moved, so set its turn to next (so it wont be moved again)
        field[x][y][4]++;
        return 1
    } else {
        //cell has already moved so return 0 and if wont be executed
        return 0;
    }
}

//update cell that current cell moved to
function updateCellsNewHome (targetX,targetY,thisR,thisG,thisB,inc){
    //TODO remove the if below when merged
    if (age==null){age=1;}
    //age simulated a cell aging. looses pigment

    //check if target is out of bounds
    field[targetX][targetY].red=thisR-age;
    field[targetX][targetY].green=thisG-age;
    field[targetX][targetY].blue=thisB-age;
    field[targetX][targetY].cycleCounter=inc;
}


//kill the object that was formerly occupied by a cell that just moved away
function killCurrentCell (targetX,targetY){
    field[targetX][targetY].red=0;
    field[targetX][targetY].green=0;
    field[targetX][targetY].blue=0;
    field[targetX][targetY].cycleCounter=null;
    field[targetX][targetY].exists=false;
}

function outOfBounds (x,y){
    if (x<0 || y<0 || x>field.length || y>field[0].length){
        //target cell is out the bounds
        return 0;
    } else {
        //target cell is in the bounds
        return 1;
    }
}