import { getFilteredEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/ResultsTitle';
import { Fragment } from 'react';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Button from '../../components/ui/Button';
import Head from 'next/head';

export default function FilteredEventsPage(props) {
	const date = new Date(props.yearNum, props.monthNum - 1);
	const monthString = date.toLocaleString('en-US', { month: 'long' });
	const yearString = date.getFullYear();

	const pageHeadData = (
		<Head>
			<title>
				Events {monthString ? monthString : null} {yearString ? yearString : null}
			</title>
			<meta name="description" content={`All events for ${monthString} ${yearString}`} />
		</Head>
	);

	if (props.hasError) {
		return (
			<Fragment>
				{pageHeadData}
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
				{pageHeadData}
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	return (
		<Fragment>
			{pageHeadData}
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
