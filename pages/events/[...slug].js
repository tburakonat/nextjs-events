import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';

export default function FilteredEventsPage() {
	const router = useRouter();
	const filterData = router.query.slug;

	if (!filterData) {
		return <p className="center">Loading...</p>;
	}

	const year = filterData[0];
	const month = filterData[1];

	const yearNum = +year;
	const monthNum = +month;

	if (isNaN(year) || isNaN(month) || yearNum > 2030 || yearNum < 2021 || monthNum < 1 || month > 12) {
		return <p>Invalid filter. Please adjust your values.</p>;
	}

	const filteredEvents = getFilteredEvents({ year: yearNum, month: monthNum });

	if (!filteredEvents || filteredEvents.length === 0) {
		return <p>No events found for the chosen filter!</p>;
	}

	return (
		<div>
			<EventList items={filteredEvents} />
		</div>
	);
}
