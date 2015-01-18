tash.namespace('Gauges.Widgets');

Gauges.Widgets.flaps = {

	render: function (/*data*/) {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence){
				this.flaps = new Gauges.Widgets.StageImage("assets/widget/flaps/flaps", this, {
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
				this.flaps_handle = new Gauges.Widgets.StageImage("assets/widget/flaps/flaps_handle", this, {
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
		var data = payload.flaps,
			canvasEl = $(this.canvas);

		canvasEl.attr('data-flap', data.flaps);

		this.flaps_handle.bitmap.y = 150 + (165 * parseFloat(data.flaps));
	}

};

tash.util.mixin(Gauges.Widgets.flaps, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.flaps, 'flaps');