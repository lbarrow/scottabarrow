const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const photoSchema = new mongoose.Schema({
	caption: {
		type: String
	},
	filePath: {
		type: String,
		required: true
	},
	photoHeight: {
		type: Number
	},
	photoWidth: {
		type: Number
	},
	photoOrientation: {
		type: String
	}
});

const entrySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: `Please enter a title.`
		},
		description: {
			type: String
		},
		date: {
			type: Date,
			default: Date.now
		},
		photos: [photoSchema],
		stop: {
			type: mongoose.Schema.ObjectId,
			ref: 'Stop',
			required: 'Please specify a stop.'
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

module.exports = mongoose.model('Entry', entrySchema);
