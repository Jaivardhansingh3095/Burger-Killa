const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');
const mongoose = require('mongoose');

const DB_STRING = process.env.DATABASE_CONNECTION_STRING.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB_STRING).then(() => {
  console.log('Database connected successfully');
  // eslint-disable-next-line no-undef
  app.listen(process.env.PORT, 'localhost', () => {
    console.log(`App is running on server http://localhost:3000`);
  });
});
