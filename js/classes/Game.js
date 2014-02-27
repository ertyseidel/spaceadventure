;(function(exports){
	var Game = function(canvasId, textId, width, height, gameSettings) {
		this.settings = gameSettings;
		this.coq = new Coquette(this, canvasId, width, height, this.settings.color_background_fill);
		this.gameState = null;
		this.GALAXY = {};

		this.toSave = ["positions", "randomSeed", "debugMode", "planetRotation"];

		if(localStorage.length == 0){
			refreshGame(this);
		} else{
			loadGame(this);
		}

		generateGalaxy(this);

		this.GALAXY.starsBuffer = renderToCanvas(6000, 6000, function(ctx){
			this.GALAXY.galaxyStars.forEach(function(star){
				var planetString = star.size.toString(2);
				planetString = planetString.substring(planetString.indexOf(".") + 1);
				ctx.beginPath();
				if(planetString.indexOf(generateOneString(this.settings.ring_count_pirate_cache)) != -1){
					ctx.fillStyle = this.settings.color_pirate_cache;
					ctx.fillRect(star.x, star.y, 1, 1);
				} else if(planetString.indexOf(generateOneString(this.settings.ring_count_space_station)) != -1){
					ctx.fillStyle = this.settings.color_space_station;
					ctx.fillRect(star.x, star.y, 1, 1);
				} else if(planetString.indexOf(generateOneString(this.settings.ring_count_live_planet)) != -1){
					ctx.fillStyle = this.settings.color_live_planet;
					ctx.fillRect(star.x, star.y, 1, 1);
				} else{
					ctx.fillStyle = this.settings.color_star;
					ctx.fillRect(star.x, star.y, 1, 1);
				}
			}.bind(this));
		}.bind(this));

		this.setMessage = function(msg, col){
			var color = col || this.settings.color_text_default;
			this.GALAXY.text = [{"msg": msg, "col": col}];
			document.getElementById(textId).innerHTML = "<p style='color: " + color + "'>" + msg + "</p>";
		};

		this.appendMessage = function(msg, col){
			var color = col || this.settings.color_text_default;
			this.GALAXY.text.push({"msg": msg, "col": col});
			document.getElementById(textId).innerHTML += "<p style='color: " + color + "'>" + msg + "</p>";
		};

		this.changeGameState = function(newState, changeVars){
			var player = this.coq.entities.all(GamePlayer);
			if(changeVars == undefined) changeVars = {};
			if(player[0] !== undefined){
				this.GALAXY.positions[this.gameState] = player[0].pos;
			}

			this.gameState = newState;

			if(this.GALAXY.positions[this.gameState] !== undefined){
				changeVars.storedPlayerPosition = this.GALAXY.positions[this.gameState];
			}

			this.setMessage("");
			this.coq.entities.clear();

			this.coq.renderer.setViewCenter({x:400,y:300});
			({	"start screen": stateStartScreen,
				"choose character": stateChooseCharacter,
				"space ship": stateSpaceShip,
				"adventure animation": stateAdventureAnimation,
				"galaxy map": stateGalaxyMap,
				"solar map": stateSolarMap,
				"planet live": statePlanetLive
			})[this.gameState](this, changeVars);
		};

		this.update = function(){
			if(this.coq.inputter.changes(this.coq.inputter.P)){
				this.changeGameState("");
				this.coq.ticker.stop = true;
			}
			if(this.coq.inputter.changes(this.coq.inputter.D)){
				this.GALAXY.debugMode = ! this.GALAXY.debugMode;
			}
			if(this.coq.inputter.changes(this.coq.inputter.C)){
				this.coq.renderer.setViewCenter(this.coq.renderer.center());
			}
			if(this.coq.inputter.changes(this.coq.inputter.S)){
				saveGame(this);
			}
		};

	};


	var saveGame = function(game){
		localStorage.clear();
		game.toSave.forEach(function(save){
			if(game.GALAXY[save] != undefined){
				localStorage[save] = JSON.stringify(game.GALAXY[save]);
			}
		});
	}

	var loadGame = function(game){
		game.toSave.forEach(function(save){
			var temp = localStorage.getItem(save);
			if(temp != null){
				game.GALAXY[save] = JSON.parse(temp);
			}
		});
	}

	var refreshGame = function(game){
		game.GALAXY.positions = {};
		game.GALAXY.randomSeed = Math.random();
		game.GALAXY.debugMode = false;
		Math.seedrandom(game.GALAXY.randomSeed);
		generateGalaxy(game);
	}

	var shuffle = function(array) {
		//http://stackoverflow.com/a/962890/374601
		var tmp, current, top = array.length;

		if(top) while(--top) {
			current = Math.floor(Math.random() * (top + 1));
			tmp = array[current];
			array[current] = array[top];
			array[top] = tmp;
		}

		return array;
	}

	var generateGalaxy = function(_){
		var a = 50; //length
		var b = .6; //tightness
		var points = 70; //resolution
		var density = 4; //stars per point
		var discRadius = 30; //radius of center disc
		var discDensity = 3000; //stars in disc
		var armPull = .6; //percent of stars which stay in the arm disc radius
		var center = {x: 3000, y:3000}; //center of GameGalaxyMap
		var scale = 2; //scaling factor of entire image
		var armCount = 5; //number of galaxy arms
		var armDiscRad = 1.4; //arm disc brush radius
		var armStartPoint = 5; //how many points to skip at the center

		var createGalaxyArm = function(center, rot){
			var stars = [];
			for(var i = armStartPoint; i < points; i++){
				var theta = i * (Math.PI * 2) / points;
				var x = a*Math.pow(Math.E, b * theta)*Math.cos(theta - rot) + center.x;
				var y = a*Math.pow(Math.E, b * theta)*Math.sin(theta - rot) + center.y;
				stars = stars.concat(createGalaxyDisc({x: x, y: y}, i * armDiscRad, density * i));
			}
			return stars;
		}

		var createGalaxyDisc = function(center, rad, density){
			var stars = [];
			for(var j = 0; j < density; j++){
				var t = 2 * Math.PI * Math.random()
				var u = (Math.random() + Math.random()) * rad
				var r = u > rad && Math.random() < armPull ? rad - u : u;
				stars.push(new Star(center.x + scale * r * Math.cos(t), center.y + scale * r * Math.sin(t), Math.random() * 3 + 1));
			}
			return stars;
		}

		if(_.GALAXY.galaxyStars == undefined){
			var temp = [];
			for(var i = 0; i < armCount; i++){
				temp = temp.concat(createGalaxyArm(center, (i * 2 * Math.PI / armCount)));
			}
			temp = temp.concat(createGalaxyDisc(center, discRadius, discDensity));
			temp.sort(function(a, b){
				return a.y - b.y;
			});
			_.GALAXY.galaxyStars = temp;
		}
	}

	var Star = function(x, y, size, speed){
		this.x = x || 0;
		this.y = y || 0;
		this.size = size || 1;
		this.speed = speed || 0;
	};

	var stateStartScreen = function(game, changeVars){
		game.setMessage("Welcome to Space Adventure");
		game.appendMessage("Use the number keys (1-8) to choose options.");
		game.appendMessage("You can start a new game [1], or continue a saved game [2], if you have one.");
		game.appendMessage("This is an alpha release! You can <a href='./changelog.txt'>check out the changelog</a> while I'm working on this.", "#ff0000");
		game.coq.entities.create(GameScreen, {
			init: function(gameScreen){
				game.coq.renderer.setWorldSize({x: 800, y: 600});
				game.coq.renderer.setViewCenter(game.coq.renderer.center());
				game.coq.entities.create(GameStartScreen, {}, function(s){gameScreen.screen = s});
			},
			HUD:[
				{
					"key": 1,
					"keyword": "ONE",
					"action": function(){
						if(game.GALAXY.newGameWarning == undefined && localStorage.length > 0){
							game.setMessage("Are you sure you want to start a new game?", game.settings.color_text_warning);
							game.appendMessage("Your game in progress will be deleted. This cannot be undone.");
							game.appendMessage("Hit [4] to continue...", game.settings.color_text_info);
							game.GALAXY.newGameWarning = true;
							game.coq.entities.all(GameHUDOption).forEach(function(option){
								if(option.key == 1){
									game.coq.entities.destroy(option);
									game.coq.entities.create(GameHUDOption, {
										"key": 4,
										"keyword": "FOUR",
										"action": function(){
											localStorage.clear();
											refreshGame(game);
											game.changeGameState("choose character");
										}.bind(this),
										"text": "New Game",
										"enabled": true
									});
								}
							});
							delete game.GALAXY.newGameWarning;
						} else{
							game.changeGameState("choose character");
						}
					}.bind(this),
					"text": "New Game",
					"enabled": true
				},
				{
					"key": 2,
					"keyword": "TWO",
					"action": function(){
						this.changeGameState("space ship");
						delete game.GALAXY.newGameWarning;
					}.bind(game),
					"text": "Continue",
					"enabled": localStorage.length > 0
				}
			]
		});
		game.coq.entities.create(GameAnimation, {
			animation: AnimationWarp,
			keyFrames: [0, 1120, 1240, 1250, 1390, 2200],
			callback: function(){
				for(var i = 0; i < this.animation.stars.length; i++){
					this.animation.stars[i].x -= this.animation.stretch;
					if(this.animation.stars[i].x < 0){
						this.animation.stars[i].x = (Math.random() * (this.animation.stretch + 500)) + 800;
					}
				}
				this.frame = 0;
				this.scene = 0;
			}
		});
	};

	var stateChooseCharacter = function(game, changeVars){
		game.coq.entities.create(GameScreen, {
			init: function(gameScreen){
				game.coq.renderer.setWorldSize({x: 800, y: 600});
				game.coq.renderer.setViewCenter(game.coq.renderer.center());
				game.coq.entities.create(GameChooseCharacter, {}, function(s){gameScreen.screen = s});
			},
			HUD:[
				{
					"key": 1,
					"keyword": "ONE",
					"action": function(){
						//pass - handled by GameChooseCharacter object
					}.bind(this),
					"text": "Select",
					"enabled": true
				},
				{
					"key": 2,
					"keyword": "TWO",
					"action": function(){
						var allText = this.coq.entities.all(GameText);
						var attributes = [];
						var combatStyles = [];
						var armorWeights = [];
						for(var i in allText){
							allText[i].isSelected = false;
							switch(allText[i].type){
								case "attribute":
									attributes.push(allText[i]);
									break;
								case "combat style":
									combatStyles.push(allText[i]);
									break;
								case "armor weight":
									armorWeights.push(allText[i]);
									break;
							}
						}
						var chooseCharacter = this.coq.entities.all(GameChooseCharacter)[0];

						shuffle(attributes);
						attributes[0].isSelected = true;
						attributes[1].isSelected = true;
						chooseCharacter.chosenAttributes = [attributes[0], attributes[1]];

						shuffle(combatStyles);
						combatStyles[0].isSelected = true;
						chooseCharacter.chosenCombatStyle = combatStyles[0];

						shuffle(armorWeights);
						armorWeights[0].isSelected = true;
						chooseCharacter.chosenArmorWeight = armorWeights[0];

						chooseCharacter.updateMessage();

					}.bind(game),
					"text": "Randomize",
					"enabled": true
				},
				{
					"key": 3,
					"keyword": "THREE",
					"action": function(){
						this.changeGameState("space ship");
					}.bind(game),
					"text": "Start Game",
					"enabled": false,
					"update": function(_){
						if(game.coq.inputter.changes(game.coq.inputter.ONE) || game.coq.inputter.changes(game.coq.inputter.TWO)){
							this.changed = 2;
						}
						if(this.changed > 0){
							this.changed --;
							var chooseCharacter = game.coq.entities.all(GameChooseCharacter)[0];
							this.enabled = (chooseCharacter.chosenAttributes.length == 2 &&
								chooseCharacter.chosenCombatStyle !== false &&
								chooseCharacter.chosenArmorWeight !== false);
						}
					}
				},
				{
					"key": 8,
					"keyword": "EIGHT",
					"action": function(){
						this.changeGameState("start screen");
					}.bind(game),
					"text": "Exit Game",
					"enabled": true
				}
			]
		});
	};

	var stateSpaceShip = function(game, changeVars){
		game.coq.entities.create(GameScreen, {
			init: function(gameScreen){
				game.coq.renderer.setWorldSize({x: 800, y: 600});
				game.coq.renderer.setViewCenter({x: 400, y: 300});
				game.coq.entities.create(GameSpaceShip, {}, function(s){gameScreen.screen = s});
				game.setMessage("Welcome to Space, adventurer!");
				game.appendMessage("You find yourself adrift in the Corellis arm of the galaxy, one million credits in debt.");
				game.appendMessage("Find your way around the Galaxy and earn your freedom!");
				game.appendMessage("Fortunately, you have your trusty spaceship, <span class='orion'>The Orion</span>.");
				game.appendMessage("Use the arrow keys to move, and the number keys to select options.");
				game.appendMessage("May fortune smile upon you, adventurer!");
			},
			HUD: [
				{
					"key": 8,
					"keyword": "EIGHT",
					"action": function(){
						saveGame(this);
						this.changeGameState('start screen');
						this.appendMessage("Game Saved", game.color_text_info);
					}.bind(game),
					"text": "Save/Quit",
					"enabled": true
				}
			],
			player: {
				pos: function(){
					return changeVars.storedPlayerPosition == undefined ? {x: 390, y: 210} : changeVars.storedPlayerPosition
				}(),
				size: {
					x: 25,
					y: 25
				}
			}
		});
	};

	var stateAdventureAnimation = function(game, changeVars){
		game.coq.entities.create(GameAnimation, {
			animation: AnimationWarp,
			callback: function(){
				this.changeGameState('space ship');
			}.bind(game)
		});
	};

	var stateGalaxyMap = function(game, changeVars){
		game.coq.entities.create(GameScreen, {
			init: function(gameScreen){
				game.coq.renderer.setWorldSize({x: 6000, y: 6000});
				game.coq.renderer.setViewCenter({x: 3000, y: 3000});
				game.coq.entities.create(GameGalaxyMap, {}, function(s){gameScreen.screen = s});
			},
			HUD:[
				{
					"key": 1,
					"keyword": "ONE",
					"action": function(){
						this.changeGameState('solar map',{
							solarRect: this.coq.entities.all(GameScreen)[0].screen.currentPlayerRect
						});
					}.bind(game),
					"text": "Zoom",
					"enabled": true
				},
				{
					"key": 8,
					"keyword": "EIGHT",
					"action": function(){
						this.changeGameState('space ship');
					}.bind(game),
					"text": "Back",
					"enabled": true
				}
			],
			player: {
				pos: function(){
					return changeVars.storedPlayerPosition == undefined ? {x: 3000, y: 3000} : changeVars.storedPlayerPosition
				}(),
				style: "space ship",
				acceleration: 3,
				maxSpeed: 3,
				friction: 0,
				visible: false
			}
		});
	};

	var stateSolarMap = function(game, changeVars){
		game.coq.entities.create(GameScreen, {
			init: function(gameScreen){
				game.coq.renderer.setWorldSize({x: 1000, y: 800});
				game.coq.renderer.setViewCenter(game.coq.renderer.center());
				game.coq.entities.create(GameSolarMap, {
						solarRectImage: changeVars.solarRectImage,
						solarRect: changeVars.solarRect
					}, function(s){gameScreen.screen = s});
			},
			HUD: [
				{
					"key": 8,
					"keyword": "EIGHT",
					"action": function(){
						this.changeGameState('galaxy map');
					}.bind(game),
					"text": "Back",
					"enabled": true
				}
			],
			player: {
				pos: {
					x: 500,
					y: 400,
				},
				style: "space ship"
			}
		});
	};

	var statePlanetLive = function(game, changeVars){
		game.coq.entities.create(GameScreen, {
			init: function(gameScreen){
				game.coq.renderer.setWorldSize(800, 800);
				game.coq.renderer.setViewCenter(100, 100);
				game.coq.entities.create(GamePlanetLive, {}, function(s){gameScreen.screen = s});
			},
			HUD: [
				{
					"key": 8,
					"keyword": "EIGHT",
					"action": function(){
						this.changeGameState('space ship');
					}.bind(game),
					"text": "Back",
					"enabled": true
				}
			],
			player: {
				pos: {
					x: 100,
					y: 100
				},
				size: {
					x: 25,
					y: 25
				}
			}});
	}

	var renderToCanvas = function (width, height, renderFunction) {
		var buffer = document.createElement('canvas');
		buffer.width = width;
		buffer.height = height;
		renderFunction(buffer.getContext('2d'));
		return buffer;
	};

	var generateOneString = function(len){
		var ones = "11111111111111111111111111";
		return ones.substring(0, len);
	}

	exports.Star = Star;

	exports.Game = Game;
})(this);
