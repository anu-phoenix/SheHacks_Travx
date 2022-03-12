const modal = document.querySelector('.payment--modal');
const cross = document.querySelector('.payment--cross');

document.getElementById('pay').addEventListener('click', function (e) {
	e.preventDefault();
	modal.style.display = 'block';
});
