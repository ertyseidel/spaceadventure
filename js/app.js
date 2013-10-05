window.addEventListener('load', function() {
	game = new Game("canvas", "text", 800, 600, gameSettings);
	//game.changeGameState("start screen");
	//game.changeGameState("planet test");
	game.changeGameState("space ship");
});
