tash.namespace('Gauges.Widgets');

(function() {



Gauges.Widgets.verticalspeed = {

	update: function (payload) {
		//NOTE: when determining angle we need to
		//      convert these absolute values into the local coord. system
		//		that is, subtract 90deg (the zero position is 270deg)
		var angles = {
			/*
			"10": 4,
			"20": 10,
			"30": 19,
			"40": 29,
			"50": 48,
			"60": 71,
			"70": 92,
			"80": 116,
			"90": 139,
			"100": 165,
			"110": 187,
			"120": 208,
			"130": 223,
			"140": 238,
			"150": 252,
			"160": 266,
			"170": 278,
			"180": 288,
			"190": 303,
			"200": 316
			*/
			"0": 0
		};

		var data = payload.verticalspeed,
			speed = parseInt(data.speed,10);
			/*
			angleLowIdx = (parseInt(speed/10,10)-1)*10,
			angleHiIdx = angleLowIdx+10,
			angleLow = angles[angleLowIdx] || angles[0],
			angleHi = angles[angleHiIdx] || angles[0],
			remainder = angleLowIdx ? speed % angleLowIdx : 1,
			increment = (angleHi - angleLow) / 10 * remainder;
			*/

		$(this.canvas).attr('data-speed', speed);
		/*
		this.dial.bitmap.rotation = this._convertIntoLocalCoord(angleLow + increment);
		*/
		this.dial.bitmap.rotation = this._convertIntoLocalCoord(this._calculateAngle(speed + this._calculateVariance(speed)));
	},

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
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
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
