var wWidth;
var wHeight;
var wArea;
var wCenter;
var bSize;

var bawls = new Array(0);

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var animationLocation = document.getElementsByClassName('ecc-tab');
canvas.id = 'bawls';

animationLocation[0].appendChild(canvas);

window.addEventListener('resize', init);

function init() {
  wWidth = animationLocation[0].offsetWidth;
  wHeight = animationLocation[0].offsetHeight;
  wArea = wWidth * wHeight;
  wCenter = { x: wWidth / 2, y: wHeight / 2 };
  bSize = wArea / 60000;
  // posNeg gives negative or positive direction to starting x/y velocities randomly
  var posNeg = [1, -1];

  var bawlSizes = [
    bSize,
    bSize * 5.5,
    bSize * 2,
    bSize * 3.8,
    bSize * 1.7,
    bSize * 2.5,
    bSize / 1.5,
    bSize * 12,
    bSize / 1.1,
    bSize * 1.5,
    bSize * 1.8,
    bSize * 3,
    bSize * 4.4,
    bSize * 2,
    bSize / 2,
    bSize * 4,
    bSize,
    bSize,
    bSize * 1.2,
    bSize * 6.3,
  ]; //[11, 13, 15, 17, 19];

  // choose number of bawls
  bawls.length = 20;
  // set canvas size
  canvas.width = wWidth;
  canvas.height = wHeight;

  // set starting places
  var bawlPlace = {
    x: [
      wCenter.x + wWidth / 20,
      wCenter.x + wWidth / 8,
      wCenter.x + wWidth / 5,
      wCenter.x - wWidth / 3.2,
      wCenter.x - wWidth / 15,
      wCenter.x - wWidth / 4,
      wCenter.x - wWidth / 10,
      wCenter.x - wWidth / 12,
      wCenter.x + wWidth / 2.5,
      wCenter.x + wWidth / 4.8,
      wCenter.x,
      wCenter.x,
      wCenter.x + wWidth / 9,
      wCenter.x + wWidth / 7,
      wCenter.x + wWidth / 16,
      wCenter.x - wWidth / 8,
      wCenter.x + wWidth / 6,
      wCenter.x - wWidth / 4.4,
      wCenter.x - wWidth / 7,
      wCenter.x + wWidth / 3.5,
    ],
    y: [
      wCenter.y + wHeight / 20,
      wCenter.y - wHeight / 4.5,
      wCenter.y + wHeight / 8,
      wCenter.y + wHeight / 3.5,
      wCenter.y,
      wCenter.y - wHeight / 4.5,
      wCenter.y - wHeight / 2.5,
      wCenter.y + wHeight / 12,
      wCenter.y - wHeight / 3,
      wCenter.y - wHeight / 8,
      wCenter.y + wHeight / 2.5,
      wCenter.y - wHeight / 6,
      wCenter.y + wHeight / 8,
      wCenter.y + wHeight / 5.2,
      wCenter.y - wHeight / 3,
      wCenter.y - wHeight / 14,
      wCenter.y + wHeight / 20,
      wCenter.y + wHeight / 12,
      wCenter.y - wHeight / 4,
      wCenter.y + wHeight / 20,
    ],
  };

  // create bawls
  var i, len;
  for ((i = 0), (len = bawls.length); i < len; i++) {
    bawls[i] = {
      // set bawl sizes
      m: bawlSizes[i],
    };
    // set starting velocities in x and y direction
    (bawls[i].vx = Math.random() /
      14 *
      posNeg[Math.floor(Math.random() * posNeg.length)]), (bawls[
      i
    ].vy = Math.random() /
      16 *
      posNeg[Math.floor(Math.random() * posNeg.length)]), (bawls[
      i
    ].x = bawlPlace.x[i]);
    bawls[i].y = bawlPlace.y[i];
    bawls[i].ix = bawls[i].x;
    bawls[i].iy = bawls[i].y;
  }
}

function render() {
  var i, j, bawlA, bawlB, len;

  // request new animationFrame
  requestAnimationFrame(render);

  // clear canvas
  ctx.clearRect(0, 0, wWidth, wHeight);

  // refresh bawls
  for ((i = 0), (len = bawls.length); i < len; i++) {
    // x coordinates
    var x = bawls[i].x;
    // y coordinates
    var y = bawls[i].y;
    // set opacity of stroke around bawls
    ctx.lineWidth = 0.12;
    ctx.globalAlpha = 1;
    var radius = bawls[i].m;
    var startAngle = 0;
    var endAngle = 2 * Math.PI;
    // draw the thangs
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.save();
    ctx.strokeStyle = '#006666';
    ctx.stroke();
    // set opacity of bawls
    ctx.globalAlpha = 0.05;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);

    // set gradient for bawls color
    var gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0.4, '#FFFFFF');
    gradient.addColorStop(1, '#006666');
    ctx.fillStyle = gradient;
    ctx.fill();

    bawls[i].x += bawls[i].vx;
    bawls[i].y += bawls[i].vy;
    var diam = bawls[i].m;
    // freeMotion is the invisible box each origin moves about in
    var freeMotion = 8;
    if (
      bawls[i].x >= bawls[i].ix + freeMotion ||
      bawls[i].x <= bawls[i].ix - freeMotion
    ) {
      bawls[i].vx = -bawls[i].vx;
    }
    if (
      bawls[i].y >= bawls[i].iy + freeMotion ||
      bawls[i].y <= bawls[i].iy - freeMotion
    ) {
      bawls[i].vy = -bawls[i].vy;
    }
  }
  // update links
  for ((i = 0), (len = bawls.length - 1); i < len; i++) {
    for (j = i + 1; j < len + 1; j++) {
      bawlA = bawls[i];
      bawlB = bawls[j];

      // draw lines
      // set opacity of lines
      if (j == len) {
        // if last bawl, have lines carry more weight by changing the m value in 'if' statement
        var m = 1;
      } else {
        var m = 1;
      }
      ctx.globalAlpha = 0.09 * m;
      ctx.strokeStyle = '#006666';
      ctx.beginPath();
      ctx.moveTo(bawlA.x, bawlA.y - bawlA.m);
      ctx.lineWidth = 0.2;
      ctx.lineTo(bawlB.x, bawlB.y + bawlB.m);
      ctx.stroke();
      ctx.beginPath();
      ctx.globalAlpha = 0.13 * m;
      ctx.moveTo(bawlA.x, bawlA.y + bawlA.m);
      ctx.lineWidth = 0.3;
      ctx.lineTo(bawlB.x, bawlB.y - bawlB.m);
      ctx.stroke();
      ctx.beginPath();
      ctx.globalAlpha = 0.035 * m;
      ctx.moveTo(bawlA.x + bawlA.m, bawlA.y);
      ctx.lineWidth = 0.3;
      ctx.lineTo(bawlB.x - bawlB.m, bawlB.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.globalAlpha = 0.03 * m;
      ctx.moveTo(bawlA.x - bawlA.m, bawlA.y);
      ctx.lineWidth = 0.2;
      ctx.lineTo(bawlB.x + bawlB.m, bawlB.y);
      ctx.stroke();
    }
  }
}

init();
render();
