//mudando o nome dos módulos
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, cannonBall;
var balls=[], boat, Boats=[];

//matriz vázia para adicionar elementos

var boatAnimation=[];
var boatSpritedata,boatSpritesheet;

var brokenAnimation=[];
var brokenSpritedata,brokenSpritesheet;
var backgroundSound,pirataLaughSound,cannonExplosionSound;

function preload() {
  backgroundSound = loadSound("./assets/background_music.mp3");
  pirataLaughSound = loadSound("./assets/pirate_laugh.mp3");
  cannonExplosionSound = loadSound("./assets/cannon_explosion.mp3");
  brokenSpritedata = loadJSON("./assets/boat/broken_boat.json");
  brokenSpritesheet = loadImage("./assets/boat/broken_boat.png");
  boatSpritedata = loadJSON("./assets/boat/boat.json");
  boatSpritesheet = loadImage("./assets/boat/boat.png");
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {

  canvas = createCanvas(1200, 600);
  
  //criando o motor fisico e adicionando ao mundo
  engine = Engine.create();
  world = engine.world;
  
  //propriedade para que o objeto de mantenha parado
  var options = {
    isStatic: true
  }

  //criando o corpo do chão e adicionando ao mundo
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  //criando o corpo da torre e adicionando ao mundo
  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  //loot para os frames.
  var boatFrames=boatSpritedata.frames;
  for (var i=0;i<boatFrames.length;i++){
    var pos=boatFrames[i].position;
    var img=boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);
  }

  var brokenFrames=brokenSpritedata.frames;
  for (var i=0;i<brokenFrames.length;i++){
    var pos=brokenFrames[i].position;
    var img=brokenSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
    brokenAnimation.push(img);
  }


  angleMode(DEGREES);
  angle=20
  cannon=new Cannon(180,110,130,100,angle);
}

function draw() {
  image(backgroundImg,0,0,1200,600);

  //atualizando as condições fisicas
  Engine.update(engine);

  //desenhando os objetos
  rect(ground.position.x, ground.position.y, width *2, 1);

  push();
  //definindo o centro da imagem como origem
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop(); 
  
  cannon.display(); 
  showBoats();

  //loop para acessar a matriz dos tiros
  for(var i=0; i<balls.length;i++){
    showBalls(balls[i],i);
    collisionBoat(i);
  };
};

function keyPressed(){
  if (keyCode==DOWN_ARROW){
    cannonBall=new CannonBall(cannon.x,cannon.y);
    cannonBall.trajectory=[];
    Matter.Body.setAngle(cannonBall.body,cannon.angle);
    balls.push(cannonBall);
  };
};

function showBalls(Ball, index){
  if (Ball){
    Ball.display();
  };
};

//função para atirar
function keyReleased(){
  if (keyCode==DOWN_ARROW){
cannonBall.shoot();
  };
}; 

function showBoats(){
if (Boats.length>0){
  if (Boats[Boats.length-1]== undefined || Boats[Boats.length-1].body.position.x< width- 300){
  var positions=[-40,-60,-70,-20];
  var position=random(positions);
  boat=new Boat(width,height-60,170,170,position,boatAnimation);
  Boats.push(boat);
};
    for (var i=0; i<Boats.length;i++){
      if (Boats[i]){
        Matter.Body.setVelocity(Boats[i].body,{x:-2,y:0});
        Boats[i].display();
        Boats[i].animate();
      };
    };
}else {
  boat=new Boat(width,height-60,170,170,-60,boatAnimation);
  Boats.push(boat);
};
};

function collisionBoat(index){
  for (var i=0;i<Boats.length;i++){
    if (balls[index]!==undefined && Boats[i]!==undefined){
      var collision=Matter.SAT.collides(balls[index].body,Boats[i].body)
      if (collision.collided){
        Boats[i].remove(i);

        Matter.World.remove(world,balls[index].body);
        delete balls[index];
      };
    };
  };
};

