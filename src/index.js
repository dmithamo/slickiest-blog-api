import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// db
import { getDatabase } from './database/mongo';
import {
  getStories,
  getStoryByID,
  insertStory,
  updateStory,
  deleteStory,
} from './database/stories';

// read env variables
dotenv.config();
const { PORT, ROOT_API_URL } = process.env;

const app = express();

// Attach middleware

// Parse request body if sent as JSON or encoded in url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable cross-origin resource sharing
app.use(cors());

// use morgan to log requests
app.use(morgan('dev'));

// GET request
app.get(`${ROOT_API_URL}/`, async (req, res) => {
  const stories = await getStories();
  stories.length > 0
    ? res.status(200).send({ msg: 'Success', data: stories })
    : res.status(404).send({ msg: 'No stories found' });
});

// GET by id request
app.get(`${ROOT_API_URL}/:id`, async (req, res) => {
  const { id } = req.params;
  const story = await getStoryByID(id);
  story
    ? res.status(200).send({ msg: 'Success', data: story })
    : res.status(404).send({ msg: `No story found with id ${id}` });
});

// POST request
app.post(`${ROOT_API_URL}/`, async (req, res) => {
  const { ops: insertedStory } = await insertStory(req.body);

  res.status(201).send({
    msg: 'Success',
    data: insertedStory[0],
  });
});

// PUT request
app.put(`${ROOT_API_URL}/:id`, async (req, res) => {
  const { id } = req.params;
  const storyUpdates = req.body;

  const story = await getStoryByID(id);

  if (story) {
    await updateStory(id, storyUpdates);
    // This may be an unnecessary revisit to the db...
    const updatedStory = await getStoryByID(id);
    res.status(201).send({ msg: 'Success', data: updatedStory });
  } else {
    res.status(404).send({ msg: `No story found with id ${id}` });
  }
});

// DELETE request
app.delete(`${ROOT_API_URL}/:id`, async (req, res) => {
  const { id } = req.params;
  const story = await getStoryByID(id);
  if (story) {
    await deleteStory(id);
    res.status(204).send();
  } else {
    res.status(404).send({ msg: `No story found with id ${id}` });
  }
});

// Start db and listen for requests
getDatabase()
  .then(async () => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Express server running on port ${PORT}...`);
    });
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log(e);
  });
