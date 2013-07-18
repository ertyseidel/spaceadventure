;(function(exports){
	var GameScreen = function(_, settings){
		this.noCollision = true;
		var _en = _.coq.entities;

		switch(settings.screen){
			case "start screen":
				_en.create(GameStartScreen, {});
				break;
			case "choose character":
				_en.create(GameChooseCharacter, {});
				break;
			case "space ship":
				_en.create(GameSpaceShip, {"maxStars": 100, "starSpeed": 0.1});
				break;
		}

		_en.create(GameScreenHUD, settings.HUD);
	};

	exports.GameScreen = GameScreen;
})(this);