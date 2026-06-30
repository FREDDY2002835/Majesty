const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');

// Catches every error thrown or passed to next() across the whole app.
// Must be registered LAST, after all routes, in index.js.
const errorHandler = (err, req, res, next) => {
  // Known, expected errors (AppError and its subclasses)
  if (err instanceof AppError) {
    logger.warn(`${err.statusCode} - ${err.message}`, {
      path: req.path,
      method: req.method,
      userId: req.user?.id,
    });

    const response = { message: err.message };
    if (err.fields && err.fields.length > 0) {
      response.errors = err.fields;
    }

    return res.status(err.statusCode).json(response);
  }

  // PostgreSQL duplicate key error (e.g. duplicate email)
  if (err.code === '23505') {
    logger.warn(`409 - Duplicate entry`, { path: req.path, detail: err.detail });
    return res.status(409).json({ message: 'This record already exists.' });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    logger.warn(`401 - Invalid/expired token`, { path: req.path });
    return res.status(401).json({ message: 'Invalid or expired session. Please log in again.' });
  }

  // Unknown/unexpected errors — log full details, never expose internals to the client
  logger.error(`500 - Unexpected error: ${err.message}`, {
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(500).json({ message: 'Internal server error. Please try again later.' });
};

// Wraps async route handlers so thrown errors automatically reach errorHandler,
// without needing try/catch in every single controller function.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { errorHandler, asyncHandler };
