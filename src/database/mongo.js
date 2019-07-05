import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// read env vars
dotenv.config();
const { DATABASE_URL } = process.env;

let database;

/**
 * @description Initialize the in-memory db
 * @returns {void}
 */
export const startDatabase = async () => {
  const mongoDBURL = DATABASE_URL;
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
