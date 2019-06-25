import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = 3000;

// Attach middleware

//  parse request body into JSON
app.use(bodyParser.json());

// enable cross-orgin request sharing
app.use(cors());

// secure the API
app.use(helmet());

// use morgan to log requests
app.use(morgan('dev'));

app.get('/welcome', (req, res) => {
  res.status(200).send({ msg: 'Welcome welcome welcome' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}...`);
});
