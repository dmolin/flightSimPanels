tash.namespace("Gauges.Widgets");

Gauges.Widgets.turnslip = {

	render: function () {
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
			.add( this, function(sequence) {
				this.inop = new Gauges.Widgets.StageImage("assets/widget/turnslip/inop", this, {
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
			slip = parseFloat(data.slip),
			roll = parseFloat(data.roll);

		$(this.canvas).attr("data-slip", slip);
		$(this.canvas).attr("data-roll", roll);

		this.planeshape.bitmap.rotation = (1.3 * roll);
		this.ball.bitmap.x = 150 + (slip * -10);
	}

};

tash.util.mixin(Gauges.Widgets.turnslip, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.turnslip, "turnslip");