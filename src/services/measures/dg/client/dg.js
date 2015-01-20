tash.namespace("Gauges.Widgets");

Gauges.Widgets.dg = {

	render: function () {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(done) {
				this.disc = new Gauges.Widgets.StageImage("assets/widget/dg/dg_disc", this, {
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
				this.gear = new Gauges.Widgets.StageImage("assets/widget/dg/dg_gear", this, {
					beforeRender: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
					},
					afterRender: done
				});
			})
			.add( this, this.publishReadyEvent )
			.start();
	},

	update: function (payload) {
		var data = payload.dg,
			magheading = parseFloat(data.magheading);

		$(this.canvas).attr("data-magheading", magheading);

		this.disc.bitmap.rotation = (-1 * magheading);
	}

};

tash.util.mixin(Gauges.Widgets.dg, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.dg, "dg");
