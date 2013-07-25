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
				_en.create(GameSpaceShip, {"maxStars": 150, "starSpeed": 0.1});
				break;
			case "planet test":
				_en.create(GamePlanetTest, {});
				break;
		}

		if(typeof(settings.player) !== 'undefined'){
			_en.create(GamePlayer,{
				"pos": {"x": 400 - 13, "y": 215},
				"size": {"x": 25, "y": 25}
			});
		}

		_en.create(GameScreenHUD, settings.HUD);
	};

	exports.GameScreen = GameScreen;
})(this);
