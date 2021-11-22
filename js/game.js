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
let fire = new Image();

/*
let game_over1 = new Image();
let game_over2 = new Image();
let game_over3 = new Image();
let game_over4 = new Image();
let game_over5 = new Image();
*/
let flag_game_over = 0;
let iteration = 0;
let iteration1 = 0;

jetpack.src = "img/jetpack.png";
jetpack_fire.src = "img/jetpack_fire.png";
background.src = "img/background.png";
barrierUp.src = "img/barrierUp.png";
barrierDown.src = "img/barrierDown.png";
foreground.src = "img/foreground.png";
score_space.src = "img/score_space.png";
fire.src = "img/fire.png";
/*
game_over1.src = "img/game_over1.png";
game_over2.src = "img/game_over2.png";
game_over3.src = "img/game_over3.png";
game_over4.src = "img/game_over4.png";
game_over5.src = "img/game_over5.png";
*/

let garv = 2;
let xPos = 200;
let yPos = 100;
let flagPress = 0;
let counterUp = 0;
let counterDown = 0;
let ground = 255;
let xPos_foreground = 0;
let speed = 0.001;
let flag_jeypack_image = 0;
let flag_press_button = 0;
let modal_window = document.getElementById("modal_window");
let modal_window_black_background = document.getElementById("modal_window_black_background");
let objBarrier = [];
let score = 0;
let best_score = 0;
let flag_get_user_event = 0;
let game_over_counter = 0;
let i = 0;

document.onkeydown = set_flagPress;
document.onkeyup = reset_flagPress;

canvas.addEventListener("touchstart", function (e) { set_flagPress(); });
canvas.addEventListener("touchend", function (e) { reset_flagPress(); });


function start(){
    objBarrier[0] = {
        x : cvs.width,
        y : 0
    }
    speed = 0.001;
    iteration = 0;
    flag_get_user_event = 0;
    audio_background.volume = 0.5;
    audio_background.play();
    draw();
    document.getElementById("start_window").style.visibility = "hidden";
    document.getElementById("modal_window_black_background").style.visibility = "hidden";
}


function button_reload_active(){
    objBarrier[0] = 0;
    objBarrier[0] = {
        x : cvs.width,
        y : 0
    }
    counterUp = 0;
    counterDown = 0;
    xPos = 200;
    yPos = 100;
    speed = 0.001;
    iteration = 0;
    iteration1 = 0;
    objBarrier.length = 1;
    flag_get_user_event = 0;
    audio_background.volume = 0.5;
    audio_background.play();
    document.getElementById("modal_window").style.visibility = "hidden";
    document.getElementById("modal_window_black_background").style.visibility = "hidden";
    draw();
}


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
    flag_press_button = 1;
    flagPress = 1; 
    //counterDown = 0.1;
} 


function reset_flagPress(){
    flag_press_button = 1;
    flagPress = 0; 
    //counterUp = 0.1;
}


function moveUp(){
    audio_up_motion.play();
    flag_press_button = 1;
    counterUp += 0.01 
    flag_jeypack_image = 1;   
    yPos += -((speed/(speed/1.5))*garv*(counterUp-counterDown)); 
    if(counterDown >= 0.1){
        counterDown -= (counterUp-(counterUp*0.95));//
    }
    else
    {
        counterDown = 0;
    }
}


function moveDown(){
    audio_up_motion.pause();
    counterDown += 0.01
    flag_jeypack_image = 0;
    yPos += ((speed/(speed/1.5))*garv*(counterDown-counterUp)); 
    if(counterUp >= 0.1){
        counterUp -=  (counterDown-(counterDown*0.95)); //
    }
    else
    {
        counterUp = 0;
    }
}


let ii = 0;

