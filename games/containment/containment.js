// game start
var startGame;

// music
var player;

// radius constant
var rad;

// initial positions of prisonners
var xPosP1;

var yPosP1;

var xPosP2;

var yPosP2;

var xPosP3;

var yPosP3;

var xPosP4;

var yPosP4;

// initial floor and ceiling of movement values
var upper;

var lower;

// initial diameter values
var diameterP1;

var diameterP2;

var diameterP3;

var diameterP4;

// prisonners caught
var prisonnersCaught;

// frames+seconds
var frames;

var seconds;

// gameover booleans
var gameover;

var Cgameover;

var Mgameover;

var Ygameover;

var Kgameover;

// center detection
var inSafeZone;

// font
var munro;

function preload() {
    munro = loadFont("data/munro.ttf");
    soundFormats('mp3');
    player = loadSound("data/audio.mp3");
}

function initializeFields() {
    startGame = false;
    rad = 5;
    xPosP1 = (random(250, 300));
    yPosP1 = (random(250, 300));
    xPosP2 = (random(275, 325));
    yPosP2 = (random(275, 325));
    xPosP3 = (random(285, 315));
    yPosP3 = (random(285, 315));
    xPosP4 = (random(295, 320));
    yPosP4 = (random(295, 320));
    upper = 6.2;
    lower = -6.2;
    diameterP1 = 7.5;
    diameterP2 = 8.5;
    diameterP3 = 6.5;
    diameterP4 = 7;
    prisonnersCaught = 0;
    frames = 0;
    seconds = 0;
    gameover = false;
    Cgameover = false;
    Mgameover = false;
    Ygameover = false;
    Kgameover = false;
    inSafeZone = false;
}

function setup() {
    createCanvas(600, 600);
    initializeFields();
    ellipseMode(CENTER);
    rectMode(CORNER);
    noLoop();
}

