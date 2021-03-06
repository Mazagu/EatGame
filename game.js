// Set some of the game values
var boardwidth = 600;
var boardheight = 600;
var step = 60;
var bgcolor = "#9c4141";
var playercolor = "";
var infobgcolor = "#4e3636";
var infowidth = 200;
var infoheight = 600;
var scorewidth = "90%";
var scoreheight = "60px";
var scorebgcolor = "black";
var scorecolor = "green";
var scorevalue = 0;
var nom = new sound("sound/nom.mp3");
var music = new sound("sound/undertaleOST.mp3");

var body = document.getElementsByTagName("BODY")[0];
// We create the game board, info panel, score and player
var gameBoard = document.createElement("DIV");
var player = document.createElement("DIV"); 
var info = document.createElement("DIV");
var score = document.createElement("DIV");

gameBoard.id = "gameboard";
gameBoard.style.width = boardwidth + "px";
gameBoard.style.height = boardheight + "px";
gameBoard.style.position = "fixed";
gameBoard.style.left = 0;
gameBoard.style.top = 0;
gameBoard.style.background = bgcolor;
body.insertBefore(gameBoard, body.childNodes[0]);

info.id = "info";
info.style.width = infowidth + "px";
info.style.height = infoheight + "px";
info.style.position = "fixed";
info.style.left = boardwidth + "px";
info.style.top = 0;
info.style.background = infobgcolor;
body.insertBefore(info, body.childNodes[1]);

score.id = "score";
score.style.width = scorewidth;
score.style.height = scoreheight;
score.style.margin = "0 auto 0 auto";
score.style.position = "relative";
score.style.background = scorebgcolor;
score.style.color = scorecolor;
score.style.textAlign = "right";
score.style.fontSize = scoreheight;
info.insertBefore(score, info.childNodes[0]);
score.innerHTML = scorevalue;

player.id = "player";
player.style.width = step + "px";
player.style.height = step + "px";
player.style.position = "absolute";
player.style.left = 0;
player.style.top = 0;
player.style.background = playercolor;
player.style.backgroundImage = "url('img/sans.png')";
player.style.backgroundSize = step + "px" + " " + step + "px"; 
gameBoard.insertBefore(player, gameBoard.childNodes[0]);

// Start the music
music.play();
// Create the firs item
createItem();

function createItem() {
	var images = ["lasagna","lasagna2","lasagna3","lasagna4","lasagna5","lasagna6"];
	var item = document.createElement("DIV"); 
	item.id = "item";
	item.style.width = step + "px";
	item.style.height = step + "px";
	item.style.position = "absolute";
	item.style.left = parseInt(Math.random() * (10 - 0) + 0) * step + "px";
	item.style.top = parseInt(Math.random() * (10 - 0) + 0) * step + "px";
	item.style.background = playercolor;
	item.style.backgroundImage = "url('img/"+ images[Math.floor(Math.random()*images.length)] +".png')";
	item.style.backgroundSize = step + "px" + " " + step + "px"; 
	gameBoard.appendChild(item);
}

// Checks two elements position and returns true if collision
function checkCollision(a,b) {
	if(parseInt(a.style.left) == parseInt(b.style.left) 
		&& parseInt(a.style.top) == parseInt(b.style.top)) {
		return true;
	} else {
		return false;
	}
}

// The movement
window.addEventListener("keydown", function(e) {
	if(e.keyCode == 37) {
		// LEFT
		if(parseInt(player.style.left) > 0) {
			player.style.left = parseInt(player.style.left) - step + "px";
		} else {
			// BEEP?
		}
	}

	if(e.keyCode == 38) {
		// UP
		if(parseInt(player.style.top) > 0) {
			player.style.top = parseInt(player.style.top) - step + "px";
		} else {
			// BEEP?
		}
	}

	if(e.keyCode == 39) {
		// RIGHT
		if(parseInt(player.style.left) + parseInt(player.style.width) < parseInt(gameBoard.style.width)) {
			player.style.left = parseInt(player.style.left) + step + "px";
		} else {
			// BEEP?
		}
	}

	if(e.keyCode == 40) {
		// DOWN
		if(parseInt(player.style.top) + parseInt(player.style.height) < parseInt(gameBoard.style.height)) {
			player.style.top = parseInt(player.style.top) + step + "px";
		} else {
			// BEEP?
		}
	}
	// Eat the item
	if(checkCollision(player,document.getElementById("item"))) {
		console.log("NOM");
		nom.reload();
		nom.play();
		document.getElementById("item").remove();
		scorevalue++;
		score.innerHTML = scorevalue;
		createItem();
	}
});

// SOUND
function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload","auto");
	this.sound.setAttribute("controls","none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);

	this.play = function() {
		this.sound.play();
	}
	this.stop = function() {
		this.sound.pause();
	}
	this.reload = function() {
		this.sound.load();
	}
}
