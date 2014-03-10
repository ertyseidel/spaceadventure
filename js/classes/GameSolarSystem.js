;(function(exports){
	var GameSolarSystem = function(_, settings){
		this.boundingBox = _.coq.collider.CIRCLE;

		this.star = settings.star;
		this.rings = generateRings(settings.star);

		var rad = this.rings.reduce(function(p, c, i, a){return p + (c.r * 4)}, 40);

		this.size = {
			x: rad,
			y: rad
		}

		this.pos = {
			x: ((_.coq.renderer.worldSize.x - 200) * ((this.star.x - settings.solarRect.x) / settings.solarRect.width)),
			y: ((_.coq.renderer.worldSize.y - 200) * ((this.star.y - settings.solarRect.y) / settings.solarRect.height))
		}

		if(_.GALAXY.planetRotation == undefined){
			_.GALAXY.planetRotation = Math.random() * Math.PI * 2;
		}

		this.collided = false;

		this.draw = function(ctx){

			drawPos = {
				x: this.pos.x + this.size.x / 2,
				y: this.pos.y + this.size.y / 2
			}

			ctx.fillStyle = _.settings.color_star;
			ctx.beginPath();
			ctx.arc(drawPos.x, drawPos.y, this.star.size, 0, 2*Math.PI);
			if(this.collided){
				ctx.strokeStyle = _.settings.color_star_selected;
				ctx.lineWidth = 5;
				ctx.stroke();
				ctx.lineWidth = 1;
			}
			ctx.closePath();
			ctx.fill();

			var rad = 20;
			this.rings.forEach(function(ring){
				rad += ring.r * 2;
				var rot = ((_.GALAXY.planetRotation * ((80 - rad) / 100) / 50) + rad) % (Math.PI * 2);
				var planet = {x: drawPos.x + (rad * Math.cos(rot)), y: drawPos.y + (rad * Math.sin(rot))};
				if(ring.p >= _.settings.ring_count_pirate_cache){ //pirate cache
					ctx.strokeStyle = _.settings.color_pirate_cache;
					ctx.beginPath();
					ctx.arc(drawPos.x, drawPos.y, rad, 0, 2*Math.PI);
					ctx.stroke();
				} else if(ring.p >= _.settings.ring_count_space_station){ //space station
					ctx.strokeStyle = _.settings.color_space_station;
					ctx.beginPath();
					ctx.arc(drawPos.x, drawPos.y, rad, 0, 2*Math.PI);
					ctx.stroke();
					//planet
					ctx.fillStyle = _.settings.color_dead_planet;
					ctx.beginPath();
					ctx.arc(planet.x, planet.y, (ring.p - 12) + 2, 0, 2*Math.PI);
					ctx.fill();
					//station
					ctx.strokeStyle = _.settings.color_space_station;
					ctx.beginPath();
					ctx.strokeRect(planet.x + (4 * (Math.cos(rot * 4))), planet.y + (4 * (Math.sin(rot * 4))), 2, 2);
					ctx.closePath();
					ctx.stroke();
				} else if(ring.p >= _.settings.ring_count_live_planet){ //planet
					//path
					ctx.strokeStyle = _.settings.color_live_planet;
					ctx.beginPath();
					ctx.arc(drawPos.x, drawPos.y, rad, 0, 2*Math.PI);
					ctx.stroke();
					//planet
					ctx.fillStyle = _.settings.color_live_planet
					ctx.beginPath();
					ctx.arc(planet.x, planet.y, (ring.p - 9) + 2, 0, 2*Math.PI);
					ctx.fill();
				} else if(ring.p >= _.settings.ring_count_dead_planet){ //dead planet
					ctx.strokeStyle = _.settings.color_dead_planet;
					//path
					ctx.beginPath();
					ctx.arc(drawPos.x, drawPos.y, rad, 0, 2*Math.PI);
					ctx.stroke();
					//planet
					ctx.fillStyle = _.settings.color_dead_planet
					ctx.beginPath();
					ctx.arc(planet.x, planet.y, (ring.p - 6) + 2, 0, 2*Math.PI);
					ctx.fill();
				} else if(ring.p >= _.settings.ring_count_asteroids){ //asteroids
					ctx.strokeStyle = _.settings.color_asteroids;
					ctx.beginPath();
					ctx.lineWidth = (ring.r * 3);
					ctx.arc(drawPos.x, drawPos.y, rad, 0, 2*Math.PI);
					ctx.stroke();
					ctx.lineWidth = 1;
				}
			}.bind(this));

			if(_.GALAXY.debugMode){
				ctx.strokeStyle = "#ff0000";
				ctx.beginPath();
				ctx.arc(drawPos.x, drawPos.y, this.size.x / 2, 0, 2*Math.PI);
				ctx.closePath();
				ctx.stroke();
			}
		}

		this.getHUDOptions = function(){
			options = [];
			var i = 1;
			this.rings.forEach(function(ring){
				if(ring.p >= _.settings.ring_count_pirate_cache){
					options.push({
						"key": i,
						"keyword": keywords[i],
						"text": "Pirate Cache",
						"action": function(){
							console.log(ring.p);
						}.bind(this),
						"enabled": true
					});
			} else if(ring.p >= _.settings.ring_count_space_station){
					options.push({
						"key": i,
						"keyword": keywords[i],
						"text": "Station",
						"action": function(){
							console.log(ring.p);
						}.bind(this),
						"enabled": true
					});
				} else if(ring.p >= _.settings.ring_count_live_planet){
					options.push({
						"key": i,
						"keyword": keywords[i],
						"text": "Planet",
						"action": function(){
							_.changeGameState("planet live");
						}.bind(this),
						"enabled": true
					});
				} else if(ring.p >= _.settings.ring_count_dead_planet){
					options.push({
						"key": i,
						"keyword": keywords[i],
						"text": "Dead Planet",
						"action": function(){
							console.log(ring.p);
						}.bind(this),
						"enabled": true
					});
				}
				if(ring.p >= 6){
					i++;
				}
			});
			return options;
		}

		this.update = function(){
			_.GALAXY.planetRotation += Math.PI / 1000;
			console.log();
		}

	};

	var generateRings = function(star){
		var rings = [];
		var planetString = star.size.toString(2);
		planetString.substring(planetString.indexOf(".") + 1);
		var ring = new Ring();
		var i = 1;
		while(i < planetString.length){
			if(planetString[i] == "0" && planetString[i-1] == "1"){
				rings.push(ring);
				ring = new Ring();
				ring.addBit(planetString[i]);
			} else {
				ring.addBit(planetString[i]);
			}
			i++;
		}
		rings.push(ring);
		return rings;
	}

	var Ring = function(){
		this.r = 0,
		this.p = 0
	}

	Ring.prototype.addBit = function(a){
		switch(a){
			case "0":
				this.r ++;
				break;
			case "1":
				this.p ++;
				break;
		}
	}

	var keywords = [
		"",
		"ONE",
		"TWO",
		"THREE",
		"FOUR",
		"FIVE",
		"SIX",
		"SEVEN"
	]

	exports.GameSolarSystem = GameSolarSystem;
})(this);
