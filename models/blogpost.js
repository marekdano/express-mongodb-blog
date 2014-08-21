var mongoose = require('mongoose');

// define the schema
var schema = mongoose.Schema({
	title: { type: String, trim: true },
	created: { type: Date, default: Date.now },
	body: String,
	author: { type: String, ref: 'User' }
})

// when new blogposts are created, let tweet
// npm install mongoose-lifecycle
// http://plugins.mongoosejs.com?q=events
var lifecycle = require('mongoose-lifecycle');
schema.plugin(lifecycle);

// compile the model
mongoose.model('BlogPost', schema);
var Post = mongoose.model('BlogPost');

// handle events
Post.on('afterInsert', function (post) {
	// fake tweet this
	var url = "http://localhost:3000/posts/";
	console.log('Read my new blog post! %s%s', url, post.id);

}) 