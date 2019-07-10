import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { getDatabase } from './database/mongo';
// Controllers
import AuthController from './controllers/AuthController';
import StoriesController from './controllers/StoriesController';

dotenv.config();
const { PORT, ROOT_API_URL } = process.env;

const app = express();

// Apply Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Attach controllers
app.use(`${ROOT_API_URL}/auth`, AuthController);
app.use(`${ROOT_API_URL}/stories`, StoriesController);

// Start db and listen for requests
getDatabase()
  .then(async () => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Express server running on port ${PORT}...`);
    });
  })
  .catch((e) => {
    throw e;
  });
