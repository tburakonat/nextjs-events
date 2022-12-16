export async function getAllEvents() {
	const response = await fetch(
		'https://nextjs-events-ad399-default-rtdb.europe-west1.firebasedatabase.app/events.json'
	);
	const data = await response.json();

	let events = [];

	for (let key in data) {
		events.push({ ...data[key], id: key });
	}

	return events;
}

export async function getFeaturedEvents() {
	let events = await getAllEvents();

	return events.filter(event => event.isFeatured);
}
