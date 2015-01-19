tash.namespace("Gauges.Widgets");

Gauges.Widgets.speed = {
	
	setup: function () {	
		var interp = {
				"0": 0.01,
				"40": 31,
				"50": 50,
				"60": 72,
				"70": 93,
				"80": 116,
				"90": 140,
				"100": 164,
				"110": 186,
				"120": 205,
				"130": 221,
				"140": 237,
				"150": 251,
				"160": 265,
				"170": 278,
				"180": 290,
				"190": 303,
				"200": 317
			},
			zeroAngle = 0,
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
				this.gauge = new Gauges.Widgets.StageImage("assets/widget/speed/speed", this, sequence);
			} )
			.add( this, function(sequence) {
				this.dial = new Gauges.Widgets.StageImage("assets/widget/speed/speed-dial", this, {
					load: function(img) {
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.rotation = 0;
						sequence.next();
					}
				});
			})
			.add( this, function(sequence) {
				this.publishReadyEvent(sequence);
				
				this.update({ speed: { indicated: 0 } });
			})
			.start();
	},

	update: function (payload) {
		var data = payload.speed,
			speed = Math.round(parseInt(data.indicated, 10));

		$(this.canvas).attr("data-speed", speed);
		
		if (speed < this.min) {
			speed = this.min;
		} else if (speed > this.max) {
			speed = this.max;
		}
		
		this.dial.bitmap.rotation = this.angles[speed];
	}
	
};

tash.util.mixin(Gauges.Widgets.speed, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.speed, "speed");