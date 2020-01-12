const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.account = (req, res) => {
	res.render('userForm', { title: 'Edit Your Account' });
};

exports.updateAccount = async (req, res) => {
	const updates = {
		name: req.body.name,
		username: req.body.username,
		email: req.body.email
	};

	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $set: updates },
		{ new: true, runValidators: true, context: 'query' }
	);

	if (req.body.password) {
		await user.setPassword(req.body.password);
		await user.save();
	}

	req.flash('success', 'Updated your account.');
	res.redirect('back');
};
