function restart(){
var game = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
		[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
		[1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1],
		[1, 2, 2, 2, 1, 2, 1, 1, 3, 1, 1, 2, 1, 2, 2, 2, 1],
		[1, 2, 1, 2, 2, 2, 1, 5, 6, 3, 1, 2, 2, 2, 1, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1],
		[1, 2, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 2, 1],
		[1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1],
		[1, 2, 1, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 1, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];
var pacman = {
	x:12,
	y:8
}
var Pincy = {
	x:7,
	y:7
}
var Incy = {
	x:7,
	y:8
}
//var pacIndex = 124; //количество поинтов на карте
var points = 0;
var pacmanSound = new Audio('pacman_chomp.wav');
pacmanSound.loop = false;
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
            }
        }
        html += "<br>";
    }
    gameMap.innerHTML = html;
	document.getElementById("score").innerText = "Points: " + points;
	document.addEventListener('keydown', MoveEvent);
	ScoreWin();
}	

draw();



function movePacman(direction) {
    var pacmanElement = document.querySelector('.pacman');

    if (direction === "up") {
        pacmanElement.style.backgroundImage.transform = "url(pacUp)";
    } else if (direction === "down") {
        pacmanElement.style.backgroundImage = "url(pacDown)";
    } else if (direction === "left") {
        pacmanElement.style.backgroundImage = "url(pacLeft)";
    } else if (direction === "right") {
        pacmanElement.style.backgroundImage = "url(pacRight)";
    }
	
    if(direction === "right" && pacman.y + 1 < game[pacman.x].length && game[pacman.x][pacman.y + 1] !== 1){
        game[pacman.x][pacman.y] = 3;
        pacman.y += 1;
    } else if(direction === "left" && pacman.y - 1 >= 0 && game[pacman.x][pacman.y - 1] !== 1){
        game[pacman.x][pacman.y] = 3;
        pacman.y -= 1;
    } else if(direction === "down" && pacman.x + 1 < game.length && game[pacman.x + 1][pacman.y] !== 1){
		pacman.dir = 'down';
        game[pacman.x][pacman.y] = 3;
        pacman.x += 1;
    } else if(direction === "up" && pacman.x - 1 >= 0 && game[pacman.x - 1][pacman.y] !== 1){
		pacman.dir = 'up';
        game[pacman.x][pacman.y] = 3;
        pacman.x -= 1;
    }
    
    if(game[pacman.x][pacman.y] === 2){
        points++;
        if(pacmanSound.ended || pacmanSound.started || pacmanSound.paused) {
			pacmanSound.currentTime = 0.01;  // Сбрасываем время воспроизведения в начало с небольшим значением
			pacmanSound.play();  // Воспроизводим звук
			pacmanSound.volume = 0.05;
		}	
    } else if(game[pacman.x][pacman.y] === 5 || game[pacman.x][pacman.y] === 6 || game[pacman.x][pacman.y] === 7){
        points += 200;
		pacmanSound.play();
    }
    game[pacman.x][pacman.y] = 4;
    draw();
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
}
restart();
