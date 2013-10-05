;(function(exports){

	var GameMapData = function(_){

		this.drawing = null;
		this.collision = null;
		this.doors = null;

		this.load = function(url, callback){
			canvg(canvas, url);
		}.bind(this);
	};

	exports.GameMapData = GameMapData;
})(this);