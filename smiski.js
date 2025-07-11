//ALL MY VARIABLESS RAHHHHH
canvasWidth = 820;
canvasHeight = 720;

let bg, bg2, bg4;

let font, font2;
let bgMusic;
let buttonSound;
let startButton, WorkButton;
let WorkSeriesBox;

let currentScreen;
let targetScreen;
let loadingStartTime;
const loadingDuration = 2000;

// Screen states
const GAME_INTRO = 0;
const CHOOSE_SERIES = 1;
const CHOOSE_CHARACTER_WORK = 3;
const UNBOXING = 4;

let buttonWidth = 300;
let buttonHeight = 50;
let startButtonX, startButtonY;

let series2X, seriesY;
let seriesButtonWidth = 265;
let seriesButtonHeight = 374;


let workAkiski = [];
let revealedWorkAkiski = null;
let isBoxOpened = [false, false, false, false, false];
let selectedBoxIndex = null;

let workBoxes = []; 

let restartButtonImg;
let restartButtonX, restartButtonY;
let restartButtonSize = 50;

let sparkleSound;

let sparkles = [];
let sparkleDuration = 1000; 
let sparkleStartTime = null;

//loading variables
function preload() {
  bg = loadImage('bgfinal.png');
  bg.resize(canvasWidth, canvasHeight);

  bg2 = loadImage('bg2.png');
  bg2.resize(canvasWidth, canvasHeight);

  bg4 = loadImage('bgWork.png');
  bg4.resize(canvasWidth, canvasHeight);

  font = loadFont('heartfont.ttf');
  font2 = loadFont("pixel.ttf")

  startButton = loadImage('start.png');
  WorkButton = loadImage('WorkButton.png');
  WorkSeriesBox = loadImage('WorkSeriesBox.png');

  workAkiski = [
    { name: "Akiski Approving", img: loadImage("ApproveWork.png") },
    { name: "Akiski Researching", img: loadImage("ResearchWork.png") },
    { name: "Akiski Presenting", img: loadImage("PresentWork.png") },
    { name: "Akiski Good Idea", img: loadImage("GoodIdeaWork.png") },
    { name: "Akiski On the Road", img: loadImage("RoadWork.png") },
    { name: "Akiski Group Think", img: loadImage("GthinkWork.png") }
  ];

  restartButtonImg = loadImage('button.png');
  bgMusic = loadSound('bgMusic.mp3');
  buttonSound = loadSound('buttonSound.mp3');

  sparkleSound = loadSound('reveal.mp3');
}   


function setup() {
  createCanvas(canvasWidth, canvasHeight).position(windowWidth/2 - canvasWidth/2, windowHeight/2 - canvasHeight/2); // canvas setup
  restartButtonX = width - restartButtonSize - 30;
  restartButtonY = 30; 

  //musiccc
  bgMusic.loop();
  bgMusic.setVolume(0.4);
}

//GAME INTRO and buttons
function drawGameIntro() {
  background(bg);
  textFont(font);

  push();
  textSize(60);
  fill("#42BEC5");
  stroke("#6CCB4C");         
  strokeWeight(4);
  textAlign(CENTER, CENTER);
  text("Welcome", width / 2, height / 3 - 70);
  text("to", width / 2, height / 3);
  text("Akiski Unboxing!", width / 2, height / 3 + 70);
  pop();

  startButtonX = width / 2 - buttonWidth / 2;
  startButtonY = height / 3 + 60 + 80;  
  image(startButton, startButtonX, startButtonY, buttonWidth, buttonHeight);

  textAlign(CENTER, CENTER);
  textFont(font);
  textSize(30); 
  fill("#6CCB4C"); 
  text("START", width / 2, startButtonY + buttonHeight / 2);
}

//CHOOOSEEEEEE SERIES (only 1 for now :( )
function drawChooseSeries() {
  background(bg2);

  push();
  fill("#D9F88C"); 
  noStroke();
  rectMode(CENTER);
  rect(width / 2, 60 + 35 / 2, 500, 70); 
  
  textSize(50);
  textAlign(CENTER, TOP);

  fill("#004444");
  noStroke();
  text("FROM THE SERIES", width / 2, 60 + 2);

  fill("#FFFFFF");
  stroke("#42BEC5");
  strokeWeight(6);
  text("FROM THE SERIES", width / 2, 60);
  pop();

  series2X = width / 2 - seriesButtonWidth / 2;
  seriesY = height / 2 - seriesButtonHeight / 2;

  image(WorkButton, series2X, seriesY, seriesButtonWidth, seriesButtonHeight);
}

// TYAYYY WORK SEIRESSS
function drawChooseCharacterWork() {
  background(bg4);
  workBoxes = []; 

  let boxWidth = 150;
  let boxHeight = 200;
  let boxSpacingX = 40;
  let boxSpacingY = 50;

  let totalWidthTop = boxWidth * 3 + boxSpacingX * 2;
  let startXTop = width / 2 - totalWidthTop / 2;
  let yTop = height / 2 - boxHeight - boxSpacingY / 2;

  for (let i = 0; i < 3; i++) {
    let x = startXTop + i * (boxWidth + boxSpacingX);
    image(WorkSeriesBox, x, yTop, boxWidth, boxHeight);
    workBoxes.push({ x: x, y: yTop, w: boxWidth, h: boxHeight });
  }

  let totalWidthBottom = boxWidth * 2 + boxSpacingX;
  let startXBottom = width / 2 - totalWidthBottom / 2;
  let yBottom = height / 2 + boxSpacingY / 2;

  for (let i = 0; i < 2; i++) {
    let x = startXBottom + i * (boxWidth + boxSpacingX);
    image(WorkSeriesBox, x, yBottom, boxWidth, boxHeight);
    workBoxes.push({ x: x, y: yBottom, w: boxWidth, h: boxHeight });
  }

  push();
  fill("#E9DA00");
  stroke('#01C94C')
  strokeWeight(4);
  textSize(50);
  textAlign(CENTER, TOP);
  text("PICK A BOX", width / 2 , 60);
  pop();
}

