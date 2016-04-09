

/* moving all cells and checking for trample instances  */
function updateTable(tableX,tableY){
    /* Check all table */
    for (var x=0;x<field.length;x++){
        for (var y=0;y<field[0].length;y++) {
                // if current alive (exists) AND counter is equivalent to current turn then move the cell
                if (field [x][y].exists===true && field[x][y].cycleCounter==currentCycleCounter) {
                    //temp store values
                    var thisR =    field[x][y].red;
                    var thisG =    field[x][y].green;
                    var thisB =    field[x][y].blue;
                    //inc is the cycleCounterValue of the next iteration - to be used to set the cycleCounter for a moved cell in order to not move it again this turn
                    var inc = cycleCounter+1;
                    //determin direction in wich to move
                    var d = randDirection();
                    //depending on direction do the move accordingly
                    switch (d){
                        //down left
                        case 1:
                            //set target cell to current values and increment cycleCounter so it will not be targeted again this iteration
                            if (updateCellsNewHome(x-1,y+1,thisR,thisG,thisB,inc)) {
                                killCurrentCell (x,y);
                            }
                            break;
                        //down
                        case 2:
                            if (updateCellsNewHome(x,y+1,thisR,thisG,thisB,inc)) {
                                killCurrentCell (x,y);
                            }
                            break;
                        //down right
                        case 3:
                            if (updateCellsNewHome(x+1,y+1,thisR,thisG,thisB,inc)) {
                                killCurrentCell (x,y);
                            }
                            break;
                        //left
                        case 4:
                            if (updateCellsNewHome(x-1,y,thisR,thisG,thisB,inc)) {
                                killCurrentCell (x,y);
                            }
                            break;
                        //stay
                        case 5:
                            //this is still done to update and age cell
                            if (updateCellsNewHome(x,y,thisR,thisG,thisB,inc)) {
                                killCurrentCell (x,y);
                            }
                            break;
                        //right
                        case 6:
                            if (updateCellsNewHome(x+1,y,thisR,thisG,thisB,inc)) {
                                killCurrentCell (x,y);
                            }
                            break;
                        //up left
                        case 7:
                            if (updateCellsNewHome(x-1,y-1,thisR,thisG,thisB,inc)) {
                                killCurrentCell (x,y);
                            }
                            break;
                        //up
                        case 8:
                            if (updateCellsNewHome(x,y-1,thisR,thisG,thisB,inc)) {
                                killCurrentCell (x,y);
                            }
                            break;
                        //up right
                        case 9:
                            if (updateCellsNewHome(x+1,y-1,thisR,thisG,thisB,inc)) {
                                killCurrentCell (x,y);
                            }
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
    var d = Math.floor((Math.random() * 9)+1);
    return d;
}

//update cell that current cell moved to // also returns true if it moved
function updateCellsNewHome (targetX,targetY,thisR,thisG,thisB,inc){
    //TODO remove the if below when merged
    if (age===null){age=1;}
    //age simulated a cell aging. looses pigment

    //check if target is located in the visible field AND is not occupied by another cell
    if (notOutOfBounds(targetX,targetY)&&notAlive(targetX,targetY)){
        field[targetX][targetY].red=thisR-age;
        field[targetX][targetY].green=thisG-age;
        field[targetX][targetY].blue=thisB-age;
        field[targetX][targetY].cycleCounter=inc;
        return true;
    } else {
        return false;
    }
}


//kill the object that was formerly occupied by a cell that just moved away
function killCurrentCell (targetX,targetY){
    field[targetX][targetY].red=0;
    field[targetX][targetY].green=0;
    field[targetX][targetY].blue=0;
    field[targetX][targetY].cycleCounter=null;
    field[targetX][targetY].exists=false;
}

//check if target is out of the visible field
function notOutOfBounds (x,y){
    if (x<0 || y<0 || x>field.length || y>field[0].length){
        //target cell is out the bounds
        return 0;
    } else {
        //target cell is in the bounds
        return 1;
    }
}

//checks if target is not alive
function notAlive (x,y){
    if (field[x][y].exists){
        //its true, target is not alive
        return true;
    }else{
        //its false target is alive
        //TODO MUTATE!!! -> set also the cycleCounter of the mutated cell to next because we dont want it to move this turn
        //
        return false;
    }
}