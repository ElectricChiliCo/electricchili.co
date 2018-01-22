var wWidth, wHeight, wArea,
  wCenter,
  bSize,
  bawls = new Array(0);

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var animationLocation = getEccTabElement();
canvas.id = 'bawls';

animationLocation.appendChild(canvas);
document.getElementsByClassName('list-group')[0].addEventListener('click', init);

function getEccTabElement(){
  return document.getElementsByClassName('ecc-tab')[0];
}

function init() {
  wWidth = animationLocation.offsetWidth;
  wHeight = animationLocation.offsetHeight;
  wArea = wWidth * wHeight;
  wCenter = { x: wWidth / 2, y: wHeight / 2 };
  bSize = wArea / 60000;
  // posNeg gives negative or positive direction to starting x/y velocities randomly
  var posNeg = [1, -1];

  var bawlSizes = [bSize, bSize*5.5, bSize*2, bSize*3.8, bSize*1.7, bSize*2.5, bSize/1.5, bSize*12, 
  bSize/1.1, bSize*1.5, bSize*1.8, bSize*3, bSize/4, bSize*2, bSize/2, bSize*4, bSize, bSize/1.3, 
  bSize*1.2, bSize*1.3, bSize*3.3, bSize/3, bSize/5];
 
  // choose number of bawls
  bawls.length = 23;
  // set canvas size
  canvas.width = wWidth;
  canvas.height = wHeight;

  // set starting places
  var bawlPlace = 
  {
    'x' : [wCenter.x + wWidth/20, wCenter.x + wWidth/8, wCenter.x + wWidth/5,
    wCenter.x - wWidth/2.5, wCenter.x - wWidth/15, wCenter.x - wWidth/3.5, wCenter.x - wWidth/10, 
    wCenter.x - wWidth/12, wCenter.x + wWidth/2.4, wCenter.x + wWidth/4.8, wCenter.x, 
    wCenter.x, wCenter.x + wWidth/9, wCenter.x + wWidth/7, wCenter.x + wWidth/16, 
    wCenter.x - wWidth/8, wCenter.x + wWidth/4.2, wCenter.x - wWidth/4.15, wCenter.x - wWidth/7, 
    wCenter.x + wWidth/4, wCenter.x + wWidth/3.9, wCenter.x + wWidth/5, wCenter.x + wWidth/3.5], 

    'y' : [wCenter.y + wHeight/5, wCenter.y - wHeight/4.5, wCenter.y + wHeight/8, 
    wCenter.y + wHeight/3, wCenter.y, wCenter.y - wHeight/4, wCenter.y - wHeight/2.5, 
    wCenter.y + wHeight/8, wCenter.y - wHeight/4, wCenter.y - wHeight/8, wCenter.y + wHeight/2.5, 
    wCenter.y - wHeight/7, wCenter.y + wHeight/8, wCenter.y + wHeight/4, wCenter.y - wArea/4500, 
    wCenter.y + wHeight/5, wCenter.y + wHeight/3.15, wCenter.y, wCenter.y - wHeight/3.7, 
    wCenter.y + wHeight/3.6, wCenter.y, wCenter.y + wHeight/7, wCenter.y + wHeight/5]
  };
  
  // create bawls
  var i, len;
  for (i = 0, len = bawls.length; i < len; i++) {
    bawls[i] = {
      // set bawl sizes
      m: bawlSizes[i]
    };
    // set starting velocities in x and y direction
    bawls[i].vx = ((Math.random()*posNeg[Math.floor(Math.random()*posNeg.length)])) / (1 + (4000/wWidth));
    bawls[i].vy = ((Math.random()*posNeg[Math.floor(Math.random()*posNeg.length)])) / (1 + (4000/wWidth));
    bawls[i].x = bawlPlace.x[i];
    bawls[i].y = bawlPlace.y[i];
    bawls[i].ix = bawls[i].x;
    bawls[i].iy = bawls[i].y;
  }
}

function render () {
  var i, j,
    bawlA, bawlB, 
    len;

  // request new animationFrame
  requestAnimationFrame(render);

  // clear canvas
  ctx.clearRect(0, 0, wWidth, wHeight);
  
  // refresh bawls
  for (i = 0, len = bawls.length; i < len; i++) {
      // x coordinates
      var x = bawls[i].x;          
      // y coordinates
      var y = bawls[i].y;

      // set opacity of stroke around bawls
      ctx.lineWidth = 0.5 * (wWidth / 1000);
      ctx.globalAlpha = 0.2;
      var radius = bawls[i].m;
      var startAngle = 0;              
      var endAngle = (2*Math.PI);
      // draw the thangs
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
      ctx.save();
      ctx.strokeStyle = '#006666';
      ctx.stroke();
      // set opacity of bawls
      ctx.globalAlpha = 0.09;
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);

      // set gradient for bawls color
      var gradient = ctx.createRadialGradient(x, y, radius/2, x, y, radius);
      gradient.addColorStop(0.1, '#FFFFFF');
      gradient.addColorStop(1, '#004d4d');
      ctx.fillStyle = gradient;
      ctx.fill();

      bawls[i].x += bawls[i].vx;
      bawls[i].y += bawls[i].vy;
      var diam = bawls[i].m;

      // freeMotion is the invisible box each origin moves about in
      var freeMotion = 8 + wWidth/45;
      if (bawls[i].x >= (bawls[i].ix + (freeMotion)) || bawls[i].x <= bawls[i].ix - (freeMotion)) {
        bawls[i].vx = -bawls[i].vx;
      }
      if (bawls[i].y >= (bawls[i].iy + (freeMotion)) || bawls[i].y <= (bawls[i].iy - (freeMotion))) {
        bawls[i].vy = -bawls[i].vy;
      }
  }
    // update links
  for (i = 0, len = bawls.length - 1; i < len; i++) {
    for (j = i + 1; j < len + 1; j++) {
      bawlA = bawls[i];
      bawlB = bawls[j];

      // draw lines
      // set opacity of lines
      if (j == len) {
        // if last bawl, have lines carry more weight by changing the m value in 'if' statement
        var m = 6
      }
      else {
        var m = 1
      }
      var widthy = 0.01 / (wWidth/2000)
      ctx.globalAlpha = 0.09 - widthy;
      ctx.strokeStyle = '#006666';
      ctx.beginPath();
      ctx.moveTo(bawlA.x, bawlA.y - (bawlA.m));
      ctx.lineWidth =  0.3;
      ctx.lineTo(bawlB.x, bawlB.y + (bawlB.m));
      ctx.stroke();
      ctx.beginPath();
      ctx.globalAlpha = 0.07 - widthy;
      ctx.moveTo(bawlA.x, bawlA.y + (bawlA.m));
      ctx.lineWidth = 0.9;
      ctx.lineTo(bawlB.x, bawlB.y - (bawlB.m));
      ctx.stroke();
      ctx.beginPath();
      ctx.globalAlpha = 0.07 - widthy;
      ctx.moveTo(bawlA.x + (bawlA.m), bawlA.y);
      ctx.lineWidth = 0.5;
      ctx.lineTo(bawlB.x - (bawlB.m), bawlB.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.globalAlpha = 0.1 - widthy;
      ctx.moveTo(bawlA.x - (bawlA.m), bawlA.y);
      ctx.lineWidth = 0.2;
      ctx.lineTo(bawlB.x + (bawlB.m), bawlB.y);
      ctx.stroke();
    }
  }
}

init();
render();