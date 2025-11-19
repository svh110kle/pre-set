const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes by validating Authorization header tokens.
 */
async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '').trim()
      : null;

    if (!token) {
      return res.status(401).json({ message: 'Missing authorization token.' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'supersecretplaceholder'
    );

    req.user = await User.findById(decoded.sub).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    next();
  } catch (error) {
    console.error('[authMiddleware] Error verifying token', error.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = {
  protect,
};

