class Box
{
    constructor(x, y, width, height, color)
    {
        var bodyOptions=
        {
            restitution:0.4,
            frictionAir:0,
            friction:1,
            frictionStatic:1,
            density:1
        }
        
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x,y,this.width,this.height,bodyOptions);
        World.add(world,this.body);
        this.color = color;
    }

    display()
    {
        push();
        fill(this.color);
        rectMode(CENTER);
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
        pop();
    }
}