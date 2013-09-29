;(function(exports){
	var GameGalaxyMap = function(_, settings){
		this.noCollision = true;

		this.gridResolution = {
			x: 8 * 2,
			y: 6 * 2
		};

		this.currentPlayerRect = {};

		this.draw = function(ctx){
			ctx.strokeStyle = _.settings.color_galaxy_grid;
			this.drawGrid(ctx);
			ctx.drawImage(_.GALAXY.starsBuffer, 0, 0);
			ctx.strokeStyle = _.settings.color_galaxy_outline_box;
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
				var station = false;
				var pirates = false;
				for(var i = 0; i < solarRectImage.data.length; i+=4){
					density += solarRectImage.data[i] + solarRectImage.data[i+1] + solarRectImage.data[i+2] >= 255 ? 1 : 0;
					if(solarRectImage.data[i+1] > 200 && solarRectImage.data[i] == 0){
						life = true;
					}
					if(solarRectImage.data[i] > 200 && solarRectImage.data[i+1] == 0){
						station = true;
					}
					if(solarRectImage.data[i] > 200 && solarRectImage.data[i+1] > 70 && solarRectImage.data[i+2] == 0){
						pirates = true;
					}
				}
				density /= solarRectImage.data.length / 4;

				if(density > .5){
					_.setMessage("The incredible density of stars here prevents safe interstellar travel.");
				} else if(density < .05){
					_.setMessage("There is not much here, perhaps a lonely star.");
				} else{
					_.setMessage("");
				}

				if(life){
					_.appendMessage("Lifeforms detected on at least one system.", _.settings.color_text_info);
				}

				if(station){
					_.appendMessage("There is a large space station in this sector.", _.settings.color_text_info);
				}

				if(pirates){
					_.appendMessage("A dangerous pirate treasure cache is located here!", _.settings.color_text_info);
				}

				if(_.GALAXY.debugMode){
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
