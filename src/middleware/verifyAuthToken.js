import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET } = process.env;

/**
 * @description Verify that a token exists for all protected routes
 * @param {Object} req request object
 * @param {Object} req response object
 * @param {Function} next the next fn in the middleware
 *
 * @returns {void} ...not sure here
 */
const verifyAuthToken = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(403).json({ error: 'Missing authorization header' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .json({ error: 'Failed to decode authorization token' });
      }

      // Clean user object then append to req
      const user = decoded;
      delete user.iat;
      delete user.exp;
      req.user = user;

      next();
    });
  } catch (e) {
    return res.status(500).send({ error: `Server error. ${e}` });
  }
};

export default verifyAuthToken;
