;(function(exports){
	var GameCollisionBox = function(_, settings){

		this.CollisionBox = _.coq.collider.RECTANGLE;
		this.collided = false;

		var defaults = {
			"pos": {"x": 0, "y": 0},
			"size": {"x": 0, "y": 0}
		};

		for (var i in defaults){
			this[i] = typeof(settings[i]) == "undefined" ? defaults[i] : settings[i];
		}

		this.opaque = {
			pos: this.pos,
			size: this.size
		};

		this.draw = function(ctx){
			if(_.GALAXY.debugMode){
				ctx.strokeStyle = "ff0000";
				ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			}
			if(_.GALAXY.debugMode && this.collided){
				ctx.fillStyle = "ff0000";
				ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			}
		};
	};
	exports.GameCollisionBox = GameCollisionBox;
})(this);
