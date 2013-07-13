;(function(exports){
	var GameHUDOption = function(_, settings){
		this.noCollision = true;
		for (var i in settings) {
			this[i] = settings[i];
		}
		this.zindex = 110;
		this.update = function(){
			if(this.enabled){
				if(_.coq.inputter.changes(_.coq.inputter[this.keyword])){
					this.action.apply(this, []);
				}
			}
			if(settings.update !== undefined) settings.update.apply(this, [_]);
		};
		this.draw = function(ctx){
			ctx.fillStyle = "#000000";
			ctx.strokeStyle = this.enabled ? "#0000ff" : "gray";
			ctx.fillRect(100 * (this.key - 1), 550, 100, 50);
			ctx.strokeRect(100 * (this.key - 1), 550, 100, 50);
			ctx.fillStyle = this.enabled ? "#0000ff" : "gray";
			ctx.font = "18px 'ubuntu mono'";
			ctx.fillText(this.key, (100 * (this.key - 1)) + 5, 570);
			ctx.fillText(this.text, (100 * (this.key -1)) + 5, 590);
		};
	};

	exports.GameHUDOption = GameHUDOption;
})(this);