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

export async function getEventById(eventId) {
	let events = await getAllEvents();

	return events.find(event => event.id === eventId);
}

export async function getFilteredEvents(dateFilter) {
	let events = await getAllEvents();

	const { year, month } = dateFilter;

	let filteredEvents = events.filter(event => {
		const eventDate = new Date(event.date);
		return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
	});

	return filteredEvents;
}
