import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import { Fragment } from 'react';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Button from '../../components/ui/Button';

export default function FilteredEventsPage(props) {
	if (props.hasError) {
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

	if (!props.filteredEvents || props.filteredEvents.length === 0) {
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

	const date = new Date(props.yearNum, props.monthNum - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={props.filteredEvents} />
		</Fragment>
	);
}

export async function getServerSideProps(context) {
	const filterData = context.params.slug;

	const year = filterData[0];
	const month = filterData[1];

	const yearNum = +year;
	const monthNum = +month;

	if (isNaN(year) || isNaN(month) || yearNum > 2030 || yearNum < 2021 || monthNum < 1 || month > 12) {
		return {
			props: { hasError: true },
			/*
			notFound: true,
			redirect: {
				destination: "/error"
			}
			*/
		};
	}

	const filteredEvents = await getFilteredEvents({ year: yearNum, month: monthNum });

	return {
		props: {
			filteredEvents,
			yearNum,
			monthNum,
		},
	};
}
