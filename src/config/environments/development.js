app.configure('development', function () {
    app.disable('view cache');
    app.disable('model cache');
    app.disable('eval cache');
    //app.disable('log actions');
    app.disable('log');
    app.enable('env info');
    app.settings.quiet = true;
    app.settings.socketIO = {
    	'log level': 3     //3 = debug, 2 = medium, 1 = minimum
    };
    app.use(require('express').errorHandler({ dumpExceptions: true, showStack: true }));
});

