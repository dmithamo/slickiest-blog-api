import { get } from '../../database/_common';
/**
 * @description Check an input for validity using regex
 * @param {*} param0 an object with the type of value and the value
 * being checked agains the regex pattern
 * @param {RegExp} regex pattern to match against]
 * '@returns {String} an error message if pattern is not matched
 */
export const matchesRegex = ({ type, value }, regex) => {
  let example = '';
  switch (type) {
    case 'email':
      example = 'e.g. dmithamo@email.com';
      break;
    case 'password':
      example =
        'i.e. >= 8chars long, has upper and lowercase letters, numbers and special chars.';
      break;
    case 'username':
      example = 'e.g. d_mithamo';
      break;
    default:
      example = 'See press and posters for details.';
  }
  if (!regex.test(value)) {
    return `Provide a valid ${type}. ${example}`;
  }
};

/**
 * @description Check a value for unicity by referencing the db
 * @param {Object} param0 Value which is being checked for unicity
 * @param {String} collectionName Table of interest in db
 * @returns {String} an error message if the value is
 * not unique
 */
export const isUnique = async ({ type, value }, collectionName) => {
  const allInDB = await get(collectionName);
  const item = allInDB.filter((i) => i[`${type}`] === value);

  if (item.length > 0) {
    return `This ${type} is already in use. Login or register another`;
  }
};
