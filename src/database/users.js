// Reusable db fns
import { get, getByParam, insert, update, deleteItem } from './_common';

const collectionName = 'users';

/**
 * @description Retrieve all users from the db
 * @returns {Array} users - array of all users in the db
 */
export const getUsers = async () => {
  const users = await get(collectionName);
  return users;
};

/**
 * @description Retrieve a user from the db given its id
 * @param {String} id - the id of the User of interest
 * @returns {Object} item - item with matching id
 * from the collection
 */
export const getUserByEmail = async (email) => {
  const user = await getByParam({ email }, collectionName);
  return user;
};

/**
 * @description Insert a user to the db
 * @param {object} user - the new user being saved to the db
 * @returns {object} insertedUser - User that was saved to the db
 */
export const insertUser = async (user) => {
  const insertedUser = await insert(user, collectionName);
  return insertedUser;
};

/**
 * @description Update a User
 * @param {String} userID - id of the user being updated
 * @param {object} userUpdates - updates being made to the User
 * @returns {object} updatedUser - user after updates
 */
export const updateUser = async (userID, userUpdates) => {
  const updatedUser = await update(userID, userUpdates, collectionName);
  return updatedUser;
};

/**
 * @description Delete a User
 * @param {String} userID - id of the user being deleted
 * @returns {void}
 */
export const deleteUser = async (userID) => {
  await deleteItem(userID, collectionName);
};
