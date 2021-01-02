// Declaring All Variables
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var Food, FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

function preload() {

// Loading the images
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  // creating monkey
  monkey = createSprite(80, 300, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  //creating ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);
  //creating group
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
  background(295);
// Moving ground
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  // in every space key the monkey jump
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 1; 

  // Stack the monkey to ground
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();


  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score "+score, 100,50);
  // If touching any obstacle all the thing will stop
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach (0);
    obstaclesGroup.setLifetimeEach  (-1);
    FoodGroup.setVelocityXEach (0);
    FoodGroup.setLifetimeEach (-1);
    score = 0;
  }
  stroke("black");  
  textSize(20);
  fill("black");
  text("Survival Time: " + score, 100, 50);
  score = score + Math.round(getFrameRate()/60);
  
}


function spawnFood() {
  if(frameCount % 80 ===0){
    banana = createSprite(400,220,20,20);
    banana.velocityX = -6;
     var rand = Math.round(random);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 66;
    monkey.depth = banana.depth +1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(800, 325, 10, 40);
    obstacle.velocityX = -6;

    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}