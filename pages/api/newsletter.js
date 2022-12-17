import { connectDatabase, insertDocument } from '../../helpers/db-utils';

async function handler(req, res) {
	switch (req.method) {
		case 'POST':
			if (!req.body.email || !req.body.email.includes('@')) {
				res.status(422).json({ message: 'Invalid email adress' });
				return;
			}

			let client;

			try {
				client = await connectDatabase();
			} catch (error) {
				res.status(500).json({ message: 'Could not connect to db' });
				return;
			}

			try {
				await insertDocument(client, 'newsletter', { email: req.body.email });
				client.close();
			} catch (error) {
				res.status(500).json({ message: 'Could not insert in db' });
				return;
			}

			res.status(200).json({ message: 'Signed Up' });
			break;
	}
}

export default handler;
