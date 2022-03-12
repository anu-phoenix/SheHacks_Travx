const path = require('path');
const dotenv = require('dotenv');

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
