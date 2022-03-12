const crypto = require('crypto');
const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		require: [true, 'Please provide your email address'],
		unique: [true, 'Account with this email address already exists'],
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email address'],
	},
	username: {
		type: String,
		require: [true, 'Please provide your username'],
		unique: [true, 'Account with this username already exists'],
		lowercase: true,
	},
	photo: {
		type: String,
	},
	password: {
		type: String,
		required: [true, 'Please provide your password'],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		require: [true, 'Please provide your password for confimation'],
		validate: {
			validator: function (value) {
				return value === this.password;
			},
			message: 'Password not matched. Re-enter your password',
		},
	},
	passwordChangedAt: {
		type: Date,
	},
	passwordResetToken: {
		type: String,
	},
	passwordResetExpires: {
		type: Date,
	},
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	room: {
		type: mongoose.Schema.ObjectId,
		default: null,
	},
	transactions: [
		{
			tobe: {
				type: String,
				enum: ['sent', 'recieved'],
			},
			user: {
				type: mongoose.Schema.ObjectId,
			},
			amount: {
				type: Number,
				minvalue: [0, 'Transaction amount must greater than zero'],
			},
		},
	],
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password') || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

UserSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

UserSchema.methods.correctPassword = function (
	candidatePassword,
	userPassword
) {
	return bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return JWTTimestamp < changedTimestamp;
	}

	return false;
};

UserSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
