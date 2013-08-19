;(function(exports){
	var GamePlayer = function(_, settings){

		var _in = _.coq.inputter;

		this.zindex = 1000;

		this.CollisionBox = _.coq.collider.CIRCLE;
		this.wallCollisions = {
			"up": false,
			"down": false,
			"left": false,
			"right": false
		};

		var defaults = {
			"pos": {"x": 0, "y": 0},
			"size": {"x": 0, "y": 0},
			"vec": {"x": 0, "y": 0},
			"acceleration": 0.2,
			"friction": 0.9,
			"maxSpeed": 2,
			"zindex": 100,
			"style": "human"
		};

		for (var i in defaults){
			this[i] = typeof(settings[i]) == "undefined" ? defaults[i] : settings[i];
		}

		this.draw = function(ctx){
			//draw player
			switch(this.style){
				case "space ship":
					this.spaceshipDraw(ctx);
					break;
				case "human":
					this.humanDraw(ctx);
					break;
			}
		};

		this.humanDraw = function(ctx){
			ctx.strokeStyle = "#0000ff";
			ctx.beginPath();
			ctx.arc(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, this.size.x / 2, 0, 2*Math.PI);
			ctx.stroke();
		}

		this.spaceshipDraw = function(ctx){
			if(_.debugMode){
				ctx.fillStyle = "#00ff00";
				ctx.beginPath();
				ctx.fillRect(this.pos.x, this.pos.y, 5, 5);
			}
		}

		this.update = function(){

			if(_in.state(_in.UP_ARROW)){
				this.vec.y -= this.acceleration;
				if(this.vec.y < -this.maxSpeed){
					this.vec.y = -this.maxSpeed;
				}
			}
			if(_in.state(_in.DOWN_ARROW)){
				this.vec.y += this.acceleration;
				if(this.vec.y > this.maxSpeed){
					this.vec.y = this.maxSpeed;
				}
			}
			if(_in.state(_in.LEFT_ARROW)){
				this.vec.x -= this.acceleration;
				if(this.vec.x < -this.maxSpeed){
					this.vec.x = -this.maxSpeed;
				}
			}
			if(_in.state(_in.RIGHT_ARROW)){
				this.vec.x += this.acceleration;
				if(this.vec.x > this.maxSpeed){
					this.vec.x = this.maxSpeed;
				}
			}
			if((this.wallCollisions.left === false && this.vec.x < 0) ||
			(this.wallCollisions.right === false && this.vec.x > 0)){
				if(this.pos.x + this.vec.x >= 0 && this.pos.x + this.vec.x + this.size.y <= _.coq.renderer.worldSize.x){
					this.pos.x += this.vec.x;
				}
			}
			if((this.wallCollisions.up === false && this.vec.y < 0) ||
			(this.wallCollisions.down === false && this.vec.y > 0)){
				if(this.pos.y + this.vec.y >= 0 && this.pos.y + this.vec.y + this.size.y <= _.coq.renderer.worldSize.y){
					this.pos.y += this.vec.y;
				}
			}
			this.vec.x *= this.friction;
			this.vec.y *= this.friction;
		};

		this.collision = function(other){
			if(other instanceof GameCollisionBox){
				other.collided = true;
				//UP
				if(this.pos.y <= other.pos.y + other.size.y &&
					this.pos.y + this.size.y / 2 > other.pos.y){
					//this.pos.y = other.pos.y + other.size.y;
					this.wallCollisions.up = other;
				}
				//DOWN
				if(this.pos.y + this.size.y >= other.pos.y &&
					this.pos.y + this.size.y / 2 < other.pos.y){
					//this.pos.y = other.pos.y - this.size.y;
					this.wallCollisions.down = other;
				}
				//LEFT
				if(this.pos.x <= other.pos.x + other.size.x &&
					this.pos.x + this.size.x / 2 > other.pos.x + other.size.x){
					this.pos.x = other.pos.x + other.size.x;
					this.wallCollisions.left = other;
				}
				//RIGHT
				if(this.pos.x + this.size.x >= other.pos.x &&
					this.pos.x + this.size.x / 2 < other.pos.x){
					this.pos.x = other.pos.x - this.size.x;
					this.wallCollisions.right = other;
				}
			}

		};

		this.uncollision = function(other){
			if(other instanceof GameCollisionBox){
				other.collided = false;
				if(other == this.wallCollisions.up) this.wallCollisions.up = false;
				if(other == this.wallCollisions.down) this.wallCollisions.down = false;
				if(other == this.wallCollisions.left) this.wallCollisions.left = false;
				if(other == this.wallCollisions.right) this.wallCollisions.right = false;
			}
		};
	};

	exports.GamePlayer = GamePlayer;

})(this);
