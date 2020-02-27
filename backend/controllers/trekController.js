const mongoose = require('mongoose');
const Trek = mongoose.model('Trek');
const multer = require('multer');
const sharp = require('sharp');
const uuid = require('uuid');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		const isPhoto = file.mimetype.startsWith('image/');
		if (isPhoto) {
			next(null, true);
		} else {
			next({ message: "That filetype isn't allowed!" }, false);
		}
	}
};

exports.setNavItem = (req, res, next) => {
	res.locals.currentNavItem = 'Treks';
	next();
};

exports.new = (req, res) => {
	const trek = {};
	res.render('trekForm', { title: 'Add Trek', trek });
};

exports.upload = multer(multerOptions).single('photofile');

exports.resize = async (req, res, next) => {
	console.log('req.file', req.file);
	// check if there is no new file to resize
	if (!req.file) {
		next(); // skip to the next middleware
		return;
	}

	const extension = req.file.mimetype.split('/')[1];
	req.body.coverImagePath = `${uuid.v4()}.${extension}`;

	// now we resize
	const metadata = await sharp(req.file.buffer).metadata();
	const resizeConstraint = 2000;
	let resizeParam;
	if (metadata.orientation < 5) {
		resizeParam = { width: resizeConstraint };
	} else {
		resizeParam = { height: resizeConstraint };
	}
	await sharp(req.file.buffer)
		.rotate()
		.resize(resizeParam)
		.sharpen()
		.jpeg({ quality: 70 })
		.toFile(`./public/uploads/treks/${req.body.coverImagePath}`);

	// once we have written the photo to our filesystem, keep going!
	next();
};

exports.create = async (req, res) => {
	req.body.isPublished = Boolean(req.body.isPublished);
	const trek = await new Trek(req.body).save();
	req.flash(
		'success',
		`Successfully created <strong>${trek.title}</strong>. <a href="/treks/${trek._id}">View trek →</a>`
	);
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

	const countPromise = Trek.countDocuments();

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
	console.log('req.body', req.body);
	req.body.isPublished = Boolean(req.body.isPublished);
	const trek = await Trek.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();
	req.flash(
		'success',
		`Updated <strong>${trek.title}</strong>. <a href="/treks/${trek._id}">View trek →</a>`
	);
	res.redirect(`/treks`);
};
