const mongoose = require('mongoose');
const Trek = mongoose.model('Trek');
const Stop = mongoose.model('Stop');

exports.treks = async (req, res) => {
	const treks = await Trek.find().sort({ startDate: 'desc' });
	res.json({ treks });
};

exports.trekDetail = async (req, res) => {
	const trek = await Trek.findOne({ slug: req.params.slug });
	const stops = await Stop.aggregate([
		{ $match: { trek: trek._id } },
		{
			$lookup: {
				from: 'entries',
				let: { entryId: '$_id' },
				pipeline: [
					{ $match: { $expr: { $eq: ['$$entryId', '$stop'] } } },
					{ $sort: { date: 1 } }
				],
				as: 'entries'
			}
		}
	]);
	res.json({ trek, stops });
};
