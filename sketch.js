
var player1,player2,ground;
var gameState = "start"
var button;
var startImg,playImg;
var energy = 0;
var lifetime = 0;
var energySprite;
var lifetimeSprite;
var energyImg;
var lifetimeImg;
var greenBulletGroup,greenEnemyGroup,blueEnemyGroup,blueBulletGroup;
var blueEnemyImg;
var gameOverImg;
var edges;
var bluebullet;
var greenbullet;
var gameOver;


function preload(){
 // blueEnemyImg = loadAnimation("images/bluebullet/sprite_01.png","images/bluebullet/sprite_02.png","images/bluebullet/sprite_03.png","images/bluebullet/sprite_04.png","images/bluebullet/sprite_05.png","images/bluebullet/sprite_06.png","images/bluebullet/sprite_07.png","images/bluebullet/sprite_08.png","images/bluebullet/sprite_09.png");
 blueEnemyImg = loadAnimation("images/sprite_01.png","images/sprite_02.png","images/sprite_03.png","images/sprite_04.png","images/sprite_05.png","images/sprite_06.png","images/sprite_07.png","images/sprite_08.png","images/sprite_09.png");
 greenEnemyImg = loadAnimation("images/sprite_1.png","images/sprite_2.png","images/sprite_3.png","images/sprite_4.png","images/sprite_5.png","images/sprite_6.png","images/sprite_7.png");
 blueBulletImg = loadAnimation("images/bluebullet/sprite_01.png","images/bluebullet/sprite_02.png","images/bluebullet/sprite_03.png","images/bluebullet/sprite_04.png","images/bluebullet/sprite_05.png","images/bluebullet/sprite_06.png","images/bluebullet/sprite_07.png","images/bluebullet/sprite_08.png","images/bluebullet/sprite_09.png");
 greenBulletImg = loadAnimation("images/greenbullet/sprite_01.png","images/greenbullet/sprite_02.png","images/greenbullet/sprite_03.png","images/greenbullet/sprite_04.png","images/greenbullet/sprite_05.png","images/greenbullet/sprite_06.png","images/greenbullet/sprite_07.png","images/greenbullet/sprite_08.png","images/greenbullet/sprite_09.png");
 playerImg = loadImage("images/playership space invaders.png");
 startImg = loadImage("images/Enemy_Destroy_Bonus.png");
 playImg = loadImage("images/Crystal_03.png");
 lifetimeImg = loadImage("images/HP_Bonus.png");
 energyImg = loadImage("images/Armor_Bonus.png");
 gameOverImg = loadImage("images/gameOver.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);

  player1 = createSprite(displayWidth/4, displayHeight/2, 50, 50);
  player1.shapeColor = rgb(0,255,0);
  player1.addImage("player1",playerImg);
  player1.scale = 0.125

  player2 = createSprite(3*displayWidth/4, displayHeight/2, 50, 50);
  player2.shapeColor = rgb(0,0,255);
  player2.addImage("player2",playerImg);
  player2.scale  = 0.125;

  //ground = createSprite(displayWidth/2,displayHeight-2,displayWidth,4);
  //ground.shapeColor =  rgb(48,22,8);

  button = createSprite(displayWidth/2,displayHeight/2,30,30);
  button.shapeColor = rgb(125,377,69);
  button.addImage("button",startImg);
  button.scale = 0.25

  gameOver = createSprite(displayWidth/2,displayHeight/2-100,30,30);
  gameOver.visible = false;
  gameOver.shapeColor = rgb(15,252,181);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 0.25

 lifetimeSprite = createSprite(50,50,25,25);
 lifetimeSprite.addImage("lifetimeSprite",lifetimeImg);
 lifetimeSprite.scale = 0.25;

 energySprite = createSprite(50,110,25,25);
 energySprite.addImage("energySprite",energyImg);
 energySprite.scale = 0.25;

  edges = createEdgeSprites();

  greenBulletGroup = createGroup();
  greenEnemyGroup = createGroup();
  blueBulletGroup = createGroup();
  blueEnemyGroup = createGroup();
}

function draw() {
  background(0,0,0); 
  
  if(gameState==="start"){
    lifetime = 0;
    energy = 0;
    if(touches.length>0||mousePressedOver(button)){
      gameState = "play";
      button.x = displayWidth-60
      button.y = 40
      button.shapeColor = rgb(255,0,0)
      button.addImage("button",playImg);
      touches = [];
    }
  }
  if(gameState==="play"){
    spawnBlueEnemies();
    spawnGreenEnemies();
    background(0,0,0)
    blueEnemyGroup.bounceOff(edges);
  greenEnemyGroup.bounceOff(edges);
  blueBulletGroup.bounceOff(edges);
  greenBulletGroup.bounceOff(edges);
  player2.bounceOff(edges);
  player1.bounceOff(edges);
  
    if(touches.length>0||keyWentDown("UP_ARROW")){
      player1.velocityY = -5;
      player1.rotation = 0;
      player2.velocityY = 5;
      player2.rotation = 180;
      touches = [];
    }
    if(touches.length>0||keyWentDown("DOWN_ARROW")){
      player1.velocityY = 5;
      player1.rotation = 180;
      player2.velocityY = -5;
      player2.rotation = 0;
      touches = [];
    }
    if(touches.length>0||keyWentDown("LEFT_ARROW")){
      player1.velocityX = -5;
      player1.rotation = 270;
      player2.velocityX = 5;
      player2.rotation = 90;
      touches = [];
    }
    if(touches.length>0||keyWentDown("RIGHT_ARROW")){
      player1.velocityX = 5;
      player1.rotation = 90;
      player2.velocityX = -5;
      player2.rotation = 270;
      touches = [];
    }
    if(touches.length>0||keyWentUp("UP_ARROW")){
      player1.velocityY = 0;
      player2.velocityY = 0;
      touches = [];
    }
    if(touches.length>0||keyWentUp("DOWN_ARROW")){
      player1.velocityY = 0;
      player2.velocityY = 0;
      touches = [];
    }
    if(touches.length>0||keyWentUp("LEFT_ARROW")){
      player1.velocityX = 0;
      player2.velocityX = 0;
      touches = [];
    }
    if(touches.length>0||keyWentUp("RIGHT_ARROW")){
      player1.velocityX = 0;
      player2.velocityX = 0;
      touches = [];
    }
    if(greenBulletGroup.isTouching(greenEnemyGroup)){
      lifetime = lifetime + 2;
      energy = energy + 1
      greenEnemyGroup.destroyEach();
      greenBulletGroup.destroyEach();
    }
    if(blueBulletGroup.isTouching(blueEnemyGroup)){
      energy = energy + 2;
      blueEnemyGroup.destroyEach();
      blueBulletGroup.destroyEach();
    }
    if(greenBulletGroup.isTouching(blueEnemyGroup)){
      lifetime = lifetime - 1;
      greenBulletGroup.destroyEach();
    }
    if(blueBulletGroup.isTouching(greenEnemyGroup)){
      energy = energy - 1;
      blueBulletGroup.destroyEach();
    }
    if(touches.length>0||keyDown("1")){
      spawnGreenBullets();
      touches = [];
    }
    if(touches.length>0||keyDown("2")){
      spawnBlueBullets();
      touches = [];
    }
    if(energy<0){
      var rand = random(1,2);
      switch(rand){
        case 1:greenBulletGroup.destroyEach();
        break;
        case 2:blueBulletGroup.destroyEach();
        break;
        default :break;
      }
      if(lifetime<0){
        gameState = "end";
      }
  }
 
    if(gameState === "end"){
      background(255,255,255);
      player1.destroy();
      player2.destroy();
      button.x = displayWidth/2;
      button.y = displayHeight/2;
      gameOver.visible = true;
      blueEnemyGroup.setLifetimeEach(-1);
      blueEnemyGroup.setVelocityEach(0,0);
      greenEnemyGroup.setLifetimeEach(-1);
      greenEnemyGroup.setVelocityEach(0,0);
      blueBulletGroup.destroyEach();
      greenBulletGroup.destroyEach();
    }
    if(touches.length>0||mousePressedOver(button)&& gameState ==="end"){
      gameState = "start";
      touches = [];
    }
  }
  drawSprites();
  textSize(50);
  fill("blue")
  text(":"+lifetime,105,75);
  fill("green");
  text(":"+energy,105,125);
}
function spawnGreenEnemies(){
  if(frameCount%10 === 0){
    var greenEnemy = createSprite(displayWidth, displayHeight/2,25,25);
    greenEnemy.shapeColor = rgb(0,255,0);
    greenEnemy.addAnimation("greenEnemy",greenEnemyImg);
    greenEnemy.scale = 0.125;
    greenEnemy.y = random(50,displayHeight-50);
    //greenEnemy.height = random(5,25);
    greenEnemy.velocityX = random(-2,2);
    greenEnemy.velocityY = random(-3,3);

    greenEnemyGroup.add(greenEnemy);
  }
}
function spawnGreenBullets(){
  greenBullet = createSprite(player1.x,player1.y,20,5);
  greenBullet.addAnimation("greenBullet",greenBulletImg);
  greenBullet.shapeColor = rgb(0,255,0);
  greenBullet.velocityX = random(-10,10);
  greenBullet.velocityY = random(-4,4);
  greenBulletGroup.add(greenBullet);
}
function spawnBlueEnemies(){
  if(frameCount%10 === 0){
    var blueEnemy = createSprite(0,200,25,25);
    blueEnemy.shapeColor = rgb(0,0,255);
    blueEnemy.addAnimation("blueEnemy",blueEnemyImg);
    blueEnemy.scale = 0.125;
    blueEnemy.y = random(50,displayHeight-50);   
    //blueEnemy.height = random(5,25);
    blueEnemy.velocityX = random(-2,2);
    blueEnemy.velocityY = random(-3,3);
    blueEnemyGroup.add(blueEnemy);
  }
}
function spawnBlueBullets(){
   blueBullet = createSprite(player2.x,player2.y,20,5);
  blueBullet.shapeColor = rgb(0,0,255);
  blueBullet.addAnimation("blueBullet",blueBulletImg)
  blueBullet.velocityX = random(-10,10);
  blueBullet.velocityY = random(-4,4);
  blueBulletGroup.add(blueBullet);
}
