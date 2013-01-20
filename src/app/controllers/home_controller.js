load('application');

var helpers = railway.helpers.personalize(this);

action('index', function() {
	//console.log("helpers.widgets", widgets);
	render({
		style: helpers.stylesheet_link_tag("home"),
		req: req
	});
});

