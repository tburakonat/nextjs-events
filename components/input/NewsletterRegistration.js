import { useState } from 'react';
import styles from './NewsletterRegistration.module.css';

function NewsletterRegistration() {
	const [input, setInput] = useState('');

	function registrationHandler(event) {
		event.preventDefault();

		fetch('/api/newsletter', {
			method: 'POST',
			body: JSON.stringify({ email: input }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => console.log(data.message))
			.catch(err => console.log(err));

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
