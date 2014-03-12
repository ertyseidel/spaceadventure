;(function(exports){
	var Light = function(_, settings){
		this.noCollision = true;

		var _en = _.coq.entities;

		this.draw = function(ctx){
			c.entities.all().forEach(function(ent) {
				if (ent.opaque !== undefined) {
					var endpoints = getEndpoints(ent.opaque);
					
				}
			});
		};

	};

	var getEndpoints = function(ent) {
		if (ent.opaque.pos !== undefined && ent.opaque.size !== undefined) {
			return rectToOpaque(ent.opaque);
		}
		return ent.opaque;
	};

	var rectToOpaque = function(pos, size){
		return [
			{
				x: pos.x,
				y: pos.y,
			},
			{
				x: pos.x + size.x,
				y: pos.y,
			},
			{
				x: pos.x + size.x,
				y: pos.y + size.y
			},
			{
				x: pos.x,
				y: pos.y + size.y
			}
		];
	};

	exports.Light = Light;
})(this);
