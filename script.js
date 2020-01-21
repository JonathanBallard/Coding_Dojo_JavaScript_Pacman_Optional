



//list of features to build
//DONE 1) have JS display world of bricks coin 
//DONE 2) make pacman move up/down/left/right
//DONE 3) increase score upon coin eating
//DONE 4) pacman cant move out of bounds
//DONE 5) display score on screen
//DONE 6) insert ghosts
//DONE 7) dynamic world generation -- see version 2.0
//DONE 8) insert cherries
//DONE 9) change pacman to look the way he's moving
//DONE 10) when pacman hits a ghost he loses a life
//DONE 11) when pacman loses his lives game over screen appears
//DONE 12) ghosts move randomly
//DONE 13) fix pacman rotation
//14) Iterate on dynamic world generation
//15) add in more fruit to appear after cherries eaten
//16) iterate on AI
//DONE 17) Win the game

// 0 is empty
// 1 is coin 
// 2 is brick
// 3 is cherry
// 4 is BOMB
// 5 is ghost 2
// 6 is ghost 3
// 7 is ghost 4

var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,0,1,1,1,1,0,1,1,1,1,1,2],
    [2,0,0,1,1,1,1,1,1,0,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,0,1,1,1,2],
    [2,1,1,1,0,1,1,1,1,4,1,1,1,2],
    [2,1,1,1,1,1,0,1,1,1,1,1,1,2],
    [2,1,1,1,0,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,0,1,1,1,1,1,2],
    [2,1,1,0,1,1,1,1,1,1,0,0,1,2],
    [2,1,1,0,1,1,1,1,1,1,1,1,1,2],
    [2,1,0,1,1,1,1,1,1,1,1,1,2,2],
    [2,1,1,1,1,0,1,1,1,0,1,1,1,2],
    [2,1,1,1,0,1,1,1,1,0,1,1,1,2],
    [2,1,1,1,1,1,1,0,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,1,1,1,0,2],
    [2,1,1,1,1,0,0,1,1,1,1,1,1,2],
    [2,1,1,1,1,1,1,1,1,0,1,1,0,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var pacman = {
    x: 20,
    y: 20,
    score: 0,
    rotation: 0,
    lives: 3
};

var ghost1 = {
    x: 120,
    y: 160,
    lives: 3
};

var ghost2 = {
    x: 60,
    y: 260,
    lives: 3
};
var ghost3 = {
    x: 160,
    y: 60,
    lives: 3
};
var ghost4 = {
    x: 240,
    y: 280,
    lives: 3
};

var maxScore = 0;

function displayWorld(){
    var content = "";
    for(var i = 0; i < world.length; i++){
        content += "\n<div class='row'>\n";
        for(var ii = 0; ii < world[i].length; ii++){
            //console.log('i = ' + i + ' ii = ' + ii);
            if(world[i][ii] == 2){
                content += "<div class=\"brick\"></div>";
            }
            else if(world[i][ii] == 1){
                content += "<div class=\"coin\"></div>";
            }
            else if(world[i][ii] == 0){
                content += "<div class=\"empty\"></div>";
            }
            else if(world[i][ii] == 3){
                content += "<div class=\"cherry\"></div>";
            }
            else if(world[i][ii] == 4){
                content += "<div id=\"bomb\"></div>";
            }
            else if(world[i][ii] == 5){
                content += "<div id=\"brick\"></div>";
            }
        }
        content += "\n</div>";
    }
    //console.log(content);
    document.getElementById('world').innerHTML = content;
}

function displayPacman(){
    document.getElementById('pacman').style.left = pacman.x + "px";
    document.getElementById('pacman').style.top = pacman.y + "px";
    
}

function displayScore(){
    document.getElementById('score').innerHTML = "<h1>Score: " + pacman.score + "</h1>";
    document.getElementById('lives').innerHTML = "<h1>Lives: " + pacman.lives + "</h1>";
}

function rotatePacman(deg){
    document.getElementById('pacman').style.transform = 'rotate(' + deg + 'deg)';
}

function displayGhosts(){
    document.getElementById('ghost1').style.left = ghost1.x + 'px';
    document.getElementById('ghost1').style.top = ghost1.y + 'px';

    document.getElementById('ghost2').style.left = ghost2.x + 'px';
    document.getElementById('ghost2').style.top = ghost2.y + 'px';

    document.getElementById('ghost3').style.left = ghost3.x + 'px';
    document.getElementById('ghost3').style.top = ghost3.y + 'px';

    document.getElementById('ghost4').style.left = ghost4.x + 'px';
    document.getElementById('ghost4').style.top = ghost4.y + 'px';

    if(ghost1.x == pacman.x && ghost1.y == pacman.y){
        pacman.lives--;
        displayScore();
    }
    if(ghost2.x == pacman.x && ghost2.y == pacman.y){
        pacman.lives--;
        displayScore();
    }
    if(ghost3.x == pacman.x && ghost3.y == pacman.y){
        pacman.lives--;
        displayScore();
    }
    if(ghost4.x == pacman.x && ghost4.y == pacman.y){
        pacman.lives--;
        displayScore();
    }
}

function moveGhosts(){
    var xOrY = Math.floor(Math.random() * (10 - 0) + 0);
    var upOrDown = Math.floor(Math.random() * (10 - 0) + 0);
    var leftOrRight = Math.floor(Math.random() * (10 - 0) + 0);
    if(xOrY >= 5){
        console.log(xOrY);
        if(upOrDown <= 0 && world[(ghost1.y - 20) / 20][(ghost1.x / 20)] != 2){
            ghost1.y -= 20;
        }
        else if(upOrDown >= 5 && world[(ghost1.y + 20) / 20][(ghost1.x / 20)] != 2){
            ghost1.y += 20;
        }
        else if(world[(ghost1.y) / 20][(ghost1.x - 20) / 20] != 2){
            ghost1.x -= 20;
        }
        else if(world[(ghost1.y) / 20][(ghost1.x  + 20) / 20] != 2){
            ghost1.x += 20;
        }
        else {
            xOrY = 0;
        }
    }
    if(xOrY <= 0){
        console.log(xOrY);
        if(upOrDown == 1 && world[(ghost1.y) / 20][(ghost1.x - 20) / 20] != 2){
            ghost1.x -= 20;
        }
        else if(upOrDown == 1 && world[(ghost1.y) / 20][(ghost1.x  + 20) / 20] != 2){
            ghost1.x += 20;
        }
    }

    xOrY = Math.floor(Math.random() * (10 - 0) + 0);
    upOrDown = Math.floor(Math.random() * (10 - 0) + 0);
    leftOrRight = Math.floor(Math.random() * (10 - 0) + 0);
    if(xOrY >= 5){
        console.log(xOrY);
        if(upOrDown <= 0 && world[(ghost2.y - 20) / 20][(ghost2.x / 20)] != 2){
            ghost2.y -= 20;
        }
        else if(upOrDown >= 5 && world[(ghost2.y + 20) / 20][(ghost2.x / 20)] != 2){
            ghost2.y += 20;
        }
        else if(world[(ghost2.y) / 20][(ghost2.x - 20) / 20] != 2){
            ghost2.x -= 20;
        }
        else if(world[(ghost2.y) / 20][(ghost2.x  + 20) / 20] != 2){
            ghost2.x += 20;
        }
        else {
            xOrY = 0;
        }
    }
    else if(xOrY < 5){
        console.log(xOrY);
        if(upOrDown == 1 && world[(ghost2.y) / 20][(ghost2.x - 20) / 20] != 2){
            ghost2.x -= 20;
        }
        else if(upOrDown == 1 && world[(ghost2.y) / 20][(ghost2.x  + 20) / 20] != 2){
            ghost2.x += 20;
        }
    }

    xOrY = Math.floor(Math.random() * (10 - 0) + 0);
    upOrDown = Math.floor(Math.random() * (10 - 0) + 0);
    leftOrRight = Math.floor(Math.random() * (10 - 0) + 0);
    if(xOrY >= 5){
        console.log(xOrY);
        if(upOrDown <= 0 && world[(ghost3.y - 20) / 20][(ghost3.x / 20)] != 2){
            ghost3.y -= 20;
        }
        else if(upOrDown >= 5 && world[(ghost3.y + 20) / 20][(ghost3.x / 20)] != 2){
            ghost3.y += 20;
        }
        else if(world[(ghost3.y) / 20][(ghost3.x - 20) / 20] != 2){
            ghost3.x -= 20;
        }
        else if(world[(ghost3.y) / 20][(ghost3.x  + 20) / 20] != 2){
            ghost3.x += 20;
        }
        else {
            xOrY = 0;
        }
    }
    if(xOrY <= 0){
        console.log(xOrY);
        if(upOrDown == 1 && world[(ghost3.y) / 20][(ghost3.x - 20) / 20] != 2){
            ghost3.x -= 20;
        }
        else if(upOrDown == 1 && world[(ghost3.y) / 20][(ghost3.x  + 20) / 20] != 2){
            ghost3.x += 20;
        }
    }

    xOrY = Math.floor(Math.random() * (10 - 0) + 0);
    upOrDown = Math.floor(Math.random() * (10 - 0) + 0);
    leftOrRight = Math.floor(Math.random() * (10 - 0) + 0);
    if(xOrY >= 5){
        console.log(xOrY);
        if(upOrDown <= 0 && world[(ghost4.y - 20) / 20][(ghost4.x / 20)] != 2){
            ghost4.y -= 20;
        }
        else if(upOrDown >= 5 && world[(ghost4.y + 20) / 20][(ghost4.x / 20)] != 2){
            ghost4.y += 20;
        }
        else if(world[(ghost4.y) / 20][(ghost4.x - 20) / 20] != 2){
            ghost4.x -= 20;
        }
        else if(world[(ghost4.y) / 20][(ghost4.x  + 20) / 20] != 2){
            ghost4.x += 20;
        }
        else {
            xOrY = 0;
        }
    }
    if(xOrY <= 0){
        console.log(xOrY);
        if(upOrDown == 1 && world[(ghost4.y) / 20][(ghost4.x - 20) / 20] != 2){
            ghost4.x -= 20;
        }
        else if(upOrDown == 1 && world[(ghost4.y) / 20][(ghost4.x  + 20) / 20] != 2){
            ghost4.x += 20;
        }
    }



    displayGhosts();

}

function generateWorld(){
    var maxBombs = 3;
    var currentBombs = 0;
    var maxWalls = 25;
    var currentWalls = 0;
    var maxCherries = 2;
    var currentCherries = 0;
    for(var i = 0; i < world.length; i++){
        for(var j = 0; j < world[i].length; j++){
            if(world[i][j] != 2){
                
                var random = Math.floor(Math.random() * (6-0) + 0);
                if(random == 4 && currentBombs >= maxBombs){
                    random = Math.floor(Math.random() * (3-0) + 0);
                }
                else if(random == 4){
                    currentBombs++;
                }
                if(random == 2 && currentWalls >= maxWalls){
                    random = 1;
                }
                else if(random == 2) {
                    currentWalls++;
                }                
                if(random == 3 && currentCherries >= maxCherries){
                    random = 1;
                }
                else if (random == 3) {
                    currentCherries++;
                    maxScore += 50;
                }
                console.log(random);
                world[i][j] = random;
                if(world[i][j] == 1){
                    maxScore += 10;
                }

            }
        }
    }

    world[1][1] = 0;
    world[2][1] = 0;
    world[1][2] = 0;
    world[2][2] = 0;
    world[2][3] = 0;
    world[3][2] = 0;
    world[3][3] = 0;
}

generateWorld();

displayGhosts();
displayWorld();
displayPacman();
displayScore();

document.onkeydown = function(e){

    
        //console.log(e.keyCode);
        if(e.keyCode == 38 && world[(pacman.y - 20) / 20 ][(pacman.x / 20)] != 2){ //up
            pacman.y -= 20;

            // console.log(pacman.rotation);
            // rotatePacman(90 - pacman.rotation);
            // console.log('up:',90 - pacman.rotation);
            // pacman.rotation = 90;
            document.getElementById('pacman').style.background = "url('images/pacman-up.gif') no-repeat 50% 50%";
            document.getElementById('pacman').style.backgroundSize = "cover";
            document.getElementById('pacman').style.width ="20px";
            document.getElementById('pacman').style.height ="20px";

            moveGhosts();
            displayPacman();
        };
        if(e.keyCode == 40 && world[(pacman.y + 20) / 20][(pacman.x / 20)] != 2){ //down
            pacman.y += 20;
            // // console.log(pacman.rotation);
            // rotatePacman(270 - pacman.rotation);
            // console.log('down:',270 - pacman.rotation);
            // pacman.rotation = 270;
            document.getElementById('pacman').style.background = "url('images/pacman-down.gif') no-repeat 50% 50%";
            document.getElementById('pacman').style.backgroundSize = "cover";
            document.getElementById('pacman').style.width ="20px";
            document.getElementById('pacman').style.height ="20px";

            moveGhosts();
            displayPacman();
        };


        if(e.keyCode == 37 && world[(pacman.y / 20)][(pacman.x -20) / 20] != 2){ //left
            pacman.x -= 20;
            // // console.log(pacman.rotation);
            // rotatePacman(180 - pacman.rotation);
            // console.log('left:',180 - pacman.rotation);
            // pacman.rotation = 180;
            document.getElementById('pacman').style.background = "url('images/pacman-left.gif') no-repeat 50% 50%";
            document.getElementById('pacman').style.backgroundSize = "cover";
            document.getElementById('pacman').style.width ="20px";
            document.getElementById('pacman').style.height ="20px";

            moveGhosts();
            displayPacman();
        };

        if(e.keyCode == 39 && world[(pacman.y / 20)][(pacman.x + 20) / 20] != 2){ //right
            pacman.x += 20;
            // console.log(pacman.rotation);
            // rotatePacman(360 - pacman.rotation);
            // console.log('right:',360 - pacman.rotation);
            // pacman.rotation = 360;
            document.getElementById('pacman').style.background = "url('images/pacman.gif') no-repeat 50% 50%";
            document.getElementById('pacman').style.backgroundSize = "cover";
            document.getElementById('pacman').style.width ="20px";
            document.getElementById('pacman').style.height ="20px";

            moveGhosts();
            displayPacman();
        };
        


    if(world[pacman.y / 20][pacman.x / 20] == 1){ //coin
        pacman.score += 10;
        world[pacman.y / 20][pacman.x / 20] = 0;
        displayWorld();
        displayScore();
    }
    else if(world[pacman.y / 20][pacman.x / 20] == 3){
        pacman.score += 50;
        world[pacman.y / 20][pacman.x / 20] = 0;
        displayWorld();
        displayScore();
    }
    else if(world[pacman.y / 20][pacman.x / 20] == 4){
        pacman.lives--;
        world[pacman.y / 20][pacman.x / 20] = 0;
        displayWorld();
        displayScore();
    }

if(pacman.score >= maxScore){
    alert('You Win! Total Score was: ' + pacman.score);
    generateWorld();
    location.reload();
}



    displayGhosts();
    displayPacman();


    if(pacman.lives <= 0){
        alert('Game Over, final score was: ' + pacman.score);
        pacman.score = 0;
        pacman.lives = 3;
        generateWorld();
        location.reload();
        generateWorld();
    }
    
    
    
    
}




















