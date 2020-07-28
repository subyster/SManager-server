import express from 'express';
import routes from './routes';

const app = express();

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started at port 3333');
});
