tash.namespace("Gauges.Widgets");

Gauges.Widgets.enginerpm = {

	setup: function () {
		var interp = {
				"0": 0.01,
				"500": 30,
				"1000": 60,
				"1500": 100,
				"2000": 140,
				"2500": 180,
				"3000": 215,
				"3500": 251
			},
			zeroAngle = -123,
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

	render: function (/*data*/) {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(done) {
				this.gauge = new Gauges.Widgets.StageImage("assets/widget/enginerpm/enginerpm", this, { afterRender: done });
			})
			.add( this, function(done) {
				this.dial = new Gauges.Widgets.StageImage("assets/widget/enginerpm/enginerpm-dial", this, {
					beforeRender: function(img) {
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.rotation = 0;
					},
					afterRender: done
				});
			})
			.add( this, this.publishReadyEvent )
			.start();
	},

	update: function (payload) {
		var data = payload.enginerpm,
			rpm = Math.round(parseInt(data.rpm, 10));

		$(this.canvas).attr("data-rpm", rpm);

		if (rpm < this.min) {
			rpm = this.min;
		} else if (rpm > this.max) {
			rpm = this.max;
		}

		this.dial.bitmap.rotation = this.angles[rpm];
	}

};

tash.util.mixin(Gauges.Widgets.enginerpm, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.enginerpm, "enginerpm");
