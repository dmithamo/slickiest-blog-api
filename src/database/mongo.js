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
  await MongoClient.connect(
    DATABASE_URL,
    {
      useNewUrlParser: true,
    },
    (err, conn) => {
      if (err) throw err;
      database = conn.db();
    },
  );
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
