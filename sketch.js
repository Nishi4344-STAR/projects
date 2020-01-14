var bird, birdImage, gameOver, gameOverImage, edges, replay, replayImage ;
var PLAY = 1;
var END = 0;
var score= 0;
var gameState = PLAY;
var pillar1, pillar2, pillarGroup1, pillarGroup2;
function preload()
{
  birdImage = loadImage("bird.png");
  gameOverImage = loadImage("gameOver2.png");
  replayImage = loadImage("replay.png");
}

function setup() 
{
  createCanvas(500 ,800);

  bird = createSprite(60, 400, 10, 10);
  bird.addImage(birdImage);
  bird.scale = 0.15;

  gameOver = createSprite(250, 400, 50, 50);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.5;

  edges = createEdgeSprites();

  pillarGroup1 = new Group();
  pillarGroup2 = new Group();
  
  replay = createSprite(250, 600, 50, 50);
  replay.addImage(replayImage);
   replay.visible = false;
  replay.scale = 0.25;
}

function draw() 
{
  background(0); 
  if(gameState===PLAY)
  {
    if(keyWentDown("space"))
    {
      bird.velocityY = -8;
    }

    if (bird.isTouching(edges[2]) || bird.isTouching(edges[3]) || pillarGroup1.isTouching(bird) || pillarGroup2.isTouching(bird)) 
    {
      gameState = END;
      console.log(gameState);
    }

    bird.velocityY += 0.85;

    createPillar1();
    createPillar2();

  }
  else if(gameState===END)
  {
    endGame();
  }
  drawSprites();
  text("score : " + score, 300, 100);
}

function createPillar1()
{
  if(frameCount%60 === 0 && gameState===PLAY)
  {
    pillar1 = createSprite(600, random(50, 140), 100, 400);
    pillarGroup1.add(pillar1);
    pillarGroup1.lifetime = 400;
    pillarGroup1.setVelocityXEach(-5);

  }
}
function createPillar2()
{
  if(frameCount%60 === 0 && gameState===PLAY)
  {
    pillar2 = createSprite(600, random(625, 760), 100, 400);
    pillarGroup2.add(pillar2);
    pillarGroup2.lifetime = 400;
    pillarGroup2.setVelocityXEach(-5);
  }
}
function endGame()
{
  replay.visible =true;
  gameOver.visible = true;
  bird.visible = false;
  pillarGroup1.destroyEach();
  pillarGroup2.destroyEach();
  console.log("ENGAME IS ON");
  if(mousePressedOver(replay))
  {
    restart();
  }
  
}
function restart()
{
  replay.visible =false;
  gameOver.visible = false;
  bird.visible = true;
  bird.y = 200;
  score = 0;
  gameState = PLAY;
}