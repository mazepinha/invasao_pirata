class Boat{
    constructor(x,y,width,height,boatPos,boatAnimation){
        this.Animation=boatAnimation;
        this.speed=0.05;
        this.body=Bodies.rectangle(x,y,width,height);
        this.width=width;
        this.height=height;
        this.image=loadImage("./assets/boat.png");
        this.boatPosition=boatPos;
        World.add(world,this.body);
    };
      animate(){
          this.speed+=0.5;
      };
    display(){
        var pos=this.body.position;
        var angle=this.body.angle;
        var index= floor(this.speed%this.Animation.length);

        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.Animation,0,this.boatPosition,this.width,this.height);
        pop();
    };
  remove(index){
      setTimeout(() =>{
          Matter.World.remove(world,Boats[index].body);
          delete Boats[index];
      },2000);
    };
};
