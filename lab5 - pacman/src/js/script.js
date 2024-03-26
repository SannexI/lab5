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

var points = 0;
var remain = 0;
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
	document.addEventListener('keyup', movePacman);
	ScoreWin();
}	

draw();

function movePacman(){
	if(event.code === "ArrowRight"){
        if(pacman.y + 1 < game[pacman.x].length && game[pacman.x][pacman.y+1] !== 1){
            game[pacman.x][pacman.y] = 3;
            pacman.y += 1;
			if(game[pacman.x][pacman.y] === 2){
				points++;
				remain--;
			}
			if(game[pacman.x][pacman.y] === 5 || game[pacman.x][pacman.y] === 6){
				points+=200;
			}
            game[pacman.x][pacman.y] = 4;
            draw();
        } 
    } else if(event.code === "ArrowLeft"){
        if(pacman.y - 1 >= 0 && game[pacman.x][pacman.y-1] !== 1){
            game[pacman.x][pacman.y] = 3;
            pacman.y -= 1;
			if(game[pacman.x][pacman.y] === 2){
				points++;
				remain--;
			}
			if(game[pacman.x][pacman.y] === 5 || game[pacman.x][pacman.y] === 6 ){
				points+=200;
			}
            game[pacman.x][pacman.y] = 4;
            draw();
        } 
    }else if(event.code === "ArrowDown"){
         if(pacman.x + 1 < game[pacman.y].length && game[pacman.x+1][pacman.y] !== 1){
            game[pacman.x][pacman.y] = 3;
            pacman.x += 1;
			if(game[pacman.x][pacman.y] === 2){
				points++;
				remain--;
			}
			if(game[pacman.x][pacman.y] === 5 || game[pacman.x][pacman.y] === 6){
				points+=200;
			}
            game[pacman.x][pacman.y] = 4;
            draw();
        } 
	}
	else if(event.code === "ArrowUp"){
        if(pacman.x - 1 >= 0 && game[pacman.x-1][pacman.y] !== 1){
            game[pacman.x][pacman.y] = 3;
            pacman.x -= 1;
			if(game[pacman.x][pacman.y] === 2){
				points++;
				remain--;
			}
			if(game[pacman.x][pacman.y] === 5 || game[pacman.x][pacman.y] === 6){
				points+=200;
			}
            game[pacman.x][pacman.y] = 4;
            draw();
        } 
	}
	console.log('1', remain);
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
console.log('2',totalCoins);
	var message = document.getElementById("Win");
	if(totalCoins == 0 ){
		setTimeout(restart, 15000);
		document.removeEventListener('keyup', movePacman);
		if(message){
			message.innerText = "YOU WIN!";
			message.style.display = 'block';
			document.removeEventListener('keyup', movePacman);
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
