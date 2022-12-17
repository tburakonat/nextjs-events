import { MongoClient } from 'mongodb';
const DB_PASSWORD = process.env.DB_PASSWORD;

async function handler(req, res) {
	const client = await MongoClient.connect(
		`mongodb+srv://our-first-user:${DB_PASSWORD}@events.imn2rbz.mongodb.net/?retryWrites=true&w=majority`
	);

	const db = client.db('events');

	switch (req.method) {
		case 'GET':
			const documents = await db
				.collection('comments')
				.find({ eventId: req.query.eventId })
				.sort({ _id: -1 })
				.toArray();

			res.status(200).json({ message: 'Loaded comments', comments: documents });

			break;
		case 'POST':
			const { email, name, text } = req.body;
			if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
				res.status(422).json({ message: 'Invalid input', data: req.body });
				return;
			}

			const newComment = {
				email,
				name,
				text,
				eventId: req.query.eventId,
			};

			await db.collection('comments').insertOne(newComment);

			res.status(201).json({ message: 'Added comment', comment: newComment });

			break;
	}

	client.close();
}

export default handler;
