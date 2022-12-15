const DUMMY_EVENTS = [
	{
		id: 'e1',
		title: 'Live Rap Concert',
		description:
			'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
		location: 'Somestreet 25, 12345 San Somewhereo',
		date: '2021-05-12',
		image: 'images/concert.jpg',
		isFeatured: false,
	},
	{
		id: 'e2',
		title: 'Networking for introverts',
		description:
			"We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
		location: 'New Wall Street 5, 98765 New Work',
		date: '2021-05-30',
		image: 'images/keynote.jpg',
		isFeatured: true,
	},
	{
		id: 'e3',
		title: 'How to plan a wedding',
		description:
			'In this event you will learn how to plan the perfect wedding. May it be for a friend or a even your own wedding.',
		location: 'My Street 12, 10115 Broke City',
		date: '2022-04-10',
		image: 'images/wedding.jpg',
		isFeatured: true,
	},
];

export function getFeaturedEvents() {
	return DUMMY_EVENTS.filter(event => event.isFeatured);
}

export function getAllEvents() {
	return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
	const { year, month } = dateFilter;

	let filteredEvents = DUMMY_EVENTS.filter(event => {
		const eventDate = new Date(event.date);
		return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
	});

	return filteredEvents;
}

export function getEventById(id) {
	return DUMMY_EVENTS.find(event => event.id === id);
}
