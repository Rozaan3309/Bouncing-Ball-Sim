var canvas = document.getElementById('canvas'); //declare canvas
var ctx = canvas.getContext('2d'); //declare kuas nya
canvas.width = innerWidth; //declare lebar canvas
canvas.height = innerHeight - 300; //declare tinggi canvas

function Circle (x, y, r, c){
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;

    this.dx = (Math.random() * 4) + 1;
    this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.dy = (Math.random() * 4) + 1;
    this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle= this.c;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill()
        
    }

    this.animate = function(){
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.r > canvas.width || this.x - this.r < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0){
            this.dy = -this.dy;
        }

        this.draw();
    }
}

const balls = [];
for (let i = 0; i < 20; i++){
    let r = Math.floor(Math.random() * 20) + 15;
    let x = Math.random() * (canvas.width - r * 2) + r;
    let y = Math.random() * (canvas.height - r * 2) + r;
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    let c = `rgba(${red}, ${green}, ${blue}, 1)`;
    balls.push(new Circle(x, y, r, c));
}

canvas.addEventListener('click', function (e) {
    let r = Math.floor(Math.random() * 30) + 15;
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    let c = `rgba(${red}, ${green}, ${blue}, 1)`;
    balls.push(new Circle(e.clientX, e.clientY, r, c
    ));
}); 

function Update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < balls.length; i++){
        balls[i].animate();
    }
    requestAnimationFrame(Update);
}

Update();
