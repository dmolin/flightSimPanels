tash.namespace("Gauges.Widgets");

Gauges.Widgets.attitude = {
	
	setup: function () {
		var interp = {
				"-90": -135,
				"-20": -30,
				"-10": -15,
				"0": 0.01,
				"5": 7.5,
				"10": 15,
				"15": 22.5,
				"90": 135
			},
			zeroPitch = 150,
			pitches = [];
		
		var keys = Object.keys(interp).sort(function(a, b) {
		    return parseInt(a, 10) - parseInt(b, 10);
		});
		
		var min = parseInt(keys[0], 10),
			max = parseInt(keys[keys.length - 1], 10);
		
		for (var i = min; i <= max; i++) {
			if (interp[i]) {
				pitches[i] = interp[i] + zeroPitch;
			}
		}
		
		for (var i = 0, x = keys.length - 1; i < x; i++) {
			var current_key = parseInt(keys[i], 10);
			var current_val = parseInt(interp[current_key], 10);
			var next_key = parseInt(keys[i + 1], 10);
			var next_val = parseInt(interp[next_key], 10);
			var diff = (next_val - current_val) / (next_key - current_key);
			
			for (var q = current_key + 1, z = next_key; q < z; q++) {
				pitches[q] = pitches[q - 1] + diff;
			}
		}
		
		this.min = min;
		this.max = max;
		this.pitches = pitches;
	},

	render: function () {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence) {
				this.backplate = new Gauges.Widgets.StageImage("assets/widget/attitude/attitude_backplate", this, {
					load: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						sequence.next();
					}
				});
			})
			.add( this, function(sequence) {
				this.disc = new Gauges.Widgets.StageImage("assets/widget/attitude/attitude_disc", this, {
					load: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						
						var mask = new createjs.Shape();
						mask.graphics.beginFill("#FF0000").drawCircle(150, 150, 121.25).endFill();
						img.bitmap.mask = mask;
						
						sequence.next();
					}
				});
			})
			.add( this, function(sequence) {
				this.gear = new Gauges.Widgets.StageImage("assets/widget/attitude/attitude_gear", this, {
					load: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						sequence.next();
					}
				});
			})
			.add( this, function(sequence) {
				this.planeshape = new Gauges.Widgets.StageImage("assets/widget/attitude/attitude_planeshape", this, {
					load: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						sequence.next();
					}
				});
			})
			.add( this, function(sequence) {
				this.publishReadyEvent(sequence);
				
				this.update({ attitude: { pitch: 0, roll: 0 } });
			})
			.start();
	},

	update: function (payload) {
		var data = payload.attitude,
			pitch = Math.round(parseFloat(data.pitch)),
			roll = parseFloat(data.roll);

		$(this.canvas).attr("data-pitch", pitch);
		$(this.canvas).attr("data-roll", roll);

		this.gear.bitmap.rotation = (-1 * roll);
		this.disc.bitmap.rotation = (-1 * roll);
		this.disc.bitmap.y = this.pitches[pitch];
	}

};

tash.util.mixin(Gauges.Widgets.attitude, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.attitude, "attitude");