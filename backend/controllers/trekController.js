const mongoose = require('mongoose');
const Trek = mongoose.model('Trek');

exports.setNavItem = (req, res, next) => {
	res.locals.currentNavItem = 'Treks';
	next();
};

exports.new = (req, res) => {
	const trek = {};
	res.render('trekForm', { title: 'Add Trek', trek });
};

exports.create = async (req, res) => {
	req.body.isPublished = Boolean(req.body.isPublished);
	const trek = await new Trek(req.body).save();
	req.flash('success', `Successfully created ${trek.title}.`);
	res.redirect(`/treks`);
};

exports.delete = async (req, res) => {
	const trek = await Trek.findOneAndDelete({ _id: req.params.id });
	req.flash('success', `Successfully deleted ${trek.title}.`);
	res.redirect(`/treks`);
};

exports.list = async (req, res) => {
	const page = req.params.page || 1;
	const limit = 20;
	const skip = page * limit - limit;

	const treksPromise = Trek.find()
		.skip(skip)
		.limit(limit)
		.sort({ startDate: 'desc' });

	const countPromise = Trek.count();

	const [treks, count] = await Promise.all([treksPromise, countPromise]);
	const pages = Math.ceil(count / limit);
	if (!treks.length && skip) {
		req.flash(
			'info',
			`Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`
		);
		res.redirect(`/treks/page/${pages}`);
		return;
	}

	res.render('trekList', { title: 'Treks', treks, page, pages, count });
};

exports.detail = async (req, res) => {
	const trek = await Trek.findOne({ _id: req.params.id });
	res.render('trekForm', { title: `Edit ${trek.title}`, trek });
};

exports.update = async (req, res) => {
	req.body.isPublished = Boolean(req.body.isPublished);
	const trek = await Trek.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash(
		'success',
		`Update <strong>${trek.title}</strong>. <a href="/treks/${trek._id}">View trek →</a>`
	);
	res.redirect(`/treks`);
};
