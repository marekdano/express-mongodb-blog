var errors = require('./errors');
var login = require('./login');

module.exports = function (app) {

	// home page
	app.get('/', function (req, res) {
		res.render('home.jade');
	})

	// login and logout handlers
	login(app);

	// error handlers
	errors(app);
}
