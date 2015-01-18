tash.namespace('Gauges.Widgets');

Gauges.Widgets.enginerpm = {

	render: function (/*data*/) {
		//Load resources in sequence.
		//this guarantee a correct layering on the canvas
		Gauges.Widgets.Sequence()
			.add( this, function(sequence){
				this.gauge = new Gauges.Widgets.StageImage("assets/widget/enginerpm/enginerpm", this, sequence);
			} )
			.add( this, function(sequence){
				this.dial = new Gauges.Widgets.StageImage("assets/widget/enginerpm/enginerpm-dial", this, {
					load: function(img) {
						img.bitmap.x = 150;
						img.bitmap.y = 155;
						img.bitmap.regX = 150;
						img.bitmap.regY = 150;
						img.bitmap.rotation = 0;
						sequence.next();
					}
				});
			})
			.add( this, function(sequence) {
				this.publishReadyEvent(sequence);
				this.update({enginerpm:{rpm:0}});
			})
			.start();
	},

	update: function (payload) {
		var interp = {	//correnspondence values=angles
			'1': 6,
			'11': 8,
			'16': 7.8,
			'21': 8,
			'26': 7.2,
			'31': 6.8,
			'36': 6
			},
			angles = [],	//effective angles resulting from interpolated values
			baseOffset = -123, //because point '0' is at -123deg.
			data = payload.enginerpm,
			val,
			last = 0,
			remainder,
			i;

		//compute the angles table
		for (i = 0; i < 36; i++) {
			if (interp[i]) {
				last = interp[i];
			}
			angles[i] = last + (i === 0 ? 0 : angles[i-1]);
		}
		val = parseInt(data.rpm/100, 10);  //1073 rpm = 10
		if (val > 35) {
			val = 35;
		}
		//calculate the fractional part (2712 = 27 + .12)
		remainder = data.rpm%100;
		if (remainder && val < 35) {
			//check the next value and interpolate between them
			remainder = (angles[val+1] - angles[val])/100 * remainder;
		}
		val = angles[val] + remainder + baseOffset;
		$(this.canvas).attr('data-rpm', data.rpm);
		this.dial.bitmap.rotation = val;
	}

};

tash.util.mixin(Gauges.Widgets.enginerpm, Gauges.Widgets.widget);
Gauges.Widgets.widget.registerWidget(Gauges.Widgets.enginerpm, 'enginerpm');