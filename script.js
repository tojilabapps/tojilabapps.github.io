const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

let particles=[];
let mouse={x:null,y:null};

function resize(){

canvas.width=innerWidth;
canvas.height=innerHeight;

particles=[];

let count=Math.min(
window.innerWidth<700?70:130,
Math.floor(innerWidth*innerHeight/8500)
);

for(let i=0;i<count;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-.5)*.45,
vy:(Math.random()-.5)*.45,
size:Math.random()*2+0.5
});

}

}

addEventListener("resize",resize);

addEventListener("mousemove",e=>{
mouse.x=e.clientX;
mouse.y=e.clientY;
});

function draw(){

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

if(mouse.x){

let dx=p.x-mouse.x;
let dy=p.y-mouse.y;

let distance=Math.sqrt(dx*dx+dy*dy);

if(distance<130){

p.x+=dx/distance*.5;
p.y+=dy/distance*.5;

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

ctx.fillStyle="#bda7ff";

ctx.fill();

for(let j=i+1;j<particles.length;j++){

let q=particles[j];

let dx=p.x-q.x;
let dy=p.y-q.y;

let distance=Math.sqrt(dx*dx+dy*dy);

if(distance<115){

ctx.beginPath();

ctx.moveTo(p.x,p.y);
ctx.lineTo(q.x,q.y);

ctx.strokeStyle=
"rgba(157,108,255,"+
((1-distance/115)*.18)+")";

ctx.lineWidth=.7;

ctx.stroke();

}

}

}

requestAnimationFrame(draw);

}

resize();
draw();
EOF
