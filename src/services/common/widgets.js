/*global createjs:true, Image:true */
tash.namespace('Gauges.Widgets');

Gauges.Widgets.widget = (function(){

	//var widgetRenderedEvent;

	function init(context) {
		console.log("widgets.init");
		this.parent  = $(context.widgetsContext);
		this.id = Gauges.Widgets.nextId();
		this.getEl().empty().append( "<canvas width='310' height='310'></canvas>" );
		this.canvas = $('canvas', this.getEl()).get(0);
		this.stage = new createjs.Stage(this.canvas);
		createjs.Ticker.addListener(this);

		this.start();
	}

	function onDataReady(data) {
		if (this.selector && data[this.selector]) {
			this.update(data);
		}
	}

	function start() {
		if ( this.status === 'started' ) {
			return;
		}
		this.render();
	}

	function stop() {
		if ( this.status !== 'started') {
			return;
		}
		this.status = 'stopped';
	}

	function getEl() {
		if (this.$el) {
			return this.$el;
		}

		this.$el = $("<div id='" + this.id + "' class='gauge'></div>");
		this.parent.append(this.$el);
		return this.$el;
	}

	function render(/*data*/) {
	}

	function update(/*data*/) {
	}

	function tick() {
		this.stage.tick();
	}

	function registerWidget (widget, selector) {
		widget.selector = selector;
		Gauges.events.AppReady.subscribe(widget.init, widget);
	}

	function publishReadyEvent(sequence) {
		var self = this;
		sequence.done();
		Gauges.events.MeasuresUpdate.subscribe(function(data){
			onDataReady.call(self, data);
		});
		this.status = 'started';
	}

	return {
		status: 'stopped',
		init: init,
		start: start,
		stop: stop,
		render: render,
		update: update,
		tick: tick,
		getEl: getEl,
		registerWidget: registerWidget,
		publishReadyEvent: publishReadyEvent
	};
}());

Gauges.Widgets.StageImage = function(url, widget, callbacks){
	var context = this;
	this.image = new Image();
	this.image.src = document.location.href + url;
	this.image.addEventListener("load", function () {
		context.bitmap = new createjs.Bitmap(context.image);
		context.bitmap.x = 0;
		context.bitmap.y = 0;
		if(callbacks && typeof callbacks.load === 'function') {
			callbacks.load.call(widget, context);
		} else if (callbacks && typeof callbacks.next === 'function' ) {
			callbacks.next.call(callbacks);
		}
		widget.stage.addChild(context.bitmap);
	});
};


/* sequences should be used like so:
	Gauges.Widgets.Sequence()
		.add( function(sequence) { ...sequence.next(); } )
		.add( function(sequence) { ...sequence.next(); } );
*/
Gauges.Widgets.Sequence = function(){
	var queue = [];

	var def = {
		add: function(context, callback) {
			queue.push({ callback:callback, context:context });
			return this;
		},

		start: function() {
			this.next();
		},

		next: function() {
			var callback = queue.shift();
			if(callback && typeof callback.callback === 'function') {
				callback.callback.call(callback.context, def);
			}
		},

		done: function() {
			queue = [];
			return;
		}
	};
	return def;
};
