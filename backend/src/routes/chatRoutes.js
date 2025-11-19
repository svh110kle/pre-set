const express = require('express');
const chatController = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, chatController.fetchHistory);
router.post('/', protect, chatController.sendMessage);

module.exports = router;

