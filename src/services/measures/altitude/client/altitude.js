tash.namespace("Gauges.Widgets");

Gauges.Widgets.altitude = {

	render: function () {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence) {
				this.gear = new Gauges.Widgets.StageImage("assets/widget/altitude/altitude_gear", this, {
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
				this.hatch = new Gauges.Widgets.StageImage("assets/widget/altitude/altitude_hatch", this, {
					load: function(img) {
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.x = 150;
						img.bitmap.y = 150;
						img.bitmap.alpha = 100;
						sequence.next();
					}
				});
			})
			.add( this, function(sequence) {
				this.dial_10000 = new Gauges.Widgets.StageImage("assets/widget/altitude/altitude_dial_10000", this, {
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
				this.dial_1000 = new Gauges.Widgets.StageImage("assets/widget/altitude/altitude_dial_1000", this, {
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
				this.dial_100 = new Gauges.Widgets.StageImage("assets/widget/altitude/altitude_dial_100", this, {
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
				this.pressure = new createjs.Text("29.92", "medium 10px Arial Narrow", "#FFF");
				this.pressure.x = 228;
				this.pressure.y = 155;
				this.pressure.textAlign = "left";
				this.pressure.textBaseline = "bottom";
				this.stage.addChild(this.pressure);
				sequence.next();
			})
			.add( this, this.publishReadyEvent )
			.start();
	},

	update: function (payload) {
		var data = payload.altitude,
			altitude = Math.round(parseFloat(data.altitude)),
			baro = parseFloat(data.pressures.baro);

		$(this.canvas).attr("data-altitude", altitude);
		$(this.canvas).attr("data-baro", baro);
		
		this.dial_100.bitmap.rotation = ((360 / 1000) * altitude);
		this.dial_1000.bitmap.rotation = ((360 / 10000) * altitude);
		this.dial_10000.bitmap.rotation = ((360 / 100000) * altitude);
		this.hatch.bitmap.alpha = altitude > 10000 ? 0 : 100;
		this.pressure.text = baro;
	}

};

tash.util.mixin(Gauges.Widgets.altitude, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.altitude, "altitude");