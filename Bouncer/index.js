console.log("Working");

window.addEventListener("resize", resize); // Don't need to write window.

const canvas = document.querySelector("canvas");
const view = canvas.getContext("2d");


function resize()
{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    view.strokeStyle = "white";
    view.fillStyle = "white";
    view.lineWidth = 3;
    view.lineCap = "round";
}

resize();

class Ball
{
    x = 0;
    y = 0;
    dx = 5;
    dy = 5;

    constructor()
    {
        this.x = canvas.width * Math.random();
        this.y = canvas.height * Math.random();

        this.dx = 10 * Math.random() -5;
        this.dy = 10 * Math.random() -5;

        this.radius = 50;
    }

    update()
    {
        this.x += this.dx;
        this.y += this.dy;

        // Check for edge
        if (this.y > canvas.height)
            {
                this.y = canvas.height;
                this.dy = -this.dy;
            }
        if (this.x > canvas.width)
            {
                this.x = canvas.width;
                this.dx = -this.dx;
            }
        if(this.y < 0)
            {
                this.y = 0;
                this.dy = -this.dy;
            }
        if(this.x < 0)
            {
                this.x = 0;
                this.dx = -this.dx;
            } 
    }

    Draw()
    {
        this.update();
        //view.fillRect(this.x, this.y, this.radius, this.radius);
        view.beginPath();
        view.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        view.fill();
    }
}

const maxBalls = 100;
const balls = [];
for(let i = 0; i < maxBalls; i++)
{
    balls.push(new Ball());
}

function detectCollision(b1, b2)
{
    const d = getSqrt(b1, b2);
    if(d < b1.radius + b2.radius)
    {
        if(b1.radius <= 5 || b2.radius <= 5)
        {
            b1.radius = 5;
            b2.radius = 5;
        }
        else
        {
            b1.radius /= 2;
            b2.radius /= 2;
        }
    }
}

function drawLines(b1, b2)
{
    const d = getSqrt(b1, b2);
    if(d < 200)
    {
        const strokeStyle = `rgba(255, 255, 255, ${1 - d / 200})`;
        view.strokeStyle = strokeStyle;

        view.beginPath();
        view.moveTo(b1.x, b1.y);
        view.lineTo(b2.x, b2.y);
        view.stroke();
    }
}

function getSqrt(b1, b2)
{
    return Math.sqrt((b1.x - b2.x) **2 + (b1.y - b2.y) **2);
}

function animate()
{
    view.clearRect(0, 0, canvas.width, canvas.height);

    // balls.forEach((element) => {
    //     element.Draw();
    // });

    //detectCollision(balls[0], balls[1]);

    for(let i =0; i < balls.length; i++)
    {
        for(let j = i +1; j < balls.length; j++)
        {
            detectCollision(balls[i], balls[j]);
            drawLines(balls[i], balls[j]);
        }
    }

    for (const b of balls) b.Draw();

    //b2.Draw();
    requestAnimationFrame(animate);
}
animate();
