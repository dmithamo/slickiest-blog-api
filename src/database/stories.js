import { ObjectID } from 'mongodb';
import { getDatabase } from './mongo';

const collectionName = 'stories';

/**
 * @description Retrieve all stories from the db
 * @returns {Array} stories - array of all stories in the db
 */
export const getStories = async () => {
  const database = await getDatabase();
  const stories = await database
    .collection(collectionName)
    .find({})
    .toArray();
  return stories;
};

/**
 * @description Retrieve a story from the db given its id
 * @param {String} id - the id of the story of interest
 * @returns {Array} stories - array of all stories in the db
 */
export const getStoryByID = async (id) => {
  const database = await getDatabase();
  const story = await database
    .collection(collectionName)
    .findOne({ _id: new ObjectID(id) });
  return story;
};

/**
 * @description Insert a story to the db
 * @param {object} story
 * @returns {object} insertedStory - story that was saved to the db
 */
export const insertStory = async (story) => {
  const database = await getDatabase();
  const insertedStory = await database
    .collection(collectionName)
    .insertOne(story);
  return insertedStory;
};

/**
 * @description Update a story
 * @param {String} storyID - id of the story being updated
 * @param {object} storyUpdates - updates being made to the story
 * @returns {object} updatedStory - story after updates
 */
export const updateStory = async (storyID, storyUpdates) => {
  const database = await getDatabase();
  const objID = new ObjectID(storyID);
  const updatedStory = await database
    .collection(collectionName)
    .updateOne({ _id: objID }, { $set: { ...storyUpdates } });
  return updatedStory;
};

/**
 * @description Delete a story
 * @param {String} storyID - id of the story being deleted
 * @returns {void}
 */
export const deleteStory = async (storyID) => {
  const database = await getDatabase();
  const objID = new ObjectID(storyID);
  await database.collection(collectionName).deleteOne({ _id: objID });
};
