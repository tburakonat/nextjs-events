import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-utils';

async function handler(req, res) {
	const { eventId } = req.query;

	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Could not connect to db' });
		return;
	}

	switch (req.method) {
		case 'GET':
			let documents;

			try {
				documents = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId });
				res.status(200).json({ message: 'Loaded comments', comments: documents });
			} catch (error) {
				res.status(500).json({ message: 'Could not get comments' });
			}

			break;
		case 'POST':
			const { email, name, text } = req.body;
			if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
				res.status(422).json({ message: 'Invalid input', data: req.body });
				client.close();
				return;
			}

			const newComment = {
				email,
				name,
				text,
				eventId,
			};

			try {
				await insertDocument(client, 'comments', newComment);
				res.status(201).json({ message: 'Added comment', comment: newComment });
			} catch (error) {
				res.status(500).json({ message: 'Could not insert in db' });
			}

			break;
	}

	client.close();
}

export default handler;
