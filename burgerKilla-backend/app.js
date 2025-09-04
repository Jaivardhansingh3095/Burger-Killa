const express = require('express');
const path = require('path');
const morgan = require('morgan');
const menuRouter = require('./routes/menuRoute');
const userRouter = require('./routes/userRoute');
const AppError = require('./util/appError');
const errorHandler = require('./Middleware/errorHandlerMiddleware');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

//1. Global Middleware

app.use(
  cors({
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true, // allow cookies to be sent
  }),
);

app.use(cookieParser());

//Provide express the access of Public folder through URL
app.use('/public', express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//To access the body data
app.use(express.json());
app.use(
  express.urlencoded({
    limit: '10kb',
    extended: true,
  }),
);

// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'Hello World',
//   });
// });

app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/user', userRouter);

app.all('/*splat', (req, res, next) => {
  next(
    new AppError(
      `The requested url:${req.originalUrl} do not exist on the server`,
      404,
    ),
  );
});

app.use(errorHandler);

module.exports = app;
