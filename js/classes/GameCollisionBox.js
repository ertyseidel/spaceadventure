;(function(exports){
	var GameCollisionBox = function(_, settings){
		this.CollisionBox = _.coq.collider.RECTANGLE;
		this.collided = false;
		var defaults = {
			"pos": {"x": 0, "y": 0},
			"size": {"x": 0, "y": 0},
			"color": "#ff0000"
		};
		for (var i in defaults){
			this[i] = typeof(settings[i]) == "undefined" ? defaults[i] : settings[i];
		}
		this.draw = function(ctx){
			if(_.debugMode){
				ctx.strokeStyle = this.color;
				ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			}
			if(_.debugMode && this.collided){
				ctx.fillStyle = this.color;
				ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			}
		};
	};
	exports.GameCollisionBox = GameCollisionBox;
})(this);
