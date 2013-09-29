;(function(exports){
	var GameChooseCharacter = function(_, settings){
		this.noCollision = true;

		this.choices = [[], [], [], []];

		this.chosenAttributes = [];
		this.chosenCombatStyle = false;
		this.chosenItems = [];
		this.chosenArmorWeight = false;

		this.choicesX = 0;
		this.choicesY = 0;

		var _en = _.coq.entities;
		var _in = _.coq.inputter;

		_en.create(GameText,{
			"text": "Attributes and Skills:",
			"y": 100
		});

		_en.create(GameText, {
			"text": "Strong",
			"y": 125,
			"isHovered": true,
			"type": "attribute",
			"name": "strong",
			"description": "Strong characters use brute force to accomplish a task."
		}, function(e){this.choices[0][0] = e; this.updateMessage();}.bind(this));

		_en.create(GameText,{
			"text": "Fast",
			"x": 175,
			"y": 125,
			"type": "attribute",
			"name": "fast",
			"description": "Fast characters can easily outmaneuver enemies."
		}, function(e){this.choices[0][1] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Tough",
			"x": 275,
			"y": 125,
			"type": "attribute",
			"name": "tough",
			"description": "Tough characters have a high pain tolerance."
		}, function(e){this.choices[0][2] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Smart",
			"x": 375,
			"y": 125,
			"type": "attribute",
			"name": "smart",
			"description": "Smart characters easily solve puzzles."
		}, function(e){this.choices[0][3] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Charismatic",
			"x": 475,
			"y": 125,
			"type": "attribute",
			"name": "charismatic",
			"description": "Charismatic characters can talk their way into our out of trouble."
		}, function(e){this.choices[0][4] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Engineer",
			"x": 50,
			"y": 150,
			"type": "attribute",
			"name": "engineer",
			"description": "Engineers never worry when something falls apart."
		}, function(e){this.choices[1][0] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Pilot",
			"x": 175,
			"y": 150,
			"type": "attribute",
			"name": "pilot",
			"description": "A pilot can always get at least most of the ship home safely."
		}, function(e){this.choices[1][1] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Hacker",
			"x": 275,
			"y": 150,
			"type": "attribute",
			"name": "hacker",
			"description": "A hacker doesn't let security get in their way."
		}, function(e){this.choices[1][2] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Stealthy",
			"x": 375,
			"y": 150,
			"type": "attribute",
			"name": "stealthy",
			"description": "Shh..."
		}, function(e){this.choices[1][3] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Attentive",
			"x": 475,
			"y": 150,
			"type": "attribute",
			"name": "attentive",
			"description": "Attentive characters never miss a clue or detail."
		}, function(e){this.choices[1][4] = e;}.bind(this));

		_en.create(GameText, {
			"text": "Combat Styles",
			"y": 200
		});

		_en.create(GameText,{
			"text": "Fisticuffs",
			"x": 50,
			"y": 225,
			"type": "combat style",
			"name": "fisticuffs",
			"description": "Mash faces with your knuckles like the gods intended."
		}, function(e){this.choices[2][0] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Melee",
			"x": 175,
			"y": 225,
			"type": "combat style",
			"name": "melee",
			"description": "A sword is the most honorable of weapons."
			}, function(e){this.choices[2][1] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Short-range",
			"x": 250,
			"y": 225,
			"type": "combat style",
			"name": "shortrange",
			"description": "It may be called \"Small arms\", but it packs a punch."
		}, function(e){this.choices[2][2] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Long-range",
			"x": 375,
			"y": 225,
			"type": "combat style",
			"name": "longrange",
			"description": "For those who prefer to stay out of harm's way."
		}, function(e){this.choices[2][3] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Explosives",
			"x": 500,
			"y": 225,
			"type": "combat style",
			"name": "explosives",
			"description": "For those who prefer to stay in harm's way."
		}, function(e){this.choices[2][4] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Diplomacy",
			"x": 625,
			"y": 225,
			"type": "combat style",
			"name": "diplomacy",
			"description": "Hard mode. Talk your way out of trouble. I hope the aliens speak English!"
		}, function(e){this.choices[2][5] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Armor Types:",
			"y": 275
		});

		_en.create(GameText,{
			"text": "Light",
			"x": 50,
			"y": 300,
			"type": "armor weight",
			"name": "lightarmor",
			"description": "It might not protect you much, but it won't slow you down."
		}, function(e){this.choices[3][0] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Medium",
			"x": 175,
			"y": 300,
			"type": "armor weight",
			"name": "mediumarmor",
			"description": "A nice balance of speed and safety."
		}, function(e){this.choices[3][1] = e;}.bind(this));

		_en.create(GameText,{
			"text": "Heavy",
			"x": 300,
			"y": 300,
			"type": "armor weight",
			"name": "mediumarmor",
			"description": "Even if they catch you, they won't be able to hurt you."
		}, function(e){this.choices[3][2] = e;}.bind(this));

		this.updateChoiceHover = function(hover){
			this.getHover().isHovered = hover;
		};

		this.updateMessage = function(){
			_.setMessage(this.getHover().description);
			if(this.chosenAttributes.length === 0){
				_.appendMessage("You need to select two more attributes/skills", _.settings.color_text_info);
			} else if(this.chosenAttributes.length == 1){
				_.appendMessage("You need to select one more attribute/skill", _.settings.color_text_info);
			}
			if(this.chosenCombatStyle === false){
				_.appendMessage("You need to select a combat style", _.settings.color_text_info);
			}
			if(this.chosenArmorWeight === false){
				_.appendMessage("You need to select an armor weight", _.settings.color_text_info);
			}
		};

		this.getHover = function(){
			return this.choices[this.choicesY % this.choices.length][this.choicesX % this.choices[this.choicesY % this.choices.length].length];
		};

		/*
		TODO break this out into a OptionSet or something
		*/
		this.makeSelection = function(){
			var hover = this.getHover();
			if(hover.type == "attribute"){
				if(hover.isSelected){
					for(var i in this.chosenAttributes){
						if(this.chosenAttributes[i] === hover){
							this.chosenAttributes.splice(i, 1);
						}
					}
					hover.isSelected = false;
				} else if(this.chosenAttributes.length < 2){
					this.chosenAttributes.push(hover);
					hover.isSelected = true;
				} else {
					this.chosenAttributes[0].isSelected = false;
					this.chosenAttributes = this.chosenAttributes.slice(1);
					this.chosenAttributes.push(hover);
					hover.isSelected = true;
				}
			} else if (hover.type == "combat style"){
				if(hover.isSelected){
					this.chosenCombatStyle = false;
					hover.isSelected = false;
				} else{
					if(this.chosenCombatStyle) this.chosenCombatStyle.isSelected = false;
					this.chosenCombatStyle = hover;
					hover.isSelected = true;
				}
			} else if(hover.type == "armor weight"){
				if(hover.isSelected){
					this.chosenArmorWeight = false;
					hover.isSelected = false;
				} else{
					if(this.chosenArmorWeight) this.chosenArmorWeight.isSelected = false;
					this.chosenArmorWeight = hover;
					hover.isSelected = true;
				}
			}
		};

		this.update = function(){
			if(_in.changes(_in.RIGHT_ARROW)){
				this.updateChoiceHover(false);
				this.choicesX ++;
				this.updateChoiceHover(true);
				this.updateMessage();
			}
			if(_in.changes(_in.LEFT_ARROW)){
				this.updateChoiceHover(false);
				this.choicesX += this.choices[this.choicesY % this.choices.length].length - 1;
				this.updateChoiceHover(true);
				this.updateMessage();
			}
			if(_in.changes(_in.UP_ARROW)){
				this.updateChoiceHover(false);
				this.choicesX %= this.choices[this.choicesY % this.choices.length].length;
				this.choicesY += this.choices.length - 1;
				this.updateChoiceHover(true);
				this.updateMessage();
			}
			if(_in.changes(_in.DOWN_ARROW)){
				this.updateChoiceHover(false);
				this.choicesX %= this.choices[this.choicesY % this.choices.length].length;
				this.choicesY ++;
				this.updateChoiceHover(true);
				this.updateMessage();
			}
			if(_in.changes(_in.ONE)){
				this.makeSelection();
				this.updateChoiceHover(true);
				this.updateMessage();
			}
		};
	};

	exports.GameChooseCharacter = GameChooseCharacter;
})(this);
