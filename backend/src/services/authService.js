const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

async function registerUser(payload) {
  const { username, email, password } = payload;

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error('A user with that email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user);
  return { user: user.toSafeObject(), token };
}

async function loginUser(payload) {
  const { email, password } = payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Account not found.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials.');
  }

  const token = generateToken(user);
  return { user: user.toSafeObject(), token };
}

async function forgotPassword(payload) {
  const { email, newPassword } = payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Account not found.');
  }

  if (!newPassword || newPassword.length < 6) {
    throw new Error('Please provide a new password with at least 6 characters.');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: 'Password updated successfully. You can login now.' };
}

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
};

