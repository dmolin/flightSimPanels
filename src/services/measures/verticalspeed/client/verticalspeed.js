tash.namespace('Gauges.Widgets');

(function() {



Gauges.Widgets.verticalspeed = {

	update: function (payload) {
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
			"0": -90
		};

		console.log("update", payload.verticalspeed);

		var data = payload.verticalspeed,
			angleLowIdx = (parseInt(data.indicated/10,10)-1)*10,
			angleHiIdx = angleLowIdx+10,
			angleLow = angles[angleLowIdx],
			angleHi = angles[angleHiIdx],
			remainder = data.indicated % angleLowIdx,
			increment = (angleHi - angleLow) / 10 * remainder;

		$(this.canvas).attr('data-speed', data.indicated);
		this.dial.bitmap.rotation = (angleLow + increment);
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
						img.bitmap.y = 155;
						img.bitmap.regX = 11;
						img.bitmap.regY = 90;
						img.bitmap.rotation = 0;
						sequence.next();
					}
				});
			})
			.add( this, function(sequence) {
				this.publishReadyEvent(sequence);
				//set the dial to zero speed
				this.update({verticalspeed:{indicated:0}});
			})
			.start();
	}
};

}());

tash.util.mixin(Gauges.Widgets.verticalspeed, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.verticalspeed, 'verticalspeed');