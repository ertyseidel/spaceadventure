;(function(exports){
	var GamePlanetTest = function(_, settings){
		this.noCollision = true;

		var _en = _.coq.entities;

		_.setMessage("You have arrived on a testing planet!");

		this.draw = function(ctx){
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(100, 100, 100, 100);
			ctx.fillRect(300, 300, 100, 100);
		}

	};

	exports.GamePlanetTest = GamePlanetTest;
})(this);
