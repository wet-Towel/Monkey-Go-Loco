var monkey, monkeyRun;
var back, backImage;
var stone, stoneImage, stoneGroup;
var banana, bananaImage, foodGroup;
var score = 0;
var ground;
var lives = 3;

function preload (){
  backImage = loadImage ("jungle.jpg");
  monkeyRun = loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage ("banana.png");
  stoneImage = loadImage ("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  back = createSprite (200,200); 
  back.addImage ("backImg", backImage);
  back.velocityX = -5;
  back.depth = 0.1;
  
  monkey = createSprite (100,325);
  monkey.addAnimation("monkRun", monkeyRun);
  monkey.scale = 0.1;
  
  foodGroup = new Group ();
  
  stoneGroup = new Group ();

  ground = createSprite (200,380,400,10);

}

function draw() {
  background(220);

  if (back.x < 0){
  back.x = back.width/2;
  }
  
  if (keyDown ("space") && monkey.y > 320){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.7;

  monkey.collide (ground);
  ground.visible = false;
  
  spawnBanana();
  if (foodGroup.isTouching (monkey)){
    score = score +2;
    foodGroup.destroyEach();
    clear();
  }

  spawnStone();
  if (stoneGroup.isTouching (monkey)){
    monkey.scale = 0.1;
    stoneGroup.destroyEach();
    score = 0;
    lives = lives - 1;
  }

  if (lives === 0){
    monkey.velocityY = 0;
    back.velocityX = 0;
    frameCount = 0;
    foodGroup.setVelocityXEach (0);
    foodGroup.setLifetimeEach (-1);
    stoneGroup.setVelocityXEach (0);
    stoneGroup.setLifetimeEach (-1);
  }

  drawSprites();
  
  stroke ("white");
  textSize (20);
  fill ("white");
  text ("Score: "+ score, 500,50);
}

function spawnBanana () {
  if (frameCount % 80 === 0){ 
  banana = createSprite(400,250);
  banana.addImage ("bananaa", bananaImage);
  banana.scale = 0.08;
  banana.x = 400;
  banana.y = Math.round (random (225,265));
  banana.velocityX = -5;
  banana.lifetime = 80;
  foodGroup.add(banana);
  
  switch(score){
    case 10: monkey.scale = 0.12;
          break;
    case 20: monkey.scale = 0.14;
          break;
    case 30: monkey.scale = 0.16;
          break;
    case 40: monkey.scale = 0.18;
          break;
    default: break;
  }
 }
}

function spawnStone () {
  if (frameCount % 90 === 0){ 
  stone = createSprite (400,350);
  stone.addImage ("obstacle", stoneImage);
  stone.scale = 0.13;
  stone.collide (ground);
  stone.velocityX = -4;
  stone.lifetime = 100;
  stone.setCollider("rectangle", 0,0, 250, 100);
  stoneGroup.add (stone);
 }
}

