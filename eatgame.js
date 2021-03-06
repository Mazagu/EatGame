// Configure
var imageDir = "img";
var boardwidth = "600px";
var boardheight = "600px";
var infowidth = "200px";
var infoheight = boardheight;
var menuwidth = "100px";
var menuheight = boardheight;
var layoutwidth = parseInt(boardwidth) 
					+ parseInt(infowidth) 
					+ parseInt(menuwidth) + "px";
var layoutheight = boardheight;
var cellnum = 10;
var cellsize = parseInt(boardwidth) / cellnum;
var maxspeed = 0;
var defaultTime = 30;
var entities = new Array();
// Skins
var characters = [{"type":"player", 
					"name":"sans",
					"matches":"lasagna",
					"startTop":0, 
					"startLeft":0,
					"skin":"sans.png",
					"sound" : new sound("sound/sans.mp3")}];
characters.push({"type":"player", 
					"name":"papyrus",
					"matches":"spaghetti",
					"startTop":0, 
					"startLeft":0,
					"skin":"papyrus.png",
					"sound" : new sound("sound/papyrus.mp3")});
characters.push({"type":"player", 
					"name":"mario",
					"matches":"pizza",
					"startTop":0, 
					"startLeft":0,
					"skin":"mario.png",
					"sound" : new sound("sound/mario.wav")});
characters.push({"type":"player", 
					"name":"bendy",
					"matches":"ink",
					"startTop":0, 
					"startLeft":0,
					"skin":"bendy.png",
					"sound" : new sound("sound/bendy.mp3")});
characters.push({"type":"player", 
					"name":"zombie",
					"matches":"brain",
					"startTop":0, 
					"startLeft":0,
					"skin":"zombie.png",
					"sound" : new sound("sound/brains.mp3")});
characters.push({"type":"player", 
					"name":"larva",
					"matches":"sausage",
					"startTop":0, 
					"startLeft":0,
					"skin":"larva.png",
					"sound" : new sound("sound/larva.mp3")});
characters.push({"type":"player", 
					"name":"creeper",
					"matches":"tnt",
					"startTop":0, 
					"startLeft":0,
					"skin":"creeper.png",
					"sound" : new sound("sound/creeper.mp3")});
// Food
var foodItems = [{"type":"item", 
					"name":"lasagna",
					"matches":"sans",
					"startTop":0, 
					"startLeft":0,
					"skin":"lasagna.png"}];
foodItems.push({"type":"item", 
					"name":"spaghetti",
					"matches":"papyrus",
					"startTop":0, 
					"startLeft":0,
					"skin":"spaghetti.png"});
foodItems.push({"type":"item", 
					"name":"pizza",
					"matches":"mario",
					"startTop":0, 
					"startLeft":0,
					"skin":"pizza.png"});
foodItems.push({"type":"item", 
					"name":"ink",
					"matches":"bendy",
					"startTop":0, 
					"startLeft":0,
					"skin":"ink.png"});
foodItems.push({"type":"item", 
					"name":"brain",
					"matches":"zombie",
					"startTop":0, 
					"startLeft":0,
					"skin":"brain.png"});
foodItems.push({"type":"item", 
					"name":"sausage",
					"matches":"larva",
					"startTop":0, 
					"startLeft":0,
					"skin":"sausage.png"});
foodItems.push({"type":"item", 
					"name":"tnt",
					"matches":"creeper",
					"startTop":0, 
					"startLeft":0,
					"skin":"tnt.png"});
// Shortcut for body
var body = document.getElementsByTagName("BODY")[0];

