load('application');

var fs = require('fs');
var uglify = require('uglify-js');


function getAsset(widgetId, assetId) {
	return fs.readFileSync(__dirname + '/../components/measures/' + widgetId + '/client/images/' + assetId + ".png" );
}


action('widget', function() {
	layout(false);
	header('Content-Type', 'image/png');
	send(getAsset(params.id, params.attr));
});
