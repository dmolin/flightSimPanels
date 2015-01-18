tash.namespace('Gauges.Widgets');

Gauges.Widgets.dg = {

	render: function (/*data*/) {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence){
				this.disc = new Gauges.Widgets.StageImage("assets/widget/dg/dg_disc", this, {
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
				this.gear = new Gauges.Widgets.StageImage("assets/widget/dg/dg_gear", this, {
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
		var data = payload.dg,
			canvasEl = $(this.canvas);

		canvasEl.attr('data-magheading', data.magheading);
		
		this.disc.bitmap.rotation = -1 * parseFloat(data.magheading);
	}

};

tash.util.mixin(Gauges.Widgets.dg, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.dg, 'dg');