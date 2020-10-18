const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// ROUTER
const picturePostRouter = require('./routes/picturePostRoutes');
const videoPostRouter = require('./routes/videoPostRoutes');
const voteRouter = require('./routes/voteRoutes');

// Setup App
const app = express();

// 1) GLOBAL Middlewares
app.use(cors());
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same IP
const limiter = rateLimit({
  max: 400,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization aginst xss
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['city', 'state', 'caption']
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// ROUTES
app.use('/api/v1/pictures', picturePostRouter);
app.use('/api/v1/videos', videoPostRouter);
app.use('/api/v1/votes', voteRouter);

//ERROR HANDLER: for all unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error handling midlleware
app.use(globalErrorHandler);

module.exports = app;
