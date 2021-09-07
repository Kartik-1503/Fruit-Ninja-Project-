//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1img, fruit2img ,fruit3img,fruit4img, monsterImage, gameOverImage;
var gameOverSound ,knifeSwoosh;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1img = loadImage("fruit1.png");
  fruit2img = loadImage("fruit2.png");
  fruit3img = loadImage("fruit3.png");
  fruit4img = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7 
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  
  monsterGroup=createGroup();
  
  fruitGroup=createGroup();
   
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    if(fruitGroup.isTouching(knife)){
       
      fruitGroup.destroyEach();      
      knifeSwooshSound.play();
      score=score+5;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        //gameover sound
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }}
      }
  
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,200,50);
}


function Monster(){
  if(World.frameCount%200===0){
    
    monster=createSprite(400,200,20,20);
     
    monster.addAnimation("moving", monsterImage);
    
    monster.y=Math.round(random(100,550));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
if(World.frameCount%90===0){
     position=Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
   if(position===1){
       fruit.x=500;
     fruit.velocityX=-(8+(score/4));
  
     }
  else{
    if(position===2){
       fruit.x=0;
     fruit.velocityX=-(8+(score/4));
  
     }
    

  }
     fruit.scale=0.2;
   r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1img);
    } else if (r == 2) {
      fruit.addImage(fruit2img);
    } else if (r == 3) {
      fruit.addImage(fruit3img);
    } else {
      fruit.addImage(fruit4img);
    }
    
    fruit.y=Math.round(random(50,550));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  
  }
}


 