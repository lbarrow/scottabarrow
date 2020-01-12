const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const stopSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: `Please enter a title.`
		},
		startDate: {
			type: Date,
			default: Date.now
		},
		endDate: {
			type: Date,
			default: Date.now
		},
		location: {
			type: {
				type: String,
				enum: ['Point'],
				required: true
			},
			coordinates: [
				{
					type: Number,
					required: 'Please enter longitude and latitude.'
				}
			]
		},
		trek: {
			type: mongoose.Schema.ObjectId,
			ref: 'Trek',
			required: 'Please specify a trek.'
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

module.exports = mongoose.model('Stop', stopSchema);
