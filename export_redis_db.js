/*
 * Connect
 */
import { createClient } from 'redis';
import { MongoClient } from 'mongodb'; // Example: using MongoDB as the target database


const redisConfig = {
   host: '127.0.0.1',
   port: 6379,
}

const mongoConfig = {
   url: 'mongodb://localhost:27017',
   dbName: 'myMongoDB', // Change this to your MongoDB database name
};

const redisClient = createClient(redisConfig);
redisClient.on('error', err => console.log('Redis Client Error', err));
await redisClient.connect();

/*
 * Store and retrieve a simple string.
 *****************************************************************************/

//await redisClient.set('sohaib', 'mohamed2');
//const value = await redisClient.get('key');

// // Setter function to set a key-value pair in Redis
// export const setKey = (key, value) => {
//   try {
//     redisClient.set(key, value);
//     console.log(`Key '${key}' set successfully in Redis.`);
//   } catch (error) {
//     console.error(`Error setting key '${key}' in Redis:`, error);
//   }
// }
//
// // Getter function to retrieve the value of a key from Redis
// export const getKey = (key) => {
//   try {
//     const value = redisClient.get(key);
//     console.log(`Value for key '${key}' retrieved from Redis:`, value);
//     return value;
//   } catch (error) {
//     console.error(`Error getting value for key '${key}' from Redis:`, error);
//     return null;
//   }
// }

/*
 * export Redis Data to MongoDB
 *****************************************************************************/
const exportRedisData = async () => {
   try {
      const redisKeys = await redisClient.keys('*');

      const mongoClient = new MongoClient(mongoConfig.url);
      await mongoClient.connect();

      const db = mongoClient.db(mongoConfig.dbName);
      const collection = db.collection('redisData');

      for (const key of redisKeys) {
         const redisType = await redisClient.type(key);

         if (redisType === 'string') {
            const value = await redisClient.get(key);
            await collection.updateOne({ key }, { $set: { value } }, { upsert: true });
         } else if (redisType === 'hash') {
            //const value = await redisClient.hgetall(key);
            //await collection.updateOne({ key }, { $set: { value } }, { upsert: true });
         } else {
            // Handle other data types if needed
            console.log(`Unsupported data type for key '${key}'`);
         }
      }

      console.log('Redis data exported to MongoDB successfully.');
   } catch (error) {
      console.error('Error exporting Redis data:', error);
   } finally {
      redisClient.quit();
   }
};


/*
 * Export Redis DB to MongoDB
 */
exportRedisData();

/*
 * Close the connection
 */
//await redisClient.quit();
