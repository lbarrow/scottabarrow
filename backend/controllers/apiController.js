const mongoose = require('mongoose');
const Trek = mongoose.model('Trek');

exports.treks = async (req, res) => {
	const treks = await Trek.find().sort({ startDate: 'desc' });

	res.json({ treks: treks });
};
