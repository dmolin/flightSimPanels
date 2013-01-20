// place your application-wide javascripts here
tash.namespace( 'Gauges.Widgets' );

(function(){
	var id = 0;
	Gauges.Widgets.nextId = function() {
		return "widget_" + id++;
	}

	Gauges.data = {
		measures: {}  //will contain data(array of measures)
	};

}());

jQuery(document).ready( function($) {
	Gauges.socket = io.connect( document.location.protocol, '//' + document.location.hostname );
	Gauges.socket.on('connected', function (data) {
	    //emit inited application signal
	    Gauges.events.AppReady.publish({
	    	widgetsContext:'#widgets'
	    });
	});	

	Gauges.socket.on('data:measures', function(data) {
	  	//put the measures in a global bus and signal all widgets
	  	Gauges.data.measures = data.data;
	  	Gauges.events.MeasuresUpdate.publish(Gauges.data.measures);
	});
});