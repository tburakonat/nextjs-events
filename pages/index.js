import EventList from '../components/events/EventList';
// import { getFeaturedEvents } from '../dummy-data';

export default function HomePage(props) {
	// const featuredEvents = getFeaturedEvents();

	return (
		<div>
			<EventList items={props.featuredEvents} />
		</div>
	);
}

export async function getStaticProps() {
	const response = await fetch(
		'https://nextjs-events-ad399-default-rtdb.europe-west1.firebasedatabase.app/events.json'
	);
	const data = await response.json();

	let events = [];

	for (let key in data) {
		events.push({ ...data[key], id: key });
	}

	const featuredEvents = events.filter(event => event.isFeatured === true);

	return {
		props: {
			featuredEvents,
		},
	};
}
