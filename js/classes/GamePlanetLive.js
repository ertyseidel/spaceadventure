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

		};

	};

	exports.GamePlanetLive = GamePlanetLive;
})(this);
