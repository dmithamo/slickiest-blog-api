/* eslint-disable indent */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import bcrypt from 'bcryptjs';

// db
import { insertUser, getUserByEmail } from '../database/users';

dotenv.config();

const { SECRET } = process.env;

const router = Router();

// POST request - register user, generate auth token
router.post('/register', async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const { ops } = await insertUser({
      ...req.body,
      password: hashedPassword,
    });

    const newUser = ops[0];
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, SECRET, {
      expiresIn: 86400,
    });

    await delete newUser.password;
    return res.status(201).send({
      msg: 'Success',
      data: { ...newUser, token },
    });
  } catch (e) {
    return res.status(500).send({ error: `Server error. ${e}` });
  }
});

// POST request - login a user, generate auth token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).send({ msg: `No user with email ${email} found` });
    }

    const passwordIsCorrect = bcrypt.compareSync(password, user.password);

    if (!passwordIsCorrect) {
      return res.status(401).send({ msg: 'Wrong password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
      expiresIn: 86400,
    });

    await delete user.password;
    return res.status(201).send({ msg: 'Success', user: { ...user, token } });
  } catch (e) {
    return res.status(500).send({ error: `Server error. ${e}` });
  }
});

export default router;
