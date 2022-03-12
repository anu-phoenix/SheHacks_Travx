const Room = require('../models/roomModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getRoomDetails = catchAsync(async (req, res, next) => {
	const room = await Room.findById(req.user.roomId);

	res.status(200).json({
		status: 'success',
		ok: true,
		data: {
			data: room,
		},
	});
});

exports.createRoom = catchAsync(async (req, res, next) => {
	const details = req.body;

	const room = await Room.create(details);

	res.status(201).json({
		status: 'success',
		ok: true,
		data: {
			data: room,
		},
	});
});

exports.getAllPayments = catchAsync(async (req, res, next) => {
	const { roomId } = await User.findById(req.user._id);

	if (!roomId)
		return next(
			new AppError(
				`You don't have any ongoing journey. Please plan one!!`,
				404
			)
		);

	const room = await Room.findById(roomId);

	res.status(200).json({
		status: 'success',
		ok: true,
		results: room.transactions.length,
		data: {
			data: room.transactions,
		},
	});
});

exports.endTrip = catchAsync(async (req, res, next) => {
	const room = await Room.findByIdAndUpdate(req.user.roomId, {
		completed: true,
	});

	res.status(204).json({
		status: 'success',
		ok: true,
		data: null,
	});
});
