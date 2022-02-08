//mudando o nome dos módulos
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, cannonBall;
var balls=[], boat, Boats=[];
//matriz vázia para adicionar elementos

function preload() {
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


  angleMode(DEGREES);
  angle=20
  cannon=new Cannon(180,110,130,100,angle);
}

function draw() {
  image(backgroundImg,0,0,1200,600);

  //atualizando as condições fisicas
  Engine.update(engine);

  //desenhando os objetos
  rect(ground.position.x, ground.position.y, width * 2, 1);

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
  };
};

function keyPressed(){
  if (keyCode==DOWN_ARROW){
    cannonBall=new CannonBall(cannon.x,cannon.y)
    cannonBall.trajectory=[]
    Matter.Body.setAngle(cannonBall.body,cannon.angle)
    balls.push(cannonBall)
  };
};

function showBalls(Ball, index){
  if (Ball){
    Ball.display
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
  boat=new Boat(width,height-60,170,170,position);
  Boats.push(boat);
};
    for (var i=0; i<Boats.length;i++){
      if (Boats[i]){
        Matter.Body.setVelocity(Boats[i].body,{x:-2,y:0});
        Boats[i].display();
      };
    };
}else {
  boat=new Boat(width,height-60,170,170,-60);
  Boats.push(boat);
};

};