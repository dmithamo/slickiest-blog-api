// Reusable db fns
import { get, getByID, insert, update, deleteItem } from './_common';

const collectionName = 'stories';

/**
 * @description Retrieve all stories from the db
 * @returns {Array} stories - array of all stories in the db
 */
export const getStories = async () => {
  const stories = await get(collectionName);
  return stories;
};

/**
 * @description Retrieve a story from the db given its id
 * @param {String} id - the id of the story of interest
 * @returns {Object} item - item with matching id
 * from the collection
 */
export const getStoryByID = async (id) => {
  const story = await getByID(id, collectionName);
  return story;
};

/**
 * @description Insert a story to the db
 * @param {object} story
 * @returns {object} insertedStory - story that was saved to the db
 */
export const insertStory = async (story) => {
  const insertedStory = await insert(story, collectionName);
  return insertedStory;
};

/**
 * @description Update a story
 * @param {String} storyID - id of the story being updated
 * @param {object} storyUpdates - updates being made to the story
 * @returns {object} updatedStory - story after updates
 */
export const updateStory = async (storyID, storyUpdates) => {
  const updatedStory = await update(storyID, storyUpdates, collectionName);
  return updatedStory;
};

/**
 * @description Delete a story
 * @param {String} storyID - id of the story being deleted
 * @returns {void}
 */
export const deleteStory = async (storyID) => {
  await deleteItem(storyID, collectionName);
};
