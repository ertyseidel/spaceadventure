;(function(exports){
	var GameText = function(_, settings){
		this.noCollision = true;
		var defaults = {
			"text": "",
			"isSelected": false,
			"isHovered": false,
			"fillStyle": "white",
			"selectedFillStyle": "#0000ff",
			"font": "18px 'ubuntu mono'",
			"x": 50,
			"y": 50,
			"name": "",
			"type": "",
			"description": ""
		};
		for (var i in defaults){
			this[i] = typeof(settings[i]) == "undefined" ? defaults[i] : settings[i];
		}
		this.draw = function(ctx){
			ctx.fillStyle = this.isSelected ? this.selectedFillStyle : this.fillStyle;
			ctx.font = this.font;
			ctx.fillText(this.isHovered ? ">" + this.text : this.text, this.x, this.y);
		};
	};

	exports.GameText = GameText;
})(this);
