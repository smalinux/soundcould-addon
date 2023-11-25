//
// node dump_mongodb.js
//
//
import { MongoClient } from 'mongodb';

const mongoURL = 'mongodb://localhost:27017'; // MongoDB connection URL
const dbName = 'myMongoDB'; // Your database name

async function printAllData() {
  const client = new MongoClient(mongoURL);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collection = db.collection(collectionName);
      const documents = await collection.find({}).toArray();

      console.log(`Collection: ${collectionName}`);
      console.log('Documents:', documents);
      console.log('--------------------------------------');
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
  } finally {
    await client.close();
  }
}

printAllData();

