;(function(exports){
	var GameSpaceShip = function(_, settings){
		this.noCollision = true;
		for (var i in settings) {
			this[i] = settings[i];
		}

		this.zindex = -100;

		this.lastStar = new Star(100, 100, 3, 1, null, null);
		this.firstStar = new Star(100, 300, 3, 1, null, this.lastStar);
		this.lastStar.prev = this.firstStar;
		this.numberOfStars = 0;
		while(this.numberOfStars < this.maxStars){
			this.lastStar = new Star(Math.random() * 800, Math.random() * 600, (Math.random() * 3) + 1, (Math.random() * this.starSpeed) + 1, this.lastStar, null);
			this.lastStar.prev.next = this.lastStar;
			this.numberOfStars ++;
		}

		var _en = _.coq.entities;

		_en.create(GameBoundingBox, {
			//front
			"pos": {"x": 325, "y": 50},
			"size": {"x": 175, "y": 25}
		});

		_en.create(GameBoundingBox, {
			//bridge right wall
			"pos": {"x": 475, "y": 75},
			"size": {"x": 25, "y": 75}
		});

		_en.create(GameBoundingBox, {
			//bridge right door
			//deck front right wall
			"pos": {"x": 425, "y": 150},
			"size": {"x": 100, "y": 25}
		});

		_en.create(GameBoundingBox, {
			//deck right wall front
			//right wing door front
			"pos": {"x": 500, "y": 175},
			"size": {"x": 25, "y": 175}
		});

		_en.create(GameBoundingBox, {
			//right wing front wall
			"pos": {"x": 525, "y": 300},
			"size": {"x": 125, "y": 25}
		});

		_en.create(GameBoundingBox, {
			//right wing side wall
			"pos": {"x": 625, "y": 325},
			"size": {"x": 25, "y": 125}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 425, "y": 425},
			"size": {"x": 200, "y": 25}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 500, "y": 400},
			"size": {"x": 25, "y": 125}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 275, "y": 500},
			"size": {"x": 225, "y": 25}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 275, "y": 400},
			"size": {"x": 25, "y": 100}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 150, "y": 425},
			"size": {"x": 225, "y": 25}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 150, "y": 300},
			"size": {"x": 25, "y": 125}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 175, "y": 300},
			"size": {"x": 100, "y": 25}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 275, "y": 150},
			"size": {"x": 25, "y": 200}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 300, "y": 150},
			"size": {"x": 75, "y": 25}
		});

		_en.create(GameBoundingBox, {
			"pos": {"x": 300, "y": 50},
			"size": {"x": 25, "y": 100}
		});

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
					"text": "Disembark",
					"action": function(){
						console.log("yeah!");
					}.bind(this),
					"enabled": true
				}
			],
			"message": [
				"If you're on a planet, station, or debris field, this is where you can disembark <span class='orion'>The Orion</span> and search for adventure."
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
						console.log("yeah!");
					}.bind(this),
					"enabled": true
				},
				{
					"key": 2,
					"keyword": "TWO",
					"text": "StarMap",
					"action": function(){
						console.log("yeah!");
					}.bind(this),
					"enabled": true
				}
			],
			"message": [
				"You enter the bridge of <span class='orion'>The Orion</span>",
				"From here, you can spend fuel in an attempt to find uncharted planets [1].",
				"Or you can view the star map, to visit a planet you've already discovered [2]"
			]
		});

		_en.create(GameDoor, {
			"sensor":{
				"pos": {"x": 375, "y": 125},
				"size": {"x": 50, "y": 75}
			},
			"door": {
				"pos": {"x": 375, "y": 150},
				"size": {"x": 50, "y": 25}
			},
			"orientation": "horizontal",
			"locked": false
		});

		_en.create(GameDoor, {
			"sensor":{
				"pos": {"x": 250, "y": 350},
				"size": {"x": 75, "y": 50}
			},
			"door": {
				"pos": {"x": 275, "y": 350},
				"size": {"x": 25, "y": 50}
			},
			"orientation": "vertical",
			"locked": false
		});

		_en.create(GameDoor, {
			"sensor":{
				"pos": {"x": 475, "y": 350},
				"size": {"x": 75, "y": 50}
			},
			"door": {
				"pos": {"x": 500, "y": 350},
				"size": {"x": 25, "y": 50}
			},
			"orientation": "vertical",
			"locked": false
		});

		_en.create(GameDoor, {
			"sensor":{
				"pos": {"x": 375, "y": 400},
				"size": {"x": 50, "y": 75}
			},
			"door": {
				"pos": {"x": 375, "y": 425},
				"size": {"x": 50, "y": 25}
			},
			"orientation": "horizontal",
			"locked": false
		});

		_en.create(GamePlayer,{
			"pos": {"x": 400 - 13, "y": 225},
			"size": {"x": 25, "y": 25}
		});

		this.update = function(){
			while(this.numberOfStars < this.maxStars){
				this.lastStar = new Star(Math.random() * 800, 0, (Math.random() * 3) + 1, (Math.random() * this.starSpeed) + 1, this.lastStar, null);
				this.lastStar.prev.next = this.lastStar;
				this.numberOfStars ++;
			}
			var starIter = this.firstStar;
			while(starIter !== null){
				starIter.y += starIter.speed;
				if(starIter.y > 600){
					if(starIter === this.lastStar) this.lastStar = starIter.prev;
					if(starIter === this.firstStar) this.firstStar = starIter.next;
					if(starIter.prev !== null) starIter.prev.next = starIter.next;
					if(starIter.next !== null) starIter.next.prev = starIter.prev;

					this.numberOfStars --;
				}
				starIter = starIter.next;
			}
		};

		this.draw = function(ctx){
			//starField
			ctx.strokeStyle = "#cccccc";
			var starIter = this.firstStar;
			while(starIter !== null){
				ctx.beginPath();
				ctx.moveTo(starIter.x, starIter.y);
				ctx.lineTo(starIter.x + starIter.size, starIter.y + starIter.size);
				ctx.moveTo(starIter.x + starIter.size, starIter.y);
				ctx.lineTo(starIter.x, starIter.y + starIter.size);
				ctx.stroke();
				starIter = starIter.next;
			}
			var strokeStyle = "#0000ff";
			var fillStyle = "#000000";
			//outside
			drawPath(ctx, pointsOutside, strokeStyle, fillStyle);
			//inside
			drawPath(ctx, pointsInside, strokeStyle);
		};
	};

	var drawPath = function(ctx, arr, stroke, fill){
		ctx.strokeStyle = stroke;
		if(fill !== undefined) ctx.fillStyle = fill;
		ctx.moveTo(arr[0][0], arr[0][1]);
		for(var i = 1; i < arr.length; i++){
			ctx.lineTo(arr[i][0], arr[i][1]);
		}
		ctx.stroke();
		if(fill !== undefined) ctx.fill();
	}

	var Star = function(x, y, size, speed, prev, next){
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.prev = prev;
		this.next = next;
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

	exports.GameSpaceShip = GameSpaceShip;
})(this);