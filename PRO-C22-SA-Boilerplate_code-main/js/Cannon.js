class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannon_Top = loadImage("./assets/cannon.png");
    this.cannon_Base = loadImage("./assets/cannonBase.png");
  }
  display(){
    if (keyIsDown(RIGHT_ARROW) && this.angle<70){
      this.angle+=2.5
    }

    if (keyIsDown(LEFT_ARROW) && this.angle>-30){
      this.angle-=2.5
    }
    
    //código para criar o topo do canhão
    push();
    translate(this.x,this.y)
    rotate(this.angle);
    imageMode(CENTER);
    image(this.cannon_Top,0,0,this.width,this.height);
    pop();

    //código para criar a base do canhão
    image(this.cannon_Base,70,20,200,200);

  }
}
