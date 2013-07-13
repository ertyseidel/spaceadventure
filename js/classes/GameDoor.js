;(function(exports){
	var GameDoor = function(_, settings){
		for (var i in settings.sensor) {
			this[i] = settings.sensor[i];
		}

		this.door = settings.door;
		this.locked = settings.locked;
		this.orientation = settings.orientation || "vertical";
		this.triggered = false;
		this.opening = 0;
		this.openTime = 10;
		this.waiting = 0;
		this.waitTime = 30;

		this.collision = function(other){
			if(other instanceof GamePlayer){
				if(!this.locked && !this.triggered){
					this.triggered = true;
					this.opening = this.openTime;
					this.waiting = 0;
				}
			}
		};
		this.uncollision = function(other){
			if(other instanceof GamePlayer){
				if(!this.locked){
					this.triggered = false;
					this.opening = - this.openTime;
					this.waiting = this.waitTime;
				}
			}
		};
		this.update = function(){
			if(this.opening > 0){
				this.opening --;
			} else if(this.waiting > 0){
				this.waiting --;
			} else if(this.opening < 0){
				this.opening ++;
			}
		};
		this.draw = function(ctx){
			//ctx.strokeStyle = "#ff0000";
			//ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			ctx.strokeStyle = "#0000ff";
			if(this.orientation == "vertical"){
				if(this.opening === 0 && !this.triggered && this.waiting === 0){
					ctx.strokeRect(this.door.pos.x, this.door.pos.y, this.door.size.x, this.door.size.y / 2);
					ctx.strokeRect(this.door.pos.x, this.door.pos.y + this.door.size.y, this.door.size.x, - this.door.size.y / 2);
				} else if(this.opening > 0){
					ctx.strokeRect(this.door.pos.x, this.door.pos.y, this.door.size.x, (this.door.size.y / 2) * (this.opening / this.openTime));
					ctx.strokeRect(this.door.pos.x, this.door.pos.y + this.door.size.y, this.door.size.x, - (this.door.size.y / 2) * (this.opening / this.openTime));
				} else if(this.opening < 0 && this.waiting === 0){
					ctx.strokeRect(this.door.pos.x, this.door.pos.y, this.door.size.x, (this.door.size.y / 2) * (1 + (this.opening / this.openTime)));
					ctx.strokeRect(this.door.pos.x, this.door.pos.y + this.door.size.y, this.door.size.x, - (this.door.size.y / 2) * (1 + (this.opening / this.openTime)));
				}
			} else if(this.orientation == "horizontal"){
				if(this.opening === 0 && !this.triggered && this.waiting === 0){
					ctx.strokeRect(this.door.pos.x, this.door.pos.y, this.door.size.x / 2, this.door.size.y);
					ctx.strokeRect(this.door.pos.x + this.door.size.x, this.door.pos.y, - this.door.size.x / 2, this.door.size.y);
				} else if(this.opening > 0){
					ctx.strokeRect(this.door.pos.x, this.door.pos.y, (this.door.size.x / 2) * (this.opening / this.openTime),  this.door.size.y);
					ctx.strokeRect(this.door.pos.x + this.door.size.x, this.door.pos.y, - (this.door.size.x / 2) * (this.opening / this.openTime), this.door.size.y);
				} else if(this.opening < 0 && this.waiting === 0){
					ctx.strokeRect(this.door.pos.x, this.door.pos.y, (this.door.size.x / 2) * (1 + (this.opening / this.openTime)), this.door.size.y);
					ctx.strokeRect(this.door.pos.x + this.door.size.x, this.door.pos.y, - (this.door.size.x / 2) * (1 + (this.opening / this.openTime)), this.door.size.y);
				}
			}
		};
	};

	exports.GameDoor = GameDoor;
})(this);