const express = require('express');

const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/withJourney', viewController.getHomePageWithJourney);
router.get('/withoutJourney', viewController.getHomePageWithoutJourney);
router.get('/signup', viewController.getSignupPage);
router.get('/login', viewController.getLoginPage);
router.get('/createRoom', viewController.getCreateRoomPage);
router.get('/endtrip', viewController.getEndTripPage);
router.get('/profile', viewController.getProfilePage);

module.exports = router;
