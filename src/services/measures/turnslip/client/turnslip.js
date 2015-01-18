tash.namespace('Gauges.Widgets');

Gauges.Widgets.turnslip = {

	render: function (/*data*/) {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence) {
				this.disc = new Gauges.Widgets.StageImage("assets/widget/turnslip/turnslip_disc", this, {
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
				this.ball = new Gauges.Widgets.StageImage("assets/widget/turnslip/turnslip_ball", this, {
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
				this.gear = new Gauges.Widgets.StageImage("assets/widget/turnslip/turnslip_gear", this, {
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
				this.planeshape = new Gauges.Widgets.StageImage("assets/widget/turnslip/turnslip_planeshape", this, {
					load: function(img) {
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
		var data = payload.turnslip,
			canvasEl = $(this.canvas);

		canvasEl.attr('data-slip', data.slip);
		canvasEl.attr('data-beta', data.beta);

		this.planeshape.bitmap.rotation = parseFloat(data.roll);
		this.ball.bitmap.x = 150 + parseFloat(data.slip * -10);
	}

};

tash.util.mixin(Gauges.Widgets.turnslip, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.turnslip, 'turnslip');