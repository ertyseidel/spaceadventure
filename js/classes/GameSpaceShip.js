;(function(exports){
	var GameSpaceShip = function(_, settings){
		this.noCollision = true;

		this.maxStars = 150;
		this.starSpeed = 0.1;

		this.zindex = -100;

		var _en = _.coq.entities;

		this.bg = document.createElement("canvas");
		canvg(this.bg, './levels/spaceship.svg');

		var i;

		for(i = 0; i < collisionBoxes.length; i++){
			_en.create(GameCollisionBox, {
				"pos": {"x": collisionBoxes[i][0], "y": collisionBoxes[i][1]},
				"size": {"x": collisionBoxes[i][2], "y": collisionBoxes[i][3]}
			});
		}

		for(i = 0; i < doors.length; i++){
			_en.create(GameDoor, {
				"sensor":{
					"pos": {"x": doors[i][0][0], "y": doors[i][0][1]},
					"size": {"x": doors[i][0][2], "y": doors[i][0][3]}
				},
				"door": {
					"pos": {"x": doors[i][0][4], "y": doors[i][0][5]},
					"size": {"x": doors[i][0][6], "y": doors[i][0][7]}
				},
				"orientation": doors[i][1],
				"locked": doors[i][2]
			});
		}

		_en.create(GameOptionBox, {
			"pos": {"x": 305, "y": 455},
			"size": {"x": 190, "y": 40},
			"HUD": [
				{
					"key": 1,
					"keyword": "ONE",
					"text": "Repairs",
					"action": function(){
						console.log("yeah!");
					}.bind(this),
					"enabled": true
				}
			],
			"message":[
				"The engine room of <span class='orion'>The Orion</span> is dark and noisy.",
				"Here, you can repair your ship, if necessary [1]."
			]
		});

		_en.create(GameOptionBox, {
			"pos": {"x": 530, "y": 330},
			"size": {"x": 90, "y": 90},
			"HUD": [
				{
					"key": 1,
					"keyword": "ONE",
					"text": "Medical",
					"action": function(){
						console.log("yeah!");
					}.bind(this),
					"enabled": true
				}
			],
			"message":[
				"You enter the medical bay of the ship.",
				"Various medical robots and instruments whirr and blink around you.",
				"You can heal yourself very quickly here [1]."
			]
		});

		_en.create(GameOptionBox, {
			"pos": {"x": 180, "y": 330},
			"size": {"x": 90, "y": 90},
			"HUD": [
				{
					"key": 1,
					"keyword": "ONE",
					"text": "Weapons",
					"action": function(){
						console.log("yeah!");
					}.bind(this),
					"enabled": true
				},
				{
					"key": 2,
					"keyword": "TWO",
					"text": "Reload",
					"action": function(){
						console.log("yeah!");
					}.bind(this),
					"enabled": true
				}
			],
			"message": [
				"You enter your armory. Various racks and shelves hide away your weaponry.",
				"Here, you can exchange your weapons [1] and refresh your ammunition [2]."
			]
		});

		_en.create(GameOptionBox, {
			"pos": {"x": 380, "y": 305},
			"size": {"x": 40, "y": 40},
			"HUD": [
				{
					"key": 1,
					"keyword": "ONE",
					"text": "Disembark",
					"action": function(){
						_.changeGameState("planet live");
					}.bind(this),
					"enabled": true
				}
			],
			"message": [
				"If you're on a planet, station, or debris field, this is where you can disembark <span class='orion'>The Orion</span> and search for adventure [1]."
			]
		});

		_en.create(GameOptionBox, {
			"pos": {"x": 330, "y": 80},
			"size": {"x": 140, "y": 65},
			"HUD": [
				//{
				//	"key": 1,
				//	"keyword": "ONE",
				//	"text": "Adventure",
				//	"action": function(){
				//		_.changeGameState('adventure animation');
				//		_.setMessage("The hyperdrives spin up, and you find yourself speeding through the stars!");
				//	}.bind(this),
				//	"enabled": true
				//},
				{
					"key": 1,
					"keyword": "ONE",
					"text": "StarMap",
					"action": function(){
						_.changeGameState('galaxy map');
					}.bind(this),
					"enabled": true
				}
			],
			"message": [
				"You enter the bridge of <span class='orion'>The Orion</span>.",
				"From here, you can spend fuel in an attempt to find uncharted planets [1].",
				"Or you can view the galaxy map, to visit a planet you've already discovered [2]."
			]
		});

		_en.create(GameAnimation, {
			"animation": AnimationStarScroll,
			"zindex": -200
		});

		this.update = function(){
			//pass
		};

		this.draw = function(ctx){
			ctx.drawImage(this.bg, 0, 0);
		};
	};

	var collisionBoxes = [
		[325, 50, 175, 25],
		[475, 75, 25, 75],
		[425, 150, 100, 25],
		[500, 175, 25, 175],
		[525, 300, 125, 25],
		[625, 325, 25, 125],
		[425, 425, 200, 25],
		[500, 400, 25, 125],
		[275, 500, 225, 25],
		[275, 400, 25, 100],
		[150, 425, 225, 25],
		[150, 300, 25, 125],
		[175, 300, 100, 25],
		[275, 150, 25, 200],
		[300, 150, 75, 25],
		[300, 50, 25, 100],
		[350, 250, 25, 125],
		[375, 350, 50, 25],
		[425, 250, 25, 125]
	];

	var doors = [
		[[375, 125, 50, 75, 375, 150, 50, 25], "horizontal", false],
		[[250, 350, 75, 50, 275, 350, 25, 50], "vertical", false],
		[[475, 350, 75, 50, 500, 350, 25, 50], "vertical", false],
		[[375, 400, 50, 75, 375, 425, 50, 25], "horizontal", false],
		[[375, 250, 50, 75, 375, 275, 50, 25], "horizontal", false]
	];

	exports.GameSpaceShip = GameSpaceShip;
})(this);
