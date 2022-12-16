import React from 'react';
import { getAllEvents, getEventById } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';

export default function EventDetailPage(props) {
	const { event } = props;

	if (!event) {
		return (
			<ErrorAlert>
				<p>No event Found</p>;
			</ErrorAlert>
		);
	}

	return (
		<React.Fragment>
			<EventSummary title={event.title} />
			<EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</React.Fragment>
	);
}

export async function getStaticPaths() {
	const events = await getAllEvents();

	let params = events.map(event => ({ params: { eventId: event.id } }));

	return {
		paths: params,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { eventId } = context.params;

	const event = await getEventById(eventId);

	return {
		props: {
			event,
		},
	};
}