// Layout SetUp
function layoutSetUp() {
	this.layout = document.createElement("DIV");
	this.board = document.createElement("DIV"); 
	this.info = document.createElement("DIV"); 
	this.menu = document.createElement("DIV");
	
	this.layout.style.position = "fixed";
	this.layout.style.left = "0px";
	this.layout.style.top = "0px";
	this.layout.style.width = layoutwidth;
	this.layout.style.height = layoutheight;
	
	this.board.style.position = "absolute";
	this.board.style.left = "0px";
	this.board.style.top = "0px";
	this.board.style.width = boardwidth;
	this.board.style.height = boardheight;
	this.board.style.background = "black";
	this.board.style.backgroundSize = boardwidth + " " + boardheight; 
	this.board.style.backgroundImage = "url('" + imageDir + "/level0.jpg')";

	this.info.style.position = "absolute";
	this.info.style.left = boardwidth;
	this.info.style.top = "0px";
	this.info.style.width = infowidth;
	this.info.style.height = infoheight;
	this.info.style.background = "#494f4d";

	this.menu.style.position = "absolute";
	this.menu.style.left = parseInt(boardwidth) + parseInt(infowidth) + "px";
	this.menu.style.top = "0px";
	this.menu.style.width = menuwidth;
	this.menu.style.height = menuheight;
	this.menu.style.background = "#aaae8b";

	// Insert all elements into body
	body.insertBefore(this.layout, body.childNodes[0]);
	this.layout.appendChild(this.board);
	this.layout.appendChild(this.info);
	this.layout.appendChild(this.menu);

}

// Create Entity
function createEntity(e) {
	this.display = document.createElement("DIV");
	this.display.id = "";
	this.display.style.width = cellsize + "px";
	this.display.style.height = cellsize + "px";
	this.display.style.position = "absolute";
	this.display.style.top = e.startTop;
	this.display.style.left = e.startLeft;
	this.display.style.backgroundSize = cellsize + "px" + " " + cellsize + "px"; 
	this.display.style.backgroundImage = "url('" + imageDir + "/" + e.skin +"')";
	this.name = e.name;
	this.matches = e.matches;

	this.newPosition = function() {
		this.display.style.top = parseInt(Math.random() * (cellnum - 0) + 0) * cellsize + "px";
		this.display.style.left = parseInt(Math.random() * (cellnum - 0) + 0) * cellsize + "px";
	}

	this.changeFor = function(n) {
		this.display.style.backgroundImage = "url('" + imageDir + "/" + n.skin +"')";
		this.name = n.name;
		this.matches = n.matches;
	}

	this.changeRandom = function(n) {
		var random = n[Math.floor(Math.random()*n.length)];
		this.display.style.backgroundImage = "url('" + imageDir + "/" + random.skin +"')";
		this.name = random.name;
		this.matches = random.matches;
	}

	if(e.type == "item") {
		this.newPosition();
	}
	var that = this;
	that.updateEntities = function() {
		entities[that.name] = {"top":parseInt(that.display.style.top),
								"left":parseInt(that.display.style.left)};
	}
	that.updateEntities();
	
	
	if(e.type == "player") {
		window.addEventListener("keyup", function(e) {
			switch(e.keyCode) {
				case 37: // Left
					if(parseInt(that.display.style.left) > 0) {
						that.display.style.left = parseInt(that.display.style.left) - cellsize + "px";
						that.updateEntities();
					} else {
						// BEEP?
					}
				break;

				case 38: // Up
					if(parseInt(that.display.style.top) > 0) {
						that.display.style.top = parseInt(that.display.style.top) - cellsize + "px";
						that.updateEntities();
					} else {
						// BEEP?
					}
				break;

				case 39: // Right
					if(parseInt(that.display.style.left) + parseInt(that.display.style.width) < parseInt(boardwidth)) {
						that.display.style.left = parseInt(that.display.style.left) + cellsize + "px";
						that.updateEntities();
					} else {
						// BEEP?
					}
				break;

				case 40: // Down
					if(parseInt(that.display.style.top) + parseInt(that.display.style.height) < parseInt(boardheight)) {
						that.display.style.top = parseInt(that.display.style.top) + cellsize + "px";
						that.updateEntities();
					} else {
						// BEEP?
					}
				break;
			}
			var keys = Object.keys(entities);
			for(i=0; i<keys.length; i++) {
				if(keys[i] == that.name) {

				} else {
					if(checkCollision(entities[that.name],entities[keys[i]])) {
						console.log("PUM!");
					}
				}
			}
		});
	}
}

// Create score
function createScore() {
	this.display = document.createElement("DIV");
	this.display.style.width = "90%";
	this.display.style.height = "60px";
	this.display.style.margin = "10px auto 10px auto";
	this.display.style.color = "green";
	this.display.style.background = "black";
	this.display.style.fontSize = this.display.style.height;
	this.display.style.textAlign = "right";
	this.display.style.verticalAlign = "middle";
	this.display.style.lineHeight = this.display.style.height;
	this.value = 0;
	this.display.innerHTML = this.value;

	this.addScore = function() {
		this.value++;
		this.display.innerHTML = this.value;
	}
}

