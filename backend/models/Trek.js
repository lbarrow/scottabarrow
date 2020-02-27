const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const trekSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: `Please enter a title.`
		},
		slug: String,
		description: {
			type: String
		},
		isPublished: {
			type: Boolean,
			default: false
		},
		startDate: {
			type: Date,
			default: Date.now
		},
		endDate: {
			type: Date,
			default: Date.now
		},
		coverImagePath: {
			type: String,
			required: true
		}
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

trekSchema.pre('save', function(next) {
	if (!this.isModified('title')) {
		next();
		return;
	}

	this.slug = slug(this.title);

	next();
});

module.exports = mongoose.model('Trek', trekSchema);
