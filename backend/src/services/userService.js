const User = require('../models/User');

async function getProfile(userId) {
  return User.findById(userId).select('-password');
}

async function updateProfile(userId, updates) {
  const allowedFields = ['username', 'profile', 'preferences'];
  const sanitizedUpdates = {};

  Object.keys(updates || {}).forEach((key) => {
    if (allowedFields.includes(key)) {
      sanitizedUpdates[key] = updates[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: sanitizedUpdates },
    { new: true }
  ).select('-password');

  return user;
}

async function updateRole(userId, role) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { role } },
    { new: true }
  ).select('-password');
  return user;
}

async function updatePlan(userId, plan) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { plan } },
    { new: true }
  ).select('-password');
  return user;
}

module.exports = {
  getProfile,
  updateProfile,
  updateRole,
  updatePlan,
};

