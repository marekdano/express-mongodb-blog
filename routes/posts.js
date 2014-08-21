var loggedIn = require('../helpers/loggedIn');
var mongoose = require('mongoose');
var BlogPost = mongoose.model('BlogPost');

module.exports = function (app) {
	// create
	//console.log("loggedIn: " + loggedIn);
	app.get("/post/create", loggedIn, function (req, res) {
		res.render('post/create.jade');
	});

	app.post("/post/create", loggedIn, function (req, res, next) {
		var body = req.param('body');
		var title = req.param('title');
		var user = req.session.user;

		BlogPost.create({
			body: body,
			title: title,
			author: user },
			function (err, post) {
				if (err) return next(err);
				res.redirect('/post/' + post.id);
			});

		// notify twitter that we published a new post using model hook
	});
}