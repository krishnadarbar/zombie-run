//write all variables here
var bg,bgImg
var zombie1,zombie2,graveImg,zombie
var boy,boyImg
var buttonUp,buttonImg
var ground
var zombiesGroup
var gameState="play";
var coin,coinImg,coingroup
var score=0;
var gameover
var portion,portionimg,portionGroup

//load all images here///////////////////////////////////////////////////////////////////////////////preload
function preload(){
bgImg=loadImage("game/background.jpg")
zombie1=loadImage("game/download.jpg")
zombie2=loadImage("game/zombie3.jpg")
graveImg=loadImage("game/grave 1.png")
coinImg=loadImage("game/coin 1.jpg")
boyImg=loadImage("game/boy.png")
buttonImg=loadImage("game/button.jpg")
gameover=loadImage("game/game over.jpg")
portionimg=loadImage("game/power up 1.jpg")
}

//set evry sprites here /////////////////////////////////////////////////////////////////////////////////setup
function setup() {
 
 //create canvas
  createCanvas(800,400);

  //create background
 bg=createSprite(400,150,1200,400)
 bg.addImage(bgImg);
 bg.scale=1;
 bg.velocityX=-5

//create ground
ground=createSprite(400,390,900,20)
ground.visible=false;

//create boy here
boy=createSprite(50,340,15,15)
boy.addImage(boyImg);
boy.scale=0.6

//create button 
buttonUp=createSprite(75,40,20,20)
buttonUp.addImage(buttonImg)
buttonUp.scale=0.3

//create groups here
coinsgroup=new Group();
zombiesGroup=new Group();
portionGroup=new Group();

}

//create function draw here///////////////////////////////////////////////////////////////////////////////////draw
function draw() {

//bg colour
background("black");  
// write gamestate play and its conditions here//////////////////////play

if (gameState==="play"){
drawSprites();
  //reconnect background here
if(bg.x<300){
  bg.x=400;
}

//write condition for button 
if(mousePressedOver(buttonUp)){
boy.velocityY=-15;
}

//gravity to bboy
boy.velocityY=boy.velocityY+0.8

//call new functions here
spawnZombies();
spawnCoins();
spawportion();


//condition to change gamestate to end

boy.collide(ground);
  
if(boy.isTouching(zombiesGroup)){
  gameState="end " 
  zombiesGroup.destroyEach();
  boy.destroy();
  coinsgroup.destroyEach()
  }

if(boy.isTouching(portionGroup)){
  score=score+200
  portionGroup.destroyEach();

}
  
if(boy.isTouching(coinsgroup)){
  score=score+20;
  
  coinsgroup.destroyEach();
}
fill("red")
  textSize(30)
  text("score:"+score,600,50)
  }

  //gamestate end////////////////////////////////////////////end state
  if (gameState==="end "){
    //background("black")
    strokeWeight(5);
    textSize(30)
    fill("white")
    text("gameOver",400,200)
   
   
  }
 // textSize(100)
  //text("red",200,300)
//write coins condition here

}

// function spawnZombies/////////////////////////////////////////////////////////////////////////////////zombies
function spawnZombies(){
  if(frameCount%400===0){
    zombie=createSprite(800,350,15,15);
    zombie.velocityX=-5
    var ran=Math.round(random(1,3))
    if(ran==1){
      zombie.addImage(zombie1)
    } else if(ran==2){
      
      zombie.addImage(zombie2)
    } else if(ran===3){
zombie.addImage(graveImg);
    }
zombie.scale=0.5
zombie.lifetime=800;
console.log(ran)
zombiesGroup.add(zombie)
  }
}

//funtion spawnCoins////////////////////////////////////////////////////////////////////////////////coins
function spawnCoins(){
  if(frameCount%160===0){
    var ran=Math.round (random(150,330))
    coin=createSprite(850,ran,15,15);
    coin.addImage(coinImg);
    coin.velocityX=-5;
    coin.lifetime=700;
    coinsgroup.add(coin);
    coin.scale=0.5;
  }
}

function spawportion(){
  if (frameCount%500===0){
    portion=createSprite(850,170,20,20)
    portion.addImage(portionimg)
    portion.scale=0.3;
    portion.lifetime=600;
    portion.velocityX=-9
    portionGroup.add (portion)

  }
}



