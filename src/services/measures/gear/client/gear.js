tash.namespace("Gauges.Widgets");

Gauges.Widgets.gear = {

	render: function () {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence) {
				this.gearN_transit = new Gauges.Widgets.StageImage("assets/widget/gear/gearN_transit", this, {
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
				this.gearN_down = new Gauges.Widgets.StageImage("assets/widget/gear/gearN_down", this, {
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
				this.gearN_up = new Gauges.Widgets.StageImage("assets/widget/gear/gearN_up", this, {
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
				this.gearL_transit = new Gauges.Widgets.StageImage("assets/widget/gear/gearL_transit", this, {
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
				this.gearL_down = new Gauges.Widgets.StageImage("assets/widget/gear/gearL_down", this, {
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
				this.gearL_up = new Gauges.Widgets.StageImage("assets/widget/gear/gearL_up", this, {
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
				this.gearR_transit = new Gauges.Widgets.StageImage("assets/widget/gear/gearR_transit", this, {
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
				this.gearR_down = new Gauges.Widgets.StageImage("assets/widget/gear/gearR_down", this, {
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
				this.gearR_up = new Gauges.Widgets.StageImage("assets/widget/gear/gearR_up", this, {
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
				
				this.update({ gear: { gearN: 1, gearL: 1, gearR: 1 } });
			})
			.start();
	},

	update: function (payload) {
		var data = payload.gear,
			gearN = parseFloat(data.gearN),
			gearL = parseFloat(data.gearL),
			gearR = parseFloat(data.gearR);

		$(this.canvas).attr("data-gearN", gearN);
		$(this.canvas).attr("data-gearL", gearL);
		$(this.canvas).attr("data-gearR", gearR);

		this.gearN_down.bitmap.alpha = gearN == 1 ? 100 : 0;
		this.gearL_down.bitmap.alpha = gearL == 1 ? 100 : 0;
		this.gearR_down.bitmap.alpha = gearR == 1 ? 100 : 0;
		this.gearN_up.bitmap.alpha = gearN == 0 ? 100 : 0;
		this.gearL_up.bitmap.alpha = gearL == 0 ? 100 : 0;
		this.gearR_up.bitmap.alpha = gearR == 0 ? 100 : 0;
	}

};

tash.util.mixin(Gauges.Widgets.gear, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.gear, "gear");