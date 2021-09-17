//playing character
var jackson,jacksonimg
var PLAY=1
var END=0
//npc
var police,policeimg
//background
var backgrounds,backgroundimg
//obstacles
var obstacles
var busimg,carimg,scooterimg
//powerups
var powerUp
var coin,coinimg,shoeimg
var coinCount = 0
var coinGroup,obstacleGroup,powerUpGroup
var gameState=PLAY;
var gameOverimg,gameOver
var restart,rimg
var heart1,heart2,heart3,heartimg
var deathC=3

function preload(){
  //background image
  backgroundimg = loadImage("road.png")
  jacksonimg = loadAnimation("Runner-1.png","Runner-2.png")
  policeimg = loadImage("police.png")
  carimg = loadImage("car.png")
  busimg = loadImage("bus.png")
  scooterimg=loadImage("scooter.png")
  shoeimg=loadImage("powerUp.png")
  coinimg=loadImage("coin.png")
  gameOverimg=loadImage("gameover.png")
  rimg=loadImage("restart.png")
  heartimg=loadImage("heart.png")
  laughSound=loadSound("policeLaugh.wav")
  theifLaugh=loadSound("theifLaugh.wav")

}
function setup() {
  createCanvas(1500,1000);
 
  rectMode(CENTER)
  backgrounds=createSprite(750,500,1500,1000)
  backgrounds.addImage(backgroundimg) 
  backgrounds.scale=3

 
  police=createSprite(100,200,30,30)
  police.addImage("car",policeimg)
  police.scale=0.4
  
  jackson = createSprite(500,200,20,20)
  jackson.addAnimation("running",jacksonimg)
  jackson.scale=0.05

  gameOver=createSprite(700,200,20,20)
  gameOver.addImage(gameOverimg)
  gameOver.scale=0.5
  gameOver.visible=false

  restart=createSprite(700,300,20,20)
  restart.addImage(rimg)
  restart.scale=0.1
  restart.visible=false

  heart1=createSprite(1100,50,10,10)
  heart1.addImage(heartimg)
  heart1.scale=0.05

  heart2=createSprite(1150,50,10,10)
  heart2.addImage(heartimg)
  heart2.scale=0.05
  
  heart3=createSprite(1200,50,10,10)
  heart3.addImage(heartimg)
  heart3.scale=0.05
  
  
  
  
  coinGroup = createGroup()
  obstacleGroup = createGroup() 
  powerUpGroup = createGroup()
  
}
function draw() {
  
  if(gameState===PLAY)
  {
    background(0)
    powerUps()
    obstacle()
    coins()
    
    police.y=jackson.y-10

    if(keyDown(UP_ARROW))
  {
    jackson.y=jackson.y-5
  }
  if(keyDown(DOWN_ARROW))
  {
    jackson.y=jackson.y+5
  }
  if(coinCount%5===0 && coinCount>0){
    police.x=police.x+1;
   backgrounds.velocityX=backgrounds.velocityX-6;
    
  }
  backgrounds.velocityX=-6
  if(backgrounds.x<0)
  {
    backgrounds.x=500

  }

  if(jackson.isTouching(powerUpGroup)){
    jackson.x=jackson.x+5;
    powerUpGroup.destroyEach();
  }
  
      
  if(deathC===3 && jackson.isTouching(obstacleGroup))
  {
    heart3.visible=false
    deathC=deathC-1
    console.log("ek heart gya3")
  }
  if(deathC===2 && jackson.isTouching(obstacleGroup))
  {
    heart2.visible=false
    deathC=deathC-1
    console.log("ek heart gya2")
  }
  if(deathC===1 && jackson.isTouching(obstacleGroup))
  {
    console.log("to mar gya1")
    heart1.visible=false
    gameState=END ;
    laughSound.play()
  }
      
  if(coinGroup.isTouching(jackson))
  {
    coinGroup.destroyEach()
    coinCount=coinCount+1
  }  
    
 }
 if(police.isTouching(jackson)){
   gameState=END
   laughSound.play()
 }
 if(police.isTouching(obstacleGroup)){
    gameState=END;
   theifLaugh.play();
   
 }
 //9. Power up condition (increase speed) 10. put resart thing see from trex runner hint(mose preesed over function and ) restart 11. Music
 //
  
  //put coin if here to destroy the coin and increase the coin count make the variable and also put functionality to the boy use the code if(coin.isTouching.boy)
  //{destroy the coin


  else if(gameState===END)
  {
    
    jackson.destroy()
    backgrounds.velocityX=0;
    obstacleGroup.setVelocityXEach(0)
    coinGroup.setVelocityXEach(0)
    gameOver.visible=true
    restart.visible=true
    obstacleGroup.destroyEach()
    coinGroup.destroyEach()
    police.destroy()
    powerUpGroup.destroyEach()

    if(mousePressedOver(restart)){
      reset();
    }
 }
  
  
  drawSprites()
  noFill()
  strokeWeight(3)
  stroke("blue")
  rect(1075,30,150,40)
  textSize(20)
  fill("cyan")
  text( "Coins Collected: "+coinCount,1300,50)
  
  
}

function reset(){
  gameState=PLAY;
  coinCount=0;
  gameOver.visible=false;
  restart.visible=false;
}

function obstacle()
{
  if(frameCount%200===0)
  {
  obstacles = createSprite(1600,random(50,450),20,20)
  var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacles.addImage(carimg);
              break;
      case 2: obstacles.addImage(busimg);
              break;
      case 3: obstacles.addImage(scooterimg);
              break;
      default: break;
    }
    obstacles.scale=0.5
    obstacles.velocityX=-9
    obstacleGroup.add(obstacles)
  }
 
}

function powerUps()
{
  if(frameCount%300===0)
  {
  powerUp = createSprite(1600,random(50,450),30,20) 
  powerUp.addImage(shoeimg)
  powerUp.scale=0.3
  powerUp.velocityX=-9
  powerUpGroup.add(powerUp)
  }
}
  
function coins()
{
  if(frameCount%150==0)
  {
  coin = createSprite(1600,random(50,450),30,20) 
  coin.addImage(coinimg)
  coin.scale=0.08
  coin.velocityX=-9
  
  coinGroup.add(coin)
  }
  
}

