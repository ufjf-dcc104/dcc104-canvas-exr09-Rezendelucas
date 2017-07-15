var canvas;
var ctx;
var map;
var pc;
var dt;
var images;
var anterior = 0;
var frame = 0;
var time = 20000;
var victory = false;
var lose = false;
var message;

function init(){
  canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 520;
  canvas.height = 520;
  ctx = canvas.getContext("2d");

  images = new ImageLoader();
  images.load("pc","pc.png");


  pc = new Sprite();
  pc.images = images;

  map = new Map(Math.floor(canvas.height/40), Math.floor(canvas.width/40));
  map.images = images;
  map.setCells([
    [5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5],
    [5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5],
    [5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5],
    [5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5],
    [5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5],
    [5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,2,2,2,2,2,2,1,2,5],
    [5,2,4,3,2,2,2,2,2,1,1,2,2,2,2,1,1,1,1,2,2,2,3,1,2,2,5],
    [5,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,2,2,5],
    [5,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5],
    [5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5],
  ], pc);
  initControls();
  requestAnimationFrame(passo);
}

function passo(t){
    dt = (t-anterior)/1000;
    requestAnimationFrame(passo);
    
  if(!victory && !lose){
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(Math.floor(canvas.width/2-pc.x),Math.floor(canvas.height/2-pc.y));
    
    //atualizaçoes
    pc.mover(map, dt);

    //render
    map.desenhar(ctx, images);
    pc.desenhar(ctx);

    //atualiza dados
    anterior = t;
    ctx.restore();


    timeOut(dt); 
  }else if(lose){
    message = "You Lose!";
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }else if(victory){
    message = "You Win!";
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }

  hud();
}

function timeOut(dt){
  time = time - dt*10;
  if(time <= 0)
    lose = true;
};

function hud(){
  if(!victory && !lose){
  ctx.fillStyle = "black"
  ctx.fillText("Tempo", 285, 20);
  ctx.fillStyle = "orange"
  ctx.fillRect(285, 30, time, 10);
  ctx.strokeRect(285, 30, time, 10);
  }else if(victory){
    ctx.font="20px Verdana";
    ctx.fillStyle = "red";
    ctx.fillText(message, 185, 235); 
  }else if(lose){
    ctx.font="20px Verdana";
    ctx.fillStyle = "red";
    ctx.fillText(message, 185, 235); 
  }
}

function initControls(){
  addEventListener('keydown', function(e){
    switch (e.keyCode) {
      case 32:
        if(pc.isGround) { 
          pc.isJump = true;
          pc.vy = -125;
        }
        e.preventDefault();
        break;
      case 37:
        pc.vx = -100;
        pc.pose = 2;
        e.preventDefault();
        break;
      case 38:
        e.preventDefault();
        break;
      case 39:
        pc.vx = 100;
        pc.pose = 0;
        e.preventDefault();
        break;
      case 40:
        e.preventDefault();
        break;
      default:
    }
  });
  addEventListener('keyup', function(e){
    switch (e.keyCode) {
      case 32:
        pc.vy = 0;
        break;
      case 37:
        pc.ax = 0;
        pc.vx = 0;
        pc.pose = 4;
        break;
      case 39:
        pc.ax = 0;
        pc.vx = 0;
        pc.pose = 4;
        break;
      default:

    }
  });
}
