import { MongoClient } from 'mongodb';

export async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb+srv://our-first-user:${process.env.DB_PASSWORD}@events.imn2rbz.mongodb.net/?retryWrites=true&w=majority`
	);
	return client;
}

export async function insertDocument(client, collection, document) {
	const db = client.db('events');
	const result = await db.collection(collection).insertOne(document);
	return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
	const db = client.db('events');
	const documents = await db.collection(collection).find(filter).sort(sort).toArray();
	return documents;
}
