const mongoose = require('mongoose');
const Trek = mongoose.model('Trek');
const Stop = mongoose.model('Stop');

exports.setNavItem = (req, res, next) => {
	res.locals.currentNavItem = 'Stops';
	next();
};

exports.new = async (req, res) => {
	const stop = {};
	const trekValues = await getTrekSelectValues();
	res.render('stopForm', { title: 'Add Stop', stop, trekValues });
};

exports.create = async (req, res) => {
	req.body.location.type = 'Point';
	const stop = await new Stop(req.body).save();
	req.flash('success', `Successfully created ${stop.title}.`);
	res.redirect(`/stops`);
};

exports.delete = async (req, res) => {
	const stop = await Stop.findOneAndDelete({ _id: req.params.id });
	req.flash('success', `Successfully deleted ${stop.title}.`);
	res.redirect(`/stops`);
};

exports.list = async (req, res) => {
	const page = req.params.page || 1;
	const limit = 4;
	const skip = page * limit - limit;

	const stopsPromise = Stop.find()
		.skip(skip)
		.limit(limit)
		.sort({ startDate: 'desc' });

	const countPromise = Stop.count();

	const [stops, count] = await Promise.all([stopsPromise, countPromise]);
	const pages = Math.ceil(count / limit);
	if (!stops.length && skip) {
		req.flash(
			'info',
			`Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`
		);
		res.redirect(`/stops/page/${pages}`);
		return;
	}

	res.render('stopList', { title: 'Stops', stops, page, pages, count });
};

exports.detail = async (req, res) => {
	const trekValues = await getTrekSelectValues();
	const stop = await Stop.findOne({ _id: req.params.id });
	res.render('stopForm', { title: `Edit ${stop.title}`, stop, trekValues });
};

exports.update = async (req, res) => {
	req.body.location.type = 'Point';
	const stop = await Stop.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash(
		'success',
		`Update <strong>${stop.title}</strong>. <a href="/stops/${stop._id}">View stop →</a>`
	);
	res.redirect(`/stops`);
};

getTrekSelectValues = async () => {
	const treks = await Trek.find();
	let trekValues = treks.map(trek => {
		return { value: trek._id, label: trek.title };
	});
	trekValues.unshift({ value: '', label: '' });
	return trekValues;
};
