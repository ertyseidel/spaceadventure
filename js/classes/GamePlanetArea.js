;(function(exports){
	var GamePlanetArea = function(_, settings){
		this.noCollision = true;

		var defaults = {
			pos: {
				x: 0,
				y: 0
			}
		};

		for (var i in settings){
			this[i] = typeof(settings[i]) == "undefined" ? defaults[i] : settings[i];
		}

		var _en = _.coq.entities;

		importArea(_en, 'planet_live_1', {x: 0, y: 0}, function(area){this.area = area;}.bind(this));

		this.draw = function(ctx){
			if(!this.area) return;
			ctx.drawImage(this.area.bg, 0, 0);
		};

	};

	exports.GamePlanetArea = GamePlanetArea;
})(this);
