window.addEventListener('load', function() {
	game = new Game("canvas", "text", 800, 600, gameSettings);
	//game.changeGameState("start screen");
	// game.changeGameState("planet live", {
	// 	seed: Math.random(),
	// 	ring: {
	// 		p: 2,
	// 		r: 2
	// 	}
	// });
	game.changeGameState("space ship");
});
