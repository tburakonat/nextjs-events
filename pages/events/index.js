import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';

export default function AllEventsPage() {
	const events = getAllEvents();

	return (
		<div>
			<h1>All Events</h1>
			<EventList items={events} />
		</div>
	);
}
