const mongoose = require('mongoose');

const Packages = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: String,
	services: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'service',
		},
	],
});

module.exports = mongoose.model('package', Packages);
