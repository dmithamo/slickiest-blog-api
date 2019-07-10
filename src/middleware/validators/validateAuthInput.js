import { matchesRegex, isUnique } from './_common';

/**
 * @description CCheck the validity of the email against a Regex
 * @param {String} email email address provided in req body
 * @returns {Array} emailErrors - an array of errors
 */
const emailValidationErrors = async (email = '') => {
  const emailErrors = [];

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const invalidEmailError = matchesRegex(
    { type: 'email', value: email },
    emailRegex,
  );

  if (invalidEmailError) emailErrors.push(invalidEmailError);

  const notUniqueError = await isUnique(
    { type: 'email', value: email },
    'users',
  );
  if (notUniqueError) emailErrors.push(notUniqueError);

  return emailErrors;
};

/**
 * @description Check the validity of the password against a Regex
 * @param {String} password the password in the req body
 * @returns {Array} passwordErrors - an array of password errors
 */
const passwordValidationErrors = (password = '') => {
  const passwordErrors = [];

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const invalidPasswordError = matchesRegex(
    { type: 'password', value: password },
    passwordRegex,
  );

  if (invalidPasswordError) passwordErrors.push(invalidPasswordError);

  return passwordErrors;
};

/**
 * @description Check the validity of the username against a Regex
 * @param {String} username the username in the req body
 * @returns {Array} usernameErrors - an array of username errors
 */
const usernameValidationErrors = async (username = '') => {
  const usernameErrors = [];

  const usernameRegex = /^[a-z0-9_-]{4,15}$/i;
  const invalidUsernameError = matchesRegex(
    { type: 'username', value: username },
    usernameRegex,
  );

  if (invalidUsernameError) {
    usernameErrors.push(invalidUsernameError);
  }

  const notUniqueError = await isUnique(
    { type: 'username', value: username },
    'users',
  );
  if (notUniqueError) usernameErrors.push(notUniqueError);

  return usernameErrors;
};

/**
 * @description Validate auth input in req body is valid
 * @param {Object} req request object
 * @param {Object} req response object
 * @param {Function} next the next fn in the middleware
 *
 * @returns {void} ...not sure here
 */
const validateAuthInput = async (req, res, next) => {
  const { email, username, password } = req.body;

  const errors = [
    ...(await emailValidationErrors(email)),
    ...(await usernameValidationErrors(username)),
    ...passwordValidationErrors(password),
  ];

  if (errors.length > 0) {
    return res.status(400).send({ errors });
  }
  next();
};

export default validateAuthInput;
