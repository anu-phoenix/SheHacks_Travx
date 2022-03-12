const catchAsync = require('../utils/catchAsync');
const Room = require('./../models/roomModel');
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

exports.getHomePage = (req, res, next) => {
	if (!req.user.roomId) {
		res.status(200).render('home', {
			title: 'Home',
			user: true,
			room: false,
			data: {},
		});

		return;
	}

	const room = Room.findById(req.user.roomId);

	res.status(200).render('home', {
		title: 'Home',
		user: true,
		room: true,
		roomData: room,
	});
};

exports.checkLogin = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		res.status(200).render('home', {
			title: 'Home',
			user: false,
			room: false,
			data: {},
		});

		return;
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded._id);
	if (!currentUser) {
		res.status(200).render('home', {
			title: 'Home',
			user: false,
			room: false,
			data: {},
		});

		return;
	}

	if (currentUser.changedPasswordAfter(decoded.iat)) {
		res.status(200).render('home', {
			title: 'Home',
			user: false,
			room: false,
			data: {},
		});

		return;
	}

	req.user = currentUser;

	next();
});

exports.getCreateRoomPage = (req, res, next) => {
	res.status(200).render('createRoom', {
		title: 'Create Room',
	});
};

exports.getSignupPage = (req, res, next) => {
	res.status(200).render('loginSignup', {
		title: 'Signup',
		login: false,
	});
};

exports.getLoginPage = (req, res, next) => {
	res.status(200).render('loginSignup', {
		title: 'Login',
		login: true,
	});
};

exports.getEndTripPage = (req, res, next) => {
	res.status(200).render('endtrip', {
		title: 'End Trip',
	});
};

exports.getProfilePage = (req, res, next) => {
	res.status(200).render('profile', {
		title: 'Profile',
	});
};
