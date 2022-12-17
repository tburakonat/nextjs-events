function handler(req, res) {
	switch (req.method) {
		case 'GET':
			const DUMMY_LIST = [
				{ id: 'c1', name: 'Burak', text: 'First comment' },
				{ id: 'c2', name: 'Ekrem', text: 'Second comment' },
			];

			res.status(200).json({ comments: DUMMY_LIST });
			break;

		case 'POST':
			const { email, name, text } = req.body;
			if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
				res.status(422).json({ message: 'Invalid input' });
				return;
			}

			const newComment = {
				id: new Date().toISOString(),
				email,
				name,
				text,
			};

			res.status(201).json({ message: 'Added comment', comment: newComment });
			break;
	}
}

export default handler;
