app.configure('production', function () {
    app.enable('view cache');
    app.enable('model cache');
    app.enable('eval cache');
    app.enable('merge javascripts');
    app.enable('merge stylesheets');
    app.disable('assets timestamps');
    app.use(require('express').errorHandler());
    app.settings.socketIO = {
    	'log level': 1     //3 = debug, 2 = medium, 1 = minimum
    };
    app.settings.quiet = true;
});

