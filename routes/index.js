var errors = require('./errors');
var login = require('./login');
var posts = require('./posts');

module.exports = function (app) {

	// home page
	app.get('/', function (req, res) {
		res.render('home.jade');
	})

	// login and logout handlers
	login(app);

	// blog post handlers
	posts(app);

	// error handlers
	errors(app);
}
