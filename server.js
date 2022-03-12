const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtExceptions', (err) => {
	console.log(
		'UNCAUGHT EXCEPTIONS!😟😟 Shutting down....',
		err.name,
		err.message
	);
	process.exit(1);
});

dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = require('./app');

const DB = process.env.DATABASE.replace(
	'<USERNAME>',
	process.env.DATABASE_USERNAME
).replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
console.log(DB);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
	})
	.then((connection) => {
		console.log(`Connection success`);
	});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running on port: ${port}....`);
});

process.on('unhandledRejection', (err) => {
	console.log(
		'UNHANDLED REJECTION!😟😟 Shutting down....',
		err.name,
		err.message
	);
	server.close(() => {
		process.exit(1);
	});
});
