const jwt = require('jsonwebtoken');

/**
 * Creates a signed JWT for the given user id and role.
 */
function generateToken(user) {
  const payload = {
    sub: user._id,
    role: user.role,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'supersecretplaceholder', {
    expiresIn: '7d',
  });
}

module.exports = generateToken;

