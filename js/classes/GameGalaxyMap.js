;(function(exports){
	var GameGalaxyMap = function(_, settings){
		this.noCollision = true;

		this.gridResolution = {
			x: 8 * 2,
			y: 6 * 2
		};

		this.currentPlayerRect = {};

		this.draw = function(ctx){
			ctx.strokeStyle = "#000066";
			this.drawGrid(ctx);
			ctx.drawImage(_.GALAXY.starsBuffer, 0, 0);
			ctx.strokeStyle = "#ffffff";
			ctx.strokeRect(this.currentPlayerRect.x, this.currentPlayerRect.y, this.currentPlayerRect.width, this.currentPlayerRect.height);
		}

		this.drawGrid = function(ctx){
			ctx.beginPath();
			for(var i = 0; i < _.coq.renderer.worldSize.x / this.gridResolution.x; i++){
				ctx.moveTo(i * this.gridResolution.x, 0);
				ctx.lineTo(i * this.gridResolution.x, _.coq.renderer.worldSize.y);
			}
			for (var j = 0; j < _.coq.renderer.worldSize.y / this.gridResolution.y; j++) {
				ctx.moveTo(0, j * this.gridResolution.y);
				ctx.lineTo(_.coq.renderer.worldSize.x, j * this.gridResolution.y);
			};
			ctx.stroke();
		}

		this.update = function(ctx){
			var player = _.coq.entities.all(GamePlayer)[0];
			var playerRect = {
				x: player.pos.x - (player.pos.x % this.gridResolution.x),
				y: player.pos.y - (player.pos.y % this.gridResolution.y),
				width: this.gridResolution.x,
				height: this.gridResolution.y
			};

			if(playerRect.x != this.currentPlayerRect.x || playerRect.y != this.currentPlayerRect.y){
				this.currentPlayerRect = playerRect;

				var solarRectImage = _.GALAXY.starsBuffer.getContext("2d").getImageData(
					this.currentPlayerRect.x,
					this.currentPlayerRect.y,
					this.currentPlayerRect.width,
					this.currentPlayerRect.height);

				var density = 0;
				var life = false;
				for(var i = 0; i < solarRectImage.data.length; i+=4){
					density += solarRectImage.data[i] + solarRectImage.data[i+1] + solarRectImage.data[i+2] >= 255 ? 1 : 0;
					if(solarRectImage.data[i+1] == 255 && solarRectImage.data[i] == 0){
						life = true;
					}
				}
				density /= solarRectImage.data.length / 4;

				if(density > .5){
					_.setMessage("The incredible density of stars here prevents safe interstellar travel.", "#0000ff");
				} else if(density < .05){
					_.setMessage("There is not much here, perhaps a lonely star.", "#0000ff");
				} else{
					_.setMessage("");
				}

				if(life){
					_.appendMessage("Lifeforms detected on at least one system.", "#0000ff");
				}

				if(_.debugMode){
					_.appendMessage("Density: " + density);
				}

				_.coq.entities.all(GameHUDOption).forEach(function(hudbox){
					if(hudbox.keyword == "ONE"){
						hudbox.enabled = density <= .5;
					}
				});
			}
		}
	};

	exports.GameGalaxyMap = GameGalaxyMap;
})(this);
