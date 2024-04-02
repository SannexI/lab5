
function restart(){
var game = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 7, 2, 2, 2, 2, 2, 7, 1, 7, 2, 2, 2, 2, 2, 7, 1],
		[1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 2, 1],
		[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
		[1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
		[1, 2, 2, 2, 1, 2, 1, 1, 3, 1, 1, 2, 1, 2, 2, 2, 1],
		[1, 2, 1, 2, 2, 2, 1, 3, 5, 3, 1, 2, 2, 2, 1, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 1, 2, 2, 2, 2, 7, 1, 7, 2, 2, 2, 2, 1, 2, 1],
		[1, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 1],
		[1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1],
		[1, 2, 1, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 1, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
		[1, 7, 2, 2, 2, 2, 2, 7, 1, 7, 2, 2, 2, 2, 2, 7, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];
var pacman = {
	x:12,
	y:8,
	
}
var Pincy = {
	x:7,
	y:8
}
var Incy = {
	x:3,
	y:8
}
//var pacIndex = 124; //количество поинтов на карте
var points = 0;
var pacmanSound = new Audio('pacman_chomp.wav');
var Music = new Audio('SAO1.mp3');
Music.volume = 0.05;
pacmanSound.volume = 0.05;	
pacmanSound.currentTime = 1;
pacmanSound.loop = true;
Music.loop = true;


function draw() {
    var html = "";
    var gameMap = document.getElementById("game");
    for (var i = 0; i < game.length; i++) {
        for (var j = 0; j < game[i].length; j++) {
            if (game[i][j] === 1) {
                html += "<div class='wall'></div>";
            } else if (game[i][j] === 2) {
                html += "<div class='coin'></div>";
            } else if (game[i][j] === 3) {
                html += "<div class='bg'></div>";	
            } else if (game[i][j] === 4) {
                html += "<div class='pacman'></div>";
            } else if (game[i][j] === 5) {
                html += "<div class='Pincy'></div>";
            } else if (game[i][j] === 6) {
                html += "<div class='Incy'></div>";
            } else if (game[i][j] === 7) {
				html += "<div class='cherry'></div>";
			}
        }
        html += "<br>";
    }
    gameMap.innerHTML = html;
	document.getElementById("score").innerText = "Points: " + points;
	document.addEventListener('keydown', MoveEvent);	
	ScoreWin();
	moveGhosts();
	lose();
}	

draw();
moveGhosts();


function movePacman(direction) {
    if(direction === "right" && pacman.y + 1 < game[pacman.x].length && game[pacman.x][pacman.y + 1] !== 1 && game[pacman.x][pacman.y + 1] !== 5 && game[Incy.x][Incy.y + 1] !== 6){
        game[pacman.x][pacman.y] = 3;
        pacman.y += 1;
    } else if(direction === "left" && pacman.y - 1 >= 0 && game[pacman.x][pacman.y - 1] !== 1 && game[pacman.x][pacman.y - 1] !== 5 && game[pacman.x][pacman.y - 1] !== 6){
        game[pacman.x][pacman.y] = 3;
        pacman.y -= 1;
    } else if(direction === "down" && pacman.x + 1 < game.length && game[pacman.x + 1][pacman.y] !== 1 && game[pacman.x + 1][pacman.y] !== 5 && game[pacman.x + 1][pacman.y] !== 6){
		pacman.dir = 'down';
        game[pacman.x][pacman.y] = 3;
        pacman.x += 1;
    } else if(direction === "up" && pacman.x - 1 >= 0 && game[pacman.x - 1][pacman.y] !== 1 && game[pacman.x - 1][pacman.y] !== 5 && game[pacman.x - 1][pacman.y] !== 6){
		pacman.dir = 'up';
        game[pacman.x][pacman.y] = 3;
        pacman.x -= 1;
    }
    Music.play();
	pacmanSound.play(); 
    if(game[pacman.x][pacman.y] === 2){
        points++;
    } else if(game[pacman.x][pacman.y] === 7){
        points += 200;
    }
    game[pacman.x][pacman.y] = 4;
    draw();
	var pacmanElement = document.querySelector('.pacman');	
	pacmanElement.classList.remove('up', 'down', 'left', 'right');
	pacmanElement.classList.add(direction);
}

function MoveEvent(){
	if(event.code === 'ArrowRight'){
        movePacman('right');
    } else if(event.code === 'ArrowLeft'){
        movePacman('left');
    } else if(event.code === 'ArrowDown'){
        movePacman('down');
    } else if(event.code === 'ArrowUp'){
        movePacman('up');
    }
}

function generateRandomDirection() {
    var directions = ['up', 'down', 'left', 'right'];
    var randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
}

function moveGhosts() {
    var directions = generateRandomDirection(); // Генерируем случайное направление
    
    if(directions === "up" && Pincy.x - 1 >= 0 && game[Pincy.x - 1][Pincy.y] !== 1 && game[Incy.x - 1][Incy.y] !==6){
        game[Pincy.x][Pincy.y] = 3;
        Pincy.x -= 1;
    } else if(directions === "down" && Pincy.x + 1 < game.length && game[Pincy.x + 1][Pincy.y] !== 1 && game[Incy.x + 1][Incy.y] !==6){
        game[Pincy.x][Pincy.y] = 3;
        Pincy.x += 1;
    } else if(directions === "left" && Pincy.y - 1 >= 0 && game[Pincy.x][Pincy.y - 1] !== 1 && game[Incy.x][Incy.y - 1] !==6){
        game[Pincy.x][Pincy.y] = 3;
        Pincy.y -= 1;
    } else if(directions === "right" && Pincy.y + 1 < game[Pincy.x].length && game[Pincy.x][Pincy.y + 1] !== 1 && game[Incy.x][Incy.y + 1] !==6){
        game[Pincy.x][Pincy.y] = 3;
        Pincy.y += 1;
    }
    game[Pincy.x][Pincy.y] = 5;
	
	if(directions === "up" && Incy.x - 1 >= 0 && game[Incy.x - 1][Incy.y] !== 1 && game[Incy.x - 1][Incy.y] !==5){
		game[Incy.x][Incy.y] = 3;
		Incy.x -= 1;
	} else if(directions === "down" && Incy.x + 1 < game.length && game[Incy.x + 1][Incy.y] !== 1 && game[Incy.x + 1][Incy.y] !==5){
		game[Incy.x][Incy.y] = 3;
		Incy.x += 1;
	} else if(directions === "left" && Incy.y - 1 >= 0 && game[Incy.x][Incy.y - 1] !== 1 && game[Incy.x][Incy.y - 1] !==5){
		game[Incy.x][Incy.y] = 3;
		Incy.y -= 1;
	} else if(directions === "right" && Incy.y + 1 < game[Incy.x].length && game[Incy.x][Incy.y + 1] !== 1 && game[Incy.x][Incy.y + 1] !==5){
		game[Incy.x][Incy.y] = 3;
		Incy.y += 1;
	}
	game[Incy.x][Incy.y] = 6;
}
setTimeout(moveGhosts, 1000);
function ScoreWin() {
    var totalCoins = 0;
    for (var i = 0; i < game.length; i++) {
        for (var j = 0; j < game[i].length; j++) {
            if (game[i][j] === 2) { 
                totalCoins++;
            }
        }
    }
console.log('total:', totalCoins);
	var message = document.getElementById("Win");
	if(totalCoins == 0){
		Music.pause();
		pacmanSound.pause();
		var winMusic = new Audio('win.mp3');
		winMusic.play();
		setTimeout(restart, 15000);
		document.removeEventListener('keydown', MoveEvent);
		if(message){
			message.innerText = "YOU WIN!";
			message.style.display = 'block';
			document.removeEventListener('keydown', MoveEvent);
			setTimeout(function(){
				message.style.display = "none";
			}, 15000);
		}else{
			console.error("Brake");
		}
	}
}

function lose(){
	var message2 = document.getElementById("lose");
	if(game[pacman.x][pacman.y] == 5 || game[pacman.x][pacman.y] == 6){
		Music.pause();
		pacmanSound.pause();
		var loseMusic = new Audio('lost.mp3');
		loseMusic.play();
		setTimeout(restart, 15000);
		document.removeEventListener('keydown', MoveEvent);
		if(message2){
			message2.innerText = "YOU LOSE! TRY AGAIN!";
			message2.style.display = 'block';
			document.removeEventListener('keydown', MoveEvent);
			setTimeout(function(){
				message2.style.display = "none";
			}, 15000);
		}else{
			console.error("Brake");
		}
	}
}
}
restart();
