const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var sensivity = 100;
var Esensivity = 100;
var vis = 0;
var state = -1;
var health = 1;

var engine, world;
var box1 , box2;
var ground1 , ground2, ground3 , ground4;
var healthBarYour , healthYour , healthBarEnemy , healthEnemy; 
var cooldown , health_decrease_sp ;
var rand;
var num_deaths , num_wins ;


function setup()
{
    //engine creation 
    createCanvas( 1350 , 757 );
    engine = Engine.create();
    world = engine.world;

    //players
    //box1 = new Box( 400 , 400 , 100 , 100 , 1.2 , 0 , 0 , 2.0 , 1000 , true );//boss enemy
    //box2 = new Box( 400 , 300 , 100 , 100 , 1.2 , 0 , 0 , 2.0 , 1000 , true );//boss you

    box1 = new Box( -1000 , -1000 , 50 , 50 , 1.1 , 0 , 0 , 1.0 , 100 , false );//enemy
    box2 = new Box( -1000 , -1000 , 50 , 50 , 1.1 , 0 , 0 , 1.0 , 100 , false );//you
    
    //boader
    ground1 = new ground( 500 , 1110 , 1900 , 800 , true );//bottom
    ground2 = new ground( 500 , -260 , 1900 , 600  , true );//top
    ground3 = new ground( -460 , 500 , 1000 , 1000 , true );//left
    ground4 = new ground( 1360 , 500 , 150 , 1000 , true );//right
    
    //valuing
    healthYour = health*box2.body.density;
    healthEnemy = health*box1.body.density;
    sensivity = 100*box2.body.density;
    Esensivity = 100*box1.body.density;
    cooldown = 0;
    health_decrease_sp = 10;
    rand = Math.round( random( 10 , 1300 ) );
    deathcounter=1;
    wincounter=1;
    num_deaths = 0;
    num_wins = 0;
    win_rate = (num_wins/num_deaths)*100;

    healthBarYour = new ground( 200 , 20 , healthYour/10 , 10 , true );
    healthBarEnemy = new ground( 1150 , 20 , healthEnemy/10 , 10 , true );

}


function draw()
{
    //canvas and engine
    background( 0 );

    Engine.update( engine );

    display();
    healthreduction();
    healthupdation();
    death();

    if( state===-1 )
    {
        menu();
    }

    if( state===1 || state===0 )
    {
        write();
    }

    if( state===1 )
    {
        fightBack();
    }

    hitingGround();

    cooldown++;
    vis = vis + 5;
    rand = Math.round( random( 10 , 1300 ) );
    win_rate = Math.round((num_wins/num_deaths)*100);
}


function keyPressed()
{

    //movements    
    if( keyCode===UP_ARROW || keyCode===87 )
    {
		Body.applyForce(box2.body,box2.body.position,
            {
                x: box2.body.density*0 ,
                y: box2.body.density*-sensivity
            }
            );
    }

    if( keyCode===DOWN_ARROW || keyCode===83 )
    {
		Body.applyForce(box2.body,box2.body.position,
            {
                x: box2.body.density*0 ,
                y: box2.body.density*sensivity
            }
            );
    }

    if( keyCode===LEFT_ARROW || keyCode===65 )
    {
		Body.applyForce(box2.body,box2.body.position,
            {
                x: box2.body.density*-sensivity ,
                y: box2.body.density*0
            }
            );
    }

    if( keyCode===RIGHT_ARROW || keyCode===68 )
    {
		Body.applyForce(box2.body,box2.body.position,
            {
                x: box2.body.density*sensivity ,
                y: box2.body.density*0
            }
            );
    }

    //pause and resume keys
    if( keyCode===82 )
    {
        Body.setStatic( box1.body , false );
        Body.setStatic( box2.body , false );
        state = 1;
    }
    if( keyCode===80 )
    {
        Body.setStatic( box1.body , true );
        Body.setStatic( box2.body , true );
        state = 0;
    }
}