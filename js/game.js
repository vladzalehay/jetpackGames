let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let audio_background = new Audio('audio/Sound_background.mp3');
let audio_game_over = new Audio('audio/Sound_game_over.mp3');
let audio_up_motion = new Audio('audio/Sound_up_motion.mp3');

let jetpack = new Image();
let background = new Image();
let foreground = new Image();
let barrierUp = new Image();
let barrierDown = new Image();
let jetpack_fire = new Image();
let score_space = new Image();

jetpack.src = "img/jetpack.png";
jetpack_fire.src = "img/jetpack_fire.png";
background.src = "img/background.png";
barrierUp.src = "img/barrierUp.png";
barrierDown.src = "img/barrierDown.png";
foreground.src = "img/foreground.png";
score_space.src = "img/score_space.png";

let garv = 2;
let xPos = 200;
let yPos = 100;
let flagPress = 0;
let counterUp = 0;
let counterDown = 0;
let ground = 255;
let xPos_foreground = 0;
let speed = 0.01;
let flag_jeypack_image = 0;

let modal_window = document.getElementById("modal_window");
let modal_window_black_background = document.getElementById("modal_window_black_background");

let score = 0;
let flag_get_user_event = 0;


document.onkeydown = set_flagPress;
document.onkeyup = reset_flagPress;

canvas.addEventListener("touchstart", function (e) { set_flagPress(); });
canvas.addEventListener("touchend", function (e) { reset_flagPress(); });



function button_active(){
    flag_get_user_event = 0;
    location.reload();
    modal_window.hidden = false;
    modal_window_black_background.hidden = false;
}

function InitApp() //Растягиваем холст на весь экран
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function set_flagPress(){
    flagPress = 1; 
    //counterDown = 0.1;
} 

function reset_flagPress(){
    flagPress = 0; 
    //counterUp = 0.1;
}

function moveUp(){
    audio_up_motion.play();
    audio_background.volume = 0.5;
    audio_background.play();
    counterUp += 0.02 
    flag_jeypack_image = 1;   
    yPos += -(garv*counterUp) + (counterDown) - (speed/4); 
    if(counterDown >= 0.1){
        counterDown -= 0.001+(counterUp-(counterUp*0.000001));//
    }
    else
    {
        counterDown = 0;
    }
    
}

function moveDown(){
    audio_up_motion.pause();
    counterDown += 0.0201
    flag_jeypack_image = 0;
    yPos += ((garv+0.2)*counterDown) - (counterUp) + (speed/4); 
    if(counterUp >= 0.1){
        counterUp -= 0.0011+ (counterDown-(counterDown*0.0000001)); //
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

    window.addEventListener("resize", InitApp);
    
ctx.drawImage(background, 0, 0);    



//ctx.drawImage(barrierUp, 500, 0);
//ctx.drawImage(barrierDown, 500, cvs.height - barrierDown.height - 208);


if(flag_get_user_event == 0){

for(let i = 0; i < objBarrier.length; i++){
    ctx.drawImage(barrierUp, objBarrier[i].x, objBarrier[i].y);
    ctx.drawImage(barrierDown, objBarrier[i].x, objBarrier[i].y + barrierUp.height + ground);
    ctx.drawImage(foreground, objBarrier[i].x, 540);
    //ctx.drawImage(score_space, 0, 735);
	

    if(flag_jeypack_image == 0){
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.drawImage(jetpack, xPos, yPos);
    }
    else if(flag_jeypack_image == 1){
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.drawImage(jetpack_fire, xPos, yPos);
    }


    //speed += 1/Math.pow(speed*speed, speed);
    if(speed <= 10){
        speed+=0.0001
    }
    else if(speed > 10 && speed <= 15){
        speed+=0.00002
    }
    else if(speed > 15 && speed <= 20){
        speed+=0.000003
    }
    else if(speed > 20){
        speed+=0.0000004
    }

    objBarrier[i].x -= 5 + speed;

    
    //document.getElementById("score").innerHTML = i;
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
            yPos + jetpack.height-60 >= objBarrier[i].y + barrierUp.height + ground) ||
            yPos + jetpack.height-60 >=  660)
            {
                flag_get_user_event = 1;
                audio_up_motion.pause();
                audio_background.pause();
                audio_game_over.play();
                document.getElementById("modal_window").style.visibility = "visible";
                document.getElementById("modal_window_black_background").style.visibility = "visible";
            }

            if(score != i){
                //ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
                ctx.fillStyle = "rgba(0, 0, 200, 0)";
                ctx.fillRect((canvas.width/2)+140-50,785-50,100,100);
                //ctx.fillText("", (canvas.width/2)+140, 785);   
                ctx.fillStyle = "white";
            }
             

            score = i; 
    
          
}
}

ctx.fillText(score, (canvas.width/2)+140, 785); 
ctx.font = "60px Arial";
ctx.fillStyle = "white";
ctx.fillText( "SCORE:",(canvas.width/2)-100, 785);

if(flag_get_user_event == 0){
    if(flagPress == 1)
    {
        moveUp();
    }
    else{
        moveDown();
    }
    }
    requestAnimationFrame(draw); 
}

barrierDown.onload = draw;
 //draw();