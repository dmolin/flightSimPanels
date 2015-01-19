tash.namespace("Gauges.Widgets");

Gauges.Widgets.verticalspeed = {
	
	setup: function () {	
		var interp = {
				"-2000": -173,
				"-1500": -130,
				"-1000": -80,
				"-900": -71,
				"-800": -62,
				"-700": -53,
				"-600": -44,
				"-500": -35,
				"-400": -28,
				"-300": -21,
				"-200": -14,
				"-100": -7,
				"0": 0.01,
				"100": 7,
				"200": 14,
				"300": 21,
				"400": 28,
				"500": 35,
				"600": 44,
				"700": 53,
				"800": 62,
				"900": 71,
				"1000": 80,
				"1500": 130,
				"2000": 173
			},
			zeroAngle = -90,
			angles = [];
		
		var keys = Object.keys(interp).sort(function(a, b) {
		    return parseInt(a, 10) - parseInt(b, 10);
		});
		
		var min = parseInt(keys[0], 10),
			max = parseInt(keys[keys.length - 1], 10);
		
		for (var i = min; i <= max; i++) {
			if (interp[i]) {
				angles[i] = interp[i] + zeroAngle;
			}
		}
		
		for (var i = 0, x = keys.length - 1; i < x; i++) {
			var current_key = parseInt(keys[i], 10);
			var current_val = parseInt(interp[current_key], 10);
			var next_key = parseInt(keys[i + 1], 10);
			var next_val = parseInt(interp[next_key], 10);
			var diff = (next_val - current_val) / (next_key - current_key);
			
			for (var q = current_key + 1, z = next_key; q < z; q++) {
				angles[q] = angles[q - 1] + diff;
			}
		}
		
		this.min = min;
		this.max = max;
		this.angles = angles;
	},
	
	render: function () {
		//load the assets in sequence,
		//to guarantee an ordered layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence) {
				this.gauge = new Gauges.Widgets.StageImage("assets/widget/verticalspeed/verticalspeed", this, sequence);
			} )
			.add( this, function(sequence) {
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
			.add( this, this.publishReadyEvent )
			.start();
	},

	update: function (payload) {
		var data = payload.verticalspeed,
			speed = Math.round(parseInt(data.speed, 10));

		$(this.canvas).attr("data-speed", speed);
		
		if (speed < this.min) {
			speed = this.min;
		} else if (speed > this.max) {
			speed = this.max;
		}
		
		this.dial.bitmap.rotation = this.angles[speed];
	}
};

tash.util.mixin(Gauges.Widgets.verticalspeed, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.verticalspeed, "verticalspeed");