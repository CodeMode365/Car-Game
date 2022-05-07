const score = document.querySelector('.score');
const message = document.querySelector('.messageScreen');
const road = document.querySelector('.road')
// const MyCar = document.querySelector('.MyCar');

message.addEventListener('click', startGame);

let player = {
    speed: 5,
    X: 0,
    Y: 0,
};


function startGame() {
    message.classList.add('hiddenEl')
    road.classList.remove('hiddenEl')
    window.requestAnimationFrame(GamePlay);
    var car = document.createElement('div');
    car.innerText = 'car';
    car.classList.add('Mycar')
    road.appendChild(car)

    player.X = car.offsetLeft;
    player.Y = car.offsetTop;

    function GamePlay() {
        wallHandler(car);
        carMovement(car);
        window.requestAnimationFrame(GamePlay);


    }

}

const carMovement = (car) => {
    if (keys.ArrowUp) {

        player.Y += -player.speed;
        car.style.top = player.Y + 'px';


    }
    if (keys.ArrowDown) {
        player.Y += player.speed;
        car.style.top = player.Y + 'px';
    }
    if (keys.ArrowLeft) {
        player.X += -player.speed;
        car.style.left = player.X + 'px';
    }
    if (keys.ArrowRight) {
        player.X += player.speed;
        car.style.left = player.X + 'px';
    }
}


/*
const wallHandler = (car) => {
    let carData = {
        width: 60,
        height: 50
    }
    const roadData = road.getBoundingClientRect();
    // console.log(car.offsetLeft)
    // console.log(roadData)
    console.log (roadData.width)
    // console.log(typeof (car.offsetLeft + carData.width))
    if (car.offsetLeft+carData.width >= roadData.width) {
    console.log('misson pass')
    car.style.left=roadData.width-carData.width +'px';
    }

    
    
}
*/



let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
}




const KeyPressed = (e) => {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(e.code)
}

const KeyNotPressed = (e) => {
    keys[e.key] = false;


}

document.addEventListener('keydown', KeyPressed);
document.addEventListener('keyup', KeyNotPressed);

