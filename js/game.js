let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let jetpack = new Image();
let background = new Image();
let foreground = new Image();
let barrierUp = new Image();
let barrierDown = new Image();
let jetpack_fire = new Image();

jetpack.src = "img/jetpack.png";
jetpack_fire.src = "img/jetpack_fire.png";
background.src = "img/background.png";
barrierUp.src = "img/barrierUp.png";
barrierDown.src = "img/barrierDown.png";
foreground.src = "img/foreground.png";

let garv = 2;
let xPos = 300;
let yPos = 100;
let flagPress = 0;
let counterUp = 0;
let counterDown = 0;
let ground = 255;
let xPos_foreground = 0;
let speed = 0.01;
let flag_jeypack_image = 0;

document.onkeydown = set_flagPress;
document.onkeyup = reset_flagPress;

function set_flagPress(){
    flagPress = 1; 
    //counterDown = 0.1;
} 

function reset_flagPress(){
    flagPress = 0; 
    //counterUp = 0.1;
}

function moveUp(){
    counterUp += 0.1 
    flag_jeypack_image = 1;   
    yPos += (-(garv*counterUp)) + counterDown - (speed/3); 
    if(counterDown >= 1){
        counterDown -= 0.1+counterUp;
    }
    else
    {
        counterDown = 0;
    }
    
}

function moveDown(){
    counterDown += 0.13
    flag_jeypack_image = 0;
    yPos += ((garv+0.1)*counterDown) - counterUp + (speed/3); 
    if(counterUp >= 1){
        counterUp -= 0.11+counterDown;
    }
    else
    {
        counterUp = 0;
    }
}


let objBarrier = [];

objBarrier[0] = {
    x : cvs.width,
    y : 0
}


function draw(){



ctx.drawImage(background, 0, 0);    

ctx.drawImage(foreground, 0, 560);

if(flag_jeypack_image == 0){
    ctx.drawImage(jetpack, xPos, yPos);
}
else if(flag_jeypack_image == 1){
    ctx.drawImage(jetpack_fire, xPos, yPos);
}
//ctx.drawImage(barrierUp, 500, 0);
//ctx.drawImage(barrierDown, 500, cvs.height - barrierDown.height - 208);


for(let i = 0; i < objBarrier.length; i++){
    ctx.drawImage(barrierUp, objBarrier[i].x, objBarrier[i].y);
    ctx.drawImage(barrierDown, objBarrier[i].x, objBarrier[i].y + barrierUp.height + ground);
    ctx.drawImage(foreground, objBarrier[i].x, 560);

    speed += 0.0003;
    objBarrier[i].x -= 5 + speed;

    document.getElementById("score").innerHTML = i;

    if(objBarrier[i].x >= 100  && objBarrier[i].x <= 105 + speed)
    {
        objBarrier.push({
            x : cvs.width,
            y : Math.floor(Math.random() * barrierUp.height) -  barrierUp.height
        });
    }

    if(xPos + jetpack.width >= objBarrier[i].x && 
        xPos <= objBarrier[i].x + barrierUp.width &&
        (yPos <= objBarrier[i].y + barrierUp.height ||
            yPos + jetpack.height >= objBarrier[i].y + barrierUp.height + ground) ||
            yPos + jetpack.height >=  560)
            
            {
                location.reload();
                alert("АЙ!!! БОЛЬНО ЖЕ...");
                
            }
}


if(flagPress == 1)
{
    moveUp();
}
else{
    moveDown();
}

requestAnimationFrame(draw);
}


barrierDown.onload = draw;
 //draw();