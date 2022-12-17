import { MongoClient } from 'mongodb';
const DB_PASSWORD = process.env.DB_PASSWORD;

async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			try {
				if (!req.body.email || !req.body.email.includes('@')) {
					res.status(422).json({ message: 'Invalid email adress' });
					return;
				}

				const client = await MongoClient.connect(
					`mongodb+srv://our-first-user:${DB_PASSWORD}@events.imn2rbz.mongodb.net/?retryWrites=true&w=majority`
				);

				const db = client.db('events');

				await db.collection('emails').insertOne({ email: req.body.email });

				client.close();

				res.status(200).json({ message: 'Signed Up' });
				break;
			} catch {
				res.status(500).json({ message: 'Error while saving in db' });
				break;
			}
	}
}

export default handler;
