import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../helpers/api-utils';

export default function HomePage(props) {
	return (
		<div>
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
	};
}
