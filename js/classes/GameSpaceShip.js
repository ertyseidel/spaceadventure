;(function(exports){
	var GameSpaceShip = function(_, settings){
		this.noCollision = true;

		this.maxStars = 150;
		this.starSpeed = 0.1;

		this.zindex = -100;

		var _en = _.coq.entities;

		for(var i = 0; i < collisionBoxes.length; i++){
			_en.create(GameCollisionBox, {
				"pos": {"x": collisionBoxes[i][0], "y": collisionBoxes[i][1]},
				"size": {"x": collisionBoxes[i][2], "y": collisionBoxes[i][3]}
			});
		}

		for(var i = 0; i < doors.length; i++){
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
						_.changeGameState("planet test");
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
				{
					"key": 1,
					"keyword": "ONE",
					"text": "Adventure",
					"action": function(){
						_.changeGameState('adventure animation');
						_.setMessage("The hyperdrives spin up, and you find yourself speeding through the stars!");
					}.bind(this),
					"enabled": true
				},
				{
					"key": 2,
					"keyword": "TWO",
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
			"animation": new AnimationStarScroll(),
			"zindex": -200
		});

		this.update = function(){
			//pass
		};

		this.draw = function(ctx){
			var strokeStyle = "#0000ff";
			var fillStyle = "#000000";
			//outside
			drawPath(ctx, pointsOutside, strokeStyle, fillStyle);
			//inside
			drawPath(ctx, pointsInside, strokeStyle);
			//ramp
			drawPath(ctx, pointsInsideInside, strokeStyle);
		};
	};

	var drawPath = function(ctx, arr, stroke, fill){
		ctx.strokeStyle = stroke;
		ctx.beginPath();
		if(fill !== undefined) ctx.fillStyle = fill;
		ctx.moveTo(arr[0][0], arr[0][1]);
		for(var i = 1; i < arr.length; i++){
			ctx.lineTo(arr[i][0], arr[i][1]);
		}
		ctx.stroke();
		if(fill !== undefined) ctx.fill();
	};

	var pointsOutside = [
		[325, 50], // start
		[475, 50], //front
		[525, 150], //front right
		[525, 200], // right wing join
		[750, 450], //right wing front
		[525, 450], //right wing back
		[525, 525], //right engine wall
		[275, 525], //back
		[275, 450], //left engine wall
		[50, 450], //left wing back
		[275, 200], //left wing front
		[275, 150], //left wing join
		[325, 50] //front left
	];

	var pointsInside = [
		[325, 75], //start
		[475, 75], //bridge front
		[475, 150], //bridge right wall
		[425, 150], //bridge rear right
		[425, 175], //bridge door right
		[500, 175], //deck front right wall
		[500, 350], //deck right front wall
		[525, 350], //right wing door front
		[525, 325], //right wing inner front wall
		[625, 325], //right wing front wall
		[625, 425], //right wing side wall
		[525, 425], //right wing back wall
		[525, 400], //right wing inner back wall
		[500, 400], //right wing door rear
		[500, 425], //deck right rear wall
		[425, 425], //deck rear right wall
		[425, 450], //engine door right
		[500, 450], //engine right front wall
		[500, 500], //engine right side wall
		[300, 500], //rear wall
		[300, 450], //engine left wall
		[375, 450], //engine front left wall
		[375, 425], //engine door left
		[300, 425], //deck rear left wall
		[300, 400], //deck left rear wall
		[275, 400], //left wing door rear
		[275, 425], //left wing inner rear wall
		[175, 425], //left wing rear wall
		[175, 325], //left wing side wall
		[275, 325], //left wing front wall
		[275, 350], //left wing inner front wall
		[300, 350], //left wing door front
		[300, 175], //deck left front wall
		[375, 175], //deck front left wall
		[375, 150], //bridge door left
		[325, 150], //bridge rear right
		[325, 75] //bridge left wall
	];

	var pointsInsideInside = [
		[350, 250], //start
		[375, 250], //top left
		[375, 350], //left inner
		[425, 350], //back inner
		[425, 250], //right inner
		[450, 250], //top right
		[450, 375], //right outer
		[350, 375], //back outer
		[350, 250] //left outer
	];

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
