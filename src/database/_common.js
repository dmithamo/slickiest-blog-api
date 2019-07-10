import { ObjectID } from 'mongodb';
import { getDatabase } from './mongo';

/**
 * @description Retrieve all items from a
 * given collection in the db
 * @param {String} collectionName - name of collection
 * @returns {Array} collection - array of all items
 * from the collection in the db
 */
export const get = async (collectionName) => {
  const db = await getDatabase();
  const collection = await db
    .collection(collectionName)
    .find({})
    .toArray();
  return collection;
};

/**
 * @description Retrieve an item from a
 * given collection in the db give its id
 * @param {String} id - the id of the item of interest
 * @param {String} collectionName - name of collection
 * @returns {Object} item - item with matching id
 * from the collection
 */
export const getByID = async (ID, collectionName) => {
  const db = await getDatabase();
  const item = await db
    .collection(collectionName)
    .findOne({ _id: new ObjectID(ID) });
  return item;
};

/**
 * @description Retrieve an item from a
 * given collection in the db give a param of its
 * @param {String} param - the param of the item of interest
 * @param {String} collectionName - name of collection
 * @returns {Object} item - item with matching param
 * from the collection
 */
export const getByParam = async (param, collectionName) => {
  const db = await getDatabase();
  const item = await db.collection(collectionName).findOne({ ...param });
  return item;
};

/**
 * @description Insert an item into a collection in the db
 * @param {object} item
 * @param {String} collectionName - name of collection
 * @returns {object} insertedItem - item that was saved to the db
 */
export const insert = async (item, collectionName) => {
  const db = await getDatabase();
  const insertedItem = await db.collection(collectionName).insertOne(item);
  return insertedItem;
};

/**
 * @description Update an item
 * @param {String} ID - id of the item being updated
 * @param {object} itemUpdates - updates being made to the story
 * @param {String} collectionName - name of collection
 * @returns {object} updatedItem - item after updates
 */
export const update = async (ID, itemUpdates, collectionName) => {
  const db = await getDatabase();
  const updatedItem = await db
    .collection(collectionName)
    .updateOne({ _id: new ObjectID(ID) }, { $set: { ...itemUpdates } });
  return updatedItem;
};

/**
 * @description Delete an item from a collection in the db
 * @param {String} ID - id of the item being deleted
 * @param {String} collectionName - name of collection
 * @returns {void}
 */
export const deleteItem = async (ID, collectionName) => {
  const db = await getDatabase();
  await db.collection(collectionName).deleteOne({ _id: new ObjectID(ID) });
};
