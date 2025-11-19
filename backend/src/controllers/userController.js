const userService = require('../services/userService');

async function getProfile(req, res) {
  try {
    const user = await userService.getProfile(req.user._id);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const updated = await userService.updateProfile(req.user._id, req.body);
    res.json({ user: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateRole(req, res) {
  try {
    const updated = await userService.updateRole(req.user._id, req.body.role);
    res.json({ user: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updatePlan(req, res) {
  try {
    const updated = await userService.updatePlan(req.user._id, req.body.plan);
    res.json({ user: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  updateRole,
  updatePlan,
};

