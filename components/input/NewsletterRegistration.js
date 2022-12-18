import { useState, useContext } from 'react';
import styles from './NewsletterRegistration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
	const [input, setInput] = useState('');
	const { showNotification, hideNotification } = useContext(NotificationContext);

	function registrationHandler(event) {
		event.preventDefault();
		showNotification({ title: 'Signing up...', message: 'Registering for newsletter.', status: 'pending' });
		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify({ email: input }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}

				return res.json().then(data => {
					throw Error(data.message || 'Something went wrong!');
				});
			})
			.then(() =>
				showNotification({
					title: 'Success!',
					message: 'Successfully registered for newsletter.',
					status: 'success',
				})
			)
			.catch(err => showNotification({ title: 'Error!', message: err.message, status: 'error' }));

		setInput('');
	}

	return (
		<section className={styles.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={styles.control}>
					<input
						type="email"
						id="email"
						placeholder="Your email"
						aria-label="Your email"
						value={input}
						onChange={e => setInput(e.target.value)}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
