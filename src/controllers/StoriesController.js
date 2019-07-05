/* eslint-disable indent */
import { Router } from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';

import {
  getStories,
  getStoryByID,
  insertStory,
  updateStory,
  deleteStory,
} from '../database/stories';

const router = Router();

// GET request
router.get('/', async (req, res) => {
  try {
    const stories = await getStories();
    return stories.length > 0
      ? res.status(200).send({ msg: 'Success', data: { stories } })
      : res.status(404).send({ msg: 'No stories found' });
  } catch (e) {
    return res.status(500).send({
      error: `Server error. ${e}`,
    });
  }
});

// Protect all subsequent routes
router.use(verifyAuthToken);

// GET by id request
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const story = await getStoryByID(id);
    return story
      ? res.status(200).send({ msg: 'Success', data: { story } })
      : res.status(404).send({ msg: `No story found with id ${id}` });
  } catch (e) {
    return res.status(500).send({
      error: `Server error. ${e}`,
    });
  }
});

// POST request
router.post('/', async (req, res) => {
  try {
    const { ops: newStory } = await insertStory({
      ...req.body,
      author: req.user,
      publishedOn: new Date().toISOString(),
    });

    return res.status(201).send({
      msg: 'Success',
      data: { story: { ...newStory[0] } },
    });
  } catch (e) {
    return res.status(500).send({ error: `Server error. ${e}` });
  }
});

// PUT request
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const storyUpdates = req.body;

    const story = await getStoryByID(id);

    if (story) {
      await updateStory(id, storyUpdates);
      // This may be an unnecessary revisit to the db...
      const updatedStory = await getStoryByID(id);

      return res.status(201).send({ msg: 'Success', data: updatedStory });
    }

    return res.status(404).send({ msg: `No story found with id ${id}` });
  } catch (e) {
    return res.status(500).send({ error: `Server error. ${e}` });
  }
});

// DELETE request
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const story = await getStoryByID(id);
    if (story) {
      await deleteStory(id);
      return res.status(204).send();
    }

    return res.status(404).send({ msg: `No story found with id ${id}` });
  } catch (e) {
    return res.status(500).send({ error: `Server error. ${e}` });
  }
});

export default router;
