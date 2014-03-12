;(function(exports){
	var GamePlanetLive = function(_, settings){
		this.noCollision = true;

		var _en = _.coq.entities;

		_.setMessage("You have arrived on a testing planet!");

		this.draw = function(ctx){

		};
	};

	var generatePlanet = function(options){

		var size = {
			x: options.size.x === undefined ? 10 : options.size.x,
			y: options.size.y === undefined ? 10 : options.size.y
		};

		var seed = options.seed === undefined ? Math.random() : options.seed;

		var Grid = (function(w, h){
			this._width = w;
			this._height = h;
			this._grid = new Array((this._width * this._height) | 0);
		});

		Grid.prototype.get = function(x, y){
			var coords = this._normalize(x, y);
			return this._grid[(coords.y * coords.x) + coords.x];
		};

		Grid.prototype.set = function(x, y, item){
			var coords = this._normalize(x, y);
			this._grid[(coords.y * coords.x) + coords.x] = item;
		};

		Grid.prototype._normalize = function(x, y){
			if(x < 0) x = (this._width + x) % this._width;
			else if(x >= this._width) x = x % this._width ;
			if(y < 0) y = (this._height + y) % this._height;
			else if(y >= this._height) y = y % this._height;
			return {'x': x, 'y': y};
		};

		var grid = new Grid(size.x, size.y);
	};

	exports.GamePlanetLive = GamePlanetLive;
})(this);
