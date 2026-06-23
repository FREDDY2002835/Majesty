const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Check for token in the request header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token. Please log in.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and attach user info to the request
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // ✅ Token is valid, continue to the route
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

module.exports = auth;