import Head from 'next/head';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/api-utils';
import NewsletterRegistration from '../components/input/NewsletterRegistration';

export default function HomePage(props) {
	return (
		<div>
			<Head>
				<title>Next Events</title>
				<meta name="description" content="Find a lot of great events that allow you to evolve" />
			</Head>
			<NewsletterRegistration />
			<EventList items={props.featuredEvents} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: {
			featuredEvents,
		},
		revalidate: 1800,
	};
}