function drawUnboxing() {
  background(bg2);
  textAlign(CENTER, TOP);
  textFont(font);
  textSize(30);
  fill("#333");

  if (!isBoxOpened[selectedBoxIndex]) {
   
    let titleY = 30;
    let titleBoxW = 600;
    let titleBoxH = 50;
    fill("#D9F88C");
    noStroke();
    rectMode(CENTER);
    rect(width / 2, titleY + titleBoxH / 2, titleBoxW, titleBoxH);

    fill("#01C94C");
    text("Double-click the box to reveal!", width / 2, titleY);

    
    image(WorkSeriesBox, width / 2 - 150, height / 2 - 200, 300, 400);
  } else {
   
    let youGotY = 50;
    let titleBoxW = 400;
    let titleBoxH = 50;
    fill("#D9F88C");
    noStroke();
    rectMode(CENTER);
    rect(width / 2, youGotY + titleBoxH / 2, titleBoxW, titleBoxH);

    fill("#01C94C");
    text("You got...", width / 2, youGotY);

    drawImageCentered(revealedWorkAkiski.img, width / 2, height / 2, 200, 240);

    let nameY = height / 2 + 180;
    let nameBoxW = 500;
    let nameBoxH = 60;
    fill("#D9F88C");
    noStroke();
    rectMode(CENTER);
    rect(width / 2, nameY + nameBoxH / 2 - 16, nameBoxW, nameBoxH);


    textSize(32);
    fill("#01C94C");
    text(revealedWorkAkiski.name, width / 2, nameY);

    image(restartButtonImg, restartButtonX, restartButtonY, restartButtonSize, restartButtonSize);
  }

  if (isBoxOpened[selectedBoxIndex] && sparkleStartTime && millis() - sparkleStartTime < sparkleDuration) {
    for (let s of sparkles) {
      fill(255, 255, 200, s.alpha);
      noStroke();
      circle(s.x, s.y, s.size);
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 4;
    }
}
}

//image resizing function
function drawImageCentered(img, centerX, centerY, maxW, maxH) {
  let imgAspect = img.width / img.height;
  let targetW = maxW;
  let targetH = maxH;

  if (imgAspect > 1) {
    targetW = maxW;
    targetH = targetW / imgAspect;
  } else {
    targetH = maxH;
    targetW = targetH * imgAspect;
  }

  image(img, centerX - targetW / 2, centerY - targetH / 2, targetW, targetH);
}

//draws scenesss
function draw() {
  if (currentScreen === undefined) {
    currentScreen = GAME_INTRO;
  }   

  switch (currentScreen) {
    case GAME_INTRO:
      drawGameIntro();
      break;
    case CHOOSE_SERIES:
      drawChooseSeries();
      break;
    case CHOOSE_CHARACTER_WORK:
      drawChooseCharacterWork();
      break;
    case UNBOXING:
      drawUnboxing();
      break;  
  }
}

// button music and clicks 
function mousePressed() {
  // Play button click sound
  if (buttonSound && buttonSound.isLoaded()) {
    buttonSound.play();
  }

  if (currentScreen === GAME_INTRO) {
    if (
      mouseX >= startButtonX &&
      mouseX <= startButtonX + buttonWidth &&
      mouseY >= startButtonY &&
      mouseY <= startButtonY + buttonHeight
    ) {
      currentScreen = CHOOSE_SERIES;
    }
  }

  if (currentScreen === CHOOSE_SERIES) {
    if (
      mouseX >= series2X &&
      mouseX <= series2X + seriesButtonWidth &&
      mouseY >= seriesY &&
      mouseY <= seriesY + seriesButtonHeight
    ) {
      currentScreen = CHOOSE_CHARACTER_WORK;
    }
  }

  if (currentScreen === CHOOSE_CHARACTER_WORK) {
    for (let i = 0; i < workBoxes.length; i++) {
      let b = workBoxes[i];
      if (
        mouseX >= b.x && mouseX <= b.x + b.w &&
        mouseY >= b.y && mouseY <= b.y + b.h
      ) {
        selectedBoxIndex = i;
        revealedWorkAkiski = random(workAkiski);
        isBoxOpened[i] = false;
        currentScreen = UNBOXING;
      }
    }
  }

  if (currentScreen === UNBOXING) {
    if (
      mouseX >= restartButtonX &&
      mouseX <= restartButtonX + restartButtonSize &&
      mouseY >= restartButtonY &&
      mouseY <= restartButtonY + restartButtonSize
    ) {
      isBoxOpened = [false, false, false, false, false];
      selectedBoxIndex = null;
      revealedWorkAkiski = null;
      workBoxes = [];
      currentScreen = GAME_INTRO;  
    }   
  }
}


function doubleClicked() {
  if (currentScreen === UNBOXING && selectedBoxIndex !== null) {
    isBoxOpened[selectedBoxIndex] = true;

    if (sparkleSound && sparkleSound.isLoaded()) {
      sparkleSound.play();
    }

    //SPARKELS
    sparkleStartTime = millis();
    sparkles = [];
    for (let i = 0; i < 50; i++) {
      sparkles.push({
        x: width / 2,
        y: height / 2,
        vx: random(-2, 2),
        vy: random(-2, 2),
        alpha: 255,
        size: random(4, 10)
      });
    }

    
  }
}
