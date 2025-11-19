const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.put('/role', protect, userController.updateRole);
router.put('/plan', protect, userController.updatePlan);

module.exports = router;

