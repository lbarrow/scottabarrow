// allow requests from www app
exports.allowCrossDomainAccess = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', process.env.API_ORIGIN);
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
};
