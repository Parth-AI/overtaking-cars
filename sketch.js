var canvas;
var bg;
var player;
var carImage;
var score;
var gameState;
var car = [];
var lives;
var restart;
var cars;
var carsGroup;
var ran;

function preload(){

    bg = loadImage("images/track.jpg");

    carImage = loadImage("images/car2.png");

    image1 = loadImage("images/car1.png");
    image2 = loadImage("images/car3.png");
    image3 = loadImage("images/car4.png");
}

function setup(){
    canvas = createCanvas(displayWidth-20,displayHeight);
   
    player = createSprite(displayWidth/2,displayHeight/1.1,20,20);

    score = 0;
    gameState = 0;
    lives = 5;

    restart = createButton('RESTART');
    restart.position(displayWidth/1.5,player.y-700);

    carsGroup = createGroup();
    
}

function draw(){
    background("brown");

    image(bg, 0,-displayHeight*4,displayWidth, displayHeight*5);
    player.addImage("player",carImage);

    camera.position.x = displayWidth/2;
    camera.position.y = player.y;

    if(score < 355 && lives >= 0){ 
        if(keyDown(UP_ARROW)){
            player.y = player.y-10;
            score = score+1;
        }

        if(player.x < 1050){      
            if(keyDown(RIGHT_ARROW)){
                player.x = player.x+5;
            }
        }

        if(player.x > 300){ 
            if(keyDown(LEFT_ARROW)){
                player.x = player.x-5;
            }
        }

        if(frameCount%40 === 0){
            //car = new Cars;
            ran = random(1,4);
            var rand= random(300,1000);
            cars = createSprite(rand,player.y-350,20,20);

            carsGroup.add(cars);
                cars.velocityY = random(-3,-9);

            if(this.ran > 1 && this.ran < 2){
                cars.addImage("cars",this.image1);
           }
        
           else if(this.ran > 2 && this.ran < 3){
                cars.addImage("cars",this.image2);
           }
        
           else if(this.ran > 3 || this.ran === 3){
                cars.addImage("cars",this.image3);
           }
        }
        carsGroup.bounceOff(carsGroup);

       // player.bounceOff(carsGroup);
        if(player.isTouching(carsGroup)){
            lives = lives-1;
            player.x = displayWidth/2;
            player.y = displayHeight/1.1;
            score = 0;
        }
        
}
    /*if(gameState === 0 && score === 355){
        gameState = 1;
    }  */ 

    textSize(18);
    fill(0);
    text("SCORE:"+score,displayWidth/1.3,player.y-330);
    text("LIVES REMAINING:"+lives,displayWidth/5,player.y-330);

    if(score >  354){
        textSize(24);
        fill(0);
        text("YOU WIN!!!",displayWidth/2.2,player.y-100); 
    }

    if(lives < 0){
        textSize(24);
        fill(0);
        text("YOU LOSE :(",displayWidth/2.2,player.y-100); 
    }

    
    restart.mousePressed(function(){
        if(score > 354 || lives >= -1){
            player.x = displayWidth/2;
            player.y = displayHeight/1.1;
            score = 0;
            lives = 5;
        }
    });

    //console.log(gameState);
    drawSprites();
}
