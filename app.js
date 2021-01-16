const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const GlobalErrorHandler = require('./handlers/errorHandler');

const collegeRouter = require('./routes/collegeRoutes');
const studentRouter = require('./routes/studentRoutes');

const app = express();

// 1) --- GLOBAL MIDDLEWARES ---
// Implement CORS
// app.use(cors());
// // Access-Control-Allow-Origin *
// // api.natours.com, front-end natours.com
// // app.use(cors({
// //   origin: 'https://www.natours.com'
// // }))

// app.options('*', cors());
// // app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour.',
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitzation against NoSQSL query injection
app.use(mongoSanitize());

// Data sanitzation against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: [
      'students',
      'city',
      'state',
      'country',
      'name',
      'skills',
      'batchyear',
      'year',
      'students',
    ],
  })
);

app.use(compression());

// 2) --- ROUTES ---

app.use('/api/colleges', collegeRouter);
app.use('/api/students', studentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);

// 3) --- START THE SERVER ---

module.exports = app;
