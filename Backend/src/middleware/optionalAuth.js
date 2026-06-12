const jwt = require('jsonwebtoken');

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      req.user = null; // Invalid token — treat as guest
    }
  } else {
    req.user = null; // No token — treat as guest
  }

  next(); // Always continue, never block
};

module.exports = optionalAuth;