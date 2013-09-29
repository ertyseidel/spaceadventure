;(function(exports){
	var GameSolarMap = function(_, settings){
		this.noCollision = true;

		this.solarSystems = [];
		this.HUDOptions = [];
		this.currentSolarSystem = null;

		var stars = getStarsInRect(_.GALAXY.galaxyStars, settings.solarRect);
		var _en = _.coq.entities;
		stars.forEach(function(star){
			_en.create(GameSolarSystem, {"star": star, "solarRect": settings.solarRect}, function(s){this.solarSystems.push(s);}.bind(this));
		}.bind(this));

		this.update = function(){
			var solarSystemCollisions = _.coq.entities.all(GamePlayer)[0].solarSystemCollisions;
			if(solarSystemCollisions.length > 0 && solarSystemCollisions[0] != this.currentSolarSystem){
				this.destroyHUDElements();
				this.currentSolarSystem = solarSystemCollisions[0];
				_.setMessage("There is a star here.");
				var starHasSomething = false;
				this.currentSolarSystem.rings.forEach(function(ring){
					if(ring.p >= _.settings.ring_count_pirate_cache){
						_.appendMessage("There is a pirate cache!");
					} else if(ring.p >= _.settings.ring_count_space_station){
						_.appendMessage("There is a space station here!");
					} else if(ring.p >= _.settings.ring_count_live_planet){
						_.appendMessage("There is a planet with life here!");
					} else if(ring.p >= _.settings.ring_count_dead_planet){
						_.appendMessage("There is a dead planet here.");
					}
					if(ring.p >= _.settings.ring_count_dead_planet){
						starHasSomething = true;
					}
				});
				if(!starHasSomething){
					_.appendMessage("... but there is nothing of interest orbiting it.");
				}
				this.createHUDElements(this.currentSolarSystem);
			} else if(solarSystemCollisions.length == 0){
				this.currentSolarSystem = null;
				_.setMessage("");
			}
		};

		this.createHUDElements = function(solarSystem){
			var addToHUD = function(e){this.HUDOptions.push(e);}.bind(this);
			solarSystem.getHUDOptions().forEach(function(option){
				_en.create(GameHUDOption, option, addToHUD);
			});
		};

		this.destroyHUDElements = function(solarSystem){
			if(this.HUDOptions.length > 0){
				for (var h = 0; h < this.HUDOptions.length; h++){
					_.coq.entities.destroy(this.HUDOptions[h]);
				}
				this.HUDOptions = [];
			}
		};

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
						rtn.push(arr[smallerIndex]);
					}
					smallerIndex --;
				}
				while(largerIndex < arr.length && arr[largerIndex].y < rect.y + rect.height){
					if(arr[largerIndex].x >= rect.x && arr[largerIndex].x < rect.x + rect.width){
						rtn.push(arr[largerIndex]);
					}
					largerIndex ++;
				}
				return rtn;
			} else if (arr[currentIndex].y < rect.y) {
				minIndex = currentIndex + 1;
			} else if(arr[currentIndex].y > rect.y + rect.height){
				maxIndex = currentIndex - 1;
			} else{ //should never happen
				return [];
			}
		}
		return [];
	}

	exports.GameSolarMap = GameSolarMap;
})(this);
