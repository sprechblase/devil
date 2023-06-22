/*
MIT License

Copyright (c) 2023 Samuel Krebs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Body = Matter.Body,
    Events = Matter.Events,
    Bounds = Matter.Bounds,
    Game = document.getElementById("gamecanvas"),
    Pair = Matter.Pair;

var engine = Engine.create();

var render = Render.create({
    element: Game,
    engine: engine,
    options: {
        width: 375,
        height: 667,
        background: 'transparent',
        wireframes: false,
        hasBounds: true,
    }
});


console.log(render.bounds)

var ground = Bodies.rectangle(400, 1050, 2000, 200, {
    isStatic: true,
    render: {
      sprite: {
          texture: "file:///C:/Users/Busin/Documents/GitHub/devil/gms/stack/assets/data/img/StoneFloorTexture.jpg",
          xScale: 2,
          yScale: 0.45,
      }
    },
});

World.add(engine.world, [ground]);

var score = 0;
var timeOutID;
var intervalID;
var box = [];
var hangPoint = [];
var constraint;
var boxIndex = 0;
var hangPointCurrentHeight = 500;
var scoreDisplay = document.getElementById("score")
var secondDisplay = document.getElementById("second")

function createBlock() {
    if (timeOutID) {
        clearTimeout(timeOutID);
    }
    Events.off(engine, 'beforeTick', )

    secondDisplay.textContent = '5';
    intervalID = setInterval(() => {
        secondDisplay.textContent = secondDisplay.textContent - 1;
        if (secondDisplay.textContent < 1) {
            gameOver();
        }
    }, 1000)

    let boxCurrent = Bodies.rectangle(300, hangPointCurrentHeight, 80, 80);
    boxCurrent.render.fillStyle = "#f5c329";
    boxCurrent.frictionAir = 0;
    boxCurrent.restitution = 0;
    console.log(boxCurrent);
    box.push(boxCurrent);
    let hangPointCurrent = Bodies.circle(375 / 2, hangPointCurrentHeight, 10, {
        isStatic: true

    })
    hangPointCurrent.render.fillStyle = "#131801";
    hangPoint.push(hangPointCurrent);

    constraint = Constraint.create({
        bodyA: hangPointCurrent,
        bodyB: boxCurrent,
    })

    World.add(engine.world, [boxCurrent, hangPointCurrent, constraint]);

    boxIndex++;
    score++;
    hangPointCurrentHeight -= 80;
    console.log(score - 1);
    ///
    Bounds.shift(render.bounds, {
        x: hangPoint[boxIndex - 1].position.x - 375 / 2,
        y: hangPoint[boxIndex - 1].position.y - 100
    })

}

function dropBlock() {
    clearInterval(intervalID);
    World.remove(engine.world, [constraint, hangPoint[boxIndex - 1]]);

    Body.setVelocity(box[boxIndex - 1], {
        x: 0,
        y: 0
    });
    scoreDisplay.textContent = 'Score: ' + score;

    Events.on(engine, 'beforeTick', () => {
        if (box[boxIndex - 1].position.y - hangPoint[boxIndex - 1].position.y > 500) {
            Bounds.shift(render.bounds, {
                x: hangPoint[boxIndex - 1].position.x - 375 / 2,
                y: box[boxIndex - 1].position.y - 500
            })
        }
    });
}

createBlock();

var clickListener = document.body.addEventListener('click', dropBlock);


Engine.run(engine);
Render.run(render);
var hitGround = 0;

Events.on(engine, 'collisionStart', (e) => {
    if (timeOutID) {
        clearTimeout(timeOutID);
    }
    let groundHit = e.pairs[0].bodyA.isStatic;

    if (groundHit) {
        hitGround++;
    }
    if (hitGround > 1) {
        gameOver();
    } else {
        if (secondDisplay.textContent > 0) {
            timeOutID = setTimeout(createBlock, 800)
        }

    }

})


function gameOver() {
    box.forEach((i) => {
        i.render.fillStyle = "#f42d29";
    })
    Game.style.filter = "blur(5px) brightness(95%)";
    document.getElementById("cloud1").style.filter = "blur(5px) brightness(95%)";
    document.getElementById("cloud2").style.filter = "blur(5px) brightness(95%)";
    document.getElementById("gameover").style.display = "inline";
    scoreDisplay.textContent = 'Score: ' + score;
    secondDisplay.style.color = "#f42d29";
    clearInterval(intervalID);
    clearTimeout(timeOutID);
    document.body.removeEventListener('click', dropBlock)
}
