;(function(exports){
	var AnimationWarp = function(settings){
		this.scenes = [
			"waiting for warp",
			"stars stretching",
			"stars hold",
			"stars reducing",
			"warp complete"
		];

		this.keyFrames = settings.keyFrames || [0, 120, 240, 250, 390, 450];

		this.stars = [];
		this.driftSpeed = -0.2;
		this.numStars = 200;
		this.stretch = 400;

		for(var i = 0; i < this.numStars; i++){
			this.stars.push(new Star(Math.random() * (800 + this.stretch), Math.random() * 600, (Math.random() * 3) + 1));
		}

		this.update = function(){
			for(var i = 0; i < this.stars.length; i++){
				this.stars[i].x += this.driftSpeed;
				if(this.stars[i].x < 0){
					this.stars[i].x = 800 + this.stretch;
				}
			}
		}

		this.draw = function(ctx, frame, scene){
			var sceneFrame = (frame - this.keyFrames[scene]);
			var sceneProgress = (sceneFrame / (this.keyFrames[scene + 1] - this.keyFrames[scene]));
			ctx.strokeStyle = "#ffffff";
			ctx.beginPath();
			switch(scene){
				case 0: //waiting for warp
					for(var i = 0; i < this.stars.length; i++){
						ctx.moveTo(this.stars[i].x, this.stars[i].y);
						ctx.lineTo(this.stars[i].x + this.stars[i].size, this.stars[i].y + this.stars[i].size);
						ctx.moveTo(this.stars[i].x + this.stars[i].size, this.stars[i].y);
						ctx.lineTo(this.stars[i].x, this.stars[i].y + this.stars[i].size);
					}
					break;
				case 1: //stars stretching
					for(var j = 0; j < this.stars.length; j++){
						ctx.moveTo(this.stars[j].x, this.stars[j].y);
						ctx.lineTo(this.stars[j].x + this.stars[j].size - (this.stretch * sceneProgress), this.stars[j].y + this.stars[j].size);
						ctx.moveTo(this.stars[j].x + this.stars[j].size - (this.stretch * sceneProgress), this.stars[j].y);
						ctx.lineTo(this.stars[j].x, this.stars[j].y + this.stars[j].size);
					}
					break;
				case 2: //stars hold
					for(var n = 0; n < this.stars.length; n++){
						ctx.moveTo(this.stars[n].x, this.stars[n].y);
						ctx.lineTo(this.stars[n].x + this.stars[n].size - (this.stretch), this.stars[n].y + this.stars[n].size);
						ctx.moveTo(this.stars[n].x + this.stars[n].size - (this.stretch), this.stars[n].y);
						ctx.lineTo(this.stars[n].x, this.stars[n].y + this.stars[n].size);
					}
					break;
				case 3: //stars reducing
					for(var k = 0; k < this.stars.length; k++){
						ctx.moveTo(this.stars[k].x + this.stars[k].size - (this.stretch), this.stars[k].y + this.stars[k].size);
						ctx.lineTo(this.stars[k].x - this.stretch * (sceneProgress) + this.stars[k].size, this.stars[k].y);
						ctx.moveTo(this.stars[k].x - this.stretch * (sceneProgress), this.stars[k].y + this.stars[k].size);
						ctx.lineTo(this.stars[k].x + this.stars[k].size - (this.stretch), this.stars[k].y);
					}
					break;
				case 4: //warp complete
					for(var m = 0; m < this.stars.length; m++){
						ctx.moveTo(this.stars[m].x - this.stretch, this.stars[m].y);
						ctx.lineTo(this.stars[m].x - this.stretch + this.stars[m].size, this.stars[m].y + this.stars[m].size);
						ctx.moveTo(this.stars[m].x - this.stretch + this.stars[m].size, this.stars[m].y);
						ctx.lineTo(this.stars[m].x - this.stretch, this.stars[m].y + this.stars[m].size);
					}
					break;
			}
			ctx.stroke();
			//draw The Orion
			ctx.strokeStyle = "#0000ff";
			ctx.fillStyle = "#000000";
			//outside
			ctx.beginPath();
			ctx.moveTo(300, 275); //start
			ctx.lineTo(450, 275); //top
			ctx.lineTo(500, 300); //viewport
			ctx.lineTo(500, 325); //nose
			ctx.lineTo(450, 325); //helm bottom
			ctx.lineTo(425, 350); //stem
			ctx.lineTo(325, 350); //keel
			ctx.lineTo(300, 325); //keel aft
			ctx.lineTo(300, 275); //aft
			ctx.fill();
			//viewport
			ctx.moveTo(450, 275);
			ctx.lineTo(450, 300);
			ctx.lineTo(500, 300);
			ctx.stroke();
			//wing
			ctx.beginPath();
			ctx.moveTo(325, 300); //start
			ctx.lineTo(425, 300); //top
			ctx.lineTo(400, 325); //slant
			ctx.lineTo(325, 325); //bottom
			ctx.lineTo(325, 300); //rear
			ctx.stroke();
		};

	};

	exports.AnimationWarp = AnimationWarp;
})(this);
