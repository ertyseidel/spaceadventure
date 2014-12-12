;(function(exports){
	var GamePlanetLive = function(_, settings){
		this.noCollision = true;

		var _en = _.coq.entities;

		_en.create(GamePlanetArea, {
			pos: {
				x: 0,
				y: 0
			}
		});

		_.setMessage("You have arrived on a live planet!");

		this.draw = function() {

		};

		this.update = function() {
			var player = _en.all(GamePlayer)[0];
			var paet = _.settings.planet_area_edge_tolerance;
			if( player.pos.x <= paet){
				console.log("move left");
			} else if( player.pos.x + player.size.x >= _.coq.renderer.worldSize.x - paet){
				console.log("move right");
			} else if( player.pos.y <= paet){
				console.log("move up");
			} else if( player.pos.y + player.size.y >= _.coq.renderer.worldSize.y - paet){
				console.log("move down");
			}
		};

		this.createWorldMap = function() {
			Math.seedrandom(settings.seed);
			var size = settings.ring.p;

			var tiles = [];
			var i;
			for(i = 0; i < size; i++) {
				tiles[i] = [];
			}


		};

		this.worldMap = this.createWorldMap(settings.seed);

	};

	exports.GamePlanetLive = GamePlanetLive;
})(this);
