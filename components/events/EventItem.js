import Link from 'next/link';
import React from 'react';
import DateIcon from '../icons/DateIcon';
import AddresIcon from '../icons/AddressIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import Button from '../ui/Button';
import styles from './EventItem.module.css';
import Image from 'next/image';

export default function EventItem({ item }) {
	const { title, image, date, location, id } = item;

	const formatedDate = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const formatedAdress = location.replace(', ', '\n');

	const formatedLink = `/events/${id}`;

	return (
		<li className={styles.item}>
			<Image src={'/' + image} alt={title} width={250} height={160} />
			<div className={styles.content}>
				<div className={styles.summary}>
					<h2>{title}</h2>
					<div className={styles.date}>
						<DateIcon />
						<time>{formatedDate}</time>
					</div>
					<div className={styles.address}>
						<AddresIcon />
						<address>{formatedAdress}</address>
					</div>
				</div>
				<div className={styles.actions}>
					<Button link={formatedLink}>
						<span>Explore Event</span>
						<span className={styles.icon}>
							<ArrowRightIcon />
						</span>
					</Button>
				</div>
			</div>
		</li>
	);
}
