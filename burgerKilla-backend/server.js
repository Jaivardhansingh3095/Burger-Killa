const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');
const mongoose = require('mongoose');

const DB_STRING = process.env.DATABASE_CONNECTION_STRING.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    mongoose.connect(DB_STRING).then(() => {
      console.log('Database connected successfully');
      // eslint-disable-next-line no-undef
      app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`);
      });
    });
  } catch (error) {
    console.log('crash error:', error.message);
    process.exit(1);
  }
};

startServer();

// app.listen(PORT, 'localhost', () => {
//   console.log(`App is running on server http://localhost:3000`);
// });
