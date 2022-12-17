import { getAllEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AllEventsPage(props) {
	const router = useRouter();

	function findEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	return (
		<React.Fragment>
			<Head>
				<title>All Events</title>
				<meta name="description" content="Find a lot of great events that allow you to evolve" />
			</Head>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={props.events} />
		</React.Fragment>
	);
}

export async function getStaticProps() {
	const events = await getAllEvents();

	return {
		props: {
			events,
		},
		revalidate: 60,
	};
}
