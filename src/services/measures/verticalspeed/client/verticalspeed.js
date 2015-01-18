tash.namespace('Gauges.Widgets');

(function() {



Gauges.Widgets.verticalspeed = {

	render: function (/*data*/) {
		//load the assets in sequence,
		//to guarantee an ordered layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence){
				//load the gauge
				this.gauge = new Gauges.Widgets.StageImage("assets/widget/verticalspeed/verticalspeed", this, sequence);
			} )
			.add( this, function(sequence){
				//load the dial
				this.dial = new Gauges.Widgets.StageImage("assets/widget/verticalspeed/verticalspeed-dial", this, {
					load: function(img) {
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						img.bitmap.regX = 11;
						img.bitmap.regY = 90;
						img.bitmap.rotation = 270;
						sequence.next();
					}
				});
			})
			.add( this, function(sequence) {
				this.publishReadyEvent(sequence);
				//set the dial to zero speed
				this.update({verticalspeed:{speed:0}});
			})
			.start();
	},

	update: function (payload) {
		var data = payload.verticalspeed,
			speed = parseInt(data.speed,10);

		$(this.canvas).attr('data-speed', speed);
		this.dial.bitmap.rotation = this._convertIntoLocalCoord(this._calculateAngle(speed + this._calculateVariance(speed)));
	},

	_calculateAngle: function(speed) {
		var angle = Math.abs(speed) * 180 / 2050;
		if(speed < 0) {
			angle = angle * -1;
		}
		return angle;
	},

	_calculateVariance: function(speed) {
		var firstVariancePerSpeedPoints = 50 / (1000 - 100);
		var secondVariancePerSpeedPoints = 50 / (1500 - 1000);
		var absSpeed = Math.abs(speed);
		var outcome = 0;

		//from 200 > 1000 = from 0 to -50 offset
		//from 1001 > 1500 = from -50 to 0 offset
		if(absSpeed > 0 && absSpeed <= 1000) {
			outcome =  -1 * ((absSpeed - 0) * firstVariancePerSpeedPoints);
		} else if (absSpeed > 1000 && absSpeed < 1500) {
			outcome =  -1 * (50 - ((absSpeed - 1000) * secondVariancePerSpeedPoints));
		}
		if(speed < 0) {
			outcome = outcome * -1;
		}
		return outcome;
	},

	//the VSI gause has the ZERO position set to 270deg.
	//to convert the angle provided into the local coord system we subtract 90.
	//if the result is < 0, we add 360
	_convertIntoLocalCoord: function(angle) {
		return angle - 90 < 0 ? angle - 90 + 360 : angle - 90;
	}
};

}());

tash.util.mixin(Gauges.Widgets.verticalspeed, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.verticalspeed, 'verticalspeed');
