//Este juego es un pequeño prototipo del juego del trex de google,espero que haya quedado bien,y que lo puedas
// disfrutar.


var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground,ground2,invisibleGround, groundImage;
var luna;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound,deadSound,soulsSound;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  
 
  groundImage = loadImage("ground2.png")
  
  cloudImage = loadImage("cloud.png");
  
  soulsSound = loadSound("souls.mp3");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.jpg")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  deadSound = loadSound ("dead.mp3")
  

} 

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  
  soulsSound.loop()

  ground = createSprite(200,260,200,5);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/3 ;
   
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  gameOver = createSprite(width/2,height/2- 50);
  
  gameOver.addImage(gameOverImg);

  restart = createSprite(width/2,height/2);
  
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.2;
  restart.scale = 0.2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
 
  
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = false
  
  score = 0;
  
}

function draw() {
background(180)

 spawnClouds();
 spawnObstacles();
    
  text("Puntuación: "+ score, 20,70);
  text("TU PUEDES HACERLO!!",20,50);
  text ("LA AVENTURA DE TREX PARTE 2",20, 20)
 


  if(gameState === PLAY){
   
    
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);
     if(score>0 && score%100 === 0){   
    } 
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //valla si que es mucho codigo
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
     
    }
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-120) {
     
      trex.velocityY = -10;
       touches = [];
    }
    trex.velocityY = trex.velocityY + 0.8
  
  
    
    
    if(obstaclesGroup.isTouching(trex)){
        trex.velocityY = -12;
     
        gameState = END;
        deadSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      text ("Intentalo otra vez",500,70);
     
      trex.changeAnimation("collided",trex_collided);
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
 

 
 
  trex.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  


}

//ya casi llegamos al final
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
               break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
 
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    
    cloud.lifetime = 200;
    
  
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  trex.changeAnimation("running",trex_running);
  
  score = 0;
}