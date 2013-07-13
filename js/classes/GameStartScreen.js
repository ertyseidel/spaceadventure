;(function(exports){
	var GameStartScreen = function(_, settings){
		this.noCollision = true;

		var _en = _.coq.entities;

		_en.create(GameText, {
			"text": "Space Adventure",
			"fillStyle": "white",
			"font": "40px 'ubuntu mono'",
			"y": 100
		});
	};

	exports.GameStartScreen = GameStartScreen;
})(this);