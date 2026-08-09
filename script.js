cat > script.js <<'EOF'
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

let mouse = {
x:null,
y:null
};

function resize(){

canvas.width = innerWidth;
canvas.height = innerHeight;

particles = [];

let amount = Math.min(
140,
Math.floor(innerWidth * innerHeight / 9000)
);

for(let i=0;i<amount;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

size:Math.random()*2+0.5,

vx:(Math.random()-.5)*0.7,
vy:(Math.random()-.5)*0.7

});

}

}

addEventListener("resize",resize);

addEventListener("mousemove",e=>{

mouse.x=e.clientX;
mouse.y=e.clientY;

});

function animate(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

for(let i=0;i<particles.length;i++){

let p=particles[i];

p.x+=p.vx;
p.y+=p.vy;

if(p.x<0)p.x=canvas.width;
if(p.x>canvas.width)p.x=0;

if(p.y<0)p.y=canvas.height;
if(p.y>canvas.height)p.y=0;

if(mouse.x!==null){

let dx=p.x-mouse.x;
let dy=p.y-mouse.y;

let distance=Math.sqrt(dx*dx+dy*dy);

if(distance<150){

p.x+=dx/distance*0.7;
p.y+=dy/distance*0.7;

}

}

ctx.beginPath();

ctx.arc(
p.x,
p.y,
p.size,
0,
Math.PI*2
);

ctx.fillStyle="rgba(170,120,255,.8)";

ctx.fill();

for(let j=i+1;j<particles.length;j++){

let p2=particles[j];

let dx=p.x-p2.x;
let dy=p.y-p2.y;

let distance=Math.sqrt(dx*dx+dy*dy);

if(distance<100){

ctx.beginPath();

ctx.moveTo(p.x,p.y);
ctx.lineTo(p2.x,p2.y);

ctx.strokeStyle=
"rgba(150,100,255,"+
(1-distance/100)*.2+
")";

ctx.stroke();

}

}

}

requestAnimationFrame(animate);

}

resize();
animate();
EOF
