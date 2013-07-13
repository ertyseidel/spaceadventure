;(function(exports){
	var GameBoundingBox = function(_, settings){
		this.BoundingBox = _.coq.collider.RECTANGLE;
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
		//	ctx.strokeStyle = this.color;
		//		ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			if(this.collided){
				ctx.fillStyle = this.color;
				ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			}
		};
	};
	exports.GameBoundingBox = GameBoundingBox;
})(this);