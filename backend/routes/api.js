const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { catchErrors } = require('../handlers/errorHandlers');
const { allowCrossDomainAccess } = require('../utility/allowCrossDomainAccess');

router.use('/', allowCrossDomainAccess);
router.get('/treks', catchErrors(apiController.treks));
router.get('/treks/:slug', catchErrors(apiController.trekDetail));

module.exports = router;
