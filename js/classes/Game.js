;(function(exports){
	var Game = function(canvasId, textId, width, height) {
		this.coq = new Coquette(this, canvasId, width, height, "#000");
		this.gameState = null;

		this.setMessage = function(msg, col){
			var color = col || "#ffffff";
			document.getElementById(textId).innerHTML = "<p style='color: " + color + "'>" + msg + "</p>";
		};

		this.appendMessage = function(msg, col){
			var color = col || "#ffffff";
			document.getElementById(textId).innerHTML += "<p style='color: " + color + "'>" + msg + "</p>";
		};

		this.changeGameState = function(newState){
			this.gameState = newState;
			console.log("Game State: " + newState);
			this.setMessage("");
			this.coq.entities.clear();
			switch(this.gameState){
				case "start screen":
					game.setMessage("Welcome to Space Adventure");
					game.appendMessage("Use the number keys (1-8) to choose options.");
					game.appendMessage("You can start a new game [1], or continue a saved game [2], if you have one.");
					this.coq.entities.create(GameScreen, {"screen": "start screen", "HUD":[
						{
							"key": 1,
							"keyword": "ONE",
							"action": function(){
								this.changeGameState("choose character");
							}.bind(this),
							"text": "New Game",
							"enabled": true
						},
						{
							"key": 2,
							"keyword": "TWO",
							"action": function(){

							}.bind(this),
							"text": "Continue",
							"enabled": false
						}
					]});
					this.coq.entities.create(GameAnimation, {
						"animation": new AnimationWarp({
							"keyFrames": [0, 120, 240, 250, 390, 1200]
						}),
						"callback": function(){
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
					break;
				case "choose character":
					this.coq.entities.create(GameScreen, {"screen": "choose character", "HUD":[
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

							}.bind(this),
							"text": "Randomize",
							"enabled": true
						},
						{
							"key": 3,
							"keyword": "THREE",
							"action": function(){
								this.changeGameState("space ship");
								this.setMessage("Welcome to Space, adventurer!");
								this.appendMessage("You find yourself adrift in the Corellis arm of the galaxy, one million credits in debt.");
								this.appendMessage("Find your way around the Galaxy and earn your freedom!");
								this.appendMessage("Fortunately, you have your trusty spaceship, <span class='orion'>The Orion</span>.");
								this.appendMessage("Use the arrow keys to move, and the number keys to select options.");
								this.appendMessage("May fortune smile upon you, adventurer!");
							}.bind(this),
							"text": "Start Game",
							"enabled": false,
							"update": function(_){
								if(_.coq.inputter.changes(_.coq.inputter.ONE) || _.coq.inputter.changes(_.coq.inputter.TWO)){
									this.changed = 2;
								}
								if(this.changed > 0){
									this.changed --;
									var chooseCharacter = _.coq.entities.all(GameChooseCharacter)[0];
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
							}.bind(this),
							"text": "Exit Game",
							"enabled": true
						}
					]});
					break;
				case "space ship":
					this.coq.entities.create(GameScreen, {"screen": "space ship", "HUD": [
						{
							"key": 8,
							"keyword": "EIGHT",
							"action": function(){
								this.changeGameState('start screen');
							}.bind(this),
							"text": "Save/Quit",
							"enabled": true
						}
					]});
					break;
				case "adventure animation":
					this.coq.entities.create(GameAnimation, {
						"animation": new AnimationWarp({}),
						"callback": function(){
							this.changeGameState('space ship');
						}.bind(this)
					});
					break;
				case "star map":
					this.coq.entities.create(GameScreen, {"screen": "star map", "HUD": [
						{
							"key": 8,
							"keyword": "EIGHT",
							"action": function(){
								this.changeGameState('space ship');
							}.bind(this),
							"text": "Back",
							"enabled": true
						}
					]});
					break;
				default:
					break;
			}
		};

		this.update = function(){
			if(this.coq.inputter.changes(this.coq.inputter.P)){
				this.changeGameState("");
				this.coq.ticker.stop = true;
			}
		};
	};

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

	exports.Game = Game;
})(this);