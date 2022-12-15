import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import { Fragment } from 'react';
import ErrorAlert from '../../components/ui/ErrorAlert';

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
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values.</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = getFilteredEvents({ year: yearNum, month: monthNum });

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(yearNum, monthNum - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}
