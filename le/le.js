;(function(exports){

	var ctx = document.getElementById("canvas").getContext("2d");



	var loop = function(){
		draw();
		requestAnimationFrame(loop);
	}

	this.exports.loop = loop;
})(this);

requestAnimationFrame(loop);