tash.namespace("Gauges.Widgets");

Gauges.Widgets.turnslip = {

	render: function () {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(done) {
				this.disc = new Gauges.Widgets.StageImage("assets/widget/turnslip/turnslip_disc", this, {
					beforeRender: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
					},
					afterRender: done
				});
			} )
			.add( this, function(done) {
				this.ball = new Gauges.Widgets.StageImage("assets/widget/turnslip/turnslip_ball", this, {
					beforeRender: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
					},
					afterRender: done
				});
			})
			.add( this, function(done) {
				this.gear = new Gauges.Widgets.StageImage("assets/widget/turnslip/turnslip_gear", this, {
					beforeRender: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
					},
					afterRender: done
				});
			})
			.add( this, function(done) {
				this.planeshape = new Gauges.Widgets.StageImage("assets/widget/turnslip/turnslip_planeshape", this, {
					beforeRender: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
					},
					afterRender: done
				});
			})
			// .add( this, function(done) {
			// 	this.inop = new Gauges.Widgets.StageImage("assets/widget/turnslip/inop", this, {
			// 		beforeRender: function(img) {
			// 			img.bitmap.regX = 150;
			// 			img.bitmap.regY = 150;
			// 			img.bitmap.x = 150;
			// 			img.bitmap.y = 150;
			// 		},
			// 		afterRender: done
			// 	});
			// })
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
