/*global createjs:true, Image:true */
tash.namespace('Gauges.Widgets');

Gauges.Widgets.widget = (function(){

	//var widgetRenderedEvent;

	function init(context) {
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

		this.setup();
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

	function setup(/*data*/) {
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

	function publishReadyEvent(done) {
		var self = this;
		done();
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
		setup: setup,
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
	var cbPre  = ['load', 'beforeRender'];
	var cbPost = ['next', 'afterRender'];

	function _processCbs(list, callbacks) {
		if(callbacks && list) {
			list.forEach(function(type) {
				if(typeof callbacks[type] === 'function') {
					callbacks[type].call(widget, context);
				}
			});
		}
	}

	this.image = new Image();
	this.image.src = document.location.href + url;
	this.image.addEventListener("load", function () {
		context.bitmap = new createjs.Bitmap(context.image);
		context.bitmap.x = 0;
		context.bitmap.y = 0;

		//let's check for hooks to call before the image is added to the state
		_processCbs(cbPre, callbacks);

		widget.stage.addChild(context.bitmap);

		//let's check for hooks to call after the image has been added to the state
		_processCbs(cbPost, callbacks);
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
				callback.callback.call(callback.context, this.next.bind(this) );
			}
		},

		done: function() {
			queue = [];
			return;
		}
	};
	return def;
};
