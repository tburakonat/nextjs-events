import Link from 'next/link';
import React from 'react';

export default function EventItem({ item }) {
	const { title, image, date, location, id } = item;

	const formatedDate = new Date(date).toLocaleDateString('de-DE', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const formatedAdress = location.replace(', ', '\n');

	const formatedLink = `/events/${id}`;

	return (
		<li>
			<img src={'/' + image} alt={title} />
			<div>
				<div>
					<h2>{title}</h2>
					<div>
						<time>{formatedDate}</time>
					</div>
					<div>
						<address>{formatedAdress}</address>
					</div>
				</div>
				<div>
					<Link href={formatedLink}>Explore Event</Link>
				</div>
			</div>
		</li>
	);
}
