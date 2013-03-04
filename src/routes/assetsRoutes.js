var fs = require('fs');
var uglify = require('uglify-js');

function getFileResource(widgetId, assetId) {
    return fs.readFileSync(__dirname + '/../services/measures/' + widgetId + '/client/images/' + assetId + ".png" );
}

function getWidgetAsset(req, res) {
    res.setHeader('Content-Type', 'image/png');
    res.send(getFileResource(req.params.id, req.params.asset));
}

exports.init = function (app) {
    app.get('/assets/widget/:id/:asset', getWidgetAsset);
    return this;
};