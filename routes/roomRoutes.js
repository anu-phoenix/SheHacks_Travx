const express = require('express');

const authController = require('../controllers/authController');
const transacController = require('../controllers/roomController');

const router = express.Router();

router
	.route('/')
	.get(authController.protect, transacController.getRoomDetails)
	.post(authController.protect, transacController.createRoom)
	.delete(authController.protect, transacController.endTrip);

module.exports = router;
