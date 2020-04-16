
var player,ground
var gameState = "start"
var button
function setup() {
  createCanvas(800,400);
  player = createSprite(400, 200, 50, 50);
  player.shapeColor = rgb(15,252,181);

  ground = createSprite(400,398,800,4);
  ground.shapeColor =  rgb(48,22,8);

  button = createSprite(400,200,30,30);
  button.shapeColor = rgb(125,377,69);

}

function draw() {
  background(255,255,255); 
  if(keyWentDown("UP_ARROW")){
    player.velocityY = 5;
  }
  if(keyWentDown("DOWN_ARROW")){
    player.velocityY = -5;
  }
  if(keyWentDown("LEFT_ARROW")){
    player.velocityX = -5;
  }
  if(keyWentDown("RIGHT_ARROW")){
    player.velocityX = 5;
  }
  if(keyWentUp("UP_ARROW")){
    player.velocityY = 0;
  }
  if(keyWentUp("DOWN_ARROW")){
    player.velocityY = 0;
  }
  if(keyWentUp("LEFT_ARROW")){
    player.velocityX = 0;
  }
  if(keyWentUp("RIGHT_ARROW")){
    player.velocityX = 0;
  }
  
  if(mousePressedOver(button)){
    gameState = "play";
  }
  if(gameState === "play"){
    spawnEnemies();
  }
  drawSprites();
}
function spawnEnemies(){
  if(frameCount%50 === 0){
    var enemy = createSprite(800,200,50,50);
    enemy.y = random(50,350);
    enemy.velocityX = -10;
    enemy.lifetime = 80;
    
  }
}
