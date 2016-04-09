

/* moving all cells and checking for trample instances  */
function updateCanvas(tableX,tableY){
    /* Check all table */
    for (x=0;x<tableX;x++){
        for (y=0;y<tableY;y++) {


                // if
                if (typeof(variable) != "undefined" && field [x][y]!=null && field[x][y].cycleCounter==currentCycleCounter) {
                    //there is a cell alive here and it has not moved
                    red =   Field[x][y].red;
                    green = Field[x][y].green;
                    blue =  Field[x][y].blue;
                    inc = cycleCounter+1;
                    d = randDirection();
                    switch (d){
                        //up left
                        case 1:
                            Field[x-1][y-1].red=red;
                            Field[x-1][y-1].green=green;
                            Field[x-1][y-1].blue=blue;
                            Field[x-1][y-1].cycleCounter=inc;
                            killCurrentCell (x,y);
                            break;
                        //up
                        case 2:
                            Field[x-1][y-1].red=red;
                            Field[x-1][y-1].green=green;
                            Field[x-1][y-1].blue=blue;
                            Field[x-1][y-1].cycleCounter=inc;
                            killCurrentCell (x,y);
                            break;
                        //up rigth
                        case 3:
                            Field[x-1][y-1].red=red;
                            Field[x-1][y-1].green=green;
                            Field[x-1][y-1].blue=blue;
                            Field[x-1][y-1].cycleCounter=inc;
                            killCurrentCell (x,y);
                            break;
                        case 4:
                            Field[x-1][y-1].red=red;
                            Field[x-1][y-1].green=green;
                            Field[x-1][y-1].blue=blue;
                            Field[x-1][y-1].cycleCounter=inc;
                            killCurrentCell (x,y);
                            break;
                        case 5:
                            Field[x-1][y-1].red=red;
                            Field[x-1][y-1].green=green;
                            Field[x-1][y-1].blue=blue;
                            Field[x-1][y-1].cycleCounter=inc;
                            killCurrentCell (x,y);
                            break;
                        case 6:
                            Field[x-1][y-1].red=red;
                            Field[x-1][y-1].green=green;
                            Field[x-1][y-1].blue=blue;
                            Field[x-1][y-1].cycleCounter=inc;
                            killCurrentCell (x,y);
                            break;
                        case 7:
                            Field[x-1][y-1].red=red;
                            Field[x-1][y-1].green=green;
                            Field[x-1][y-1].blue=blue;
                            Field[x-1][y-1].cycleCounter=inc;
                            killCurrentCell (x,y);
                            break;
                        case 8:
                            Field[x-1][y-1].red=red;
                            Field[x-1][y-1].green=green;
                            Field[x-1][y-1].blue=blue;
                            Field[x-1][y-1].cycleCounter=inc;
                            killCurrentCell (x,y);
                            break;
                        case 9:
                            Field[x-1][y-1].red=red;
                            Field[x-1][y-1].green=green;
                            Field[x-1][y-1].blue=blue;
                            Field[x-1][y-1].cycleCounter=inc;
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
                } //else cell does not exist

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


//TODO KILL cell
function killCurrentCell (x,y){
    Field[x][y].red=null;
    Field[x][y].green=null;
    Field[x][y].blue=null;
    Field[x][y].cycleCounter=null;
}