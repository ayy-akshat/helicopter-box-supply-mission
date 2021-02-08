const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine;
var world;

var helicopterImg, helicopterSprite;
var ground;

var packageBody;
var packageSprite, packageImg;
var packageDropped;

var catchBox1, catchBox2, catchBox3;

var catchSprite;

var HSPEED = 5;

function preload()
{
	helicopterImg = loadImage("helicopter.png");
	packageImg = loadImage("package.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	packageSprite=createSprite(width/2, 80, 50, 50);
	packageSprite.addImage("p", packageImg);
	packageSprite.scale=0.2;
	
	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterImg);
	helicopterSprite.scale=0.6;
	
	engine = Engine.create();
	world = engine.world;

	packageBody = new Box(helicopterSprite.x, -80, 50, 50, "brown");

	//Create a Ground

	ground = new Ground(width/2, 650, width, 10, "white");
	top = new Ground (width/2, -10, width*2, 20);
	
	var r = random(-400, 400);

	// camera.zoom = 0.5;

	catchBox1 = new Ground((width/2)+r, 620, 150, 50, "red");
	catchBox2 = new Ground(300+r, 545, 50, 100, "red");
	catchBox3 = new Ground(500+r, 545, 50, 100, "red");

	catchSprite = createSprite((width/2)+r, 560, 140, 60);
	catchSprite.visible = false;
	
	packageDropped = false;

	reset();

	Engine.run(engine);

	console.log(packageBody);
}


function draw() {
	rectMode(CENTER);
	background(0);

	if (keyWentDown("space") && !packageDropped)
	{
		drop();
	}

	if (keyWentDown("r"))
	{
		reset();
		
	}
	
	if (!packageDropped)
	{
		Matter.Body.setVelocity(packageBody.body, {x:0, y:0});
		camera.x = lerp(camera.x, width/2, 0.2);
		camera.y = lerp(camera.y, height/2, 0.2);
	}
	else
	{
		camera.x = lerp(camera.x, packageBody.body.position.x, 0.05);
		camera.y = lerp(camera.y, packageBody.body.position.y, 0.05);
	}

	helicopterSprite.x += ((keyDown("right")&&helicopterSprite.x<width?1:0) - (keyDown("left")&&helicopterSprite.x>0?1:0)) * HSPEED;

	packageSprite.x = packageBody.body.position.x;
	packageSprite.y = packageBody.body.position.y;
	packageSprite.rotation = 360*packageBody.body.angle/(2*PI);

	if (packageBody.body.position.y	> height*2)
	{
		reset();
	}
	
	ground.display();
	catchBox1.display();
	catchBox2.display();
	catchBox3.display();
	drawSprites();

	fill("white");
	textSize(25);
	textAlign(CENTER);
	text(packageSprite.isTouching(catchSprite)?"Box landed in the correct place! (r to reset)":packageDropped?"Package Dropped, r to reset":"Space to drop package, left/right arrow keys to move helicopter", camera.x, camera.y-300);
}

function reset()
{
	Matter.Body.setPosition(packageBody.body, {x:helicopterSprite.x, y:-80});
	Matter.Body.setVelocity(packageBody.body, {x:0, y:0});
	Matter.Body.setAngle(packageBody.body, 0);
	Matter.Body.setAngularVelocity(packageBody.body, 0);
	packageDropped = false;
}

function drop()
{
	Matter.Body.setPosition(packageBody.body, {x:helicopterSprite.x, y:helicopterSprite.y + 50});
	Matter.Body.setVelocity(packageBody.body, {x:0, y:0});
	Matter.Body.setAngularVelocity(packageBody.body, 0.05);
	packageDropped = true;
}