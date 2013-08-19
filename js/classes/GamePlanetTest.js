;(function(exports){
	var GamePlanetTest = function(_, settings){
		this.noCollision = true;

		var _en = _.coq.entities;

		_.appendMessage("You have arrived on a testing planet!");

		this.draw = function(ctx){
			ctx.fillStyle = "#555";
			for(var i = 0; i < 100; i++){
				ctx.fillRect(0, 20 * i, 800, 1);
			}
			for(var i = 0; i < 100; i++){
				ctx.fillRect(20 * i, 0, 1, 800);
			}
		}

	};

	exports.GamePlanetTest = GamePlanetTest;
})(this);
