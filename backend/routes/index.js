const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const trekController = require('../controllers/trekController');
const stopController = require('../controllers/stopController');
const entryController = require('../controllers/entryController');
const { catchErrors } = require('../handlers/errorHandlers');

router.use('/treks', authController.isLoggedIn, trekController.setNavItem);
router.get('/treks/create', trekController.new);
router.post(
	'/treks/create',
	trekController.upload,
	catchErrors(trekController.resize),
	catchErrors(trekController.create)
);
router.post(
	'/treks/:id/update',
	trekController.upload,
	catchErrors(trekController.resize),
	catchErrors(trekController.update)
);
router.get('/treks/:id/delete', catchErrors(trekController.delete));
router.get('/treks/:id', catchErrors(trekController.detail));
router.get('/treks', catchErrors(trekController.list));
router.get('/treks/page/:page', catchErrors(trekController.list));

router.use('/stops', authController.isLoggedIn, stopController.setNavItem);
router.get('/stops/create', catchErrors(stopController.new));
router.post('/stops/create', catchErrors(stopController.create));
router.post('/stops/:id/update', catchErrors(stopController.update));
router.get('/stops/:id/delete', catchErrors(stopController.delete));
router.get('/stops/:id', catchErrors(stopController.detail));
router.get('/stops', catchErrors(stopController.list));
router.get('/stops/page/:page', catchErrors(stopController.list));

router.use('/entries', authController.isLoggedIn, entryController.setNavItem);
router.get('/entries/create', catchErrors(entryController.new));
router.post(
	'/entries/create',
	entryController.upload,
	catchErrors(entryController.resize),
	catchErrors(entryController.create)
);
router.post(
	'/entries/:id/update',
	entryController.upload,
	catchErrors(entryController.resize),
	catchErrors(entryController.update)
);
router.get('/entries/:entryId/photo/:photoId/delete', catchErrors(entryController.deletePhoto));
router.get('/entries/:entryId/photo/:photoId/up', catchErrors(entryController.upPhoto));
router.get('/entries/:entryId/photo/:photoId/down', catchErrors(entryController.downPhoto));
router.get('/entries/:id/delete', catchErrors(entryController.delete));
router.get('/entries/:id', catchErrors(entryController.detail));
router.get('/entries', catchErrors(entryController.list));
router.get('/entries/page/:page', catchErrors(entryController.list));

router.get('/', authController.isLoggedIn, catchErrors(trekController.list));
router.get('/logon', authController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));

module.exports = router;
