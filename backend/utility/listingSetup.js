const paginate = require('express-paginate');
const Sequelize = require('sequelize');
const titleCase = require('./viewHelpers').titleCase;

const determineSortOrder = (cols, req) => {
	let sortDirection = 'desc';
	let sortColumn = 'id';
	for (let i = 0; i < cols.length; i++) {
		if (cols[i].defaultSort) {
			sortDirection = cols[i].defaultSort;
			sortColumn = cols[i].dbName;
		}
	}
	if (req.query.direction === 'asc') {
		sortDirection = 'asc';
	} else if (req.query.direction === 'desc') {
		sortDirection = 'desc';
	}
	const findCol = cols => cols.dbName === req.query.sort && cols.dbName;
	const foundCol = cols.find(findCol);
	if (foundCol) {
		sortColumn = req.query.sort;
	}

	return { sortColumn, sortDirection };
};

const setupTableHeaderItems = (cols, sortColumn, sortDirection) => {
	return cols.map(col => {
		let sorted = false;
		let sortable = true;
		let title = '';
		let direction;
		let oppositeDirection;
		if (sortColumn === col.dbName) {
			sorted = true;
			direction = sortDirection;
			oppositeDirection = 'desc';
			if (direction === 'desc') oppositeDirection = 'asc';
		}
		if (col.sortable === false) {
			sortable = false;
		}
		if (col.displayName) {
			title = col.displayName;
		} else {
			title = col.dbName;
			title = title.split('_').join(' '); // replace underscores with spaces
			title = titleCase(title);
		}
		return {
			title,
			dbName: col.dbName,
			sorted,
			direction,
			oppositeDirection,
			sortable
		};
	});
};

const setupPaginateVariables = (count, req) => {
	const itemCount = count;
	const pageCount = Math.ceil(count / req.query.limit);
	const pages = paginate.getArrayPages(req)(3, pageCount, req.query.page);
	return { itemCount, pageCount, pages, currentPage: req.query.page };
};

const setupFindOptions = (cols, req, altOptions, sortColumn, sortDirection) => {
	// Setup default options
	let defaultAttributes = [];
	for (let i = 0; i < cols.length; i++) {
		if (cols[i].dbName) defaultAttributes.push(cols[i].dbName);
	}
	let options = {
		attributes: defaultAttributes,
		limit: req.query.limit,
		offset: req.skip,
		order: Sequelize.literal(`${sortColumn} ${sortDirection}`),
		raw: true
	};

	if (altOptions.attributes) {
		options.attributes = altOptions.attributes;
	}
	if (altOptions.group) {
		options.group = altOptions.group;
	}
	if (altOptions.where) {
		options.where = altOptions.where;
	}
	if (altOptions.include) {
		options.include = altOptions.include;
	}
	if ((!options.group || options.group.includes('id')) && !options.attributes.includes('id')) {
		options.attributes.push('id');
	}

	return options;
};

exports.setupListing = async (cols, Model, req, options = {}) => {
	// check if sorting
	const { sortColumn, sortDirection } = determineSortOrder(cols, req);

	const tableHeaderItems = setupTableHeaderItems(cols, sortColumn, sortDirection);
	const findOptions = setupFindOptions(cols, req, options, sortColumn, sortDirection);
	const results = await Model.findAndCountAll(findOptions);
	let count = results.count;
	if (options.group) {
		// This is used for cases where a group by clause is needed in the listing query
		// in these cases, the standard count function will return an array, rather than a number
		options.raw = true;
		const countResults = await Model.findAll(options);
		count = countResults.length;
	}

	const pagination = setupPaginateVariables(count, req);

	return { rows: results.rows, pagination, tableHeaderItems };
};

exports.setupTableHeaderItems = setupTableHeaderItems;
