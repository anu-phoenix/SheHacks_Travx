const mongoose = require('mongoose');
const slugify = require('slugify');

const roomSchema = mongoose.Schema({
	members: {
		type: [
			{
				username: {
					type: mongoose.Schema.ObjectId,
					required: [true, 'Please specify username of member'],
				},
				paid: {
					type: Number,
					default: 0,
				},
			},
		],
		validate: [
			(val) => val.length >= 2,
			'Members must be greater than or equal to 2',
		],
	},
	transactions: [
		{
			amount: {
				type: Number,
				minvalue: [0, 'Amount must be greater than zero.'],
			},
			payer: {
				type: mongoose.Schema.ObjectId,
				required: [true, 'Please specify sender'],
			},
			purpose: {
				type: String,
				required: [true, 'Please specify purpose'],
			},
			date: {
				type: Date,
				required: [true, 'Please specify date of payment'],
			},
		},
	],
	completed: {
		type: Boolean,
		default: false,
	},
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