// Create Clock
function createTimer() {
	this.display = document.createElement("DIV");
	this.display.style.width = "90%";
	this.display.style.height = "60px";
	this.display.style.margin = "10px auto 10px auto";
	this.display.style.color = "yellow";
	this.display.style.background = "black";
	this.display.style.fontSize = this.display.style.height;
	this.display.style.textAlign = "right";
	this.display.style.verticalAlign = "middle";
	this.display.style.lineHeight = this.display.style.height;
	this.time = defaultTime;
	this.display.innerHTML = this.time;
	var that = this;
	var countDown = setInterval(function(){
    	that.time--;
		that.display.innerHTML = that.time;
		if(that.time <= 0) {
			clearInterval(countDown);
			gameOver();
		}
	}, 1000);
	
}
//Game Over
function gameOver() {
	music.stop();
	player.display.remove();
	food.display.remove();
	clock.display.remove();
	var gameoverscreen = document.createElement("DIV");
	layout.board.appendChild(gameoverscreen);
	gameoverscreen.style.width = "100%;";
	gameoverscreen.style.height = "100%;";
	gameoverscreen.innerHTML = "<img src='img/gameover.jpg'>";
	gameoverscreen.childNodes[0].style.width = "100%";
	gameoverscreen.addEventListener("click", function() {
		gameoverscreen.remove();
		gameStart();
	});
}
// Create Select Character
function selectCharacter(k,e) {
	this.display = document.createElement("DIV");
	this.display.style.width = cellsize + "px";
	this.display.style.height = cellsize + "px";
	this.display.style.margin = "2px auto 2px auto";
	this.display.style.position = "relative";
	this.display.style.backgroundSize = cellsize + "px" + " " + cellsize + "px";
	this.display.style.backgroundImage = "url('" + imageDir + "/" + e.skin +"')";
	this.display.id = e.name;
	this.name = e.name;

	this.display.addEventListener("click", function() {
		player.changeFor(characters[k]);
		e.sound.reload();
		e.sound.play();
	});
}

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
//
var player;
var food;
var clock;

function gameStart() {
	score.value = 0;
	score.display.innerHTML = score.value;
	player = new createEntity(characters[0]);
	food = new createEntity(foodItems[0]);
	clock = new createTimer();
	layout.board.appendChild(player.display);
	layout.board.appendChild(food.display);
	//timer
	layout.info.appendChild(clock.display);
	music.reload();
	music.play();
}
var layout = new layoutSetUp();
var score = new createScore();
layout.info.appendChild(score.display);
// Character select
for(i = 0; i < characters.length; i++) {
	selectnew = new selectCharacter(i,characters[i]);
	layout.info.appendChild(selectnew.display);
}
var nom = new sound("sound/nom.mp3");
var fart = new sound("sound/fart.mp3");
var music = new sound("sound/undertaleOST.mp3");
// Start the game
gameStart();
// The movement


// Display effect
function displayEvent(e,c) {
	food.display.style.backgroundImage = "none";
	food.display.innerHTML = e;
	food.display.zIndex = "999";
	food.display.style.fontSize = cellsize + "px";
	food.display.style.lineHeight = cellsize + "px";
	food.display.style.color = c;
	c = 0;
	var move = setInterval(function() { anim(); },10);
		
	function anim() {
		if(c < 14) {
			c++;
			if(parseInt(food.display.style.top) > parseInt(boardheight)/2) {
				food.display.style.top = parseInt(food.display.style.top) - 2 + "px";
			} else {
				food.display.style.top = parseInt(food.display.style.top) + 2 + "px";
			}
		} else {
			clearInterval(move);
		}
	}

	setTimeout(function() {
		food.display.innerHTML = "";
		food.display.zIndex = "1";
		food.newPosition();
		food.changeRandom(foodItems);
	},1000);
}

// Checks two elements position and returns true if collision
function checkCollision(a,b) {
	if(parseInt(a.left) == parseInt(b.left) 
		&& parseInt(a.top) == parseInt(b.top)) {
		return true;
	} else {
		return false;
	}
}