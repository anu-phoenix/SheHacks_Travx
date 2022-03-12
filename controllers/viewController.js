exports.getHomePageWithJourney = (req, res, next) => {
	res.status(200).render('home', {
		title: 'Home',
		journey: true,
	});
};

exports.getHomePageWithoutJourney = (req, res, next) => {
	res.status(200).render('home', {
		title: 'Home',
		journey: false,
	});
};

exports.getCreateRoomPage = (req, res, next) => {
	res.status(200).render('createRoom', {
		title: 'Create Room',
	});
};

exports.getSignupPage = (req, res, next) => {
	res.status(200).render('loginSignup', {
		title: 'Login',
		login: true,
	});
};

exports.getLoginPage = (req, res, next) => {
	res.status(200).render('loginSignup', {
		title: 'Signup',
		login: false,
	});
};
