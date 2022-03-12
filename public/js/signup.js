const login = async (data) => {
	try {
		const serverRes = await fetch('/api/v1/users/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const res = await serverRes.json();
		console.log(res);

		if (res.ok) {
			window.location.href = '/';
		} else {
			return alert('Username or email already exists.');
		}
	} catch (err) {
		console.log(err);
	}
};

document.querySelector('.form--login').addEventListener('submit', (e) => {
	e.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	login({ username, email, password });
});
