var dave, youngDave_img;
var day1_img, day2_img, day3_img, day4_img;
var invisibleGround;
var  obs2_img, obsGroup;
var balloon1_img, balloon2_img, balloon3_img, balloon4_img, balloonsGroup1, balloonsGroup2, balloonsGroup3, balloonsGroup4; 
var rand;

var gameState;

var score;

var restart, gameOver, restart_img, gameOver_img;

function preload(){
  youngDave_img = loadImage("images/youngDave.png");
 
  day1_img = loadImage("images/sunnybg1.jpg");
  day2_img = loadImage("images/sunnybg2.jpg");
  day3_img = loadImage("images/sunnybg3.jpg");
  day4_img = loadImage("images/sunnybg4.jpg");

  obs2_img = loadImage("images/stone2.png");

  balloon1_img = loadImage("images/balloon1.png");
  balloon2_img = loadImage("images/balloon2.png");
  balloon3_img = loadImage("images/balloon3.png"); 
  balloon4_img = loadImage("images/balloon4.png");
  
  restart_img = loadImage("restartbt.png");

  gameOver_img = loadImage("gameover.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  scene = createSprite(width/2, height/2, width, height);
  scene.addImage(day1_img);
  scene.scale = 5; 
  
  dave = createSprite(400, 450, 50, 50);
  dave.addImage(youngDave_img);
  dave.scale = 0.4;

  invisibleGround = createSprite(width/2, height - 40, width, 20);
  invisibleGround.visible = false; 

  balloonsGroup1 = new Group();
  balloonsGroup2 = new Group();
  balloonsGroup3 = new Group();
  balloonsGroup4 = new Group();

  obsGroup = new Group ();

  gameState = "play";

  score = 0;

  restart = createSprite(width/2, height/2 + 100, 20, 20);
  restart.addImage(restart_img);
  restart.scale = 0.5;
  restart.visible = false;

  gameOver = createSprite(width/2, height/2 - 100, 20, 20);
  gameOver.addImage(gameOver_img);
  gameOver.scale = 0.3;
  gameOver.visible = false;

}

function draw() {
  background("white");
  
  if(gameState == "play") {
    
    if(score >= 10 && score < 20) {
      scene.addImage(day2_img);
      console.log(10);
    }

    if(score >= 20 && score < 30) {
      scene.addImage(day3_img);
    }

    if(score >= 30) {
      scene.addImage(day4_img);
    }
    
    scene.velocityX = -(6 + score / 30);
    console.log(scene.velocityX);

    if(scene.x < 0) {
      scene.x = width/2;
    
    }

    if (touches.length > 0 || keyIsDown(32) && dave.y > 535  ) {
      dave.velocityY = -18;
      touches = [];
     }  
  
    dave.velocityY +=  0.5;
  
    spawnObstacles();

    spawnBalloons();


    balloonsGroup1.overlap(dave, function() {
      score += 5;
      balloonsGroup1.destroyEach(); 
    })

    balloonsGroup2.overlap(dave, function() {
      score += 5;
      balloonsGroup2.destroyEach(); 
    })

    balloonsGroup3.overlap(dave, function() {
      score += 5;
      balloonsGroup3.destroyEach(); 
    })

    balloonsGroup4.overlap(dave, function() {
      score += 5;
      balloonsGroup4.destroyEach(); 
    })


    obsGroup.overlap(dave, function() {
      gameState = "end";
    })

    if(score >= 35) {
      scene.velocityX = -(20 + score / 30);;
      obsGroup.velocityX = -(25 + score / 30);
    }


 
  }

  else if (gameState == "end") {
    dave.velocityY = 0;
    scene.velocityX = 0;
    balloonsGroup1.setVelocityXEach (0);
    balloonsGroup2.setVelocityXEach (0);
    balloonsGroup3.setVelocityXEach (0);
    balloonsGroup4.setVelocityXEach (0);

    obsGroup.setVelocityXEach (0);

    balloonsGroup1.setLifetimeEach(-1);
    balloonsGroup2.setLifetimeEach(-1);
    balloonsGroup3.setLifetimeEach(-1);
    balloonsGroup4.setLifetimeEach(-1);

    obsGroup.setLifetimeEach(-1);

    restart.visible = true;
    gameOver.visible = true;

  }

  if(mousePressedOver(restart) ||  touches.length > 0) {
      reset();   
      touches = [];
  }

  dave.collide(invisibleGround);

  drawSprites();
  textSize(20);
  textAlign(CENTER);
  fill ("white");
  text ("Score : " + score, width - 200, 100);

}

function reset() {
  gameState = "play";

  balloonsGroup1.destroyEach();
  balloonsGroup2.destroyEach();
  balloonsGroup3.destroyEach();
  balloonsGroup4.destroyEach();

  obsGroup.destroyEach();

  restart.visible = false;
  gameOver.visible = false;

  score = 0;

  scene.velocityX = -5;

}

function spawnObstacles() {
  if(frameCount % 160 == 0){
    var obstacle = createSprite( width-10, height-100, 10, 10);
    obstacle.velocityX = -(15 + score / 30);
    obstacle.scale = 0.2;
    obstacle.addImage(obs2_img);

   obstacle.lifetime = -Math.round(width/obstacle.velocityX);
   console.log(obstacle.lifetime);
    obsGroup.add(obstacle);
    
  }
 
}

function spawnBalloons() {
  if(frameCount % Math.round( random(60, 150))  == 0) {

    rand  = Math.round(random(1, 4));


    switch(rand) {
      case 1 : spawnBalloon1();
      break;

      case 2 :spawnBalloon2();
      
      break;

      case 3 : spawnBalloon3();
      break;

      case 4 : spawnBalloon4();
      break;

      default : break;

      
    }  
    
  }
}

function spawnBalloon1() {
  
  var balloon = createSprite(width, height/2-250, 10, 10);
  balloon.addImage(balloon1_img);

  balloon.velocityX = -10;
  balloon.y = random(height/2-250 , height/2 - 150);

  balloon.lifetime = -Math.round(width/balloon.velocityX);
  console.log(balloon.lifetime);
     balloonsGroup1.add(balloon);
}

function spawnBalloon2() {
  
  var balloon = createSprite(width, height/2-250, 10, 10);
  balloon.addImage(balloon2_img);
  balloon.scale = 0.7;

  balloon.velocityX = -10;
  balloon.y = random(height/2-250 , height/2 - 150);

  balloon.lifetime = -Math.round(width/balloon.velocityX);
  console.log(balloon.lifetime);
     balloonsGroup2.add(balloon);
}

function spawnBalloon3() {
  
  var balloon = createSprite(width, height/2-250, 10, 10);
  balloon.addImage(balloon3_img);

  balloon.velocityX = -10;
  balloon.y = random(height/2-250 , height/2 - 150);

  balloon.lifetime = -Math.round(width/balloon.velocityX);
  console.log(balloon.lifetime);
     balloonsGroup3.add(balloon);
}

function spawnBalloon4() {
  
  var balloon = createSprite(width, height/2-250, 10, 10);
  balloon.addImage(balloon4_img);

  balloon.velocityX = -10;
  balloon.y = random(height/2-250 , height/2 - 150);

  balloon.lifetime = -Math.round(width/balloon.velocityX);
  console.log(balloon.lifetime);
     balloonsGroup4.add(balloon);
}

