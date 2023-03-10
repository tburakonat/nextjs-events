import React from 'react';
import { getEventById, getFeaturedEvents } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/EventSummary';
import EventLogistics from '../../components/event-detail/EventLogistics';
import EventContent from '../../components/event-detail/EventContent';
import ErrorAlert from '../../components/ui/ErrorAlert';
import Head from 'next/head';
import Comments from '../../components/input/Comments';

export default function EventDetailPage(props) {
	const { event } = props;

	if (!event) {
		return (
			<ErrorAlert>
				<p>No event Found</p>
			</ErrorAlert>
		);
	}

	return (
		<React.Fragment>
			<Head>
				<title>{event.title}</title>
				<meta name="description" content={event.description} />
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
			<Comments eventId={event.id} />
		</React.Fragment>
	);
}

export async function getStaticPaths() {
	const events = await getFeaturedEvents();

	let params = events.map(event => ({ params: { eventId: event.id } }));

	return {
		paths: params,
		fallback: 'blocking',
	};
}

export async function getStaticProps(context) {
	const { eventId } = context.params;

	const event = await getEventById(eventId);

	if (!event) {
		return {
			props: {
				event: null,
			},
		};
	}

	return {
		props: {
			event,
		},
		revalidate: 60,
	};
}
