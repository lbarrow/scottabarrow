const mongoose = require('mongoose');
const Entry = mongoose.model('Entry');
const Stop = mongoose.model('Stop');
const multer = require('multer');
const jimp = require('jimp');
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
	res.locals.currentNavItem = 'Entries';
	next();
};

exports.new = async (req, res) => {
	const entry = {};
	const stopValues = await getStopSelectValues();
	res.render('entryForm', { title: 'Add Entry', entry, stopValues });
};

exports.upload = multer(multerOptions).single('photofile');

exports.resize = async (req, res, next) => {
	// check if there is no new file to resize
	if (!req.file) {
		next(); // skip to the next middleware
		return;
	}

	const extension = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extension}`;

	// now we resize
	const photo = await jimp.read(req.file.buffer);
	if (photo.bitmap.width > photo.bitmap.height) {
		await photo.resize(2000, jimp.AUTO);
		req.body.photoOrientation = 'landscape';
	} else {
		await photo.resize(jimp.AUTO, 2000);
		req.body.photoOrientation = 'portrait';
	}
	req.body.photoWidth = photo.bitmap.width;
	req.body.photoHeight = photo.bitmap.height;
	await photo.quality(65);
	await photo.write(`./public/uploads/${req.body.photo}`);

	// once we have written the photo to our filesystem, keep going!
	next();
};

exports.create = async (req, res) => {
	let entry = new Entry(req.body);
	if (req.body.photo) {
		const photo = {
			caption: req.body.photoCaption,
			filePath: req.body.photo,
			photoHeight: req.body.photoHeight,
			photoWidth: req.body.photoWidth,
			photoOrientation: req.body.photoOrientation
		};
		entry.photos = [photo];
	}
	await entry.save();

	req.flash('success', `Successfully created ${entry.title}.`);
	res.redirect(`/entries`);
};

exports.delete = async (req, res) => {
	const entry = await Entry.findOneAndDelete({ _id: req.params.id });
	req.flash('success', `Successfully deleted ${entry.title}.`);
	res.redirect(`/entries`);
};
exports.deletePhoto = async (req, res) => {
	let entry = await Entry.findOne({ _id: req.params.entryId });
	for (let i = 0; i < entry.photos.length; i++) {
		if (`${entry.photos[i]._id}` === req.params.photoId) {
			entry.photos.splice(i, 1);
		}
	}
	await entry.save();

	req.flash('success', `Successfully deleted photo.`);
	res.redirect(`/entries/${req.params.entryId}`);
};
exports.upPhoto = async (req, res) => {
	let entry = await Entry.findOne({ _id: req.params.entryId });
	for (let i = 0; i < entry.photos.length; i++) {
		if (`${entry.photos[i]._id}` === req.params.photoId) {
			var tempObject = entry.photos.splice(i, 1, entry.photos[i - 1])[0]; // get the item from the entry.photos
			entry.photos.splice(i - 1, 1, tempObject);
			break;
		}
	}
	await entry.save();

	req.flash('success', `Successfully moved photo up.`);
	res.redirect(`/entries/${req.params.entryId}`);
};
exports.downPhoto = async (req, res) => {
	let entry = await Entry.findOne({ _id: req.params.entryId });
	for (let i = 0; i < entry.photos.length; i++) {
		if (`${entry.photos[i]._id}` === req.params.photoId) {
			console.log('found index', i);
			var tempObject = entry.photos.splice(i, 1, entry.photos[i + 1])[0]; // get the item from the entry.photos
			entry.photos.splice(i + 1, 1, tempObject);
			break;
		}
	}
	await entry.save();

	req.flash('success', `Successfully moved photo down.`);
	res.redirect(`/entries/${req.params.entryId}`);
};

exports.list = async (req, res) => {
	const page = req.params.page || 1;
	const limit = 4;
	const skip = page * limit - limit;

	const entriesPromise = Entry.find()
		.skip(skip)
		.limit(limit)
		.sort({ startDate: 'desc' });

	const countPromise = Entry.count();

	const [entries, count] = await Promise.all([entriesPromise, countPromise]);
	const pages = Math.ceil(count / limit);
	if (!entries.length && skip) {
		req.flash(
			'info',
			`Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`
		);
		res.redirect(`/entries/page/${pages}`);
		return;
	}

	res.render('entryList', { title: 'Entries', entries, page, pages, count });
};

exports.detail = async (req, res) => {
	const stopValues = await getStopSelectValues();
	const entry = await Entry.findOne({ _id: req.params.id });
	console.log(entry.date);

	res.render('entryForm', { title: `Edit ${entry.title}`, entry, stopValues });
};

exports.update = async (req, res) => {
	let entry = await Entry.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
		runValidators: true
	}).exec();

	if (req.body.photo) {
		const photo = {
			caption: req.body.photoCaption,
			filePath: req.body.photo,
			photoHeight: req.body.photoHeight,
			photoWidth: req.body.photoWidth,
			photoOrientation: req.body.photoOrientation
		};
		entry.photos.push(photo);
		await entry.save();
	}

	req.flash(
		'success',
		`Update <strong>${entry.title}</strong>. <a href="/entries/${entry._id}">View entry →</a>`
	);
	res.redirect(`/entries`);
};

getStopSelectValues = async () => {
	const stops = await Stop.find();
	let stopValues = stops.map(stop => {
		return { value: stop._id, label: stop.title };
	});
	stopValues.unshift({ value: '', label: '' });
	return stopValues;
};