function draw() {
    // draw background, bounds and cursor light
    background(127);
    fill(31);
    strokeWeight(5);
    rect(50, 50, 500, 500);
    fill(127);
    strokeWeight(2.5);
    rect(190, 190, 225, 225);
    fill(255, 0, 0, 127);
    noStroke();
    ellipse(mouseX, mouseY, rad * 3.5, rad * 3.5);
    stroke(0.5);
    // draw foiled escape counter
    fill(255);
    textFont(munro, 32);
    text("FOILED ESCAPES: " + prisonnersCaught, 50, 30);
    // count frames and convert to seconds
    frames += 1;
    if (frames == 60 && gameover == false) {
        frames = 0;
        seconds += 1;
    }
    // draw elapsed time counter
    fill(255);
    text("ELAPSED TIME: " + seconds, 300, 30);
    // make sure that prisonners cannot be caught when in the safe zone
    if (mouseX <= 190 || mouseX >= 410 || mouseY <= 190 || mouseY >= 410) {
        inSafeZone = true;
    } else {
        inSafeZone = false;
    }
    // draw prisonner 1 and move
    fill(0, 255, 255);
    strokeWeight(1.5);
    ellipse(xPosP1, yPosP1, rad * diameterP1, rad * diameterP1);
    xPosP1 += (random(lower, upper));
    yPosP1 -= (random(lower, upper));
    xPosP1 -= (random(lower + 3, upper - 4));
    yPosP1 += (random(lower + 2.5, upper - 2));
    // if prisonnersCaught = 3, draw prisonner 2 and move
    if (prisonnersCaught >= 5) {
        fill(255, 0, 255);
        strokeWeight(1.5);
        ellipse(xPosP2, yPosP2, rad * diameterP2, rad * diameterP2);
        xPosP2 += (random(lower, upper));
        yPosP2 -= (random(lower, upper));
        xPosP2 -= (random(lower + 3, upper - 2));
        yPosP2 += (random(lower + 1.5, upper - 2.5));
    }
    // if prisonnersCaught = 10, draw prisonner 3 and move
    if (prisonnersCaught >= 15) {
        fill(255, 255, 0);
        strokeWeight(1.5);
        ellipse(xPosP3, yPosP3, rad * diameterP3, rad * diameterP3);
        xPosP3 += (random(lower, upper));
        yPosP3 -= (random(lower, upper));
        xPosP3 -= (random(lower + 1, upper - 0.5));
        yPosP3 += (random(lower + 0.5, upper - 0.5));
    }
    // if prisonnersCaught = 18, draw prisonner 4 and move
    if (prisonnersCaught >= 25) {
        fill(0);
        strokeWeight(1.5);
        ellipse(xPosP4, yPosP4, rad * diameterP4, rad * diameterP4);
        xPosP4 += (random(lower, upper));
        yPosP4 -= (random(lower, upper));
        xPosP4 -= (random(lower + 3, upper - 4));
        yPosP4 += (random(lower + 2.5, upper - 2));
    }
    // detect exit of bounds from prisonners
    if (xPosP1 >= 560 || xPosP1 <= 40 || yPosP1 >= 560 || yPosP1 <= 40) {
        gameover = true;
        Cgameover = true;
    }
    if (xPosP2 >= 560 || xPosP2 <= 40 || yPosP2 >= 560 || yPosP2 <= 40) {
        gameover = true;
        Mgameover = true;
    }
    if (xPosP3 >= 560 || xPosP3 <= 40 || yPosP3 >= 560 || yPosP3 <= 40) {
        gameover = true;
        Ygameover = true;
    }
    if (xPosP4 >= 560 || xPosP4 <= 40 || yPosP4 >= 560 || yPosP4 <= 40) {
        gameover = true;
        Kgameover = true;
    }
    // detection of mouse hover over prisonner
    if (dist(mouseX, mouseY, xPosP1, yPosP1) < rad * 6 && inSafeZone == true) {
        xPosP1 = (random(290, 310));
        yPosP1 = (random(290, 310));
        prisonnersCaught += 1;
        upper += 0.5;
        lower += 0.5;
        diameterP1 = (random(6.5, 7.5));
    }
    if (dist(mouseX, mouseY, xPosP2, yPosP2) < rad * 6 && inSafeZone == true) {
        xPosP2 = (random(290, 310));
        yPosP2 = (random(290, 310));
        prisonnersCaught += 1;
        upper += 0.6;
        lower += 0.6;
        diameterP2 = (random(8.5, 9.5));
    }
    if (dist(mouseX, mouseY, xPosP3, yPosP3) < rad * 6 && inSafeZone == true) {
        xPosP3 = (random(290, 310));
        yPosP3 = (random(290, 310));
        prisonnersCaught += 1;
        upper += 0.8;
        lower += 0.8;
        diameterP3 = (random(5.5, 6.5));
    }
    if (dist(mouseX, mouseY, xPosP4, yPosP4) < rad * 6 && inSafeZone == true) {
        xPosP4 = (random(290, 310));
        yPosP4 = (random(290, 310));
        prisonnersCaught += 1;
        upper += 0.9;
        lower += 0.9;
        diameterP4 = (random(7, 8));
    }
    // game over message denoting which prisonner has escaped
    if (Cgameover == true) {
        textFont(munro, 24);
        fill(47);
        rect(0, 0, 600, 600);
        fill(255);
        text("PRISONNER C HAS ESCAPED! GAME OVER.", 125, 350);
        noLoop();
    }
    if (Mgameover == true) {
        textFont(munro, 24);
        fill(47);
        rect(0, 0, 600, 600);
        fill(255);
        text("PRISONNER M HAS ESCAPED! GAME OVER.", 125, 350);
        noLoop();
    }
    if (Ygameover == true) {
        textFont(munro, 24);
        fill(47);
        rect(0, 0, 600, 600);
        fill(255);
        text("PRISONNER Y HAS ESCAPED! GAME OVER.", 125, 350);
        noLoop();
    }
    if (Kgameover == true) {
        textFont(munro, 24);
        fill(47);
        rect(0, 0, 600, 600);
        fill(255);
        text("PRISONNER K HAS ESCAPED! GAME OVER.", 125, 350);
        noLoop();
    }
    if (gameover == true) {
        player.pause();
        text("ESCAPES FOILED: " + prisonnersCaught + " SECONDS PLAYED: " + seconds, 125, 380);
    }
}

function start() {
    startGame = true;
    loop();
    player.loop();
    startButton.style.display = 'none';
}
