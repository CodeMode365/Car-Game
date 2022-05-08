//refrences 
const score = document.querySelector('.score');
const message = document.querySelector('.messageScreen');
const road = document.querySelector('.road')
const gameBody = document.querySelector('.gameBody');



//game starts when messgae is clicked
message.addEventListener('click', startGame);


//Data for Your vehicle
let player = {
    speed: 5,
    score: 0
};

//value To start/stop the game

//When game is started
function startGame() {
    var gameValue = true;

    //hides the message and unhides the road 
    message.style.display = 'none';
    road.innerHTML='';



    //animation
    window.requestAnimationFrame(GamePlay);

    //create scoreBox
    let scoreValue = player.score;


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
        roadLines.y = i * 150;
        roadLines.style.top = (i * 150) + 'px';
        road.appendChild(roadLines);


    }

    //function to move the lines in the road
    const movelines = () => {
        let lines = document.querySelectorAll('.roadLines');
        lines.forEach(function (Ele) {
            //    conole.log(Ele.y);
            Ele.y += player.speed;
            Ele.style.top = Ele.y + 'px';

            //repeating the lines
            if (Ele.y >= 760) {
                Ele.y -= 750;
            }

        })
    }

    //generate enemy vehicles and appen them to the road
    for (let i = 0; i < 4; i++) {
        var EnemyCars = document.createElement('div');
        EnemyCars.classList.add('EnemyCars', 'MyCar');
        EnemyCars.y = i * 300;


        // EnemyCars.style.top = (i * 290) + 'px';
        road.appendChild(EnemyCars);
        let Xpos = Math.round(Math.random() * 250);
        EnemyCars.style.backgroundColor = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
        EnemyCars.style.left = Xpos + 'px';

    }

    //function to move the enemy vehicles downward
    const moveEnemy = () => {
        let enemies = document.querySelectorAll('.EnemyCars');
        enemies.forEach(function (enemy) {

            
            enemy.y += player.speed;
            enemy.style.top = enemy.y + 'px';


            //Checks the gameOver fucntion when collision occurs
            if (carCollision(car, enemy)) {
                gameValue = false;
                // message.classList.remove('hiddenEl')
                message.style.display = 'flex';


            }

            //repeating the enemyCar at random postition
            if (enemy.y >= 800) {
                enemy.y = -300;
                let Xpos = Math.round(Math.random() * 250);
                enemy.style.left = Xpos + 'px';

            }

        })
    }


    //actual position of the vehicles assigned to player object
    player.X = car.offsetLeft;
    player.Y = car.offsetTop;


    //When the game is being played
    function GamePlay() {

        //Increasing score
        scoreValue += 1;
        score.innerHTML = `${scoreValue}`;



        //Your car movement function called
        carMovement(car);

        //enemy vehicle movement
        moveEnemy();

        //call function to Move the lines in the road to downward
        movelines();

        //Car collision (game over)


        //Game play repeating animation
        if (gameValue) {
            console.log(gameValue)

            window.requestAnimationFrame(GamePlay);
        }
    }

}





//Car movement and wallDetecting handler
const carMovement = (car) => {


    const roadData = road.getBoundingClientRect();
    // .log(player.X)
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

//Game over function
function carCollision(car, enemy) {
    let myCarData = car.getBoundingClientRect();
    let enemyCarData = enemy.getBoundingClientRect();
    // return !((myCarData.bottom < enemyCarData.top) || (myCarData.top > enemyCarData.bottom ) || (myCarData.left < enemyCarData.right) || (myCarData.right > enemyCarData.left))
    return !((myCarData.top > enemyCarData.bottom) || (myCarData.left > enemyCarData.right) || (myCarData.right < enemyCarData.left) || (myCarData.bottom < enemyCarData.top))
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

