// game start
var startGame;

// music
var player;

// font
var munro;

// images
var orb;

var meteor1;

var meteor2;

var meteor3;

var meteor4;

var powerup;

var bg;

// integers/floats
var rad;

var orbxpos;

var orbypos;

var meteor1xpos;

var meteor1ypos;

var meteor2xpos;

var meteor2ypos;

var meteor3xpos;

var meteor3ypos;

var meteor4xpos;

var meteor4ypos;

// lives, score, framecount
var lives;

var score;

var frames;

var gameover;

// power up
var powerupxpos;

var powerupypos;

var powerupChance;

var powerupavailable;

function preload() {
    //load the content from data folder
    orb = loadImage("data/orb_sprite.png");
    meteor1 = loadImage("data/error_sprite.png");
    meteor2 = loadImage("data/error_sprite.png");
    meteor3 = loadImage("data/error_sprite.png");
    meteor4 = loadImage("data/error_sprite.png");
    bg = loadImage("data/bg.png");
    powerup = loadImage("data/powerup_sprite.png");
    munro = loadFont("data/munro.ttf");
    soundFormats('mp3');
    player = loadSound("data/YesItIs.mp3");
}

function initializeFields() {
    startGame = false;
    rad = 20;
    orbxpos = 200;
    orbypos = 380;
    meteor1xpos = 50;
    meteor1ypos = 50;
    meteor2xpos = 350;
    meteor2ypos = 50;
    meteor3xpos = 300;
    meteor3ypos = 50;
    meteor4xpos = 150;
    meteor4ypos = 50;
    lives = 3;
    score = 0;
    frames = 0;
    gameover = false;
    powerupxpos = -50;
    powerupypos = 380;
    powerupChance = 0;
    powerupavailable = false;
}

function setup() {
    createCanvas(400, 400);
    initializeFields();
    imageMode(CENTER);
    textAlign(CENTER);
    fill(255);
    noLoop();
}

function draw() {
    image(bg, 200, 200);
    frames = frames + 1;
    powerupChance = (int(random(0, 750)));
    textFont(munro, 32);
    text("LIVES: " + lives, 100, 30);
    text("SCORE: " + score, 300, 30);
    image(orb, orbxpos, orbypos, rad * 1.5, rad * 1.5);
    image(powerup, powerupxpos, powerupypos, rad * 1.2, rad * 1.2);
    image(meteor1, meteor1xpos, meteor1ypos, rad * 1.5, rad * 1.5);
    image(meteor2, meteor2xpos, meteor2ypos, rad * 1.6, rad * 1.6);
    image(meteor3, meteor3xpos, meteor3ypos, rad * 1.7, rad * 1.7);
    image(meteor4, meteor4xpos, meteor4ypos, rad * 1.5, rad * 1.5);
    // affix orb to mouse xpos
    orbxpos = mouseX;
    // start moving meteors
    meteor1ypos = meteor1ypos + 4.3;
    meteor2ypos = meteor2ypos + 4.8;
    meteor3ypos = meteor3ypos + 5.1;
    meteor4ypos = meteor4ypos + 4.5;
    if (frames == 60 && gameover === false) {
        score = score + 1;
        frames = 0;
    }
    // edge detection
    if (orbxpos > 400 - 15) {
        orbxpos = orbxpos - 5;
    }
    if (orbxpos < 0 + 15) {
        orbxpos = orbxpos + 5;
    }
    // meteor randomizer
    if (meteor1ypos > 405) {
        meteor1ypos = 50;
        meteor1xpos = random(400);
    }
    if (meteor2ypos > 405) {
        meteor2ypos = 50;
        meteor2xpos = random(400);
    }
    if (meteor3ypos > 405) {
        meteor3ypos = 50;
        meteor3xpos = random(400);
    }
    if (meteor4ypos > 405) {
        meteor4ypos = 50;
        meteor4xpos = random(400);
    }
    // meteor collision detection
    if (dist(orbxpos, orbypos, meteor1xpos, meteor1ypos) < rad * 1.5) {
        lives -= 1;
        meteor1ypos = 50;
        meteor1xpos = random(400);
        meteor2ypos = 50;
        meteor2xpos = random(400);
        meteor3ypos = 50;
        meteor3xpos = random(400);
        meteor4ypos = 50;
        meteor4xpos = random(400);
    }
    if (dist(orbxpos, orbypos, meteor2xpos, meteor2ypos) < rad * 1.5) {
        lives -= 1;
        meteor1ypos = 50;
        meteor1xpos = random(400);
        meteor2ypos = 50;
        meteor2xpos = random(400);
        meteor3ypos = 50;
        meteor3xpos = random(400);
        meteor4ypos = 50;
        meteor4xpos = random(400);
    }
    if (dist(orbxpos, orbypos, meteor3xpos, meteor3ypos) < rad * 1.5) {
        lives -= 1;
        meteor1ypos = 50;
        meteor1xpos = random(400);
        meteor2ypos = 50;
        meteor2xpos = random(400);
        meteor3ypos = 50;
        meteor3xpos = random(400);
        meteor4ypos = 50;
        meteor4xpos = random(400);
    }
    if (dist(orbxpos, orbypos, meteor4xpos, meteor4ypos) < rad * 1.5) {
        lives -= 1;
        meteor1ypos = 50;
        meteor1xpos = random(400);
        meteor2ypos = 50;
        meteor2xpos = random(400);
        meteor3ypos = 50;
        meteor3xpos = random(400);
        meteor4ypos = 50;
        meteor4xpos = random(400);
    }
    // powerup
    if (powerupChance == 433 && powerupavailable == false) {
        powerupxpos = random(10, 390);
        powerupavailable = true;
    }
    if (dist(orbxpos, orbypos, powerupxpos, powerupypos) < rad * 1.2) {
        lives = lives + 1;
        powerupxpos = -50;
        powerupavailable = false;
    }
    // on death
    if (lives == 0) {
        meteor1ypos = -50;
        meteor2ypos = -50;
        meteor3ypos = -50;
        meteor4ypos = -50;
        powerupxpos = -50;
        text("PLAYER TERMINATED.", 200, 200);
        text("GAME OVER!", 200, 240);
        orbxpos = -200;
        gameover = true;
        player.pause()
    }
}



function start() {
    startGame = true;
    loop();
    player.loop();
    startButton.style.display = 'none';
}
