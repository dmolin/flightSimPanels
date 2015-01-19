tash.namespace("Gauges.Widgets");

Gauges.Widgets.attitude = {

	render: function () {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence) {
				this.disc = new Gauges.Widgets.StageImage("assets/widget/attitude/attitude_disc", this, {
					load: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						sequence.next();
					}
				});
			} )
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
			pitch = parseFloat(data.pitch),
			roll = parseFloat(data.roll);

		$(this.canvas).attr("data-pitch", pitch);
		$(this.canvas).attr("data-roll", roll);

		this.gear.bitmap.rotation = (-1 * roll);
		this.disc.bitmap.rotation = (-1 * roll);
		this.disc.bitmap.y = 150 + parseFloat(pitch * 1.2);
	}

};

tash.util.mixin(Gauges.Widgets.attitude, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.attitude, "attitude");