function draw(){
    audio_background.play();
    window.addEventListener("resize", InitApp);

//ctx.drawImage(barrierUp, 500, 0);
//ctx.drawImage(barrierDown, 500, cvs.height - barrierDown.height - 208);

for(let counter = iteration1; counter < objBarrier.length; counter++)
{
    if(counter == 0)
    {
        iteration1 = counter;
    }
    else if(counter == 1)
    {
        iteration1 = counter - 1;
    } 
    else   
    {
        iteration1 = counter - 1;
    } 

    if(counter % 2 == 0)
    {
        ctx.drawImage(background, ii , 0);
        ctx.drawImage(background, ii + background.width, 0);
        ii--;
        if(ii == - background.width)
        {
            ii = 0;
        }
    }
}

for(i = iteration; i < objBarrier.length; i++){

    if(score == 0 && yPos + jetpack.height-60 >=  290 && flag_press_button == 0)
    {
        document.getElementById("text_window").style.visibility = "visible";
        //document.getElementById("modal_window_black_background").style.visibility = "visible";

        for(let i = 0; i < 100000000; i++)
        {
            i++;
        }
    }
    if(flag_press_button == 1)
    {
        document.getElementById("text_window").style.visibility = "hidden";
        //document.getElementById("modal_window_black_background").style.visibility = "hidden";
    }

    if(i == 0)
    {
        iteration = i;
    }
    else if(i == 1)
        iteration = i - 1;
    else    
        iteration = i - 2;

    ctx.drawImage(barrierUp, objBarrier[i].x, objBarrier[i].y);
    ctx.drawImage(barrierDown, objBarrier[i].x, objBarrier[i].y + barrierUp.height + ground);
    ctx.drawImage(foreground, objBarrier[i].x, 540);

    if(i == 0)
    {
        ctx.drawImage(foreground, objBarrier[i].x - foreground.width, 540);
    }

    //ctx.drawImage(score_space, 0, 735);

    if(flag_jeypack_image == 0){
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.drawImage(jetpack, xPos, yPos);
    }
    else if(flag_jeypack_image == 1){
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.drawImage(jetpack_fire, xPos, yPos);
    }

    if(flag_get_user_event == 0){
    //speed += 1/Math.pow(speed*speed, speed);
    if(speed <= 10){
        speed+=0.0009
    }
    else if(speed > 10 && speed <= 15){
        speed+=0.00009
    }
    else if(speed > 15 && speed <= 20){
        speed+=0.000025
    }
    else if(speed > 20){
        speed+=0.00000125
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
                if(flag_press_button == 0)
                {
                    document.getElementById("text_window").style.visibility = "hidden";
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

            if(score != i){
                //ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
                ctx.fillStyle = "rgba(0, 0, 200, 0)";
                ctx.fillRect((canvas.width/2)+140-50,785-50,100,100);
                //ctx.fillText("", (canvas.width/2)+140, 785);   
                ctx.fillStyle = "white";
            }            
}
score = i; 
}

if(flag_get_user_event == 0){
    ctx.fillStyle = "rgba(200, 200, 200, 0.7)";
    ctx.fillText(score, (canvas.width/2)+140, 785); 
    ctx.font = "60px Arial";
    //ctx.fillStyle = "white";
    ctx.fillText( "SCORE:",(canvas.width/2)-100, 785);
    if(flagPress == 1)
    {
        moveUp();
    }
    else{
        moveDown();
    } 
    requestAnimationFrame(draw); 
}
else{
    game_over();
}
}

//barrierDown.onload = draw;
 //draw();


 function game_over(){
 /*    
    i = iteration;

    switch(game_over_counter)
    {
        case 10:
            {
                ctx.drawImage(background, ii , 0);
                ctx.drawImage(barrierUp, objBarrier[i].x, objBarrier[i].y);
                ctx.drawImage(barrierDown, objBarrier[i].x, objBarrier[i].y + barrierUp.height + ground);
                
                ctx.drawImage(foreground, objBarrier[i].x - foreground.width, 540);
                ctx.drawImage(foreground, objBarrier[i].x + foreground.width, 540);
                ctx.drawImage(foreground, objBarrier[i].x, 540);
                ctx.drawImage(game_over1, xPos-100, yPos-160);
            }
        break;

        case 20:
            {
                ctx.drawImage(background, ii , 0);
                ctx.drawImage(barrierUp, objBarrier[i].x, objBarrier[i].y);
                ctx.drawImage(barrierDown, objBarrier[i].x, objBarrier[i].y + barrierUp.height + ground);
                
                ctx.drawImage(foreground, objBarrier[i].x - foreground.width, 540);
                ctx.drawImage(foreground, objBarrier[i].x + foreground.width, 540);
                ctx.drawImage(foreground, objBarrier[i].x, 540);
                ctx.drawImage(game_over2, xPos-100, yPos-160);
            }
        break;

        case 30:
            {
                ctx.drawImage(background, ii , 0);
                ctx.drawImage(barrierUp, objBarrier[i].x, objBarrier[i].y);
                ctx.drawImage(barrierDown, objBarrier[i].x, objBarrier[i].y + barrierUp.height + ground);
                
                ctx.drawImage(foreground, objBarrier[i].x - foreground.width, 540);
                ctx.drawImage(foreground, objBarrier[i].x + foreground.width, 540);
                ctx.drawImage(foreground, objBarrier[i].x, 540);
                ctx.drawImage(game_over3, xPos-100, yPos-160);
            }
        break;

        case 40:
            {
                ctx.drawImage(background, ii , 0);
                ctx.drawImage(barrierUp, objBarrier[i].x, objBarrier[i].y);
                ctx.drawImage(barrierDown, objBarrier[i].x, objBarrier[i].y + barrierUp.height + ground);
                
                ctx.drawImage(foreground, objBarrier[i].x - foreground.width, 540);
                ctx.drawImage(foreground, objBarrier[i].x + foreground.width, 540);
                ctx.drawImage(foreground, objBarrier[i].x, 540);
                ctx.drawImage(game_over4, xPos-100, yPos-160);
                game_over_counter = 0;
            }
        break;

        case 100:
            {
                ctx.drawImage(game_over5, xPos-100, yPos-160);
                game_over_counter = 0;
            }
        break;
    }
*/
 //   game_over_counter++;

        if(best_score < score)
        {
            best_score = score;
        }
        document.getElementById("modal_window_black_background").style.visibility = "visible";
        ctx.drawImage(fire, xPos, yPos);
        //ctx.rotate(+0.001);
        
        ctx.font = "160px Arial";
        ctx.fillStyle = "white";
        ctx.fillText( "GAME OVER",(canvas.width/2-500), 400);
    
        ctx.font = "60px Arial";
        ctx.fillText(score, (canvas.width/2)+100, 470); 
        ctx.fillText( "SCORE:",(canvas.width/2)-140, 470);
    
        ctx.font = "28px Arial";
        ctx.fillText(best_score, (canvas.width/2)+95, 510); 
        ctx.fillText( "BEST SCORE:",(canvas.width/2)-115, 510);

        /*
        if(flag_get_user_event == 1)
        {
            requestAnimationFrame(game_over); 
        } */      
    }

