;(function(exports){
	var GameSolarMap = function(_, settings){
		this.noCollision = true;

		this.stars = getStarsInRect(_.GALAXY.galaxyStars, settings.solarRect);
		this.stars.forEach(function(star){
			star.x = _.coq.renderer.worldSize.x * ((star.x - settings.solarRect.x) / settings.solarRect.width);
			star.y = _.coq.renderer.worldSize.y * ((star.y - settings.solarRect.y) / settings.solarRect.height);
			star.size *= 10;
		});

		var Ring = function(){
			this.r = 0,
			this.p = 0
		}

		Ring.prototype.addBit = function(a){
			switch(a){
				case "0":
					this.r ++;
				case "1":
					this.p ++;
			}
		}

		this.stars.forEach(function(star){
			var planetString = star.size.toString(2);
			planetString = planetString.substring(planetString.indexOf(".") + 1);
			star.rings = [];
			var ring = new Ring();
			var i = 1;
			while(i < planetString.length){
				if(planetString[i] == "0" && planetString[i-1] == "1"){
					star.rings.push(ring);
					ring = new Ring();
					ring.addBit(planetString[i]);
				} else {
					ring.addBit(planetString[i]);
				}
				i++;
			}
			star.rings.push(ring);
		});

		this.draw = function(ctx){
			this.stars.forEach(function(star){
				ctx.fillStyle = "#ffffff";
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.size / 2, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fill();

				var rad = 30;
				star.rings.forEach(function(ring){
					rad += ring.r * 5;
					if(ring.p > 15){ //pirate cache
						ctx.strokeStyle = "#ff6600";
						ctx.beginPath();
						ctx.arc(star.x, star.y, rad, 0, 2*Math.PI);
						ctx.stroke();
					} else if(ring.p > 12){ //space station
						ctx.strokeStyle = "#ffffff";
						ctx.beginPath();
						ctx.arc(star.x, star.y, rad, 0, 2*Math.PI);
						ctx.stroke();
					} else if(ring.p > 9){ //planet
						ctx.strokeStyle = "#00ff00";
						ctx.beginPath();
						ctx.arc(star.x, star.y, rad, 0, 2*Math.PI);
						ctx.stroke();
					} else if(ring.p > 6){ //asteroid belt
						ctx.strokeStyle = "#999999";
						ctx.beginPath();
						ctx.arc(star.x, star.y, rad, 0, 2*Math.PI);
						ctx.stroke();
					} else if(ring.p > 3){ //gas field
						ctx.strokeStyle = "#444444";
						ctx.beginPath();
						ctx.arc(star.x, star.y, rad, 0, 2*Math.PI);
						ctx.stroke();
					}
				});

			});
		}

	};

	/* based on http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/ */
	function getStarsInRect(arr, rect) {
		var minIndex = 0;
		var maxIndex = arr.length - 1;
		var currentIndex;
		var rtn = [];
		var smallerIndex;
		var largerIndex;

		while (minIndex <= maxIndex) {
			currentIndex = (minIndex + maxIndex) / 2 | 0;
			if (arr[currentIndex].y > rect.y && arr[currentIndex].y < rect.y + rect.height) {
				smallerIndex = largerIndex = currentIndex;
				while(smallerIndex >= 0 && arr[smallerIndex].y >= rect.y){
					if(arr[smallerIndex].x >= rect.x && arr[smallerIndex].x < rect.x + rect.width){
						rtn.push(new Star(arr[smallerIndex].x, arr[smallerIndex].y, arr[smallerIndex].size, arr[smallerIndex].speed));
					}
					smallerIndex --;
				}
				while(largerIndex < arr.length && arr[largerIndex].y < rect.y + rect.height){
					if(arr[largerIndex].x >= rect.x && arr[largerIndex].x < rect.x + rect.width){
						rtn.push(new Star(arr[largerIndex].x, arr[largerIndex].y, arr[largerIndex].size, arr[largerIndex].speed));
					}
					largerIndex ++;
				}
				return rtn;
			} else if (arr[currentIndex].y < rect.y) {
				minIndex = currentIndex + 1;
			} else if(arr[currentIndex].y > rect.y + rect.height){
				maxIndex = currentIndex - 1;
			} else{
				console.log("THIS IS UNACCEPTABLLEEEEEEEEE");
				return [];
			}
		}
		return [];
	}

	exports.GameSolarMap = GameSolarMap;
})(this);
