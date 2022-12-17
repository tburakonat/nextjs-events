function handler(req, res) {
	switch (req.method) {
		case 'POST':
			if (!req.body.email || req.body.email.includes('@')) {
				res.status(422).json({ message: 'Invalid email adress' });
				return;
			}
			res.status(200).json({ message: 'Signed Up' });
			console.log(req.body.email);
	}
}

export default handler;
