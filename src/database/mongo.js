import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

let database;

/**
 * @description Initialize the in-memory db
 * @returns {void}
 */
export const startDatabase = async () => {
  const mongo = new MongoMemoryServer();
  const mongoDBURL = await mongo.getConnectionString();
  const connection = await MongoClient.connect(mongoDBURL, {
    useNewUrlParser: true,
  });
  database = connection.db();
};

/**
 * @description Return an instance of the in-memory db
 * @returns {?} database - an instance of the db
 */
export const getDatabase = async () => {
  // Start db if no instance is live
  if (!database) await startDatabase();
  return database;
};
