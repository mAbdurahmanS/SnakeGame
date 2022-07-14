const getValueInput = () => {
    // DISPLAY NAME
    let inputName = document.getElementById("name").value;
    let inputTime = document.getElementById("current-time").value;
    let valueName = document.getElementById("name__user");
    let valueTIme = document.getElementById("time__user");

    //ADD DATA TO LOCAL STORAGE
    localStorage.setItem('name', inputName)

    //DISPLAY DATA FROM LOCALSTORAGE
    valueName.textContent=localStorage.getItem("name")

    // CLOSE INSTRUCTION
    let x = document.getElementById("game__menu");
    if (x.style.display === "none") {
    x.style.display = "block";
    } else {
    x.style.display = "none";
    }

    startGame();
    
}

// DISABLE BUTTON
function success() {
    if(document.getElementById("name").value==="") {
    document.getElementById('btn__start').disabled = true;
    } else {
    document.getElementById('btn__start').disabled = false;
    }
}


function startGame() {

  var cvs = document.getElementById("game");
  var ctx = cvs.getContext("2d");

  var cvsW = cvs.width;
  var cvsH = cvs.height;

  var snakeW = 10;
  var snakeH = 10;

  // Timer
  const time_el = document.getElementById('current-time');

  let seconds = 0;
  let interval = null;

  function timer () {
    seconds++;

    // format our time
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - (hrs * 3600)) / 60);
    let secs = seconds % 60;

    if (secs < 10) secs = '0' + secs;
    if (mins < 10) mins = '0' + mins;
    if (hrs < 10) hrs = '0' + hrs;

    time_el.innerText = `${hrs}:${mins}:${secs}`;

    let inputTime = `${hrs}:${mins}:${secs}`;
    let valueTime = document.getElementById("time__user");
    localStorage.setItem('time', inputTime)
    valueTime.textContent=localStorage.getItem("time")
  }

  function start() {
    if (interval) {
      return
    }
    
    interval = setInterval(timer, 1000);
    
  }

  function stop() {
    clearInterval(interval);
    interval = null;
  }

  function reset() {
    stop();
    seconds = 0;
    time_el.innerText = '00:00:00';
  }


  // score var
  var score = 0;

  // default direction
  var direction = "right";

  // read users direction
  document.addEventListener("keydown", getDirection);

  function getDirection(e) {
      if(e.keyCode == 65 && direction != "right"){
          direction = "left";
      }else if(e.keyCode == 87 && direction != "down"){
          direction = "up";
      }else if(e.keyCode == 68 && direction != "left"){
          direction = "right";
      }else if(e.keyCode == 83 && direction != "up"){
          direction = "down";
      }
  }

  function drawSnake(x,y) {
      ctx.fillStyle = "#FFF";
      ctx.fillRect(x*snakeW,y*snakeH, snakeW, snakeH);

      ctx.fillStyle = "#000";
      ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);
  }

  // create our snake object, it will container 4 cells in default
  var len = 6;
  var snake = [];

  for (var i = len-1; i>= 0; i--) {
      snake.push (
          {
              x:i+30,
              y:30
          }
      );
  }

  // create our apple object, it will container 4 cells in default
  // var apples = 4;
  // var food = [];

  // for (var i = apples-1; i >= 0; i--){
  //     food.push(
  //         {
  //             x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
  //             y : Math.round(Math.random()*(cvsH/snakeH-1)+1)
  //         }
  //     ) 
  // }

  // create some food
  food = {
      x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
      y : Math.round(Math.random()*(cvsH/snakeH-1)+1)
  }

  // draw food function
  function drawFood(x,y) {
      ctx.fillStyle = "yellow";
      ctx.fillRect(x*snakeW,y*snakeH, snakeW, snakeH);

      ctx.fillStyle = "#000";
      ctx.strokeRect(x*snakeW, y*snakeH, snakeW, snakeH);
  }

  // check cllision function
  // function checkCollision(x,y,array){
  //     for(var i = 0; i < array.length; i++){
  //         if(x == array[i].x && y == array[i].y){
  //         }
  //     }
  // }

  function drawScore(x){
    document.getElementById('score').innerText = score;
  }

  function draw() {
      ctx.clearRect(0,0,cvsW, cvsH);
      for (var i=0; i<snake.length;i++) {
          var x = snake[i].x;
          var y = snake[i].y;
          drawSnake(x,y);
      }
      // for (var i=0; i<food.length;i++) {
      //     var x = food[i].x;
      //     var y = food[i].y;
      //     drawFood(x,y);
      // }
      
      // drawFood
      drawFood(food.x, food.y);
  
      // snake head
      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      // if the snake hits the wall, it's a game over
      if(snakeX < 0 || snakeY < 0 || snakeX >= cvsW/snakeW || snakeY >= cvsH/snakeH){
        stop();
        document.getElementById("game__over").style.display = "block";
        return false;
    }

      // create a new head, based on the previous head and the direction

      if(direction == "left") snakeX--;
      else if(direction == "up") snakeY--;
      else if(direction == "right") snakeX++;
      else if(direction == "down") snakeY++;

      // if our snake eats the food
      if(snakeX == food.x && snakeY == food.y) {
          food = {
                  x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
                  y : Math.round(Math.random()*(cvsH/snakeH-1)+1)
              }
          var newHead = {
              x : snakeX,
              y : snakeY
          };
          score++;
            let inputScore = score;
            let valueScore = document.getElementById("score__user");
            localStorage.setItem('score', inputScore)
            valueScore.textContent=localStorage.getItem("score")
      }else{
          snake.pop();
          var newHead = {
              x : snakeX,
              y : snakeY
          };
      }

      snake.unshift(newHead);
      drawScore(score);

  }

  start();
  setInterval(draw, 130);


}