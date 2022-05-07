//refrences 
const score = document.querySelector('.score');
const message = document.querySelector('.messageScreen');
const road = document.querySelector('.road')


//game starts when messgae is clicked
message.addEventListener('click', startGame);


//Data for Your vehicle
let player = {
    speed: 5,
};

//When game is started
function startGame() {
    //hides the message and unhides the road 
    message.classList.add('hiddenEl')
    road.classList.remove('hiddenEl')


    //animation
    window.requestAnimationFrame(GamePlay);

    //create div for car and append it into the road
    var car = document.createElement('div');
    car.innerText = 'car';
    car.classList.add('Mycar')
    road.appendChild(car)


    //create roadlines and append it into the road
    for (let i = 0; i < 30; i++) {
        var roadLines = document.createElement('div');

        // roadLines.setAttribute('class', 'roadLines');
        roadLines.classList.add('roadLines');
        roadLines.y=i*150;
        roadLines.style.top = (i * 150) + 'px';
        road.appendChild(roadLines);

      
    }

    //generate enemy vehicles and appen them to the road
    for (let i = 0; i < 4; i++) {
        var EnemyCars = document.createElement('div');
        EnemyCars.classList.add('EnemyCars', 'MyCar');
        EnemyCars.y=i*150;
        EnemyCars.style.top = (i * 200) + 'px';
        road.appendChild(EnemyCars);
        let Xpos = Math.round(Math.random()*250);
        EnemyCars.style.backgroundColor ='rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
        EnemyCars.style.left =Xpos +'px';
    }

    //actual position of the vehicles assigned to player object
    player.X = car.offsetLeft;
    player.Y = car.offsetTop;


    //When the game is being played
    function GamePlay() {

        //car movement function called
        carMovement(car);

        //call function to Move the lines in the road to downward
        movelines();

        //Game play repeating animation
        window.requestAnimationFrame(GamePlay);

    }

}


//function to move the lines in the road
const movelines = () => {
    let lines = document.querySelectorAll('.roadLines');
    lines.forEach(function(Ele) {
        console.log(Ele.y);
        Ele.y += player.speed;
        Ele.style.top = Ele.y + 'px';

          //repeating the lines
          if(Ele.y>=760){
              Ele.y -=750;
          }

    })
}


//Car movement and wallDetecting handler
const carMovement = (car) => {


    const roadData = road.getBoundingClientRect();
    // console.log(player.X)
    if (keys.ArrowUp && player.Y > 0) {

        player.Y += -player.speed;
        car.style.top = player.Y + 'px';
    }

    if (keys.ArrowDown && player.Y < (roadData.height - 50)) {
        player.Y += player.speed;
        car.style.top = player.Y + 'px';
    }

    if (keys.ArrowLeft && player.X > 0) {
        player.X += -player.speed;
        car.style.left = player.X + 'px';
    }

    if (keys.ArrowRight && player.X < (roadData.width - 50)) {
        player.X += player.speed;
        car.style.left = player.X + 'px';
    }



}


//Object for when key is pressed
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}



//Changes the value of the key object to true when pressed
const KeyPressed = (e) => {
    e.preventDefault();
    keys[e.key] = true;
}


//Changes the value of the key object to false when pressed
const KeyNotPressed = (e) => {
    keys[e.key] = false;


}


//Event listener when key is pressed and released
document.addEventListener('keydown', KeyPressed);
document.addEventListener('keyup', KeyNotPressed);

