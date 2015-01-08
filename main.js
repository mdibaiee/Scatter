var $c     = document.getElementById('c'),
    c      = $c.getContext('2d'),
    // RGBA colors
    colors = [[224, 56, 56, 1], [252, 191, 22, 1],
             [129, 219, 39, 1], [39, 162, 219, 1],
             [219, 39, 159, 1]],
    balls  = [];


// To reduce calculations
const fourty = Math.PI/4;
const ninety = Math.PI/2;

// Degrees, used to move circles in their direction
// 45, 135, 225, 315
var degrees = [fourty, fourty*3, Math.PI+fourty, Math.PI+fourty*3];

function add(x, y) {
  var index = Math.floor(Math.random()*colors.length);
  var radius = Math.random()*10;
  balls.push({
    color: colors[index].slice(0),
    x: Math.random() < 0.5 ? x+Math.random() : x-Math.random(),
    y: Math.random() < 0.5 ? y+Math.random() : y-Math.random(), 
    r: radius,
    deg: degrees[Math.floor(Math.random()*degrees.length)]
  });
}

var reqAnimationFrame = mozRequestAnimationFrame ||
                        webkitRequestAnimationFrame ||
                        msRequestAnimationFrame ||
                        oRequestAnimationFrame ||
                        requestAnimationFrame;

(function loop() {
	reqAnimationFrame(function() {
		c.clearRect(0, 0, $c.width, $c.height);

		for( var i = 0; i < balls.length; i++ ) {
      var ball = balls[i];

      // If ball has faded away completly, remove it
			if(ball.color[3] < 0.01) {
        balls = balls.slice(0, i).concat(balls.slice(i+1, balls.length));
        i--;
        continue;
			}
      ball.color[3] -= 0.01;
			
			var dx = ball.x + Math.random()*5*Math.sin(ball.deg);
			var dy = ball.y + Math.random()*5*Math.cos(ball.deg);
			ball.x = dx;
			ball.y = dy;
			ball.r = ball.r + 1;
			
      c.beginPath();
      c.fillStyle = 'rgba(' + ball.color.join(',') + ')';
			c.arc(dx, dy, ball.r, 0, 2*Math.PI);
			c.fill();
			}
		loop();
	})
})();


var isMouseDown = false,
    interval = null,
    mouse = {};

$c.addEventListener('mousedown', function(e) {
  isMouseDown = true;
  mouse = {x: e.pageX, y: e.pageY};
  interval = setInterval(function() {
    if(isMouseDown) {
      add(mouse.x, mouse.y);
    }
  }, 100)
})
$c.addEventListener('mouseup', function() {
	isMouseDown = false;
  clearInterval(interval);
})
$c.addEventListener('mousemove', function(e) {
	if(isMouseDown) {
		add(e.pageX, e.pageY)
	}
  mouse = {x: e.pageX, y: e.pageY};
})


window.onresize = function() {
  $c.setAttribute('width', window.innerWidth);
  $c.setAttribute('height', window.innerHeight);
}

window.onresize();

