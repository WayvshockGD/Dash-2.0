const Client = require('./lib/Client');
let config = require('./config.json');
let mongoose = require('mongoose');

(async () => {
	await new Client().run();

	await mongoose.connect(config.dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('Started database...');
})();
