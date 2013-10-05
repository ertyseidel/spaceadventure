;(function(exports){

	var GameMapData = function(_){

		this.drawing = null;
		this.collision = null;
		this.doors = null;

		this.load = function(url, callback){
			callback = callback || function(){};
			var oReq = new XMLHttpRequest();
			oReq.onload = function(){
				loadData(this, oReq.response, _.settings);
				callback.call(this, oReq);
			}.bind(this);
			oReq.open("get", url, true);
			oReq.send();
		}.bind(this);
	};

	var loadData = function(gmd, response, settings){
		var groups = (new window.DOMParser() ).parseFromString(response, "text/xml").documentElement.children;
		for(var i = 0; i < groups.length; i++){
			switch(groups[i].id){
				case "drawing":
					gmd.drawing = generateDrawing(gmd, groups[i], settings);
					break;
				case "doors":
					gmd.doors = generateDoors(gmd, groups[i], settings);
					break;
				case "collision":
					gmd.collision = generateCollisionBoxes(gmd, groups[i], settings);
					break;
				default:
					throw new Error("Could not determine type of 'g' object in GameMapData for current level");
			}
		}
	};

	var generateDrawing = function(gmd, g, settings){
		var children = g.children;
		var drawing = [];
		for(var i = 0; i < children.length; i++){
			switch(children[i].nodeName){
				case "line":
					//TODO optimize this A LOT
					drawing.push((function(i){ return function(ctx){
						ctx.beginPath();
						ctx.strokeStyle = children[i].stroke == undefined ? settings.color_main : children[i].stroke;
						ctx.miterLimit = children[i]["stroke-miterLimit"] == undefined ? 10 : children[i]["stroke-miterLimit"];
						ctx.lineWidth = children[i]["stroke-width"] == undefined ? 1 : children[i]["stroke-width"];
						var a = [children[i].x1, children[i].y1, children[i].x2, children[i].y2];
						a = a.map(function(b){return b.baseVal.value});
						ctx.moveTo(a[0], a[1]);
						ctx.lineTo(a[2], a[3]);
						ctx.stroke();
					};})(i));
					break;
				case "path":
					//todo also optimize this A LOT
					var path = children[i];
					drawing.push((function(i){ return function(ctx){
						ctx.beginPath();
						ctx.strokeStyle = children[i].stroke == undefined ? settings.color_main : children[i].stroke;
						ctx.miterLimit = children[i]["stroke-miterLimit"] == undefined ? 10 : children[i]["stroke-miterLimit"];
						ctx.lineWidth = children[i]["stroke-width"] == undefined ? 1 : children[i]["stroke-width"];
						var a = [children[i].x1, children[i].y1, children[i].x2, children[i].y2];
						a = a.map(function(b){return b.baseVal.value});
						ctx.moveTo(a[0], a[1]);
						ctx.lineTo(a[2], a[3]);
						ctx.stroke();
					};})(i, path));
				default:
					throw new Error("GameMapData drawing function currently only supports line and path objects.");
			}
		}
		return drawing;
	};

	var generateDoors = function(gmd, g, settings){

	};

	var generateCollisionBoxes = function(gmd, g, settings){

	};

	exports.GameMapData = GameMapData;
})(this);