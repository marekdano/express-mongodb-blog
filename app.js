var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');

mongoose.connect('mongodb://localhost', function (err) {
	if (err) throw err;
	console.log('connected!');

	var app = express();
	
	// middleware
	app.use(express.logger('dev'));
	// there should be used connect-mongo or similar
	// for persistant sessions
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'building a blog' }));
	app.use(express.bodyParser());
	// expose session to views
	app.use(function (req, res, next) {
		res.locals.session = req.session;
		next();
	})

	routes(app);

	app.listen(3000, function () {
		console.log('now listening on http://localhost:3000');
	})
})
