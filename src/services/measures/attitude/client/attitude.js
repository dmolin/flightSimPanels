tash.namespace('Gauges.Widgets');

Gauges.Widgets.attitude = {

	render: function (/*data*/) {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence){
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
					load: function(img){
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						sequence.next();
					}
				});
			})
			.add( this, function(sequence){
				this.planeshape = new Gauges.Widgets.StageImage("assets/widget/attitude/attitude_planeshape", this, {
					load: function(img){
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						sequence.next();
					}
				});
			})
			.add( this, this.publishReadyEvent )
			.start();

	},

	update: function (payload) {
		var data = payload.attitude,
			canvasEl = $(this.canvas);

		canvasEl.attr('data-pitch', data.pitch);
		canvasEl.attr('data-roll', data.roll);

		this.gear.bitmap.rotation = (-1*data.roll);
		this.disc.bitmap.rotation = (-1*data.roll);
		this.disc.bitmap.y = 150 + parseFloat(data.pitch*1.2);
	}

};

tash.util.mixin(Gauges.Widgets.attitude, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.attitude, 'attitude');