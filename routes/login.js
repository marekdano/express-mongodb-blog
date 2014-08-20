var mongoose = require('mongoose');
var User = require('./../models/user.js');
mongoose.model('User');

var cleanString = require('../helpers/cleanString'),
	hash = require('../helpers/hash'),
	crypto = require('crypto');

module.exports = function (app) {

	app.get('/signup', function (req, res) {
		res.render('signup.jade');
	})

	// create new account
	app.post('/signup', function (req, res, next) {
		//console.log(req.param('email'));
		console.log(req.param('pass'));
		var email = cleanString(req.param('email'));
		var pass = cleanString(req.param('pass'));
		console.log(email);
		console.log(pass);
		if(!(email && pass)) {
			return invalid();
		}

		User.findById(email, function (err, user) {
			if (err) return next(err);

			if (user) {
				return res.render('signup.jade', { exists: true });
			} 

			crypto.randomBytes(16, function (err, bytes) {
				if (err) return next(err);

				var user = { _id: email };
				user.salt = bytes.toString('utf8');
				user.hash = hash(pass, user.salt);

				User.create(user, function (err, newUser) {
					if (err) {
						if (err instanceof mongoose.Error.ValidationError) {
							return invalid();
						} 
						return next(err);
					}

					// user created successfully
					req.session.isLoggedIn = true;
					req.session.user = email;
					console.log('created user: %s', email);
					return res.redirect('/');
				})
			})
		})

		function invalid() {
			return res.render('signup.jade', { invalid: true });
		}
	});
}
