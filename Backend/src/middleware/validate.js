const { validationResult } = require('express-validator');
const { ValidationError } = require('../utils/errors');

// Runs after express-validator's body()/param() checks in a route.
// If any validation rule failed, turns it into a clean 400 response.
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const fields = errors.array().map(e => ({
      field: e.path,
      message: e.msg,
    }));
    return next(new ValidationError('Validation failed.', fields));
  }

  next();
};

module.exports = validate;
