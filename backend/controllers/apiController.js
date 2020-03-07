const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Trek = mongoose.model('Trek');
const Stop = mongoose.model('Stop');

exports.treks = async (req, res) => {
	const treks = await Trek.find().sort({ startDate: 'desc' });
	res.json({ treks });
};

exports.trekDetail = async (req, res) => {
	const trek = await Trek.findOne({ _id: req.params.id });
	const stops = await Stop.aggregate([
		{ $match: { trek: ObjectId(req.params.id) } },
		{
			// $lookup: {
			// 	from: 'entries',
			// 	localField: '_id',
			// 	foreignField: 'stop',
			// 	as: 'entries'
			// }
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
		// { $unwind: { path: '$entries' } },
		// { $sort: { 'entries.date': 1 } },
		// {
		// 	$group: {
		// 		_id: '$_id',
		// 		entries: {
		// 			$push: '$entries'
		// 		}
		// 	}
		// }
	]);
	res.json({ trek, stops });
};
