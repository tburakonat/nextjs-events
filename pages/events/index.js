import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';
import React from 'react';
import { useRouter } from 'next/router';

export default function AllEventsPage() {
	const router = useRouter();
	const events = getAllEvents();

	function findEventsHandler(year, month) {
		const fullPath = `/events/${year}/${month}`;
		router.push(fullPath);
	}

	return (
		<React.Fragment>
			<h1>All Events</h1>
			<EventsSearch onSearch={findEventsHandler} />
			<EventList items={events} />
		</React.Fragment>
	);
}
